import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Alert,
  CircularProgress,
  Stack,
  Chip,
  Divider
} from '@mui/material';
import {
  Refresh,
  Download,
  Info,
  CheckCircle,
  Error as ErrorIcon
} from '@mui/icons-material';
import sitemapService from '../services/sitemapService';

const SitemapAdmin = () => {
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState(null);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState('info');

  const showMessage = (text, type = 'info') => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => setMessage(null), 5000);
  };

  const refreshSitemap = async () => {
    setLoading(true);
    try {
      // Clear cache to force regeneration
      sitemapService.clearCache();
      
      // Generate new sitemap
      await sitemapService.generateSitemapXML();
      
      // Get updated stats
      const newStats = await sitemapService.getSitemapStats();
      setStats(newStats);
      
      showMessage('Sitemap refreshed successfully!', 'success');
    } catch (error) {
      console.error('Error refreshing sitemap:', error);
      showMessage('Error refreshing sitemap. Check console for details.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    setLoading(true);
    try {
      const sitemapStats = await sitemapService.getSitemapStats();
      setStats(sitemapStats);
    } catch (error) {
      console.error('Error loading sitemap stats:', error);
      showMessage('Error loading sitemap stats.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const downloadSitemap = async () => {
    try {
      const xml = await sitemapService.generateSitemapXML();
      const blob = new Blob([xml], { type: 'application/xml' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'sitemap.xml';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      showMessage('Sitemap downloaded successfully!', 'success');
    } catch (error) {
      console.error('Error downloading sitemap:', error);
      showMessage('Error downloading sitemap.', 'error');
    }
  };

  const openSitemap = () => {
    window.open('/sitemap.xml', '_blank');
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Sitemap Management
      </Typography>
      
      {message && (
        <Alert 
          severity={messageType} 
          sx={{ mb: 3 }}
          onClose={() => setMessage(null)}
        >
          {message}
        </Alert>
      )}

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Sitemap Actions
          </Typography>
          
          <Stack direction="row" spacing={2} flexWrap="wrap">
            <Button
              variant="contained"
              startIcon={loading ? <CircularProgress size={20} /> : <Refresh />}
              onClick={refreshSitemap}
              disabled={loading}
            >
              Refresh Sitemap
            </Button>
            
            <Button
              variant="outlined"
              startIcon={<Info />}
              onClick={loadStats}
              disabled={loading}
            >
              Load Stats
            </Button>
            
            <Button
              variant="outlined"
              startIcon={<Download />}
              onClick={downloadSitemap}
            >
              Download XML
            </Button>
            
            <Button
              variant="text"
              onClick={openSitemap}
            >
              View Sitemap
            </Button>
          </Stack>
        </CardContent>
      </Card>

      {stats && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Sitemap Statistics
            </Typography>
            
            <Stack spacing={2}>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="body1">Total Pages:</Typography>
                <Chip 
                  label={stats.totalPages} 
                  color="primary" 
                  icon={<CheckCircle />}
                />
              </Box>
              
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="body1">Static Pages:</Typography>
                <Chip label={stats.staticPages} variant="outlined" />
              </Box>
              
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="body1">Documentation Pages:</Typography>
                <Chip label={stats.documentationPages} color="secondary" />
              </Box>
              
              <Divider />
              
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="body2" color="text.secondary">
                  Last Generated:
                </Typography>
                <Typography variant="body2">
                  {new Date(stats.lastGenerated).toLocaleString()}
                </Typography>
              </Box>
              
              {stats.cacheExpiry && (
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="body2" color="text.secondary">
                    Cache Expires:
                  </Typography>
                  <Typography variant="body2">
                    {new Date(stats.cacheExpiry).toLocaleString()}
                  </Typography>
                </Box>
              )}
            </Stack>
          </CardContent>
        </Card>
      )}

      <Box sx={{ mt: 3 }}>
        <Alert severity="info">
          <Typography variant="body2">
            <strong>How it works:</strong> The sitemap automatically includes all static pages 
            (Home, Docs, FAQ, Features) and dynamically adds all documentation pages from your database. 
            It's cached for 1 hour for performance and automatically refreshes when content changes.
          </Typography>
        </Alert>
      </Box>
    </Box>
  );
};

export default SitemapAdmin;