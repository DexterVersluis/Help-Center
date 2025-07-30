import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// ES module compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Supabase client for build-time generation
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase environment variables');
  console.error('Make sure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set in .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

class BuildTimeSitemapGenerator {
  constructor() {
    this.baseUrl = process.env.VITE_SITE_URL || 'https://help.enboq.com';
  }

  getStaticPages() {
    return [
      {
        url: '/',
        lastmod: new Date().toISOString(),
        changefreq: 'daily',
        priority: '1.0'
      },
      {
        url: '/docs',
        lastmod: new Date().toISOString(),
        changefreq: 'daily',
        priority: '0.9'
      },
      {
        url: '/faq',
        lastmod: new Date().toISOString(),
        changefreq: 'weekly',
        priority: '0.8'
      },
      {
        url: '/features',
        lastmod: new Date().toISOString(),
        changefreq: 'weekly',
        priority: '0.7'
      },
      {
        url: '/roadmap',
        lastmod: new Date().toISOString(),
        changefreq: 'weekly',
        priority: '0.8'
      }
    ];
  }

  async getDocumentationPages() {
    try {
      console.log('🔍 Fetching documentation from database...');
      
      // Query the documentation table directly
      const { data: docs, error } = await supabase
        .from('documentation')
        .select(`
          slug,
          title,
          description,
          type,
          difficulty,
          created_at,
          updated_at,
          category:doc_categories(name, slug)
        `)
        .eq('is_published', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('❌ Database error:', error);
        return [];
      }

      if (!docs || docs.length === 0) {
        console.warn('⚠️ No documentation found in database');
        return [];
      }

      console.log(`📚 Found ${docs.length} documentation entries`);

      // Filter and process docs
      const validDocs = docs
        .filter(doc => doc.slug && doc.slug.trim())
        .map(doc => {
          // Determine priority based on doc properties
          let priority = '0.8';
          if (doc.category?.name?.toLowerCase().includes('getting started')) {
            priority = '0.9';
          } else if (doc.type === 'guide') {
            priority = '0.8';
          } else if (doc.type === 'reference') {
            priority = '0.7';
          }

          // Determine change frequency
          let changefreq = 'weekly';
          if (doc.type === 'guide' || doc.category?.name?.toLowerCase().includes('getting started')) {
            changefreq = 'monthly';
          }

          return {
            url: `/docs/${doc.slug}`,
            lastmod: doc.updated_at || doc.created_at || new Date().toISOString(),
            changefreq,
            priority
          };
        });

      console.log(`✅ Processed ${validDocs.length} valid documentation pages`);
      return validDocs;

    } catch (error) {
      console.error('❌ Error fetching documentation:', error);
      return [];
    }
  }

  async generateSitemapData() {
    const staticPages = this.getStaticPages();
    const docPages = await this.getDocumentationPages();
    return [...staticPages, ...docPages];
  }

  escapeXml(unsafe) {
    return unsafe.replace(/[<>&'"]/g, (c) => {
      switch (c) {
        case '<': return '&lt;';
        case '>': return '&gt;';
        case '&': return '&amp;';
        case '\'': return '&apos;';
        case '"': return '&quot;';
        default: return c;
      }
    });
  }

  async generateSitemapXML() {
    const pages = await this.generateSitemapData();
    
    const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>';
    const urlsetOpen = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
    const urlsetClose = '</urlset>';
    
    const urls = pages.map(page => {
      const fullUrl = `${this.baseUrl}${page.url}`;
      return `
  <url>
    <loc>${this.escapeXml(fullUrl)}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
    }).join('');
    
    return `${xmlHeader}
${urlsetOpen}${urls}
${urlsetClose}`;
  }

  async writeSitemapToFile(outputPath) {
    try {
      const xml = await this.generateSitemapXML();
      fs.writeFileSync(outputPath, xml, 'utf8');
      console.log(`✅ Sitemap generated successfully at ${outputPath}`);
      
      const pages = await this.generateSitemapData();
      console.log(`📄 Generated ${pages.length} pages in sitemap`);
      
      // Log breakdown
      const staticCount = this.getStaticPages().length;
      const docCount = pages.length - staticCount;
      console.log(`   - ${staticCount} static pages`);
      console.log(`   - ${docCount} documentation pages`);
      
      return true;
    } catch (error) {
      console.error('❌ Error generating sitemap:', error);
      return false;
    }
  }
}

// Generate sitemap when script is run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const generator = new BuildTimeSitemapGenerator();
  const publicDir = path.join(__dirname, '..', 'public');
  const sitemapPath = path.join(publicDir, 'sitemap.xml');
  
  // Ensure public directory exists
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  
  generator.writeSitemapToFile(sitemapPath);
}

export default BuildTimeSitemapGenerator;