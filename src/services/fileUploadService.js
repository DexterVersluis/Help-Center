import { supabase } from '../lib/supabase.js';

export class FileUploadService {
  // Upload files to Supabase Storage
  static async uploadFiles(files, ticketId) {
    if (!files || files.length === 0) {
      return { data: [], error: null };
    }

    const uploadedFiles = [];
    const errors = [];

    for (const file of files) {
      try {
        // Generate unique filename
        const fileExt = file.name.split('.').pop();
        const fileName = `${ticketId}/${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
        
        // Upload to Supabase Storage
        const { data, error } = await supabase.storage
          .from('ticket-attachments')
          .upload(fileName, file, {
            cacheControl: '3600',
            upsert: false
          });

        if (error) {
          console.error('Upload error:', error);
          errors.push({ file: file.name, error: error.message });
          continue;
        }

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('ticket-attachments')
          .getPublicUrl(fileName);

        uploadedFiles.push({
          name: file.name,
          size: file.size,
          type: file.type,
          url: publicUrl,
          path: fileName
        });
      } catch (error) {
        console.error('File upload error:', error);
        errors.push({ file: file.name, error: error.message });
      }
    }

    return {
      data: uploadedFiles,
      error: errors.length > 0 ? errors : null
    };
  }

  // Delete a file from storage
  static async deleteFile(filePath) {
    try {
      const { error } = await supabase.storage
        .from('ticket-attachments')
        .remove([filePath]);

      if (error) {
        console.error('Delete error:', error);
        return { success: false, error: error.message };
      }

      return { success: true, error: null };
    } catch (error) {
      console.error('File delete error:', error);
      return { success: false, error: error.message };
    }
  }

  // Get file URL (for private files)
  static async getFileUrl(filePath, expiresIn = 3600) {
    try {
      const { data, error } = await supabase.storage
        .from('ticket-attachments')
        .createSignedUrl(filePath, expiresIn);

      if (error) {
        console.error('Get URL error:', error);
        return { url: null, error: error.message };
      }

      return { url: data.signedUrl, error: null };
    } catch (error) {
      console.error('File URL error:', error);
      return { url: null, error: error.message };
    }
  }

  // Validate file before upload
  static validateFile(file) {
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/gif',
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'text/csv'
    ];

    if (file.size > maxSize) {
      return { valid: false, error: `File ${file.name} is too large. Maximum size is 10MB.` };
    }

    if (!allowedTypes.includes(file.type)) {
      return { valid: false, error: `File type ${file.type} is not allowed.` };
    }

    return { valid: true, error: null };
  }

  // Validate multiple files
  static validateFiles(files) {
    const errors = [];
    
    for (const file of files) {
      const validation = this.validateFile(file);
      if (!validation.valid) {
        errors.push(validation.error);
      }
    }

    return {
      valid: errors.length === 0,
      errors: errors
    };
  }
}