import { supabase } from '../lib/supabase.js';
import { cacheService } from './cacheService.js';
import { FileUploadService } from './fileUploadService.js';

export class TicketService {
  // Get all tickets for a user
  static async getUserTickets(userId) {
    const cacheKey = cacheService.getCacheKey(`user_tickets_${userId}`);
    
    // Return cached data if available and fresh
    const cached = cacheService.get(cacheKey);
    if (cached) {
      return { data: cached, error: null };
    }

    try {
      const { data, error } = await supabase
        .from('tickets')
        .select(`
          *,
          user:users(email, name),
          comments:ticket_comments(
            id,
            content,
            created_at,
            is_customer,
            user:users(email, name)
          )
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Transform data to match existing component structure
      const transformedData = data?.map(ticket => ({
        id: ticket.id,
        ticketNumber: ticket.ticket_number,
        title: ticket.title,
        description: ticket.description,
        category: ticket.category,
        priority: ticket.priority,
        status: ticket.status,
        videoUrl: ticket.video_url,
        attachments: ticket.attachments || [],
        email: ticket.user?.email || '',
        createdAt: ticket.created_at,
        updatedAt: ticket.updated_at,
        comments: ticket.comments?.map(comment => ({
          id: comment.id,
          text: comment.content,
          author: comment.user?.email || 'Unknown',
          createdAt: comment.created_at,
          isCustomer: comment.is_customer
        })) || []
      })) || [];
      
      // Cache the result
      cacheService.set(cacheKey, transformedData, 5 * 60 * 1000); // 5 minutes TTL
      
      return { data: transformedData, error: null };
    } catch (error) {
      console.error('Error fetching user tickets:', error);
      return { data: null, error };
    }
  }

  // Get a single ticket by ID
  static async getTicketById(ticketId, userId) {
    try {
      const { data, error } = await supabase
        .from('tickets')
        .select(`
          *,
          user:users(email, name),
          comments:ticket_comments(
            id,
            content,
            created_at,
            is_customer,
            user:users(email, name)
          )
        `)
        .eq('id', ticketId)
        .eq('user_id', userId)
        .single();

      if (error) throw error;

      // Transform data to match existing component structure
      const transformedData = {
        id: data.id,
        ticketNumber: data.ticket_number,
        title: data.title,
        description: data.description,
        category: data.category,
        priority: data.priority,
        status: data.status,
        videoUrl: data.video_url,
        attachments: data.attachments || [],
        email: data.user?.email || '',
        createdAt: data.created_at,
        updatedAt: data.updated_at,
        comments: data.comments?.map(comment => ({
          id: comment.id,
          text: comment.content,
          author: comment.user?.email || 'Unknown',
          createdAt: comment.created_at,
          isCustomer: comment.is_customer
        })) || []
      };

      return { data: transformedData, error: null };
    } catch (error) {
      console.error('Error fetching ticket:', error);
      return { data: null, error };
    }
  }

  // Create a new ticket
  static async createTicket(ticketData, userId) {
    try {
      // First validate files if any
      if (ticketData.attachments && ticketData.attachments.length > 0) {
        const validation = FileUploadService.validateFiles(ticketData.attachments);
        if (!validation.valid) {
          return { data: null, error: { message: validation.errors.join(', ') } };
        }
      }

      // Create the ticket first (without attachments)
      const { data, error } = await supabase
        .from('tickets')
        .insert([{
          title: ticketData.title,
          description: ticketData.description,
          category: ticketData.category,
          priority: ticketData.priority,
          video_url: ticketData.videoUrl,
          attachments: [], // Will be updated after file upload
          status: 'open',
          user_id: userId
        }])
        .select(`
          *,
          user:users(email, name)
        `)
        .single();

      if (error) throw error;

      let uploadedFiles = [];
      
      // Upload files if any
      if (ticketData.attachments && ticketData.attachments.length > 0) {
        const uploadResult = await FileUploadService.uploadFiles(ticketData.attachments, data.id);
        
        if (uploadResult.error) {
          console.warn('Some files failed to upload:', uploadResult.error);
        }
        
        uploadedFiles = uploadResult.data || [];
        
        // Update ticket with attachment info
        if (uploadedFiles.length > 0) {
          await supabase
            .from('tickets')
            .update({ attachments: uploadedFiles })
            .eq('id', data.id);
        }
      }

      // Clear cache to force refresh
      cacheService.clear(`user_tickets_${userId}`);

      // Transform the response
      const transformedData = {
        id: data.id,
        ticketNumber: data.ticket_number,
        title: data.title,
        description: data.description,
        category: data.category,
        priority: data.priority,
        status: data.status,
        videoUrl: data.video_url,
        attachments: uploadedFiles,
        email: data.user?.email || '',
        createdAt: data.created_at,
        updatedAt: data.updated_at,
        comments: []
      };

      return { data: transformedData, error: null };
    } catch (error) {
      console.error('Error creating ticket:', error);
      return { data: null, error };
    }
  }

  // Add a comment to a ticket
  static async addComment(ticketId, userId, content, isCustomer = true) {
    try {
      const { data, error } = await supabase
        .from('ticket_comments')
        .insert([{
          ticket_id: ticketId,
          user_id: userId,
          content: content,
          is_customer: isCustomer
        }])
        .select(`
          *,
          user:users(email, name)
        `)
        .single();

      if (error) throw error;

      // Update ticket's updated_at timestamp
      await supabase
        .from('tickets')
        .update({ updated_at: new Date().toISOString() })
        .eq('id', ticketId);

      // Clear cache to force refresh
      cacheService.clear(`user_tickets_${userId}`);

      // Transform the response
      const transformedData = {
        id: data.id,
        text: data.content,
        author: data.user?.email || 'Unknown',
        createdAt: data.created_at,
        isCustomer: data.is_customer
      };

      return { data: transformedData, error: null };
    } catch (error) {
      console.error('Error adding comment:', error);
      return { data: null, error };
    }
  }

  // Update ticket status (for support team)
  static async updateTicketStatus(ticketId, status, userId) {
    try {
      const { data, error } = await supabase
        .from('tickets')
        .update({ 
          status: status,
          updated_at: new Date().toISOString()
        })
        .eq('id', ticketId)
        .select(`
          *,
          user:users(email, name)
        `)
        .single();

      if (error) throw error;

      // Clear cache to force refresh
      cacheService.clear(`user_tickets_${userId}`);

      return { data, error: null };
    } catch (error) {
      console.error('Error updating ticket status:', error);
      return { data: null, error };
    }
  }

  // Search tickets
  static async searchTickets(searchTerm, userId) {
    try {
      const { data, error } = await supabase
        .from('tickets')
        .select(`
          *,
          user:users(email, name)
        `)
        .eq('user_id', userId)
        .or(`title.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%,id.ilike.%${searchTerm}%`)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Transform data to match existing component structure
      const transformedData = data?.map(ticket => ({
        id: ticket.id,
        ticketNumber: ticket.ticket_number,
        title: ticket.title,
        description: ticket.description,
        category: ticket.category,
        priority: ticket.priority,
        status: ticket.status,
        videoUrl: ticket.video_url,
        attachments: ticket.attachments || [],
        email: ticket.user?.email || '',
        createdAt: ticket.created_at,
        updatedAt: ticket.updated_at
      })) || [];

      return { data: transformedData, error: null };
    } catch (error) {
      console.error('Error searching tickets:', error);
      return { data: null, error };
    }
  }
}