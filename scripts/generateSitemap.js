import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// ES module compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Mock the DocumentationService for build-time generation
const mockDocumentationService = {
  async getAllDocuments() {
    // In a real scenario, you'd connect to your database here
    // For now, return some sample docs or read from a JSON file
    return {
      data: [
        {
          slug: 'getting-started',
          updated_at: '2024-01-15T10:00:00Z',
          created_at: '2024-01-01T10:00:00Z'
        },
        {
          slug: 'user-management',
          updated_at: '2024-01-20T10:00:00Z',
          created_at: '2024-01-05T10:00:00Z'
        },
        {
          slug: 'gamification-setup',
          updated_at: '2024-01-25T10:00:00Z',
          created_at: '2024-01-10T10:00:00Z'
        }
      ],
      error: null
    };
  }
};

class StaticSitemapGenerator {
  constructor() {
    this.baseUrl = 'https://help.enboq.com';
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
      }
    ];
  }

  async getDocumentationPages() {
    try {
      const { data: docs, error } = await mockDocumentationService.getAllDocuments();
      
      if (error) {
        console.error('Error fetching docs for sitemap:', error);
        return [];
      }

      return (docs || []).map(doc => ({
        url: `/docs/${doc.slug}`,
        lastmod: doc.updated_at || doc.created_at || new Date().toISOString(),
        changefreq: 'weekly',
        priority: '0.8'
      }));
    } catch (error) {
      console.error('Error generating documentation sitemap entries:', error);
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
      
      return true;
    } catch (error) {
      console.error('❌ Error generating sitemap:', error);
      return false;
    }
  }
}

// Generate sitemap when script is run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const generator = new StaticSitemapGenerator();
  const publicDir = path.join(__dirname, '..', 'public');
  const sitemapPath = path.join(publicDir, 'sitemap.xml');
  
  // Ensure public directory exists
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  
  generator.writeSitemapToFile(sitemapPath);
}

export default StaticSitemapGenerator;