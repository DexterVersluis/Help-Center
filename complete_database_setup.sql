-- Complete Database Setup for ENBOQ Help System
-- Run this SQL in your Supabase SQL editor

-- =====================================================
-- 1. CREATE TABLES
-- =====================================================

-- Create users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.users (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255),
    role VARCHAR(50) DEFAULT 'USER' CHECK (role IN ('USER', 'ADMIN', 'SUPER_ADMIN')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create feature_requests table
CREATE TABLE IF NOT EXISTS public.feature_requests (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    priority VARCHAR(20) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
    status VARCHAR(20) DEFAULT 'under-review' CHECK (status IN ('under-review', 'planned', 'in-progress', 'completed', 'rejected')),
    use_case TEXT,
    votes INTEGER DEFAULT 0,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create feature_votes table to track user votes
CREATE TABLE IF NOT EXISTS public.feature_votes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    feature_id UUID REFERENCES public.feature_requests(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    vote_type VARCHAR(10) NOT NULL CHECK (vote_type IN ('up', 'down')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(feature_id, user_id)
);

-- Create doc_categories table (if it doesn't exist)
CREATE TABLE IF NOT EXISTS public.doc_categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create documentation table (if it doesn't exist)
CREATE TABLE IF NOT EXISTS public.documentation (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    content TEXT,
    category_id UUID REFERENCES public.doc_categories(id) ON DELETE SET NULL,
    type VARCHAR(50) DEFAULT 'guide' CHECK (type IN ('guide', 'tutorial', 'reference')),
    difficulty VARCHAR(20) DEFAULT 'Beginner' CHECK (difficulty IN ('Beginner', 'Intermediate', 'Advanced')),
    read_time VARCHAR(20) DEFAULT '5 min',
    has_video BOOLEAN DEFAULT FALSE,
    video_url TEXT,
    rating DECIMAL(3,2) DEFAULT 0.0,
    views INTEGER DEFAULT 0,
    is_published BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 2. CREATE INDEXES FOR PERFORMANCE
-- =====================================================

-- Users table indexes
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON public.users(role);

-- Feature requests indexes
CREATE INDEX IF NOT EXISTS idx_feature_requests_user_id ON public.feature_requests(user_id);
CREATE INDEX IF NOT EXISTS idx_feature_requests_status ON public.feature_requests(status);
CREATE INDEX IF NOT EXISTS idx_feature_requests_category ON public.feature_requests(category);
CREATE INDEX IF NOT EXISTS idx_feature_requests_created_at ON public.feature_requests(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_feature_requests_votes ON public.feature_requests(votes DESC);

-- Feature votes indexes
CREATE INDEX IF NOT EXISTS idx_feature_votes_feature_id ON public.feature_votes(feature_id);
CREATE INDEX IF NOT EXISTS idx_feature_votes_user_id ON public.feature_votes(user_id);

-- Documentation indexes
CREATE INDEX IF NOT EXISTS idx_documentation_category_id ON public.documentation(category_id);
CREATE INDEX IF NOT EXISTS idx_documentation_slug ON public.documentation(slug);
CREATE INDEX IF NOT EXISTS idx_documentation_published ON public.documentation(is_published);
CREATE INDEX IF NOT EXISTS idx_documentation_views ON public.documentation(views DESC);

-- Doc categories indexes
CREATE INDEX IF NOT EXISTS idx_doc_categories_slug ON public.doc_categories(slug);
CREATE INDEX IF NOT EXISTS idx_doc_categories_sort_order ON public.doc_categories(sort_order);

-- =====================================================
-- 3. ENABLE ROW LEVEL SECURITY (RLS)
-- =====================================================

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feature_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feature_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.doc_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documentation ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- 4. CREATE RLS POLICIES
-- =====================================================

-- Users table policies
DROP POLICY IF EXISTS "Users can view own profile" ON public.users;
CREATE POLICY "Users can view own profile" ON public.users
    FOR SELECT USING (
        auth.uid() = id OR 
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() 
            AND role IN ('ADMIN', 'SUPER_ADMIN')
        )
    );

DROP POLICY IF EXISTS "Users can update own profile" ON public.users;
CREATE POLICY "Users can update own profile" ON public.users
    FOR UPDATE USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can insert own profile" ON public.users;
CREATE POLICY "Users can insert own profile" ON public.users
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Feature requests policies
DROP POLICY IF EXISTS "Anyone can view feature requests" ON public.feature_requests;
CREATE POLICY "Anyone can view feature requests" ON public.feature_requests
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Authenticated users can create feature requests" ON public.feature_requests;
CREATE POLICY "Authenticated users can create feature requests" ON public.feature_requests
    FOR INSERT WITH CHECK (
        auth.role() = 'authenticated' AND 
        auth.uid() = user_id
    );

DROP POLICY IF EXISTS "Users can update own feature requests" ON public.feature_requests;
CREATE POLICY "Users can update own feature requests" ON public.feature_requests
    FOR UPDATE USING (
        auth.uid() = user_id OR 
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() 
            AND role IN ('ADMIN', 'SUPER_ADMIN')
        )
    );

DROP POLICY IF EXISTS "Users can delete own feature requests" ON public.feature_requests;
CREATE POLICY "Users can delete own feature requests" ON public.feature_requests
    FOR DELETE USING (
        auth.uid() = user_id OR 
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() 
            AND role IN ('ADMIN', 'SUPER_ADMIN')
        )
    );

-- Feature votes policies
DROP POLICY IF EXISTS "Anyone can view feature votes" ON public.feature_votes;
CREATE POLICY "Anyone can view feature votes" ON public.feature_votes
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Authenticated users can vote" ON public.feature_votes;
CREATE POLICY "Authenticated users can vote" ON public.feature_votes
    FOR INSERT WITH CHECK (
        auth.role() = 'authenticated' AND 
        auth.uid() = user_id
    );

DROP POLICY IF EXISTS "Users can update own votes" ON public.feature_votes;
CREATE POLICY "Users can update own votes" ON public.feature_votes
    FOR UPDATE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own votes" ON public.feature_votes;
CREATE POLICY "Users can delete own votes" ON public.feature_votes
    FOR DELETE USING (auth.uid() = user_id);

-- Documentation policies (read-only for users, full access for admins)
DROP POLICY IF EXISTS "Anyone can view published documentation" ON public.documentation;
CREATE POLICY "Anyone can view published documentation" ON public.documentation
    FOR SELECT USING (is_published = true);

DROP POLICY IF EXISTS "Admins can manage documentation" ON public.documentation;
CREATE POLICY "Admins can manage documentation" ON public.documentation
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() 
            AND role IN ('ADMIN', 'SUPER_ADMIN')
        )
    );

-- Doc categories policies
DROP POLICY IF EXISTS "Anyone can view doc categories" ON public.doc_categories;
CREATE POLICY "Anyone can view doc categories" ON public.doc_categories
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins can manage doc categories" ON public.doc_categories;
CREATE POLICY "Admins can manage doc categories" ON public.doc_categories
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() 
            AND role IN ('ADMIN', 'SUPER_ADMIN')
        )
    );

-- =====================================================
-- 5. CREATE FUNCTIONS AND TRIGGERS
-- =====================================================

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
DROP TRIGGER IF EXISTS update_users_updated_at ON public.users;
CREATE TRIGGER update_users_updated_at 
    BEFORE UPDATE ON public.users 
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_feature_requests_updated_at ON public.feature_requests;
CREATE TRIGGER update_feature_requests_updated_at 
    BEFORE UPDATE ON public.feature_requests 
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_documentation_updated_at ON public.documentation;
CREATE TRIGGER update_documentation_updated_at 
    BEFORE UPDATE ON public.documentation 
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_doc_categories_updated_at ON public.doc_categories;
CREATE TRIGGER update_doc_categories_updated_at 
    BEFORE UPDATE ON public.doc_categories 
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.users (id, email, full_name)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email)
    );
    RETURN NEW;
END;
$$ language 'plpgsql' SECURITY DEFINER;

-- Trigger to automatically create user profile on signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =====================================================
-- 6. INSERT SAMPLE DATA
-- =====================================================

-- Insert sample doc categories
INSERT INTO public.doc_categories (name, slug, description, sort_order) VALUES
    ('Getting Started', 'getting-started', 'Basic setup and onboarding guides', 1),
    ('User Management', 'user-management', 'Managing users and permissions', 2),
    ('Workflows', 'workflows', 'Creating and managing workflows', 3),
    ('Integrations', 'integrations', 'Third-party integrations and APIs', 4),
    ('Troubleshooting', 'troubleshooting', 'Common issues and solutions', 5)
ON CONFLICT (slug) DO NOTHING;

-- Insert sample documentation
INSERT INTO public.documentation (title, slug, description, content, category_id, type, difficulty, read_time) VALUES
    (
        'Getting Started with ENBOQ',
        'getting-started-enboq',
        'Learn the basics of ENBOQ and how to set up your first workflow',
        'This guide will walk you through the essential steps to get started with ENBOQ...',
        (SELECT id FROM public.doc_categories WHERE slug = 'getting-started'),
        'guide',
        'Beginner',
        '10 min'
    ),
    (
        'Creating Your First Workflow',
        'creating-first-workflow',
        'Step-by-step tutorial on creating and configuring workflows',
        'Workflows are the heart of ENBOQ. In this tutorial, you will learn...',
        (SELECT id FROM public.doc_categories WHERE slug = 'workflows'),
        'tutorial',
        'Beginner',
        '15 min'
    ),
    (
        'User Permissions and Roles',
        'user-permissions-roles',
        'Understanding and configuring user permissions and role-based access',
        'ENBOQ provides a flexible role-based permission system...',
        (SELECT id FROM public.doc_categories WHERE slug = 'user-management'),
        'guide',
        'Intermediate',
        '12 min'
    )
ON CONFLICT (slug) DO NOTHING;

-- =====================================================
-- 7. GRANT PERMISSIONS
-- =====================================================

-- Grant necessary permissions to authenticated users
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;

-- Grant permissions to anonymous users (for reading public content)
GRANT USAGE ON SCHEMA public TO anon;
GRANT SELECT ON public.documentation TO anon;
GRANT SELECT ON public.doc_categories TO anon;
GRANT SELECT ON public.feature_requests TO anon;
GRANT SELECT ON public.feature_votes TO anon;

-- =====================================================
-- SETUP COMPLETE
-- =====================================================

-- Verify the setup
SELECT 'Database setup completed successfully!' as status;

-- Show table counts
SELECT 
    'users' as table_name, 
    COUNT(*) as record_count 
FROM public.users
UNION ALL
SELECT 
    'doc_categories' as table_name, 
    COUNT(*) as record_count 
FROM public.doc_categories
UNION ALL
SELECT 
    'documentation' as table_name, 
    COUNT(*) as record_count 
FROM public.documentation
UNION ALL
SELECT 
    'feature_requests' as table_name, 
    COUNT(*) as record_count 
FROM public.feature_requests
UNION ALL
SELECT 
    'feature_votes' as table_name, 
    COUNT(*) as record_count 
FROM public.feature_votes;