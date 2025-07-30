import { DocumentationService } from './documentationService';

// Configuration
const SITEMAP_CONFIG = {
  baseUrl: process.env.VITE_SITE_URL || 'https://help.enboq.com',
  cacheDuration: 1000 * 60 * 60, // 1 hour
  maxUrls: 50000, // Sitemap limit
};

class SitemapService {
  constructor() {
    this.baseUrl = SITEMAP_CONFIG.baseUrl;
    this.cache = null;
    this.cacheExpiry = null;
    this.cacheDuration = SITEMAP_CONFIG.cacheDuration;
  }

  // Static pages that should always be included
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

  // Get dynamic documentation pages from database
  async getDocumentationPages() {
    try {
      const { data: docs, error } = await DocumentationService.getAllDocuments();
      
      if (error) {
        console.error('Error fetching docs for sitemap:', error);
        return [];
      }

      // Filter and limit docs for sitemap
      const validDocs = (docs || [])
        .filter(doc => doc.slug && doc.slug.trim() && doc.is_published) // Only include published docs with valid slugs
        .slice(0, SITEMAP_CONFIG.maxUrls - 10); // Reserve space for static pages

      return validDocs.map(doc => {
        // Determine priority based on doc properties
        let priority = '0.8';
        const categoryName = doc.category?.name?.toLowerCase() || '';
        const docTitle = doc.title?.toLowerCase() || '';
        
        if (categoryName.includes('getting started') || docTitle.includes('getting started')) {
          priority = '0.9';
        } else if (doc.type === 'guide') {
          priority = '0.8';
        } else if (doc.type === 'reference') {
          priority = '0.7';
        }

        // Determine change frequency based on doc type
        let changefreq = 'weekly';
        if (doc.type === 'guide' || categoryName.includes('getting started') || docTitle.includes('getting started')) {
          changefreq = 'monthly';
        } else if (doc.type === 'reference') {
          changefreq = 'weekly';
        }

        return {
          url: `/docs/${doc.slug}`,
          lastmod: doc.updated_at || doc.created_at || new Date().toISOString(),
          changefreq,
          priority
        };
      });
    } catch (error) {
      console.error('Error generating documentation sitemap entries:', error);
      return [];
    }
  }

  // Generate complete sitemap data
  async generateSitemapData() {
    // Check cache first
    if (this.cache && this.cacheExpiry && Date.now() < this.cacheExpiry) {
      return this.cache;
    }

    try {
      const staticPages = this.getStaticPages();
      const docPages = await this.getDocumentationPages();
      
      const allPages = [...staticPages, ...docPages];
      
      // Cache the result
      this.cache = allPages;
      this.cacheExpiry = Date.now() + this.cacheDuration;
      
      return allPages;
    } catch (error) {
      console.error('Error generating sitemap data:', error);
      // Return static pages as fallback
      return this.getStaticPages();
    }
  }

  // Generate XML sitemap
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

  // Escape XML special characters
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

  // Clear cache manually if needed
  clearCache() {
    this.cache = null;
    this.cacheExpiry = null;
  }

  // Get sitemap stats for debugging
  async getSitemapStats() {
    const pages = await this.generateSitemapData();
    const staticCount = this.getStaticPages().length;
    const docCount = pages.length - staticCount;
    
    return {
      totalPages: pages.length,
      staticPages: staticCount,
      documentationPages: docCount,
      lastGenerated: new Date().toISOString(),
      cacheExpiry: this.cacheExpiry ? new Date(this.cacheExpiry).toISOString() : null
    };
  }
}

// Export singleton instance
export const sitemapService = new SitemapService();
export default sitemapService;