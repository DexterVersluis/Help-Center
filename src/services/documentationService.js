import { supabase } from '../lib/supabase.js';
import { cacheService } from './cacheService.js';

export class DocumentationService {
  // Get all categories
  static async getCategories() {
    const cacheKey = cacheService.getCacheKey('categories');
    
    // Return cached data if available and fresh
    const cached = cacheService.get(cacheKey);
    if (cached) {
      return { data: cached, error: null };
    }

    try {
      const { data, error } = await supabase
        .from('doc_categories')
        .select('*')
        .order('sort_order', { ascending: true });

      if (error) throw error;
      
      // Cache the result
      cacheService.set(cacheKey, data, 10 * 60 * 1000); // 10 minutes TTL
      
      return { data, error: null };
    } catch (error) {
      console.error('Error fetching categories:', error);
      return { data: null, error };
    }
  }

  // Get all published documents with category info
  static async getAllDocuments() {
    const cacheKey = cacheService.getCacheKey('all_documents');
    
    // Return cached data if available and fresh
    const cached = cacheService.get(cacheKey);
    if (cached) {
      // Prefetch individual documents in background
      this.prefetchDocumentDetails(cached);
      return { data: cached, error: null };
    }

    try {
      const { data, error } = await supabase
        .from('documentation')
        .select(`
          *,
          category:doc_categories(name, slug)
        `)
        .eq('is_published', true)
        .order('sort_order', { ascending: true });

      if (error) throw error;
      
      // Cache the result
      cacheService.set(cacheKey, data, 5 * 60 * 1000); // 5 minutes TTL
      
      // Prefetch individual documents in background
      this.prefetchDocumentDetails(data);
      
      return { data, error: null };
    } catch (error) {
      console.error('Error fetching documents:', error);
      return { data: null, error };
    }
  }

  // Get documents by category
  static async getDocumentsByCategory(categorySlug) {
    try {
      const { data, error } = await supabase
        .from('documentation')
        .select(`
          *,
          category:doc_categories!inner(name, slug)
        `)
        .eq('doc_categories.slug', categorySlug)
        .eq('is_published', true)
        .order('sort_order', { ascending: true });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error fetching documents by category:', error);
      return { data: null, error };
    }
  }

  // Get a single document with steps and related docs
  static async getDocumentBySlug(slug) {
    console.log('DocumentationService.getDocumentBySlug called with slug:', slug);
    
    // Temporarily disable caching for debugging
    // const cacheKey = cacheService.getCacheKey('document', { slug });
    // console.log('Cache key:', cacheKey);
    
    // Return cached data if available and fresh
    // const cached = cacheService.get(cacheKey);
    // if (cached) {
    //   console.log('Returning cached data:', cached);
    //   // Prefetch related documents in background
    //   this.prefetchRelatedDocuments(cached.relatedDocs);
    //   return { data: cached, error: null };
    // }
    
    console.log('Fetching from database (caching disabled for debugging)...');

    try {
      console.log('Fetching document from Supabase...');
      // Get the main document
      const { data: doc, error: docError } = await supabase
        .from('documentation')
        .select(`
          *,
          category:doc_categories(name, slug)
        `)
        .eq('slug', slug)
        .eq('is_published', true)
        .single();

      console.log('Document query result:', { doc, docError });
      if (docError) {
        console.error('Document query error:', docError);
        throw docError;
      }

      // Get the steps
      console.log('Fetching steps for doc ID:', doc.id);
      const { data: steps, error: stepsError } = await supabase
        .from('doc_steps')
        .select('*')
        .eq('doc_id', doc.id)
        .order('step_number', { ascending: true });

      console.log('Steps query result:', { steps, stepsError });
      if (stepsError) {
        console.error('Steps query error:', stepsError);
        throw stepsError;
      }

      // Get related documents
      const { data: relations, error: relationsError } = await supabase
        .from('doc_relations')
        .select(`
          related_doc:documentation!doc_relations_related_doc_id_fkey(
            id, slug, title
          )
        `)
        .eq('doc_id', doc.id);

      if (relationsError) throw relationsError;

      // Format the response
      const relatedDocs = relations.map(rel => rel.related_doc);
      
      const result = {
        ...doc,
        steps,
        relatedDocs
      };

      // Cache the result (disabled for debugging)
      // cacheService.set(cacheKey, result, 10 * 60 * 1000); // 10 minutes TTL
      
      // Prefetch related documents in background
      // this.prefetchRelatedDocuments(relatedDocs);

      return { data: result, error: null };
    } catch (error) {
      console.error('Error fetching document:', error);
      return { data: null, error };
    }
  }

  // Search documents
  static async searchDocuments(searchTerm) {
    try {
      const { data, error } = await supabase
        .from('documentation')
        .select(`
          *,
          category:doc_categories(name, slug)
        `)
        .or(`title.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`)
        .eq('is_published', true)
        .order('views', { ascending: false });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error searching documents:', error);
      return { data: null, error };
    }
  }

  // Increment view count
  static async incrementViews(slug) {
    try {
      const { error } = await supabase.rpc('increment_doc_views', {
        doc_slug: slug
      });

      if (error) throw error;
      return { error: null };
    } catch (error) {
      console.error('Error incrementing views:', error);
      return { error };
    }
  }

  // Submit feedback
  static async submitFeedback(docId, isHelpful, feedbackText = null) {
    try {
      const { data, error } = await supabase
        .from('doc_feedback')
        .insert({
          doc_id: docId,
          is_helpful: isHelpful,
          feedback_text: feedbackText,
          user_ip: null // You can implement IP tracking if needed
        });

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error submitting feedback:', error);
      return { data: null, error };
    }
  }

  // Get popular documents (high views)
  static async getPopularDocuments(limit = 5) {
    try {
      const { data, error } = await supabase
        .from('documentation')
        .select(`
          *,
          category:doc_categories(name, slug)
        `)
        .eq('is_published', true)
        .order('views', { ascending: false })
        .limit(limit);

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error fetching popular documents:', error);
      return { data: null, error };
    }
  }

  // Add a new document (for content management)
  static async createDocument(documentData) {
    try {
      const { data: doc, error: docError } = await supabase
        .from('documentation')
        .insert(documentData)
        .select()
        .single();

      if (docError) throw docError;
      return { data: doc, error: null };
    } catch (error) {
      console.error('Error creating document:', error);
      return { data: null, error };
    }
  }

  // Add steps to a document
  static async createDocumentSteps(docId, steps) {
    try {
      const stepsWithDocId = steps.map((step, index) => ({
        doc_id: docId,
        step_number: index + 1,
        ...step
      }));

      const { data, error } = await supabase
        .from('doc_steps')
        .insert(stepsWithDocId)
        .select();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error creating document steps:', error);
      return { data: null, error };
    }
  }

  // Helper method to create a complete document with steps
  static async createCompleteDocument(documentData, steps) {
    try {
      // Create the document
      const { data: doc, error: docError } = await this.createDocument(documentData);
      if (docError) throw docError;

      // Create the steps
      const { data: createdSteps, error: stepsError } = await this.createDocumentSteps(doc.id, steps);
      if (stepsError) throw stepsError;

      // Clear relevant caches
      cacheService.clear();

      return {
        data: {
          ...doc,
          steps: createdSteps
        },
        error: null
      };
    } catch (error) {
      console.error('Error creating complete document:', error);
      return { data: null, error };
    }
  }

  // Prefetch individual document details in background
  static prefetchDocumentDetails(documents) {
    if (!documents || !Array.isArray(documents)) return;
    
    // Prefetch the first 3 documents
    documents.slice(0, 3).forEach(doc => {
      const fetchFunction = () => this.getDocumentBySlug(doc.slug);
      const cacheKey = cacheService.getCacheKey('document', { slug: doc.slug });
      cacheService.addToPrefetchQueue(fetchFunction, cacheKey);
    });
  }

  // Prefetch related documents in background
  static prefetchRelatedDocuments(relatedDocs) {
    if (!relatedDocs || !Array.isArray(relatedDocs)) return;
    
    relatedDocs.forEach(doc => {
      const fetchFunction = () => this.getDocumentBySlug(doc.slug);
      const cacheKey = cacheService.getCacheKey('document', { slug: doc.slug });
      cacheService.addToPrefetchQueue(fetchFunction, cacheKey);
    });
  }

  // Preload images for better UX
  static preloadImages(steps) {
    if (!steps || !Array.isArray(steps)) return;
    
    steps.forEach(step => {
      if (step.image_url) {
        const img = new Image();
        img.src = step.image_url;
      }
    });
  }
}