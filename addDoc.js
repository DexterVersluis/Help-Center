#!/usr/bin/env node

/**
 * Quick Document Import Script
 * 
 * Usage: node addDoc.js
 * 
 * This script allows you to quickly add documents to the database
 * by providing a Loom video URL and XML steps data.
 */

import { addDocumentFromXML } from './src/utils/addDocument.js';

// Function to add a document with Loom URL and XML data
export async function addNewDoc(title, loomUrl, xmlSteps, category = "New Hire Experience") {
  try {
    console.log(`\n📝 Adding document: "${title}"`);
    console.log(`🎥 Video URL: ${loomUrl}`);
    console.log(`📂 Category: ${category}`);
    console.log(`📋 Steps: ${xmlSteps.length} steps`);
    
    const xmlData = {
      title: title,
      description: `Learn how to ${title.toLowerCase()} with this step-by-step guide.`,
      estimatedTime: "PT5M", // Default 5 minutes, adjust as needed
      videoUrl: loomUrl,
      category: category,
      steps: xmlSteps
    };

    const result = await addDocumentFromXML(xmlData);
    console.log(`✅ Successfully added document with slug: ${result.slug}`);
    return result;
    
  } catch (error) {
    console.error(`❌ Failed to add document "${title}":`, error.message);
    throw error;
  }
}

// Example usage - uncomment and modify to test
/*
const exampleSteps = [
  {
    name: "Step 1: Open the application",
    description: "Navigate to the main application dashboard and locate the settings menu.",
    tips: ["Make sure you're logged in", "Check your permissions"]
  },
  {
    name: "Step 2: Configure settings",
    description: "Adjust the necessary settings according to your requirements.",
    image_url: "/assets/settings.jpg",
    image_alt: "Settings page screenshot"
  }
];

// addNewDoc(
//   "How to Configure Application Settings",
//   "https://www.loom.com/embed/your-video-id",
//   exampleSteps,
//   "New Hire Experience"
// );
*/

console.log('📚 Document import script loaded. Use addNewDoc() function to add documents.');