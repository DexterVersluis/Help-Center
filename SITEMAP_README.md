# Dynamic Sitemap Implementation

This implementation provides a fully automated, database-driven sitemap.xml that updates based on your documentation content.

## 🚀 Features

- **Dynamic Generation**: Automatically includes all documentation pages from your database
- **Smart Caching**: 1-hour cache for performance with manual refresh capability
- **SEO Optimized**: Proper priorities, change frequencies, and last modified dates
- **Development & Production**: Works in both dev server and production builds
- **Admin Interface**: Built-in management interface for monitoring and control

## 📁 Files Created

```
src/
├── services/
│   └── sitemapService.js          # Core sitemap generation service
├── components/
│   └── SitemapAdmin.jsx           # Admin interface for sitemap management
├── utils/
│   └── sitemapTrigger.js          # Utilities for triggering sitemap refresh
└── plugins/
    └── sitemapPlugin.js           # Vite plugin for dev server (deprecated)

scripts/
└── generateSitemap.js             # Build-time sitemap generation

public/
├── sitemap.xml                    # Generated sitemap file
└── robots.txt                     # Search engine directives
```

## 🔧 How It Works

### Static Pages (Always Included)
- `/` - Homepage (Priority: 1.0, Daily updates)
- `/docs` - Documentation index (Priority: 0.9, Daily updates)
- `/faq` - FAQ page (Priority: 0.8, Weekly updates)
- `/features` - Feature requests (Priority: 0.7, Weekly updates)

### Dynamic Pages (From Database)
- `/docs/{slug}` - All documentation pages
- Priorities based on content type:
  - Getting Started guides: 0.9
  - Regular guides: 0.8
  - Reference docs: 0.7
- Change frequency based on content type
- Last modified dates from database

### Caching Strategy
- **Cache Duration**: 1 hour
- **Cache Key**: In-memory storage
- **Cache Invalidation**: Manual refresh or automatic on content changes

## 🛠️ Usage

### Accessing the Sitemap
- **Production**: `https://help.enboq.com/sitemap.xml`
- **Development**: `http://localhost:5176/sitemap.xml`
- **Stats Endpoint**: `http://localhost:5176/sitemap-stats` (dev only)

### Manual Generation
```bash
# Generate sitemap file
npm run generate-sitemap

# Build with sitemap generation
npm run build
```

### Programmatic Access
```javascript
import sitemapService from './src/services/sitemapService';

// Get sitemap XML
const xml = await sitemapService.generateSitemapXML();

// Get sitemap statistics
const stats = await sitemapService.getSitemapStats();

// Clear cache
sitemapService.clearCache();
```

### Triggering Refresh on Content Changes
```javascript
import { triggerSitemapRefresh } from './src/utils/sitemapTrigger';

// After adding/updating/deleting a document
await triggerSitemapRefresh('update', { slug: 'new-doc' });

// For bulk operations (debounced)
import { debouncedSitemapRefresh } from './src/utils/sitemapTrigger';
debouncedSitemapRefresh(); // Waits 5 seconds before refreshing
```

## 🎛️ Admin Interface

Access the sitemap admin interface by adding the `SitemapAdmin` component to your admin area:

```jsx
import SitemapAdmin from './src/components/SitemapAdmin';

// In your admin dashboard
<SitemapAdmin />
```

Features:
- View sitemap statistics
- Manual cache refresh
- Download sitemap XML
- Real-time status monitoring

## ⚙️ Configuration

### Environment Variables
```env
VITE_SITE_URL=https://help.enboq.com  # Base URL for sitemap
```

### Customization
Edit `src/services/sitemapService.js` to modify:
- Base URL
- Cache duration
- Page priorities
- Change frequencies
- Maximum URLs

### Adding New Static Pages
```javascript
// In sitemapService.js, modify getStaticPages()
getStaticPages() {
  return [
    // ... existing pages
    {
      url: '/new-page',
      lastmod: new Date().toISOString(),
      changefreq: 'weekly',
      priority: '0.6'
    }
  ];
}
```

## 🔍 SEO Benefits

1. **Search Engine Discovery**: Helps search engines find all your documentation
2. **Crawl Efficiency**: Provides last modified dates to optimize crawling
3. **Priority Signals**: Indicates which pages are most important
4. **Fresh Content**: Automatically includes new documentation
5. **Robots.txt Integration**: Properly referenced in robots.txt

## 🚀 Production Deployment

### Build Process
1. `npm run build` automatically generates sitemap
2. Sitemap is placed in `public/sitemap.xml`
3. Served as static file by your web server

### Server Configuration
Ensure your web server serves XML files with correct MIME type:
```nginx
location ~ \.xml$ {
    add_header Content-Type application/xml;
}
```

### Monitoring
- Check `/sitemap-stats` endpoint for health monitoring
- Monitor sitemap file size and URL count
- Set up alerts for sitemap generation failures

## 🐛 Troubleshooting

### Common Issues

**Sitemap not updating**
- Check if cache needs clearing
- Verify database connection
- Check console for errors

**Missing pages**
- Ensure documents have valid slugs
- Check database query results
- Verify URL generation logic

**Performance issues**
- Increase cache duration
- Implement database query optimization
- Consider sitemap index for large sites

### Debug Commands
```bash
# Test sitemap generation
npm run generate-sitemap

# Check sitemap stats (dev server)
curl http://localhost:5176/sitemap-stats

# Validate XML format
curl http://localhost:5176/sitemap.xml | xmllint --format -
```

## 📈 Future Enhancements

- **Sitemap Index**: For sites with >50,000 URLs
- **Image Sitemaps**: Include documentation images
- **Video Sitemaps**: For tutorial videos
- **News Sitemaps**: For time-sensitive content
- **Multilingual**: Support for multiple languages
- **Webhook Integration**: Auto-refresh via webhooks
- **Analytics Integration**: Track sitemap performance

## 🔗 Related Files

- `src/components/SEO.jsx` - SEO meta tags implementation
- `public/robots.txt` - Search engine directives
- `vite.config.js` - Development server configuration
- `package.json` - Build scripts and dependencies