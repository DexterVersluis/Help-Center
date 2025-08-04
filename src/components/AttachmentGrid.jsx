import { Box, Grid, Typography, Paper } from '@mui/material';
import { AttachFile as AttachFileIcon } from '@mui/icons-material';
import AttachmentPreview from './AttachmentPreview';

const AttachmentGrid = ({ attachments, title = "Attachments" }) => {
  if (!attachments || attachments.length === 0) {
    return null;
  }

  const handleDownload = (file) => {
    if (file.url) {
      // Create a temporary link to download the file
      const link = document.createElement('a');
      link.href = file.url;
      link.download = file.name;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <Box>
      <Box display="flex" alignItems="center" gap={1} mb={3}>
        <AttachFileIcon color="primary" />
        <Typography variant="h6" fontWeight="bold">
          {title} ({attachments.length})
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {attachments.map((file, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <AttachmentPreview 
              file={file} 
              onDownload={handleDownload}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AttachmentGrid;