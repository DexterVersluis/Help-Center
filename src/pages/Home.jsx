import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DocumentationService } from '../services/documentationService';
import SEO from '../components/SEO';
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
  Grid,
  Skeleton,
  CircularProgress
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
  AutoAwesome,
  Timeline
} from '@mui/icons-material';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [quickStartGuides, setQuickStartGuides] = useState([]);
  const [loading, setLoading] = useState(true);
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
      title: 'Product Roadmap',
      description: 'See what we\'re building next and track our development progress in real-time',
      icon: Timeline,
      link: '/roadmap',
      color: 'info'
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

  // Fetch quick start guides from database
  useEffect(() => {
    const fetchQuickStartGuides = async () => {
      try {
        setLoading(true);
        const { data: docsData, error } = await DocumentationService.getAllDocuments();
        
        if (error) {
          console.error('Error fetching documents:', error);
          return;
        }

        // Filter for quick start guides (you can adjust this filter based on your data structure)
        const quickStartDocs = (docsData || [])
          .filter(doc => 
            doc.category?.name?.toLowerCase().includes('getting started') || 
            doc.title.toLowerCase().includes('getting started') ||
            doc.title.toLowerCase().includes('quick start') ||
            doc.type === 'guide'
          )
          .slice(0, 3) // Limit to 3 guides
          .map(doc => ({
            id: doc.slug,
            title: doc.title,
            description: doc.description,
            category: doc.category?.name || 'Getting Started',
            readTime: doc.read_time || '5 min',
            difficulty: doc.difficulty || 'Beginner',
            slug: doc.slug
          }));

        setQuickStartGuides(quickStartDocs);
      } catch (error) {
        console.error('Error fetching quick start guides:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuickStartGuides();
  }, []);

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
      <SEO
        title="ENBOQ Help Center - Employee Onboarding & Preboarding Platform Support"
        description="Master ENBOQ with comprehensive guides, tutorials, and documentation. Get expert support for employee onboarding, gamification, buddy matching, and preboarding solutions."
        keywords="employee onboarding, preboarding software, gamification, buddy matching, ENBOQ help, onboarding platform, employee engagement, HR software"
        url="/"
      />
      {/* Hero Section */}
      <Box
        sx={{
          background: 'white',
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
                fontWeight: 900,
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
                {[
                  { label: 'Data Management', path: '/docs?search=data+management' },
                  { label: 'HRIS integrations', path: '/docs?search=HRIS+integrations' },
                  { label: 'Workflow Setup', path: '/docs?search=workflow+setup' },
                  { label: 'User Permissions', path: '/docs?search=user+permissions' }
                ].map((topic) => (
                  <Chip
                    key={topic.label}
                    label={topic.label}
                    component={Link}
                    to={topic.path}
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

        <Grid container spacing={3}>
          {supportServices.map((service, index) => {
            const Icon = service.icon;
            return (
              <Grid item xs={12} sm={6} lg={2.4} key={index}>
                <Card
                  elevation={2}
                  sx={{
                    height: '100%',
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
              </Grid>
            );
          })}
        </Grid>
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

        <Box display="flex" gap={3} mb={8} flexWrap="wrap">
          {loading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <Card key={index} elevation={3} sx={{ flex: 1, minWidth: 280, borderRadius: 3 }}>
                <CardContent sx={{ p: 3 }}>
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Box display="flex" gap={1}>
                      <Skeleton variant="rectangular" width={80} height={20} sx={{ borderRadius: 1 }} />
                      <Skeleton variant="rectangular" width={60} height={20} sx={{ borderRadius: 1 }} />
                    </Box>
                    <Skeleton variant="text" width={40} />
                  </Box>
                  <Skeleton variant="text" width="90%" height={28} sx={{ mb: 1 }} />
                  <Skeleton variant="text" width="100%" height={60} sx={{ mb: 2 }} />
                  <Skeleton variant="rectangular" width="100%" height={36} sx={{ borderRadius: 2 }} />
                </CardContent>
              </Card>
            ))
          ) : quickStartGuides.length === 0 ? (
            <Box textAlign="center" py={4} width="100%">
              <Typography variant="h6" color="text.secondary" gutterBottom>
                No quick start guides available
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Check back later for helpful getting started guides.
              </Typography>
            </Box>
          ) : (
            quickStartGuides.map((guide, index) => (
              <Card
                key={guide.id || index}
                elevation={3}
                sx={{
                  flex: 1,
                  minWidth: 280,
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  borderRadius: 3,
                  border: '1px solid',
                  borderColor: 'divider',
                  '&:hover': {
                    transform: 'translateY(-6px)',
                    boxShadow: 8,
                    borderColor: 'primary.main'
                  }
                }}
              >
                <CardContent sx={{ p: 3, flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Box display="flex" gap={1}>
                      <Chip 
                        label={guide.category} 
                        color="primary" 
                        variant="outlined"
                        size="small"
                        sx={{ fontWeight: 600, fontSize: '0.7rem' }}
                      />
                      <Chip 
                        label={guide.difficulty} 
                        color={guide.difficulty === 'Beginner' ? 'success' : guide.difficulty === 'Intermediate' ? 'warning' : 'error'}
                        size="small"
                        sx={{ fontSize: '0.7rem' }}
                      />
                    </Box>
                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500, fontSize: '0.7rem' }}>
                      {guide.readTime}
                    </Typography>
                  </Box>
                  
                  <Typography variant="h6" gutterBottom fontWeight={600} color="primary.main" sx={{ mb: 2 }}>
                    {guide.title}
                  </Typography>
                  
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3, lineHeight: 1.5, flex: 1 }}>
                    {guide.description && guide.description.length > 150 
                      ? `${guide.description.substring(0, 150)}...` 
                      : guide.description}
                  </Typography>
                  
                  <Button
                    component={Link}
                    to={`/docs/${guide.slug}`}
                    variant="contained"
                    fullWidth
                    endIcon={<ArrowForward />}
                    sx={{ 
                      borderRadius: 2,
                      py: 1,
                      textTransform: 'none',
                      fontWeight: 600
                    }}
                  >
                    Start Guide
                  </Button>
                </CardContent>
              </Card>
            ))
          )}
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


    </Box>
  );
};

export default Home;