import { useCallback } from 'react';
import { DocumentationService } from '../services/documentationService';
import { cacheService } from '../services/cacheService';

export const usePrefetch = () => {
  const prefetchDocument = useCallback((slug) => {
    const cacheKey = cacheService.getCacheKey('document', { slug });
    
    // Only prefetch if not already cached
    if (!cacheService.has(cacheKey)) {
      const fetchFunction = () => DocumentationService.getDocumentBySlug(slug);
      cacheService.addToPrefetchQueue(fetchFunction, cacheKey);
    }
  }, []);

  const prefetchOnHover = useCallback((slug) => {
    return {
      onMouseEnter: () => prefetchDocument(slug),
      onFocus: () => prefetchDocument(slug)
    };
  }, [prefetchDocument]);

  return {
    prefetchDocument,
    prefetchOnHover
  };
};