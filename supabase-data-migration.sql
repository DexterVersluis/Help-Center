-- Data Migration: Insert existing documentation
-- Run this AFTER the schema migration

-- Insert existing documents
DO $$
DECLARE
    getting_started_cat_id UUID;
    new_hire_cat_id UUID;
    getting_started_doc_id UUID;
    platform_demo_doc_id UUID;
    new_hire_flow_doc_id UUID;
BEGIN
    -- Get category IDs
    SELECT id INTO getting_started_cat_id FROM doc_categories WHERE slug = 'getting-started';
    SELECT id INTO new_hire_cat_id FROM doc_categories WHERE slug = 'new-hire-experience';

    -- Insert Getting Started with ENBOQ
    INSERT INTO documentation (
        slug, title, description, category_id, type, difficulty, read_time, 
        has_video, video_url, rating, views, sort_order
    ) VALUES (
        'getting-started-with-enboq',
        'Getting Started with ENBOQ',
        'Complete guide to setting up your first project and understanding the basics',
        getting_started_cat_id,
        'guide',
        'Beginner',
        '5 min',
        true,
        'https://example.com/video1',
        4.8,
        1250,
        1
    ) RETURNING id INTO getting_started_doc_id;

    -- Insert steps for Getting Started
    INSERT INTO doc_steps (doc_id, step_number, title, content, tips) VALUES
    (getting_started_doc_id, 1, 'Create Your Account', 
     'Start by signing up for a new ENBOQ account. Visit our homepage and click the "Sign Up" button in the top right corner. Fill in your email address, create a secure password, and verify your email.',
     ARRAY['Use a strong password with at least 8 characters', 'Check your spam folder for the verification email']),
    
    (getting_started_doc_id, 2, 'Complete Your Profile',
     'Once logged in, complete your profile by adding your name, company information, and profile picture. This helps your team members identify you in collaborative projects.',
     ARRAY['Upload a professional profile picture', 'Add your job title for better team collaboration']),
    
    (getting_started_doc_id, 3, 'Explore the Dashboard',
     'Take a moment to familiarize yourself with the main dashboard. You''ll see navigation menus, recent projects, and quick action buttons. The sidebar contains all major features.',
     ARRAY['Bookmark important pages for quick access', 'Customize your dashboard layout in settings']),
    
    (getting_started_doc_id, 4, 'Create Your First Project',
     'Click the "New Project" button to create your first project. Choose a template that matches your needs, give it a descriptive name, and set up basic project settings.',
     ARRAY['Choose templates carefully as they affect available features', 'Project names should be descriptive and unique']),
    
    (getting_started_doc_id, 5, 'Invite Team Members',
     'Add team members to your project by going to Project Settings > Team. Enter their email addresses and assign appropriate roles (Admin, Editor, or Viewer).',
     ARRAY['Start with fewer permissions and upgrade as needed', 'Send a welcome message with project context']),
    
    (getting_started_doc_id, 6, 'Start Building',
     'Now you''re ready to start using ENBOQ! Explore the various tools and features available in your project. Don''t hesitate to check out our other documentation for specific features.',
     ARRAY['Take advantage of keyboard shortcuts for efficiency', 'Save your work frequently using Ctrl+S']);

    -- Insert Full ENBOQ Platform Demo
    INSERT INTO documentation (
        slug, title, description, category_id, type, difficulty, read_time, 
        has_video, video_url, rating, views, sort_order
    ) VALUES (
        'onboarding-platform-demo-enboq',
        'Full ENBOQ Platform Demo',
        'Comprehensive walkthrough of the ENBOQ platform features and capabilities, showcasing how to create engaging onboarding experiences',
        getting_started_cat_id,
        'guide',
        'Beginner',
        '10 min',
        true,
        'https://www.loom.com/embed/3faa8ae6cc5b46a59a51b69bfdaf4107?sid=732a61fa-e83c-4662-ba52-51b1fb3a0034',
        4.9,
        1250,
        2
    ) RETURNING id INTO platform_demo_doc_id;

    -- Insert New Hire Onboarding Flow
    INSERT INTO documentation (
        slug, title, description, category_id, type, difficulty, read_time, 
        has_video, video_url, rating, views, sort_order
    ) VALUES (
        'new-hire-onboarding-flow',
        'What the New Hire Onboarding Flow Looks Like',
        'Explore the full onboarding experience through the eyes of a new hire. This step-by-step guide walks you through the new hire flow—from receiving the onboarding invite email to accessing a personalized onboarding dashboard. Learn how employees complete tasks, engage with interactive content, and access knowledge tools within a fully branded and mobile-ready onboarding platform.',
        new_hire_cat_id,
        'guide',
        'Beginner',
        '7 min',
        true,
        'https://www.loom.com/embed/b53be8e8b2434b8a9b6b64001c6af4c2?sid=732a61fa-e83c-4662-ba52-51b1fb3a0034',
        4.7,
        890,
        1
    ) RETURNING id INTO new_hire_flow_doc_id;

    -- Insert steps for New Hire Onboarding Flow
    INSERT INTO doc_steps (doc_id, step_number, title, content, tips) VALUES
    (new_hire_flow_doc_id, 1, 'Receive the Onboarding Invite Email',
     'New hires receive an automated email with all essential onboarding details, including platform URL, login credentials, and scheduled onboarding events. This marks the start of the digital onboarding experience.',
     ARRAY['Check your spam folder if you don''t receive the invite within 24 hours', 'Save the login credentials in a secure location for easy access']),
    
    (new_hire_flow_doc_id, 2, 'Log Into the New Hire Portal',
     'Upon logging in, the platform auto-detects the user''s preferred language based on browser settings. The system adjusts accordingly, ensuring a seamless multilingual onboarding experience.',
     ARRAY['Use a modern browser for the best experience', 'Clear your browser cache if you encounter any loading issues']),
    
    (new_hire_flow_doc_id, 3, 'Complete the Welcome Setup',
     'New hires upload a profile photo and provide basic information like birth year and mobile number. This information personalizes communications with buddies, managers, and other team members.',
     ARRAY['Upload a professional profile photo for better team recognition', 'Ensure your contact information is accurate for important notifications']),
    
    (new_hire_flow_doc_id, 4, 'Access the Personalized Onboarding Dashboard',
     'After setup, new hires land on their main onboarding dashboard. This is a centralized view of all upcoming tasks, activities, events, and communications across the preboarding and onboarding timeline.',
     ARRAY['Bookmark the dashboard URL for quick access', 'Check the dashboard daily for new tasks and updates']),
    
    (new_hire_flow_doc_id, 5, 'Complete Daily Missions and Earn XP',
     'The onboarding platform gamifies the experience by showing "Today''s Mission" and awarding XP (experience points) for completed tasks. For example: uploading signed documents or completing a survey.',
     ARRAY['Complete tasks promptly to stay on track with your onboarding timeline', 'XP points help track your progress and engagement']),
    
    (new_hire_flow_doc_id, 6, 'Engage with Stories and Quizzes',
     'New hires interact with onboarding stories (e.g., "Helping the President") and quizzes designed to introduce company values, culture, and key contacts. These activities unlock access to next steps like meetings or document submissions.',
     ARRAY['Take your time to read through company stories carefully', 'Don''t worry about quiz scores - they''re designed to help you learn']),
    
    (new_hire_flow_doc_id, 7, 'Submit Interactive Surveys and Forms',
     'Employees answer personalized questions such as favorite dishes or ideal workdays. Responses are sent to relevant departments like the canteen or HR to personalize the employee''s first days.',
     ARRAY['Be honest in your responses to get the most personalized experience', 'These surveys help the company better support your needs']),
    
    (new_hire_flow_doc_id, 8, 'Use AI-Powered Search and Chat',
     'The dashboard includes a knowledge search feature, allowing new hires to ask onboarding-related questions. AI responds with company-specific answers based on internal documents and training materials.',
     ARRAY['Try asking specific questions about company policies or procedures', 'The AI learns from company documents, so answers are tailored to your organization']),
    
    (new_hire_flow_doc_id, 9, 'Access the Mobile Onboarding Experience',
     'The onboarding flow is fully responsive and mobile-friendly. New hires can log in via smartphone, access tasks, scan QR codes, and even install a branded app for easier access.',
     ARRAY['Download the company app if available for push notifications', 'Mobile access allows you to complete tasks on-the-go']),
    
    (new_hire_flow_doc_id, 10, 'Stay Supported Throughout the Journey',
     'Support is always accessible through the integrated help center or via email. The platform ensures every new hire has what they need to start strong and feel welcome from day one.',
     ARRAY['Don''t hesitate to reach out for help if you get stuck', 'Support teams are there to ensure your success']);

    -- Create document relationships
    INSERT INTO doc_relations (doc_id, related_doc_id) VALUES
    (getting_started_doc_id, platform_demo_doc_id),
    (getting_started_doc_id, new_hire_flow_doc_id),
    (platform_demo_doc_id, getting_started_doc_id),
    (platform_demo_doc_id, new_hire_flow_doc_id),
    (new_hire_flow_doc_id, getting_started_doc_id),
    (new_hire_flow_doc_id, platform_demo_doc_id);

END $$;