import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Button,
  Chip,
  Paper,
  CircularProgress,
  Alert
} from '@mui/material';
import {
  Close as CloseIcon,
  Download as DownloadIcon,
  Visibility as ViewIcon,
  PictureAsPdf as PdfIcon,
  Description as DocumentIcon,
  TableChart as SpreadsheetIcon,
  Image as ImageIcon,
  InsertDriveFile as FileIcon,
  ZoomIn as ZoomInIcon,
  ZoomOut as ZoomOutIcon,
  Fullscreen as FullscreenIcon
} from '@mui/icons-material';

const AttachmentPreview = ({ file, onDownload }) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [zoom, setZoom] = useState(1);

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

  const fileInfo = getFileInfo(file);
  const formatFileSize = (bytes) => {
    if (!bytes) return 'Unknown size';
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  const handlePreview = () => {
    setPreviewOpen(true);
    setZoom(1);
  };

  const handleDownload = () => {
    if (onDownload) {
      onDownload(file);
    } else if (file.url) {
      window.open(file.url, '_blank');
    }
  };

  const handleImageLoad = () => {
    setImageLoading(false);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageLoading(false);
    setImageError(true);
  };

  const renderPreviewContent = () => {
    switch (fileInfo.type) {
      case 'image':
        return (
          <Box sx={{ textAlign: 'center', maxHeight: '80vh', overflow: 'auto' }}>
            {imageLoading && (
              <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                <CircularProgress />
              </Box>
            )}
            {imageError ? (
              <Alert severity="error" sx={{ m: 2 }}>
                Failed to load image. You can still download it.
              </Alert>
            ) : (
              <img
                src={file.url}
                alt={file.name}
                onLoad={handleImageLoad}
                onError={handleImageError}
                style={{
                  maxWidth: '100%',
                  maxHeight: '80vh',
                  transform: `scale(${zoom})`,
                  transition: 'transform 0.3s ease',
                  display: imageLoading ? 'none' : 'block'
                }}
              />
            )}
            {!imageLoading && !imageError && (
              <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center', gap: 1 }}>
                <IconButton onClick={() => setZoom(Math.max(0.5, zoom - 0.25))}>
                  <ZoomOutIcon />
                </IconButton>
                <Chip label={`${Math.round(zoom * 100)}%`} size="small" />
                <IconButton onClick={() => setZoom(Math.min(3, zoom + 0.25))}>
                  <ZoomInIcon />
                </IconButton>
              </Box>
            )}
          </Box>
        );

      case 'pdf':
        return (
          <Box sx={{ height: '80vh', width: '100%' }}>
            <iframe
              src={`${file.url}#toolbar=1&navpanes=1&scrollbar=1`}
              width="100%"
              height="100%"
              style={{ border: 'none' }}
              title={file.name}
            />
          </Box>
        );

      case 'text':
        return (
          <Box sx={{ height: '80vh', overflow: 'auto' }}>
            <iframe
              src={file.url}
              width="100%"
              height="100%"
              style={{ border: 'none', backgroundColor: 'white' }}
              title={file.name}
            />
          </Box>
        );

      default:
        return (
          <Box sx={{ textAlign: 'center', p: 4 }}>
            <fileInfo.icon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              Preview not available
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              This file type cannot be previewed in the browser.
            </Typography>
            <Button
              variant="contained"
              startIcon={<DownloadIcon />}
              onClick={handleDownload}
            >
              Download to View
            </Button>
          </Box>
        );
    }
  };

  return (
    <>
      <Card 
        sx={{ 
          maxWidth: 300, 
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: 4
          }
        }}
      >
        {fileInfo.type === 'image' && file.url && (
          <CardMedia
            component="img"
            height="200"
            image={file.url}
            alt={file.name}
            onError={(e) => {
              e.target.style.display = 'none';
            }}
            sx={{ 
              objectFit: 'cover',
              cursor: 'pointer'
            }}
            onClick={handlePreview}
          />
        )}
        
        {fileInfo.type !== 'image' && (
          <Box 
            sx={{ 
              height: 200, 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              bgcolor: 'grey.100',
              cursor: 'pointer'
            }}
            onClick={handlePreview}
          >
            <fileInfo.icon sx={{ fontSize: 64, color: `${fileInfo.color}.main` }} />
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
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
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

          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              size="small"
              startIcon={<ViewIcon />}
              onClick={handlePreview}
              variant="outlined"
              fullWidth
            >
              Preview
            </Button>
            <IconButton
              size="small"
              onClick={handleDownload}
              color="primary"
              title="Download"
            >
              <DownloadIcon />
            </IconButton>
          </Box>
        </CardContent>
      </Card>

      {/* Preview Dialog */}
      <Dialog
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: { height: '90vh' }
        }}
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="h6" component="span">
              {file.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ ml: 2 }}>
              {formatFileSize(file.size)}
            </Typography>
          </Box>
          <IconButton onClick={() => setPreviewOpen(false)}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        
        <DialogContent sx={{ p: 0, overflow: 'hidden' }}>
          {renderPreviewContent()}
        </DialogContent>
        
        <DialogActions>
          <Button
            startIcon={<DownloadIcon />}
            onClick={handleDownload}
            variant="contained"
          >
            Download
          </Button>
          <Button onClick={() => setPreviewOpen(false)}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AttachmentPreview;