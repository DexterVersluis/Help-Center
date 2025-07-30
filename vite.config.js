import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

// Sitemap plugin that serves the static file in dev
function sitemapPlugin() {
  return {
    name: 'sitemap-plugin',
    configureServer(server) {
      server.middlewares.use('/sitemap.xml', (req, res, next) => {
        try {
          const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
          
          if (fs.existsSync(sitemapPath)) {
            const xml = fs.readFileSync(sitemapPath, 'utf8');
            res.setHeader('Content-Type', 'application/xml');
            res.setHeader('Cache-Control', 'public, max-age=3600');
            res.end(xml);
          } else {
            // Fallback sitemap if file doesn't exist
            const fallbackXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://help.enboq.com/</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://help.enboq.com/docs</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://help.enboq.com/faq</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://help.enboq.com/features</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>`;
            res.setHeader('Content-Type', 'application/xml');
            res.end(fallbackXml);
          }
        } catch (error) {
          console.error('Error serving sitemap:', error);
          res.statusCode = 500;
          res.end('Error serving sitemap');
        }
      });

      server.middlewares.use('/sitemap-stats', (req, res, next) => {
        try {
          const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
          
          if (fs.existsSync(sitemapPath)) {
            const xml = fs.readFileSync(sitemapPath, 'utf8');
            const urlCount = (xml.match(/<url>/g) || []).length;
            const lastGenerated = fs.statSync(sitemapPath).mtime.toISOString();
            
            const stats = {
              totalPages: urlCount,
              staticPages: 4,
              documentationPages: urlCount - 4,
              lastGenerated,
              fileSize: fs.statSync(sitemapPath).size,
              filePath: sitemapPath
            };
            
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(stats, null, 2));
          } else {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({
              error: 'Sitemap file not found',
              message: 'Run "npm run generate-sitemap" to create the sitemap file'
            }, null, 2));
          }
        } catch (error) {
          console.error('Error getting sitemap stats:', error);
          res.statusCode = 500;
          res.end('Error getting sitemap stats');
        }
      });
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), sitemapPlugin()],
})
