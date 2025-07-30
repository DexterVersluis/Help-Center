import { Link } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Paper
} from '@mui/material';
import {
  ArrowForward as ArrowRightIcon,
  Lightbulb
} from '@mui/icons-material';
import SEO from '../components/SEO';

const Roadmap = () => {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50' }}>
      <SEO
        title="Product Roadmap - ENBOQ Help Center"
        description="See what we're building next for ENBOQ's employee onboarding platform. Track our development progress and upcoming features in real-time."
        keywords="ENBOQ roadmap, product development, upcoming features, onboarding platform updates, development timeline"
        url="/roadmap"
      />
      
      {/* Hero Section */}
      <Box
        sx={{
          background: 'white',
          py: { xs: 6, md: 8 },
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="lg">
          <Box textAlign="center" maxWidth="800px" mx="auto">
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '2.5rem', md: '4rem' },
                fontWeight: 900,
                mb: 3
              }}
            >
              Product Roadmap
            </Typography>
            
            <Typography
              variant="h5"
              color="text.secondary"
              sx={{ mb: 4, lineHeight: 1.6 }}
            >
              See what we're building next and track our development progress in real-time
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Roadmap Embed */}
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box
          sx={{
            width: '100%',
            height: { xs: '600px', md: '800px' },
            borderRadius: 2,
            overflow: 'hidden',
            boxShadow: 3,
            bgcolor: 'white'
          }}
        >
          <iframe
            src="https://sharing.clickup.com/9008197730/l/h/8cewc32-2755/38344383b7f0a87"
            width="100%"
            height="100%"
            style={{ 
              border: 'none',
              display: 'block'
            }}
            title="ENBOQ Product Roadmap"
          />
        </Box>
      </Container>

      {/* CTA Section */}
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Paper sx={{ p: 6, textAlign: 'center', borderRadius: 3, bgcolor: 'primary.light', color: 'white' }}>
          <Typography variant="h4" gutterBottom fontWeight={700}>
            Have an idea that's not on the roadmap?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
            Submit a feature request and help us prioritize what to build next!
          </Typography>
          <Button
            component={Link}
            to="/features/new"
            variant="contained"
            size="large"
            startIcon={<Lightbulb />}
            endIcon={<ArrowRightIcon />}
            sx={{ 
              bgcolor: 'white',
              color: 'primary.main',
              '&:hover': { bgcolor: 'grey.100' },
              borderRadius: 3,
              px: 4,
              py: 1.5,
              textTransform: 'none',
              fontWeight: 600,
              fontSize: '1.1rem'
            }}
          >
            Submit Feature Request
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default Roadmap;