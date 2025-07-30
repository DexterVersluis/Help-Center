import sitemapService from '../services/sitemapService.js';

export function sitemapPlugin() {
  return {
    name: 'sitemap-plugin',
    configureServer(server) {
      server.middlewares.use('/sitemap.xml', async (req, res, next) => {
        try {
          const xml = await sitemapService.generateSitemapXML();
          
          res.setHeader('Content-Type', 'application/xml');
          res.setHeader('Cache-Control', 'public, max-age=3600'); // Cache for 1 hour
          res.end(xml);
        } catch (error) {
          console.error('Error generating sitemap:', error);
          res.statusCode = 500;
          res.end('Error generating sitemap');
        }
      });

      // Also add a debug endpoint to see sitemap stats
      server.middlewares.use('/sitemap-stats', async (req, res, next) => {
        try {
          const stats = await sitemapService.getSitemapStats();
          
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(stats, null, 2));
        } catch (error) {
          console.error('Error getting sitemap stats:', error);
          res.statusCode = 500;
          res.end('Error getting sitemap stats');
        }
      });
    }
  };
}