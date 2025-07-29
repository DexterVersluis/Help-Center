/**
 * Browser Console Script to Add Documents
 * 
 * Instructions:
 * 1. Open your ENBOQ Help application in the browser
 * 2. Make sure you're logged in as an admin
 * 3. Open browser developer tools (F12)
 * 4. Go to Console tab
 * 5. Copy and paste this entire script
 * 6. Call addNewDocument() with your data
 */

// Function to add document using existing browser context
async function addNewDocument(title, loomUrl, steps, category = "New Hire Experience") {
  try {
    console.log(`📝 Adding document: "${title}"`);
    
    // Import the existing addDocument function from the app
    const { addDocumentFromXML } = await import('./src/utils/addDocument.js');
    
    const xmlData = {
      title: title,
      description: `Learn how to ${title.toLowerCase()} with this step-by-step guide.`,
      estimatedTime: "PT10M", // 10 minutes as specified
      videoUrl: loomUrl,
      category: category,
      steps: steps
    };

    const result = await addDocumentFromXML(xmlData);
    console.log(`✅ Successfully added document with slug: ${result.slug}`);
    console.log(`🆔 Document ID: ${result.id}`);
    console.log(`📊 Steps added: ${result.steps?.length || 0}`);
    
    return result;
    
  } catch (error) {
    console.error(`❌ Failed to add document "${title}":`, error);
    throw error;
  }
}

// Admin Dashboard Document Data
const adminDashboardSteps = [
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
];

// Ready to execute - uncomment the line below to add the document
console.log('🚀 Browser script loaded. Execute the following command to add the admin dashboard document:');
console.log('addNewDocument("How to Customize the ENBOQ Admin Dashboard for Real-Time Onboarding Insights", "https://www.loom.com/share/8bac109ff58a4c46ad942818bf4fcdce", adminDashboardSteps);');

// Auto-execute (uncomment to run immediately)
// addNewDocument("How to Customize the ENBOQ Admin Dashboard for Real-Time Onboarding Insights", "https://www.loom.com/share/8bac109ff58a4c46ad942818bf4fcdce", adminDashboardSteps);