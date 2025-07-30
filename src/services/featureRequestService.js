import { supabase } from '../lib/supabase.js';
import { cacheService } from './cacheService.js';

export class FeatureRequestService {
  // Get all feature requests
  static async getAllFeatureRequests() {
    const cacheKey = cacheService.getCacheKey('feature_requests');
    
    // Return cached data if available and fresh
    const cached = cacheService.get(cacheKey);
    if (cached) {
      return { data: cached, error: null };
    }

    try {
      const { data, error } = await supabase
        .from('feature_requests')
        .select(`
          *,
          user:users(email, name)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Transform data to match existing component structure
      const transformedData = data?.map(request => ({
        id: request.id,
        title: request.title,
        description: request.description,
        category: request.category,
        status: request.status,
        votes: request.votes || 0,
        priority: request.priority,
        createdAt: request.created_at,
        updatedAt: request.updated_at,
        author: request.user?.name || 'Unknown User',
        authorName: request.user?.name || 'Unknown User',
        userId: request.user_id
      })) || [];
      
      // Cache the result
      cacheService.set(cacheKey, transformedData, 5 * 60 * 1000); // 5 minutes TTL
      
      return { data: transformedData, error: null };
    } catch (error) {
      console.error('Error fetching feature requests:', error);
      return { data: null, error };
    }
  }

  // Create a new feature request
  static async createFeatureRequest(requestData, userId) {
    try {
      const { data, error } = await supabase
        .from('feature_requests')
        .insert([{
          title: requestData.title,
          description: requestData.description,
          category: requestData.category,
          priority: requestData.priority,
          use_case: requestData.useCase,
          status: 'under-review',
          votes: 1, // Creator automatically votes for their own request
          user_id: userId
        }])
        .select(`
          *,
          user:users(email, name)
        `)
        .single();

      if (error) throw error;

      // Clear cache to force refresh
      cacheService.clear('feature_requests');

      // Transform the response
      const transformedData = {
        id: data.id,
        title: data.title,
        description: data.description,
        category: data.category,
        status: data.status,
        votes: data.votes || 0,
        priority: data.priority,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
        author: data.user?.name || 'Unknown User',
        authorName: data.user?.name || 'Unknown User',
        userId: data.user_id
      };

      // Also record the initial vote
      await this.voteOnFeatureRequest(data.id, userId, 'up');

      return { data: transformedData, error: null };
    } catch (error) {
      console.error('Error creating feature request:', error);
      return { data: null, error };
    }
  }

  // Vote on a feature request
  static async voteOnFeatureRequest(featureId, userId, voteType) {
    try {
      // First check if user has already voted
      const { data: existingVote, error: voteCheckError } = await supabase
        .from('feature_votes')
        .select('vote_type')
        .eq('feature_id', featureId)
        .eq('user_id', userId)
        .single();

      if (voteCheckError && voteCheckError.code !== 'PGRST116') {
        throw voteCheckError;
      }

      let voteChange = 0;
      
      if (existingVote) {
        // User has already voted
        if (existingVote.vote_type === voteType) {
          // Same vote type, do nothing
          return { data: null, error: null };
        } else {
          // Different vote type, update the vote
          const { error: updateError } = await supabase
            .from('feature_votes')
            .update({ vote_type: voteType })
            .eq('feature_id', featureId)
            .eq('user_id', userId);

          if (updateError) throw updateError;

          // Calculate vote change (from opposite to current)
          voteChange = voteType === 'up' ? 2 : -2;
        }
      } else {
        // New vote
        const { error: insertError } = await supabase
          .from('feature_votes')
          .insert([{
            feature_id: featureId,
            user_id: userId,
            vote_type: voteType
          }]);

        if (insertError) throw insertError;

        voteChange = voteType === 'up' ? 1 : -1;
      }

      // Update the vote count on the feature request
      const { error: updateFeatureError } = await supabase
        .from('feature_requests')
        .update({ 
          votes: supabase.raw(`votes + ${voteChange}`)
        })
        .eq('id', featureId);

      if (updateFeatureError) throw updateFeatureError;

      // Clear cache to force refresh
      cacheService.clear('feature_requests');

      return { data: { voteType, voteChange }, error: null };
    } catch (error) {
      console.error('Error voting on feature request:', error);
      return { data: null, error };
    }
  }

  // Get user's vote for a specific feature request
  static async getUserVote(featureId, userId) {
    try {
      const { data, error } = await supabase
        .from('feature_votes')
        .select('vote_type')
        .eq('feature_id', featureId)
        .eq('user_id', userId)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      return { data: data?.vote_type || null, error: null };
    } catch (error) {
      console.error('Error getting user vote:', error);
      return { data: null, error };
    }
  }

  // Get user's votes for multiple feature requests
  static async getUserVotes(featureIds, userId) {
    try {
      const { data, error } = await supabase
        .from('feature_votes')
        .select('feature_id, vote_type')
        .eq('user_id', userId)
        .in('feature_id', featureIds);

      if (error) throw error;

      // Convert to a map for easy lookup
      const votesMap = {};
      data?.forEach(vote => {
        votesMap[vote.feature_id] = vote.vote_type;
      });

      return { data: votesMap, error: null };
    } catch (error) {
      console.error('Error getting user votes:', error);
      return { data: {}, error };
    }
  }

  // Search feature requests
  static async searchFeatureRequests(searchTerm) {
    try {
      const { data, error } = await supabase
        .from('feature_requests')
        .select(`
          *,
          user:users(email, name)
        `)
        .or(`title.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%,category.ilike.%${searchTerm}%`)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Transform data to match existing component structure
      const transformedData = data?.map(request => ({
        id: request.id,
        title: request.title,
        description: request.description,
        category: request.category,
        status: request.status,
        votes: request.votes || 0,
        priority: request.priority,
        createdAt: request.created_at,
        updatedAt: request.updated_at,
        author: request.user?.name || 'Unknown User',
        authorName: request.user?.name || 'Unknown User',
        userId: request.user_id
      })) || [];

      return { data: transformedData, error: null };
    } catch (error) {
      console.error('Error searching feature requests:', error);
      return { data: null, error };
    }
  }
}