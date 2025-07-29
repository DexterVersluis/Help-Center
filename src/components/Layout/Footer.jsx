import { Link } from 'react-router-dom';
import { Box, Container, Grid, Typography, Link as MuiLink, Divider } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const Footer = () => {
  const theme = useTheme();
  
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'primary.dark',
        color: 'white',
        mt: 8,
        py: 6
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={3}>
            <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', mb: 2 }}>
              ENBOQ
            </Typography>
            <Typography variant="body1" sx={{ color: 'grey.300', lineHeight: 1.6 }}>
              Get the support you need, when you need it.
            </Typography>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 'semibold', mb: 2 }}>
              Support
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <MuiLink
                component={Link}
                to="/docs"
                sx={{ color: 'grey.300', textDecoration: 'none', '&:hover': { color: 'white' } }}
              >
                Documentation
              </MuiLink>
              <MuiLink
                component={Link}
                to="/faq"
                sx={{ color: 'grey.300', textDecoration: 'none', '&:hover': { color: 'white' } }}
              >
                FAQ
              </MuiLink>
              <MuiLink
                component={Link}
                to="/tickets/new"
                sx={{ color: 'grey.300', textDecoration: 'none', '&:hover': { color: 'white' } }}
              >
                Submit Ticket
              </MuiLink>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 'semibold', mb: 2 }}>
              Community
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <MuiLink
                component={Link}
                to="/features"
                sx={{ color: 'grey.300', textDecoration: 'none', '&:hover': { color: 'white' } }}
              >
                Feature Requests
              </MuiLink>
              <MuiLink
                component={Link}
                to="/tickets"
                sx={{ color: 'grey.300', textDecoration: 'none', '&:hover': { color: 'white' } }}
              >
                My Tickets
              </MuiLink>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 'semibold', mb: 2 }}>
              Contact
            </Typography>
            <Typography variant="body1" sx={{ color: 'grey.300', lineHeight: 1.6 }}>
              Need immediate help?
            </Typography>
            <MuiLink
              href="mailto:support@enboq.com"
              sx={{
                color: theme.palette.secondary.main,
                textDecoration: 'none',
                fontWeight: 'medium',
                '&:hover': { color: theme.palette.secondary.light }
              }}
            >
              support@enboq.com
            </MuiLink>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 4, borderColor: 'grey.700' }} />
        
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body1" sx={{ color: 'grey.400' }}>
            © 2024 ENBOQ. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;