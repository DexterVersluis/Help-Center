-- Documentation System Migration
-- Run this in your Supabase SQL Editor

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Documentation categories
CREATE TABLE doc_categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Main documentation table
CREATE TABLE documentation (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category_id UUID REFERENCES doc_categories(id),
  type TEXT DEFAULT 'guide' CHECK (type IN ('guide', 'tutorial', 'reference')),
  difficulty TEXT DEFAULT 'Beginner' CHECK (difficulty IN ('Beginner', 'Intermediate', 'Advanced')),
  read_time TEXT NOT NULL,
  has_video BOOLEAN DEFAULT FALSE,
  video_url TEXT,
  rating DECIMAL(2,1) DEFAULT 0.0,
  views INTEGER DEFAULT 0,
  sort_order INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Documentation steps
CREATE TABLE doc_steps (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  doc_id UUID REFERENCES documentation(id) ON DELETE CASCADE,
  step_number INTEGER NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  tips TEXT[], -- Array of tip strings
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(doc_id, step_number)
);

-- Related documents (many-to-many)
CREATE TABLE doc_relations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  doc_id UUID REFERENCES documentation(id) ON DELETE CASCADE,
  related_doc_id UUID REFERENCES documentation(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(doc_id, related_doc_id)
);

-- User feedback
CREATE TABLE doc_feedback (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  doc_id UUID REFERENCES documentation(id) ON DELETE CASCADE,
  is_helpful BOOLEAN NOT NULL,
  feedback_text TEXT,
  user_ip TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_documentation_slug ON documentation(slug);
CREATE INDEX idx_documentation_category ON documentation(category_id);
CREATE INDEX idx_documentation_published ON documentation(is_published);
CREATE INDEX idx_doc_steps_doc_id ON doc_steps(doc_id);
CREATE INDEX idx_doc_steps_step_number ON doc_steps(doc_id, step_number);
CREATE INDEX idx_doc_relations_doc_id ON doc_relations(doc_id);
CREATE INDEX idx_doc_feedback_doc_id ON doc_feedback(doc_id);

-- Enable Row Level Security (RLS)
ALTER TABLE doc_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE documentation ENABLE ROW LEVEL SECURITY;
ALTER TABLE doc_steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE doc_relations ENABLE ROW LEVEL SECURITY;
ALTER TABLE doc_feedback ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Public can read categories" ON doc_categories FOR SELECT USING (true);
CREATE POLICY "Public can read published docs" ON documentation FOR SELECT USING (is_published = true);
CREATE POLICY "Public can read doc steps" ON doc_steps FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM documentation 
    WHERE documentation.id = doc_steps.doc_id 
    AND documentation.is_published = true
  )
);
CREATE POLICY "Public can read doc relations" ON doc_relations FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM documentation 
    WHERE documentation.id = doc_relations.doc_id 
    AND documentation.is_published = true
  )
);

-- Allow anyone to submit feedback
CREATE POLICY "Anyone can submit feedback" ON doc_feedback FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can read feedback stats" ON doc_feedback FOR SELECT USING (true);

-- Insert initial categories
INSERT INTO doc_categories (name, slug, description, sort_order) VALUES
('Getting Started', 'getting-started', 'Essential guides to get you up and running with ENBOQ', 1),
('New Hire Experience', 'new-hire-experience', 'Understanding the employee onboarding journey', 2),
('Platform Features', 'platform-features', 'Detailed guides on ENBOQ platform capabilities', 3),
('Advanced Topics', 'advanced-topics', 'In-depth technical documentation and best practices', 4);

-- Function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers to automatically update updated_at
CREATE TRIGGER update_doc_categories_updated_at BEFORE UPDATE ON doc_categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_documentation_updated_at BEFORE UPDATE ON documentation FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_doc_steps_updated_at BEFORE UPDATE ON doc_steps FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to increment view count
CREATE OR REPLACE FUNCTION increment_doc_views(doc_slug TEXT)
RETURNS void AS $$
BEGIN
    UPDATE documentation 
    SET views = views + 1 
    WHERE slug = doc_slug;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission on the function
GRANT EXECUTE ON FUNCTION increment_doc_views(TEXT) TO anon, authenticated;