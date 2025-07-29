#!/usr/bin/env node

import { readFileSync } from 'fs';
import { createClient } from '@supabase/supabase-js';

// Load environment variables from .env file
const envContent = readFileSync('.env', 'utf8');
const envVars = {};
envContent.split('\n').forEach(line => {
  if (line.trim() && !line.startsWith('#')) {
    const [key, value] = line.split('=');
    if (key && value) {
      envVars[key.trim()] = value.trim();
    }
  }
});

// Initialize Supabase client
const supabase = createClient(
  envVars.VITE_SUPABASE_URL,
  envVars.VITE_SUPABASE_ANON_KEY
);

// Cache service mock (simplified for Node.js)
const cacheService = {
  getCacheKey: () => 'cache_key',
  get: () => null,
  set: () => {},
  clear: () => {},
  addToPrefetchQueue: () => {}
};

// Simplified DocumentationService for Node.js
class DocumentationService {
  static async getCategories() {
    try {
      const { data, error } = await supabase
        .from('doc_categories')
        .select('*')
        .order('sort_order', { ascending: true });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error fetching categories:', error);
      return { data: null, error };
    }
  }

  static async createDocument(documentData) {
    try {
      const { data: doc, error: docError } = await supabase
        .from('documentation')
        .insert(documentData)
        .select()
        .single();

      if (docError) throw docError;
      return { data: doc, error: null };
    } catch (error) {
      console.error('Error creating document:', error);
      return { data: null, error };
    }
  }

  static async createDocumentSteps(docId, steps) {
    try {
      const stepsWithDocId = steps.map((step, index) => ({
        doc_id: docId,
        step_number: index + 1,
        ...step
      }));

      const { data, error } = await supabase
        .from('doc_steps')
        .insert(stepsWithDocId)
        .select();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error creating document steps:', error);
      return { data: null, error };
    }
  }

  static async createCompleteDocument(documentData, steps) {
    try {
      // Create the document
      const { data: doc, error: docError } = await this.createDocument(documentData);
      if (docError) throw docError;

      // Create the steps
      const { data: createdSteps, error: stepsError } = await this.createDocumentSteps(doc.id, steps);
      if (stepsError) throw stepsError;

      return {
        data: {
          ...doc,
          steps: createdSteps
        },
        error: null
      };
    } catch (error) {
      console.error('Error creating complete document:', error);
      return { data: null, error };
    }
  }
}

// Add document function
async function addDocumentFromXML(xmlData) {
  try {
    // Convert ISO 8601 duration to readable format
    const convertDuration = (isoDuration) => {
      const match = isoDuration.match(/PT(\d+)M/);
      return match ? `${match[1]} min` : '5 min';
    };

    // Create slug from title
    const createSlug = (title) => {
      return title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
    };

    // Convert Loom share URL to embed URL
    const convertLoomUrl = (url) => {
      if (!url) return null;
      // Convert https://www.loom.com/share/VIDEO_ID to https://www.loom.com/embed/VIDEO_ID
      const shareMatch = url.match(/loom\.com\/share\/([a-zA-Z0-9]+)/);
      if (shareMatch) {
        return `https://www.loom.com/embed/${shareMatch[1]}`;
      }
      return url; // Return as-is if already embed format or different format
    };

    // Get category ID
    const { data: categories } = await DocumentationService.getCategories();
    const category = categories?.find(cat => 
      cat.name === xmlData.category || cat.slug === xmlData.category
    );

    if (!category) {
      throw new Error(`Category "${xmlData.category}" not found`);
    }

    // Prepare document data
    const documentData = {
      slug: createSlug(xmlData.title),
      title: xmlData.title,
      description: xmlData.description,
      category_id: category.id,
      type: 'guide',
      difficulty: 'Beginner',
      read_time: convertDuration(xmlData.estimatedTime),
      has_video: !!xmlData.videoUrl,
      video_url: convertLoomUrl(xmlData.videoUrl),
      rating: 4.5,
      views: 0,
      sort_order: 999,
      is_published: true
    };

    // Prepare steps data
    const steps = xmlData.steps.map((step, index) => ({
      step_number: index + 1,
      title: step.name.replace(/^Step \d+:\s*/, ''),
      content: step.description,
      tips: step.tips || [],
      image_url: step.image_url || null,
      image_alt: step.image_alt || null
    }));

    // Create the document
    const result = await DocumentationService.createCompleteDocument(documentData, steps);
    
    if (result.error) {
      throw result.error;
    }

    console.log('✅ Document created successfully:', result.data);
    return result.data;

  } catch (error) {
    console.error('❌ Error creating document:', error);
    throw error;
  }
}

// Main execution
const xmlData = {
  title: 'How to Customize the ENBOQ Admin Dashboard for Real-Time Onboarding Insights',
  description: 'Configure your ENBOQ admin dashboard to display live onboarding data tailored to your HR needs. With real-time widgets like employee journey tracking, NPS scores, onboarding task approvals, and upcoming events, this dashboard gives you full visibility into your onboarding program at a glance.',
  estimatedTime: 'PT10M',
  videoUrl: 'https://www.loom.com/share/8bac109ff58a4c46ad942818bf4fcdce',
  category: 'New Hire Experience',
  steps: [
    {
      name: 'Step 1: Access the Admin Dashboard',
      description: 'Log into your ENBOQ admin account and open the Dashboard tab. Here, you can configure visual widgets that provide real-time onboarding analytics for new hires.'
    },
    {
      name: 'Step 2: Review Available Widgets',
      description: 'The dashboard includes a variety of widgets: Employee Pathway (Track progress across onboarding steps), Net Promoter Score (NPS) (View satisfaction trends based on in-journey questions), Daily Missions (Monitor participation in optional cultural tasks), Upcoming Events (Access your onboarding calendar at a glance), Question Insights (Analyze survey and quiz responses in real time), Action Hub (View and complete admin tasks like document approval or goal review), Onboarding Monitor (Filter new hires by status - on track, behind schedule).'
    },
    {
      name: 'Step 3: Add or Rearrange Widgets',
      description: 'Scroll to the bottom of the dashboard and click "+ Widget". Choose widgets you want to include and drag them into the order you prefer. You can create a second dashboard page if needed.'
    },
    {
      name: 'Step 4: Personalize Dashboard Priorities',
      description: 'Drag and drop your highest-priority widgets (e.g., NPS score or Action Hub) to the top for instant visibility. Click "Save" to lock in your personalized layout.'
    },
    {
      name: 'Step 5: Interact with Widget Data',
      description: 'Most widgets are interactive. For example: Click a new hire in the Employee Pathway to open their full profile, Click a mission to see timestamps and completions, Click an Action Hub item to review documents or approve goals instantly.'
    },
    {
      name: 'Step 6: Use the Onboarding Monitor to Detect Issues',
      description: 'Filter employees by "On Schedule", "Almost Behind", or "Behind Schedule". Use this insight to proactively support employees who may be falling behind in their onboarding journey.'
    },
    {
      name: 'Step 7: Monitor Question Responses in Real Time',
      description: 'View charts of how employees answer onboarding questions. This includes multiple-choice percentages, rating scales (like NPS), and written responses—all aggregated live.'
    },
    {
      name: 'Step 8: Optimize Based on Live Feedback',
      description: 'Use real-time insights to improve onboarding journeys. For example, low NPS scores or skipped tasks may indicate poor engagement, allowing you to intervene or revise the journey immediately.'
    }
  ]
};

console.log('🚀 Adding document to database...');
addDocumentFromXML(xmlData)
  .then(result => {
    console.log('✅ Document added successfully!');
    console.log('📝 Slug:', result.slug);
    console.log('📋 Title:', result.title);
    console.log('🆔 ID:', result.id);
    console.log('📊 Steps added:', result.steps?.length || 0);
  })
  .catch(error => {
    console.error('❌ Error adding document:', error.message);
    process.exit(1);
  });