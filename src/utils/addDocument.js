import { DocumentationService } from '../services/documentationService.js';

/**
 * Helper function to add a new document from XML data
 * Usage example:
 * 
 * const xmlData = {
 *   title: "Document Title",
 *   description: "Document description",
 *   estimatedTime: "PT7M", // ISO 8601 duration
 *   videoUrl: "https://loom.com/share/...",
 *   category: "New Hire Experience", // or category slug
 *   steps: [
 *     {
 *       name: "Step 1: Title",
 *       description: "Step description...",
 *       image_url: "/assets/step1.jpg", // optional
 *       image_alt: "Step 1 screenshot", // optional
 *       tips: ["Tip 1", "Tip 2"] // optional
 *     }
 *   ]
 * };
 * 
 * addDocumentFromXML(xmlData);
 */

export async function addDocumentFromXML(xmlData) {
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
      video_url: xmlData.videoUrl || null,
      rating: 4.5,
      views: 0,
      sort_order: 999, // Will be at the end initially
      is_published: true
    };

    // Prepare steps data
    const steps = xmlData.steps.map((step, index) => ({
      step_number: index + 1,
      title: step.name.replace(/^Step \d+:\s*/, ''), // Remove "Step X:" prefix
      content: step.description,
      tips: step.tips || [], // Add tips if provided
      image_url: step.image_url || null, // Add image support
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

/**
 * Helper to add document relations
 */
export async function addDocumentRelations(docSlug, relatedSlugs) {
  try {
    // This would require additional Supabase functions
    // For now, you can add relations manually in the database
    console.log(`Add relations for ${docSlug} to:`, relatedSlugs);
  } catch (error) {
    console.error('Error adding relations:', error);
  }
}

// Example usage (uncomment to test):
/*
const exampleXML = {
  title: "What the New Hire Onboarding Flow Looks Like",
  description: "Explore the full onboarding experience through the eyes of a new hire...",
  estimatedTime: "PT7M",
  videoUrl: "https://www.loom.com/embed/b53be8e8b2434b8a9b6b64001c6af4c2",
  category: "New Hire Experience",
  steps: [
    {
      name: "Step 1: Receive the Onboarding Invite Email",
      description: "New hires receive an automated email with all essential onboarding details..."
    }
    // ... more steps
  ]
};

// addDocumentFromXML(exampleXML);
*/