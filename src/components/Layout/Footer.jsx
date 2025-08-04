import { Link } from 'react-router-dom';
import { Box, Container, Grid, Typography, Link as MuiLink } from '@mui/material';

const Footer = () => {
  return (
    <Box 
      component="footer" 
      sx={{ 
        mt: 8,
        width: '100%'
      }}
    >
      {/* Main Footer Content */}
      <Box
        sx={{
          bgcolor: '#F8FAFC',
          py: 8,
          width: '100%',
          background: `
            radial-gradient(circle at bottom left, rgba(130, 59, 235, 0.08) 0%, rgba(130, 59, 235, 0.04) 25%, transparent 50%),
            #F8FAFC
          `
        }}
      >
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          px: { xs: 6, sm: 8, md: 12, lg: 16, xl: 20 },
          maxWidth: '1400px',
          mx: 'auto',
          gap: { xs: 4, md: 6, lg: 8 },
          flexWrap: { xs: 'wrap', lg: 'nowrap' }
        }}>
          {/* Support Column */}
          <Box sx={{ flex: '1 1 0', minWidth: 0 }}>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 800,
                fontSize: '16px',
                color: '#823BEB',
                mb: 3,
                fontFamily: '"Nunito", sans-serif'
              }}
            >
              SUPPORT
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <MuiLink
                component={Link}
                to="/docs"
                sx={{ 
                  color: '#ED00B8', 
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontFamily: '"Nunito", sans-serif',
                  fontWeight: 600,
                  '&:hover': { color: '#FF8E00' }
                }}
              >
                Documentation
              </MuiLink>
              <MuiLink
                component={Link}
                to="/features"
                sx={{ 
                  color: '#ED00B8', 
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontFamily: '"Nunito", sans-serif',
                  fontWeight: 600,
                  '&:hover': { color: '#FF8E00' }
                }}
              >
                Feature request
              </MuiLink>
              <MuiLink
                component={Link}
                to="/faq"
                sx={{ 
                  color: '#ED00B8', 
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontFamily: '"Nunito", sans-serif',
                  fontWeight: 600,
                  '&:hover': { color: '#FF8E00' }
                }}
              >
                FAQ
              </MuiLink>
              <MuiLink
                component={Link}
                to="/tickets/new"
                sx={{ 
                  display: 'inline-block',
                  backgroundColor: '#823BEB',
                  color: 'white',
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontFamily: '"Nunito", sans-serif',
                  fontWeight: 700,
                  px: 2,
                  py: 1.5,
                  borderRadius: '8px',
                  mt: 1,
                  textAlign: 'center',
                  minWidth: 'fit-content',
                  transition: 'all 0.2s ease',
                  '&:hover': { 
                    backgroundColor: '#FF8E00',
                    transform: 'translateY(-1px)',
                    boxShadow: '0 4px 12px rgba(255, 142, 0, 0.3)'
                  }
                }}
              >
                Submit Ticket
              </MuiLink>
            </Box>
          </Box>
          
          {/* Onboarding Tools Column */}
          <Box sx={{ flex: '1 1 0', minWidth: 0 }}>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 800,
                fontSize: '16px',
                color: '#823BEB',
                mb: 3,
                fontFamily: '"Nunito", sans-serif'
              }}
            >
              ONBOARDING TOOLS
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <MuiLink
                href="https://www.enboq.com/onboarding-process-planner/"
                target="_blank"
                sx={{ 
                  color: '#ED00B8', 
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontFamily: '"Nunito", sans-serif',
                  fontWeight: 600,
                  '&:hover': { color: '#FF8E00' }
                }}
              >
                Onboarding Process Generator
              </MuiLink>
              <MuiLink
                href="https://www.enboq.com/onboarding-software-roi/"
                target="_blank"
                sx={{ 
                  color: '#ED00B8', 
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontFamily: '"Nunito", sans-serif',
                  fontWeight: 600,
                  '&:hover': { color: '#FF8E00' }
                }}
              >
                Onboarding Software ROI
              </MuiLink>
              <MuiLink
                href="https://www.enboq.com/onboarding-best-practices-assessment/"
                target="_blank"
                sx={{ 
                  color: '#ED00B8', 
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontFamily: '"Nunito", sans-serif',
                  fontWeight: 600,
                  '&:hover': { color: '#FF8E00' }
                }}
              >
                Onboarding Best Practices Assessment
              </MuiLink>
              <MuiLink
                href="https://www.enboq.com/onboarding-gamification-ideas-generator/"
                target="_blank"
                sx={{ 
                  color: '#ED00B8', 
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontFamily: '"Nunito", sans-serif',
                  fontWeight: 600,
                  '&:hover': { color: '#FF8E00' }
                }}
              >
                Onboarding gamification ideas generator
              </MuiLink>
              <MuiLink
                href="https://www.enboq.com/new-hire-intro-message-for-onboarding/"
                target="_blank"
                sx={{ 
                  color: '#ED00B8', 
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontFamily: '"Nunito", sans-serif',
                  fontWeight: 600,
                  '&:hover': { color: '#FF8E00' }
                }}
              >
                New hire introduction message
              </MuiLink>
              <MuiLink
                href="https://www.enboq.com/onboarding-preboarding-survey-generation/"
                target="_blank"
                sx={{ 
                  color: '#ED00B8', 
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontFamily: '"Nunito", sans-serif',
                  fontWeight: 600,
                  '&:hover': { color: '#FF8E00' }
                }}
              >
                Onboarding survey generator
              </MuiLink>
              <MuiLink
                href="https://www.enboq.com/onboarding-best-practices-and-guides/"
                target="_blank"
                sx={{ 
                  color: '#ED00B8', 
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontFamily: '"Nunito", sans-serif',
                  fontWeight: 600,
                  '&:hover': { color: '#FF8E00' }
                }}
              >
                Best practices and guides
              </MuiLink>
            </Box>
          </Box>
          

          
          {/* Company Column */}
          <Box sx={{ flex: '1 1 0', minWidth: 0 }}>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 800,
                fontSize: '16px',
                color: '#823BEB',
                mb: 3,
                fontFamily: '"Nunito", sans-serif'
              }}
            >
              ENBOQ
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <MuiLink
                href="https://www.enboq.com/cases/"
                target="_blank"
                sx={{ 
                  color: '#ED00B8', 
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontFamily: '"Nunito", sans-serif',
                  fontWeight: 600,
                  '&:hover': { color: '#FF8E00' }
                }}
              >
                Cases
              </MuiLink>
              <MuiLink
                href="https://www.enboq.com/demo-boeken/"
                target="_blank"
                sx={{ 
                  color: '#ED00B8', 
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontFamily: '"Nunito", sans-serif',
                  fontWeight: 600,
                  '&:hover': { color: '#FF8E00' }
                }}
              >
                Schedule a demo
              </MuiLink>
              <MuiLink
                href="https://www.enboq.com/team/"
                target="_blank"
                sx={{ 
                  color: '#ED00B8', 
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontFamily: '"Nunito", sans-serif',
                  fontWeight: 600,
                  '&:hover': { color: '#FF8E00' }
                }}
              >
                Team
              </MuiLink>
              <MuiLink
                href="https://www.enboq.com/vacatures/"
                target="_blank"
                sx={{ 
                  color: '#ED00B8', 
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontFamily: '"Nunito", sans-serif',
                  fontWeight: 600,
                  '&:hover': { color: '#FF8E00' }
                }}
              >
                Job listings
              </MuiLink>
              <MuiLink
                href="https://www.enboq.com/contact/"
                target="_blank"
                sx={{ 
                  color: '#ED00B8', 
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontFamily: '"Nunito", sans-serif',
                  fontWeight: 600,
                  '&:hover': { color: '#FF8E00' }
                }}
              >
                Contact
              </MuiLink>
              <MuiLink
                href="https://www.enboq.com/downloads/Privacyverklaring.pdf"
                target="_blank"
                sx={{ 
                  color: '#ED00B8', 
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontFamily: '"Nunito", sans-serif',
                  fontWeight: 600,
                  '&:hover': { color: '#FF8E00' }
                }}
              >
                Privacy statement
              </MuiLink>
              <MuiLink
                href="https://www.enboq.com/downloads/AlgemeneVoorwaarden.pdf"
                target="_blank"
                sx={{ 
                  color: '#ED00B8', 
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontFamily: '"Nunito", sans-serif',
                  fontWeight: 600,
                  '&:hover': { color: '#FF8E00' }
                }}
              >
                Terms of services
              </MuiLink>
            </Box>
          </Box>
          
          {/* Contact Column */}
          <Box sx={{ flex: '1 1 0', minWidth: 0 }}>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 800,
                fontSize: '16px',
                color: '#823BEB',
                mb: 3,
                fontFamily: '"Nunito", sans-serif'
              }}
            >
              CONTACT US
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <MuiLink
                href="mailto:support@enboq.com"
                sx={{
                  color: '#ED00B8',
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontFamily: '"Nunito", sans-serif',
                  fontWeight: 600,
                  '&:hover': { color: '#FF8E00' }
                }}
              >
                support@enboq.com
              </MuiLink>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography 
                  sx={{ 
                    color: '#ED00B8',
                    fontSize: '14px',
                    fontFamily: '"Nunito", sans-serif',
                    fontWeight: 600
                  }}
                >
                  🇳🇱
                </Typography>
                <MuiLink
                  href="tel:+31357994575"
                  sx={{
                    color: '#ED00B8',
                    textDecoration: 'none',
                    fontSize: '14px',
                    fontFamily: '"Nunito", sans-serif',
                    fontWeight: 600,
                    '&:hover': { color: '#FF8E00' }
                  }}
                >
                  +31 35 799 4575
                </MuiLink>
              </Box>

            </Box>
          </Box>
        </Box>
      </Box>
      
      {/* Bottom Purple Bar */}
      <Box
        sx={{
          bgcolor: '#823BEB',
          py: 3,
          px: 4,
          width: '100%'
        }}
      >
        <Box sx={{ px: { xs: 6, sm: 8, md: 12, lg: 16, xl: 20 }, width: '100%', maxWidth: '1400px', mx: 'auto' }}>
          <Box sx={{ width: '100%' }}>
            <Typography 
              variant="body2" 
              sx={{ 
                textAlign: 'center',
                color: 'white',
                fontSize: '14px',
                fontFamily: '"Nunito", sans-serif',
                fontWeight: 600
              }}
            >
              ©2025 Enboq. All rights reserved.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;