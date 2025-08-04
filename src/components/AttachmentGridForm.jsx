import { Box, Grid, Typography, Card, CardContent, CardMedia, IconButton, Chip } from '@mui/material';
import { 
  AttachFile as AttachFileIcon,
  Close as CloseIcon,
  PictureAsPdf as PdfIcon,
  Description as DocumentIcon,
  TableChart as SpreadsheetIcon,
  Image as ImageIcon,
  InsertDriveFile as FileIcon
} from '@mui/icons-material';

const AttachmentGridForm = ({ attachments, title = "Selected Files", onRemove }) => {
  if (!attachments || attachments.length === 0) {
    return null;
  }

  // Get file type and icon
  const getFileInfo = (file) => {
    const extension = file.name.split('.').pop().toLowerCase();
    const mimeType = file.type || '';

    if (mimeType.startsWith('image/') || ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(extension)) {
      return { type: 'image', icon: ImageIcon, color: 'success' };
    }
    
    if (mimeType === 'application/pdf' || extension === 'pdf') {
      return { type: 'pdf', icon: PdfIcon, color: 'error' };
    }
    
    if (['doc', 'docx'].includes(extension) || mimeType.includes('document')) {
      return { type: 'document', icon: DocumentIcon, color: 'primary' };
    }
    
    if (['xls', 'xlsx', 'csv'].includes(extension) || mimeType.includes('spreadsheet')) {
      return { type: 'spreadsheet', icon: SpreadsheetIcon, color: 'warning' };
    }
    
    if (['txt', 'md', 'json', 'xml', 'html', 'css', 'js'].includes(extension) || mimeType.startsWith('text/')) {
      return { type: 'text', icon: DocumentIcon, color: 'info' };
    }
    
    return { type: 'other', icon: FileIcon, color: 'default' };
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return 'Unknown size';
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <Box>
      <Box display="flex" alignItems="center" gap={1} mb={3}>
        <AttachFileIcon color="primary" />
        <Typography variant="h6" fontWeight="bold">
          {title} ({attachments.length})
        </Typography>
      </Box>

      <Grid container spacing={2}>
        {attachments.map((file, index) => {
          const fileInfo = getFileInfo(file);
          
          return (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card 
                sx={{ 
                  position: 'relative',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: 4
                  }
                }}
              >
                {/* Remove button */}
                <IconButton
                  size="small"
                  onClick={() => onRemove(index)}
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    bgcolor: 'rgba(255, 255, 255, 0.9)',
                    zIndex: 1,
                    '&:hover': {
                      bgcolor: 'error.main',
                      color: 'white'
                    }
                  }}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>

                {fileInfo.type === 'image' && file.url && (
                  <CardMedia
                    component="img"
                    height="150"
                    image={file.url}
                    alt={file.name}
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                    sx={{ 
                      objectFit: 'cover'
                    }}
                  />
                )}
                
                {fileInfo.type !== 'image' && (
                  <Box 
                    sx={{ 
                      height: 150, 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      bgcolor: 'grey.100'
                    }}
                  >
                    <fileInfo.icon sx={{ fontSize: 48, color: `${fileInfo.color}.main` }} />
                  </Box>
                )}

                <CardContent sx={{ p: 2 }}>
                  <Typography 
                    variant="subtitle2" 
                    noWrap 
                    title={file.name}
                    sx={{ mb: 1, fontWeight: 600 }}
                  >
                    {file.name}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="caption" color="text.secondary">
                      {formatFileSize(file.size)}
                    </Typography>
                    <Chip 
                      label={file.name.split('.').pop().toUpperCase()} 
                      size="small" 
                      color={fileInfo.color}
                      variant="outlined"
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default AttachmentGridForm;