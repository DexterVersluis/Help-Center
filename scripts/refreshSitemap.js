#!/usr/bin/env node

// Simple script to refresh sitemap during development
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

console.log('🔄 Refreshing sitemap...');

try {
  const { stdout, stderr } = await execAsync('npm run generate-sitemap');
  
  if (stderr && !stderr.includes('dotenv')) {
    console.error('❌ Error:', stderr);
  } else {
    console.log('✅ Sitemap refreshed successfully!');
    console.log('🌐 View at: http://localhost:5173/sitemap.xml');
    console.log('📊 Stats at: http://localhost:5173/sitemap-stats');
  }
} catch (error) {
  console.error('❌ Failed to refresh sitemap:', error.message);
}