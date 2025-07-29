import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  CardActions,
  Chip,
  InputAdornment,
  Paper,
  Stack,
  Avatar,
  Divider,
  Fade,
  Slide,
  Grid
} from '@mui/material';
import {
  Search,
  BugReport,
  Description,
  Lightbulb,
  ArrowForward,
  Help,
  Settings,
  Code,
  Storage,
  Security,
  AccountTree,
  Article,
  SupportAgent,
  School,
  Speed,
  CheckCircle,
  TrendingUp,
  Groups,
  AutoAwesome
} from '@mui/icons-material';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  
  const supportServices = [
    {
      title: 'Expert Support',
      description: 'Get personalized help from ENBOQ specialists who understand your onboarding challenges',
      icon: SupportAgent,
      link: '/tickets/new',
      color: 'primary'
    },
    {
      title: 'Onboarding Guides',
      description: 'Comprehensive step-by-step documentation to get your team up and running quickly',
      icon: School,
      link: '/docs',
      color: 'secondary'
    },
    {
      title: 'Quick Solutions',
      description: 'Find instant answers to common questions and troubleshooting scenarios',
      icon: Speed,
      link: '/faq',
      color: 'success'
    },
    {
      title: 'Feature Requests',
      description: 'Shape the future of ENBOQ by sharing your ideas and enhancement suggestions',
      icon: Lightbulb,
      link: '/features',
      color: 'warning'
    }
  ];

  const onboardingFeatures = [
    {
      icon: CheckCircle,
      title: 'Streamlined Setup',
      description: 'Get your ENBOQ environment configured and ready for your team in minutes, not hours'
    },
    {
      icon: Groups,
      title: 'Team Collaboration',
      description: 'Seamlessly onboard multiple team members with role-based access and permissions'
    },
    {
      icon: Settings,
      title: 'System Integration',
      description: 'Connect ENBOQ with your existing tools and workflows for a unified experience'
    },
    {
      icon: TrendingUp,
      title: 'Success Tracking',
      description: 'Monitor your onboarding progress and measure team adoption with built-in analytics'
    }
  ];

  const quickStartGuides = [
    {
      title: 'Getting Started with ENBOQ',
      description: 'Complete guide to setting up your first project and understanding the basics',
      category: 'Getting Started',
      readTime: '5 min',
      difficulty: 'Beginner'
    },
    {
      title: 'Full ENBOQ Platform Demo',
      description: 'Comprehensive walkthrough of the ENBOQ platform features and capabilities',
      category: 'Getting Started',
      readTime: '10 min',
      difficulty: 'Beginner'
    }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // Navigate to docs page with search term as URL parameter
      navigate(`/docs?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
          py: { xs: 8, md: 12 },
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
                fontWeight: 'bold',
                background: 'linear-gradient(45deg, #1976d2, #dc004e)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 3
              }}
            >
              Master ENBOQ with ease
            </Typography>
            
            <Typography
              variant="h5"
              color="text.secondary"
              sx={{ mb: 6, lineHeight: 1.6 }}
            >
              Find guides, tutorials, and documentation to help you get the most out of ENBOQ's powerful features
            </Typography>
            
            {/* Search Bar */}
            <Paper
              elevation={3}
              sx={{
                p: 1,
                mb: 6,
                borderRadius: 3,
                maxWidth: 600,
                mx: 'auto'
              }}
            >
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Search ENBOQ docs... Try 'How do I create a workflow?'"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={handleKeyPress}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button
                        variant="contained"
                        onClick={handleSearch}
                        disabled={!searchTerm.trim()}
                        sx={{ borderRadius: 2 }}
                      >
                        Search
                      </Button>
                    </InputAdornment>
                  ),
                  sx: { '& .MuiOutlinedInput-notchedOutline': { border: 'none' } }
                }}
              />
            </Paper>

            {/* Popular Topics */}
            <Box>
              <Typography variant="h6" sx={{ mb: 2, color: 'text.secondary' }}>
                Popular topics:
              </Typography>
              <Stack direction="row" spacing={2} flexWrap="wrap" justifyContent="center">
                {['Data Management', 'API Integration', 'Workflow Setup', 'User Permissions'].map((topic) => (
                  <Chip
                    key={topic}
                    label={topic}
                    component={Link}
                    to="/docs"
                    clickable
                    variant="outlined"
                    sx={{
                      borderRadius: 3,
                      '&:hover': {
                        backgroundColor: 'primary.main',
                        color: 'white',
                        transform: 'translateY(-2px)'
                      },
                      transition: 'all 0.3s ease'
                    }}
                  />
                ))}
              </Stack>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Support Services */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Fade in timeout={800}>
          <Box textAlign="center" mb={8}>
            <Typography 
              variant="h2" 
              gutterBottom
              sx={{ 
                fontWeight: 700,
                background: 'linear-gradient(45deg, #1976d2, #42a5f5)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              ENBOQ Support & Onboarding
            </Typography>
            <Typography variant="h5" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
              Everything you need to successfully implement and master ENBOQ for your organization
            </Typography>
          </Box>
        </Fade>

        <Box display="flex" gap={2}>
          {supportServices.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card
                key={index}
                elevation={2}
                sx={{
                  flex: 1,
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  borderRadius: 3,
                  border: '1px solid',
                  borderColor: 'divider',
                  minHeight: 280,
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 8,
                    borderColor: `${service.color}.main`
                  }
                }}
              >
                <Box textAlign="center" mb={2}>
                  <Avatar
                    sx={{
                      width: 40,
                      height: 40,
                      mx: 'auto',
                      mb: 1,
                      bgcolor: `${service.color}.main`,
                      boxShadow: 3
                    }}
                  >
                    <Icon sx={{ fontSize: 20 }} />
                  </Avatar>
                  <Typography variant="subtitle1" gutterBottom fontWeight={600}>
                    {service.title}
                  </Typography>
                </Box>
                <Box flex={1} mb={2}>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.4, fontSize: '0.8rem' }}>
                    {service.description}
                  </Typography>
                </Box>
                <Button
                  component={Link}
                  to={service.link}
                  variant="contained"
                  color={service.color}
                  fullWidth
                  endIcon={<ArrowForward />}
                  sx={{ 
                    borderRadius: 2,
                    py: 0.8,
                    textTransform: 'none',
                    fontSize: '0.8rem',
                    fontWeight: 600
                  }}
                >
                  Get Started
                </Button>
              </Card>
            );
          })}
        </Box>
      </Container>

      {/* Onboarding Features */}
      <Box sx={{ bgcolor: 'grey.50', py: 10 }}>
        <Container maxWidth="lg">
          <Fade in timeout={1000}>
            <Box textAlign="center" mb={8}>
              <Typography 
                variant="h2" 
                gutterBottom
                sx={{ 
                  fontWeight: 700,
                  color: 'text.primary'
                }}
              >
                Why Choose ENBOQ for Onboarding?
              </Typography>
              <Typography variant="h5" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
                Our platform is designed specifically to make team onboarding smooth, efficient, and successful
              </Typography>
            </Box>
          </Fade>

          <Box display="flex" gap={2}>
            {onboardingFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Paper
                  key={index}
                  elevation={3}
                  sx={{
                    flex: 1,
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    borderRadius: 4,
                    minHeight: 220,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: 6
                    }
                  }}
                >
                  <Avatar
                    sx={{
                      width: 48,
                      height: 48,
                      bgcolor: 'primary.main',
                      boxShadow: 4,
                      mb: 1
                    }}
                  >
                    <Icon sx={{ fontSize: 24 }} />
                  </Avatar>
                  <Typography variant="subtitle1" gutterBottom fontWeight={600} color="primary.main">
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.4, fontSize: '0.8rem' }}>
                    {feature.description}
                  </Typography>
                </Paper>
              );
            })}
          </Box>
        </Container>
      </Box>

      {/* Quick Start Guides */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Fade in timeout={1200}>
          <Box textAlign="center" mb={8}>
            <Typography 
              variant="h2" 
              gutterBottom
              sx={{ 
                fontWeight: 700,
                color: 'text.primary'
              }}
            >
              Quick Start Guides
            </Typography>
            <Typography variant="h5" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
              Get your team onboarded with our step-by-step guides tailored to your experience level
            </Typography>
          </Box>
        </Fade>

        <Box display="flex" gap={2} mb={8}>
          {quickStartGuides.map((guide, index) => (
            <Card
              key={index}
              elevation={3}
              sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                borderRadius: 3,
                border: '1px solid',
                borderColor: 'divider',
                minHeight: 320,
                '&:hover': {
                  transform: 'translateY(-6px)',
                  boxShadow: 8,
                  borderColor: 'primary.main'
                }
              }}
            >
              <CardContent sx={{ p: 2, flex: 1, display: 'flex', flexDirection: 'column' }}>
                <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1}>
                  <Box display="flex" flexDirection="column" gap={0.5}>
                    <Chip 
                      label={guide.category} 
                      color="primary" 
                      variant="outlined"
                      size="small"
                      sx={{ fontWeight: 600, fontSize: '0.7rem', alignSelf: 'flex-start' }}
                    />
                    <Chip 
                      label={guide.difficulty} 
                      color={guide.difficulty === 'Beginner' ? 'success' : guide.difficulty === 'Intermediate' ? 'warning' : 'error'}
                      size="small"
                      sx={{ fontSize: '0.7rem', alignSelf: 'flex-start' }}
                    />
                  </Box>
                  <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500, fontSize: '0.7rem' }}>
                    {guide.readTime}
                  </Typography>
                </Box>
                
                <Typography variant="subtitle1" gutterBottom fontWeight={600} color="primary.main">
                  {guide.title}
                </Typography>
                
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.4, flex: 1, fontSize: '0.8rem' }}>
                  {guide.description}
                </Typography>
                
                <Button
                  component={Link}
                  to="/docs"
                  variant="contained"
                  fullWidth
                  endIcon={<ArrowForward />}
                  sx={{ 
                    borderRadius: 2,
                    py: 0.8,
                    textTransform: 'none',
                    fontSize: '0.8rem',
                    fontWeight: 600
                  }}
                >
                  Start Guide
                </Button>
              </CardContent>
            </Card>
          ))}
        </Box>

        <Fade in timeout={1500}>
          <Paper
            elevation={4}
            sx={{
              p: 6,
              background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
              borderRadius: 4,
              textAlign: 'center'
            }}
          >
            <Avatar
              sx={{
                width: 80,
                height: 80,
                mx: 'auto',
                mb: 3,
                bgcolor: 'primary.main',
                boxShadow: 3
              }}
            >
              <AutoAwesome sx={{ fontSize: 40 }} />
            </Avatar>
            <Typography variant="h3" gutterBottom fontWeight={700} color="primary.main">
              Need Personalized Onboarding?
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}>
              Our onboarding specialists can provide customized training sessions and implementation support for your specific use case
            </Typography>
            <Button
              component={Link}
              to="/tickets/new"
              variant="contained"
              size="large"
              endIcon={<ArrowForward />}
              sx={{ 
                borderRadius: 3,
                px: 5,
                py: 2,
                textTransform: 'none',
                fontSize: '1.2rem',
                fontWeight: 600
              }}
            >
              Request Custom Onboarding
            </Button>
          </Paper>
        </Fade>
      </Container>

      {/* CTA Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 50%, #0d47a1 100%)',
          color: 'white',
          py: 12,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
            opacity: 0.3
          }}
        />
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Fade in timeout={1600}>
            <Box textAlign="center">
              <Typography 
                variant="h1" 
                gutterBottom
                sx={{ 
                  fontWeight: 800,
                  fontSize: { xs: '2.5rem', md: '4rem' },
                  mb: 3
                }}
              >
                Ready to Get Started?
              </Typography>
              <Typography 
                variant="h4" 
                sx={{ 
                  mb: 6, 
                  opacity: 0.95,
                  fontWeight: 300,
                  maxWidth: 800,
                  mx: 'auto',
                  lineHeight: 1.4
                }}
              >
                Join thousands of teams who have successfully onboarded with ENBOQ. 
                Our support team is here to ensure your success every step of the way.
              </Typography>
              
              <Stack 
                direction={{ xs: 'column', sm: 'row' }} 
                spacing={4} 
                justifyContent="center"
                alignItems="center"
              >
                <Button
                  component={Link}
                  to="/tickets/new"
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForward />}
                  sx={{
                    bgcolor: 'white',
                    color: 'primary.main',
                    px: 5,
                    py: 2,
                    fontSize: '1.2rem',
                    fontWeight: 600,
                    borderRadius: 3,
                    textTransform: 'none',
                    boxShadow: 4,
                    '&:hover': { 
                      bgcolor: 'grey.100',
                      transform: 'translateY(-2px)',
                      boxShadow: 6
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  Get Expert Support
                </Button>
                <Button
                  component={Link}
                  to="/docs"
                  variant="outlined"
                  size="large"
                  endIcon={<ArrowForward />}
                  sx={{
                    borderColor: 'white',
                    color: 'white',
                    px: 5,
                    py: 2,
                    fontSize: '1.2rem',
                    fontWeight: 600,
                    borderRadius: 3,
                    textTransform: 'none',
                    borderWidth: 2,
                    '&:hover': { 
                      borderColor: 'white', 
                      bgcolor: 'rgba(255,255,255,0.1)',
                      transform: 'translateY(-2px)'
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  Browse Documentation
                </Button>
              </Stack>
            </Box>
          </Fade>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;