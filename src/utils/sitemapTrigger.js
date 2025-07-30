import sitemapService from '../services/sitemapService';

/**
 * Utility functions to trigger sitemap regeneration when content changes
 */

// Function to call when documents are added, updated, or deleted
export const triggerSitemapRefresh = async (action = 'update', docData = null) => {
  try {
    console.log(`Triggering sitemap refresh due to ${action}`, docData?.slug || '');
    
    // Clear the cache to force regeneration
    sitemapService.clearCache();
    
    // Pre-generate the sitemap in the background
    await sitemapService.generateSitemapXML();
    
    console.log('Sitemap refreshed successfully');
    return true;
  } catch (error) {
    console.error('Error refreshing sitemap:', error);
    return false;
  }
};

// Hook this into your document service operations
export const withSitemapRefresh = (originalFunction) => {
  return async (...args) => {
    try {
      // Execute the original function
      const result = await originalFunction(...args);
      
      // If successful, trigger sitemap refresh
      if (result && !result.error) {
        // Don't await this to avoid slowing down the original operation
        triggerSitemapRefresh('update').catch(console.error);
      }
      
      return result;
    } catch (error) {
      throw error;
    }
  };
};

// Debounced version for bulk operations
let refreshTimeout = null;
export const debouncedSitemapRefresh = (delay = 5000) => {
  if (refreshTimeout) {
    clearTimeout(refreshTimeout);
  }
  
  refreshTimeout = setTimeout(() => {
    triggerSitemapRefresh('bulk_update').catch(console.error);
  }, delay);
};

export default {
  triggerSitemapRefresh,
  withSitemapRefresh,
  debouncedSitemapRefresh
};