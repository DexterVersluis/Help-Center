// Smart caching and prefetching service
class CacheService {
  constructor() {
    this.cache = new Map();
    this.prefetchQueue = new Set();
    this.isOnline = navigator.onLine;
    
    // Listen for online/offline events
    window.addEventListener('online', () => {
      this.isOnline = true;
      this.processPrefetchQueue();
    });
    
    window.addEventListener('offline', () => {
      this.isOnline = false;
    });
  }

  // Generate cache key
  getCacheKey(type, params = {}) {
    const sortedParams = Object.keys(params)
      .sort()
      .reduce((result, key) => {
        result[key] = params[key];
        return result;
      }, {});
    
    return `${type}:${JSON.stringify(sortedParams)}`;
  }

  // Set cache with TTL (time to live)
  set(key, data, ttl = 5 * 60 * 1000) { // 5 minutes default
    const expiresAt = Date.now() + ttl;
    this.cache.set(key, {
      data,
      expiresAt,
      createdAt: Date.now()
    });
  }

  // Get from cache
  get(key) {
    const cached = this.cache.get(key);
    
    if (!cached) return null;
    
    // Check if expired
    if (Date.now() > cached.expiresAt) {
      this.cache.delete(key);
      return null;
    }
    
    return cached.data;
  }

  // Check if data exists and is fresh
  has(key, maxAge = 30 * 1000) { // 30 seconds freshness
    const cached = this.cache.get(key);
    
    if (!cached) return false;
    
    const age = Date.now() - cached.createdAt;
    return age < maxAge;
  }

  // Clear expired entries
  cleanup() {
    const now = Date.now();
    for (const [key, value] of this.cache.entries()) {
      if (now > value.expiresAt) {
        this.cache.delete(key);
      }
    }
  }

  // Add to prefetch queue
  addToPrefetchQueue(fetchFunction, key) {
    if (!this.cache.has(key) && this.isOnline) {
      this.prefetchQueue.add({ fetchFunction, key });
      // Process queue with slight delay to avoid blocking main thread
      setTimeout(() => this.processPrefetchQueue(), 100);
    }
  }

  // Process prefetch queue
  async processPrefetchQueue() {
    if (!this.isOnline || this.prefetchQueue.size === 0) return;

    const batch = Array.from(this.prefetchQueue).slice(0, 3); // Process 3 at a time
    this.prefetchQueue.clear();

    const promises = batch.map(async ({ fetchFunction, key }) => {
      try {
        if (!this.cache.has(key)) {
          const data = await fetchFunction();
          this.set(key, data);
        }
      } catch (error) {
        console.warn('Prefetch failed for', key, error);
      }
    });

    await Promise.allSettled(promises);
  }

  // Clear all cache
  clear() {
    this.cache.clear();
    this.prefetchQueue.clear();
  }

  // Get cache stats
  getStats() {
    return {
      size: this.cache.size,
      queueSize: this.prefetchQueue.size,
      isOnline: this.isOnline
    };
  }
}

// Create singleton instance
export const cacheService = new CacheService();

// Cleanup every 5 minutes
setInterval(() => {
  cacheService.cleanup();
}, 5 * 60 * 1000);