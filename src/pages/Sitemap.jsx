import { useEffect, useState } from 'react';
import sitemapService from '../services/sitemapService';

const Sitemap = () => {
  const [sitemapXML, setSitemapXML] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const generateSitemap = async () => {
      try {
        const xml = await sitemapService.generateSitemapXML();
        setSitemapXML(xml);
        
        // Set the content type to XML
        document.contentType = 'application/xml';
        
        // Replace the entire document with the XML
        document.open();
        document.write(xml);
        document.close();
      } catch (error) {
        console.error('Error generating sitemap:', error);
        // Fallback XML
        const fallbackXML = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://help.enboq.com/</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`;
        document.open();
        document.write(fallbackXML);
        document.close();
      } finally {
        setLoading(false);
      }
    };

    generateSitemap();
  }, []);

  if (loading) {
    return <div>Generating sitemap...</div>;
  }

  // This component won't actually render since we replace the document
  return null;
};

export default Sitemap;