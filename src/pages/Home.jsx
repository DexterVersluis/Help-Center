import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  Chip,
  InputAdornment,
  IconButton,
  Paper,
  Stack,
  Avatar,
  Divider
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
  Article
} from '@mui/icons-material';

const Home = () => {
  console.log('Home component loaded - TESTING CHANGES');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const quickActions = [
    {
      title: 'Submit a Ticket',
      description: 'Get personalized help from our support team',
      icon: BugReport,
      link: '/tickets/new',
      actionText: 'Get started',
      color: 'primary'
    },
    {
      title: 'Browse Documentation',
      description: 'Step-by-step guides and tutorials',
      icon: Description,
      link: '/docs',
      actionText: 'Get started',
      color: 'secondary'
    },
    {
      title: 'Request a Feature',
      description: 'Share your ideas for new features',
      icon: Lightbulb,
      link: '/features',
      actionText: 'Get started',
      color: 'warning'
    },
    {
      title: 'View FAQ',
      description: 'Quick answers to common questions',
      icon: Help,
      link: '/faq',
      actionText: 'Get started',
      color: 'success'
    }
  ];

  const popularTopics = [
    'Getting Started with ENBOQ',
    'Account Setup and Management',
    'Project Collaboration'
  ];

  const enboqFeatures = [
    {
      icon: Storage,
      title: 'Data Management',
      description: 'Organize and manage your data efficiently with ENBOQ\'s powerful database tools',
      link: '/docs/data-management'
    },
    {
      icon: AccountTree,
      title: 'Workflow Automation',
      description: 'Streamline your processes with automated workflows and custom triggers',
      link: '/docs/workflows'
    },
    {
      icon: Code,
      title: 'API Integration',
      description: 'Connect ENBOQ with your existing tools using our comprehensive API',
      link: '/docs/api'
    },
    {
      icon: Security,
      title: 'Security & Permissions',
      description: 'Control access and secure your data with advanced permission settings',
      link: '/docs/security'
    }
  ];

  const howToGuides = [
    {
      title: 'Setting Up Your First Project',
      description: 'Learn how to create and configure your first ENBOQ project',
      category: 'Getting Started',
      readTime: '5 min read',
      link: '/docs/first-project'
    },
    {
      title: 'Managing Team Permissions',
      description: 'Configure user roles and permissions for your team members',
      category: 'Administration',
      readTime: '8 min read',
      link: '/docs/team-permissions'
    },
    {
      title: 'Creating Custom Workflows',
      description: 'Build automated workflows to streamline your business processes',
      category: 'Automation',
      readTime: '12 min read',
      link: '/docs/custom-workflows'
    },
    {
      title: 'Integrating with External APIs',
      description: 'Connect ENBOQ with third-party services and applications',
      category: 'Integration',
      readTime: '10 min read',
      link: '/docs/api-integration'
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

      {/* Quick Actions */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box textAlign="center" mb={6}>
          <Typography variant="h2" gutterBottom>
            What would you like to do?
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Choose your path to getting the help you need
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
                <Grid item xs={6} sm={3} md={3} lg={3} key={index}>                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: 6
                    }
                  }}
                >
                  <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                    <Avatar
                      sx={{
                        width: 64,
                        height: 64,
                        mx: 'auto',
                        mb: 2,
                        bgcolor: `${action.color}.main`
                      }}
                    >
                      <Icon sx={{ fontSize: 32 }} />
                    </Avatar>
                    <Typography variant="h5" gutterBottom>
                      {action.title}
                    </Typography>
                    <Typography color="text.secondary">
                      {action.description}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
                    <Button
                      component={Link}
                      to={action.link}
                      endIcon={<ArrowForward />}
                      color={action.color}
                    >
                      {action.actionText}
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>

      {/* ENBOQ Features */}
      <Box sx={{ bgcolor: 'background.default', py: 8 }}>
        <Container maxWidth="lg">
          <Box textAlign="center" mb={6}>
            <Typography variant="h2" gutterBottom>
              Discover ENBOQ Features
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Explore the powerful capabilities that make ENBOQ the perfect solution for your business needs
            </Typography>
          </Box>

          <Grid container spacing={3} mb={4}>
            {enboqFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Grid item xs={6} sm={3} md={3} lg={3} key={index}>
                  <Card
                    sx={{
                      height: '100%',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: 4
                      }
                    }}
                  >
                    <CardContent sx={{ textAlign: 'center' }}>
                      <Avatar
                        sx={{
                          width: 48,
                          height: 48,
                          mx: 'auto',
                          mb: 2,
                          bgcolor: 'primary.main'
                        }}
                      >
                        <Icon sx={{ fontSize: 24 }} />
                      </Avatar>
                      <Typography variant="h6" gutterBottom>
                        {feature.title}
                      </Typography>
                      <Typography color="text.secondary" sx={{ mb: 2, fontSize: '0.875rem' }}>
                        {feature.description}
                      </Typography>
                      <Button
                        component={Link}
                        to={feature.link}
                        endIcon={<ArrowForward />}
                        color="primary"
                        size="small"
                      >
                        Learn more
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>

          <Box textAlign="center">
            <Button
              component={Link}
              to="/docs"
              variant="contained"
              size="large"
              endIcon={<ArrowForward />}
              sx={{ borderRadius: 3 }}
            >
              View All Features
            </Button>
          </Box>
        </Container>
      </Box>

      {/* How-to Guides */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box textAlign="center" mb={6}>
          <Typography variant="h2" gutterBottom>
            Step-by-Step Guides
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Learn how to make the most of ENBOQ with our comprehensive tutorials and guides
          </Typography>
        </Box>

        <Grid container spacing={3} mb={6}>
          {howToGuides.map((guide, index) => (
            <Grid item xs={6} sm={3} md={3} lg={3} key={index}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4
                  }
                }}
              >
                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Chip label={guide.category} color="warning" size="small" />
                    <Typography variant="caption" color="text.secondary">
                      {guide.readTime}
                    </Typography>
                  </Box>
                  
                  <Typography variant="h6" gutterBottom>
                    {guide.title}
                  </Typography>
                  
                  <Typography color="text.secondary" sx={{ mb: 2, flexGrow: 1, fontSize: '0.875rem' }}>
                    {guide.description}
                  </Typography>
                  
                  <Button
                    component={Link}
                    to={guide.link}
                    endIcon={<ArrowForward />}
                    color="primary"
                    size="small"
                    sx={{ alignSelf: 'flex-start' }}
                  >
                    Read guide
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} lg={6}>
            <Paper
              sx={{
                p: 4,
                background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
                borderRadius: 3
              }}
            >
              <Typography variant="h4" gutterBottom>
                Popular Topics
              </Typography>
              <Stack spacing={2}>
                {popularTopics.concat(['Data Import & Export', 'Custom Field Configuration', 'Reporting & Analytics']).map((topic, index) => (
                  <Paper
                    key={index}
                    component={Link}
                    to="/docs"
                    sx={{
                      p: 2,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      textDecoration: 'none',
                      color: 'inherit',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        backgroundColor: 'primary.light',
                        color: 'white'
                      }
                    }}
                  >
                    <Typography fontWeight="medium">{topic}</Typography>
                    <ArrowForward />
                  </Paper>
                ))}
              </Stack>
            </Paper>
          </Grid>

          <Grid item xs={12} lg={6}>
            <Stack spacing={4}>
              {[
                { icon: Article, title: 'Comprehensive Documentation', desc: 'Detailed guides covering every aspect of ENBOQ functionality' },
                { icon: Settings, title: 'Configuration Examples', desc: 'Real-world examples and best practices for setup and configuration' },
                { icon: Code, title: 'Code Samples', desc: 'Ready-to-use code snippets and integration examples' }
              ].map((item, index) => (
                <Box key={index} display="flex" alignItems="flex-start" gap={2}>
                  <Avatar sx={{ bgcolor: 'primary.main' }}>
                    <item.icon />
                  </Avatar>
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      {item.title}
                    </Typography>
                    <Typography color="text.secondary">
                      {item.desc}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box
        sx={{
          background: 'linear-gradient(45deg, #1976d2, #dc004e)',
          color: 'white',
          py: 8,
          textAlign: 'center'
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h2" gutterBottom>
            Need personalized help?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
            Can't find the answer in our documentation? Get direct support from our ENBOQ experts 
            who can help with your specific use case.
          </Typography>
          
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} justifyContent="center">
            <Button
              component={Link}
              to="/tickets/new"
              variant="contained"
              size="large"
              endIcon={<ArrowForward />}
              sx={{
                bgcolor: 'white',
                color: 'primary.main',
                '&:hover': { bgcolor: 'grey.100' }
              }}
            >
              Submit Support Ticket
            </Button>
            <Button
              href="mailto:support@enboq.com"
              variant="outlined"
              size="large"
              sx={{
                borderColor: 'white',
                color: 'white',
                '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' }
              }}
            >
              Email Support Team
            </Button>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;