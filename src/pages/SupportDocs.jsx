import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  TextField,
  Card,
  CardContent,
  CardActions,
  Grid,
  Chip,
  InputAdornment,
  Button,
  Paper,
  Avatar,
  Rating,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  IconButton
} from '@mui/material';
import {
  Search,
  MenuBook,
  PlayArrow,
  Description,
  AccessTime,
  Star,
  ArrowForward,
  Visibility,
  TrendingUp,
  Help,
  BugReport,
  Lightbulb,
  Email
} from '@mui/icons-material';

const SupportDocs = () => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [docs, setDocs] = useState([]);
  const [filteredDocs, setFilteredDocs] = useState([]);

  const categories = [
    'Getting Started',
    'Account Management',
    'Project Setup',
    'Collaboration',
    'Advanced Features',
    'Integrations',
    'Troubleshooting',
    'Setup Integrations'
  ];

  useEffect(() => {
    const sampleDocs = [
      {
        id: 'doc-001',
        title: 'Getting Started with ENBOQ',
        description: 'Complete guide to setting up your first project and understanding the basics',
        category: 'Getting Started',
        type: 'guide',
        readTime: '5 min',
        difficulty: 'Beginner',
        hasVideo: true,
        videoUrl: 'https://example.com/video1',
        steps: 6,
        rating: 4.8,
        views: 1250,
        lastUpdated: '2024-01-20T10:00:00Z'
      },
      {
        id: 'doc-002',
        title: 'Creating Your First Project',
        description: 'Step-by-step walkthrough of project creation with best practices',
        category: 'Project Setup',
        type: 'tutorial',
        readTime: '8 min',
        difficulty: 'Beginner',
        hasVideo: true,
        videoUrl: 'https://example.com/video2',
        steps: 10,
        rating: 4.9,
        views: 980,
        lastUpdated: '2024-01-18T14:30:00Z'
      },
      {
        id: 'doc-003',
        title: 'Advanced User Management',
        description: 'Managing team members, roles, and permissions in complex organizations',
        category: 'Account Management',
        type: 'guide',
        readTime: '12 min',
        difficulty: 'Advanced',
        hasVideo: false,
        steps: 15,
        rating: 4.6,
        views: 567,
        lastUpdated: '2024-01-15T09:15:00Z'
      },
      {
        id: 'doc-004',
        title: 'Real-time Collaboration Features',
        description: 'Learn how to use live editing, comments, and team communication tools',
        category: 'Collaboration',
        type: 'tutorial',
        readTime: '10 min',
        difficulty: 'Intermediate',
        hasVideo: true,
        videoUrl: 'https://example.com/video4',
        steps: 8,
        rating: 4.7,
        views: 743,
        lastUpdated: '2024-01-22T11:45:00Z'
      },
      {
        id: 'doc-005',
        title: 'Third-Party Integration Setup',
        description: 'Complete guide to setting up and configuring third-party integrations',
        category: 'Setup Integrations',
        type: 'reference',
        readTime: '15 min',
        difficulty: 'Advanced',
        hasVideo: false,
        steps: 12,
        rating: 4.5,
        views: 432,
        lastUpdated: '2024-01-10T16:20:00Z'
      },
      {
        id: 'doc-006',
        title: 'Troubleshooting Common Issues',
        description: 'Solutions to frequently encountered problems and error messages',
        category: 'Troubleshooting',
        type: 'reference',
        readTime: '6 min',
        difficulty: 'Beginner',
        hasVideo: false,
        steps: 0,
        rating: 4.4,
        views: 1100,
        lastUpdated: '2024-01-25T13:10:00Z'
      },
      {
        id: 'onboarding-platform-demo-enboq',
        title: 'Full ENBOQ Platform Demo',
        description: 'Comprehensive walkthrough of the ENBOQ platform features and capabilities, showcasing how to create engaging onboarding experiences',
        category: 'Getting Started',
        type: 'guide',
        readTime: '10 min',
        difficulty: 'Beginner',
        hasVideo: true,
        videoUrl: 'https://loom.com/share/3faa8ae6cc5b46a59a51b69bfdaf4107',
        steps: 10,
        rating: 4.9,
        views: 1250,
        lastUpdated: '2024-07-20T09:30:00Z'
      }
    ];
    setDocs(sampleDocs);
    setFilteredDocs(sampleDocs);

    // Check for search parameter in URL
    const urlParams = new URLSearchParams(location.search);
    const searchParam = urlParams.get('search');
    if (searchParam) {
      setSearchTerm(searchParam);
    }
  }, [location.search]);

  useEffect(() => {
    let filtered = docs;

    if (searchTerm) {
      filtered = filtered.filter(doc =>
        doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(doc => doc.category === selectedCategory);
    }

    setFilteredDocs(filtered);
  }, [docs, searchTerm, selectedCategory]);

  const getDifficultyColor = (difficulty) => {
    const colors = {
      'Beginner': 'success',
      'Intermediate': 'warning',
      'Advanced': 'error'
    };
    return colors[difficulty] || 'default';
  };

  const getTypeIcon = (type) => {
    const icons = {
      'guide': MenuBook,
      'tutorial': PlayArrow,
      'reference': Description
    };
    return icons[type] || Description;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const popularDocs = docs.filter(doc => doc.views > 700).slice(0, 3);

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
              Support Documentation
            </Typography>
            
            <Typography
              variant="h5"
              color="text.secondary"
              sx={{ mb: 6, lineHeight: 1.6 }}
            >
              Comprehensive guides, tutorials, and references to help you master ENBOQ
            </Typography>
            
            {/* Search and Filter */}
            <Paper
              elevation={3}
              sx={{
                p: 2,
                mb: 6,
                maxWidth: 800,
                mx: 'auto'
              }}
            >
              <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Search documentation... Try 'API setup' or 'getting started'"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search />
                      </InputAdornment>
                    ),
                  }}
                />
                <FormControl sx={{ minWidth: 200 }}>
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={selectedCategory}
                    label="Category"
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <MenuItem value="all">All Categories</MenuItem>
                    {categories.map(category => (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Stack>
            </Paper>

            {/* Popular Topics */}
            <Box>
              <Typography variant="h6" sx={{ mb: 2, color: 'text.secondary' }}>
                Popular topics:
              </Typography>
              <Stack direction="row" spacing={2} flexWrap="wrap" justifyContent="center">
                {['Getting Started', 'Setup Integrations', 'Project Setup', 'Troubleshooting'].map((topic) => (
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

      {/* Documentation Content */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} lg={8}>
            {filteredDocs.length === 0 ? (
              <Paper
                sx={{
                  p: 8,
                  textAlign: 'center',
                  borderRadius: 3
                }}
              >
                <MenuBook sx={{ fontSize: 80, color: 'primary.light', mb: 3 }} />
                <Typography variant="h4" gutterBottom>
                  No documentation found
                </Typography>
                <Typography color="text.secondary">
                  Try adjusting your search terms or category filter.
                </Typography>
              </Paper>
            ) : (
              <Stack spacing={4}>
                {filteredDocs.map((doc) => {
                  const TypeIcon = getTypeIcon(doc.type);
                  return (
                    <Card
                      key={doc.id}
                      component={Link}
                      to={`/docs/${doc.id}`}
                      sx={{
                        textDecoration: 'none',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: 6
                        }
                      }}
                    >
                      <CardContent sx={{ p: 4 }}>
                        <Box display="flex" alignItems="flex-start" gap={3}>
                          <Avatar
                            sx={{
                              width: 64,
                              height: 64,
                              bgcolor: 'primary.main'
                            }}
                          >
                            <TypeIcon sx={{ fontSize: 32 }} />
                          </Avatar>
                          
                          <Box flexGrow={1}>
                            <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                              <Typography variant="h5" component="h3" color="text.primary">
                                {doc.title}
                              </Typography>
                              <ArrowForward color="action" />
                            </Box>
                            
                            <Typography color="text.secondary" paragraph>
                              {doc.description}
                            </Typography>
                            
                            <Stack direction="row" spacing={1} mb={2} flexWrap="wrap">
                              <Chip
                                label={doc.difficulty}
                                color={getDifficultyColor(doc.difficulty)}
                                size="small"
                              />
                              <Chip
                                label={doc.category}
                                color="warning"
                                variant="outlined"
                                size="small"
                              />
                              {doc.hasVideo && (
                                <Chip
                                  icon={<PlayArrow />}
                                  label="Video"
                                  color="secondary"
                                  size="small"
                                />
                              )}
                            </Stack>
                            
                            <Box display="flex" justifyContent="space-between" alignItems="center">
                              <Stack direction="row" spacing={3} alignItems="center">
                                <Box display="flex" alignItems="center" gap={0.5}>
                                  <AccessTime fontSize="small" />
                                  <Typography variant="body2" color="text.secondary">
                                    {doc.readTime}
                                  </Typography>
                                </Box>
                                {doc.steps > 0 && (
                                  <Typography variant="body2" color="text.secondary">
                                    {doc.steps} steps
                                  </Typography>
                                )}
                                <Box display="flex" alignItems="center" gap={0.5}>
                                  <Rating value={doc.rating} precision={0.1} size="small" readOnly />
                                  <Typography variant="body2" color="text.secondary">
                                    {doc.rating}
                                  </Typography>
                                </Box>
                              </Stack>
                              
                              <Stack direction="row" spacing={2} alignItems="center">
                                <Box display="flex" alignItems="center" gap={0.5}>
                                  <Visibility fontSize="small" />
                                  <Typography variant="body2" color="text.secondary">
                                    {doc.views}
                                  </Typography>
                                </Box>
                                <Typography variant="body2" color="text.secondary">
                                  Updated {formatDate(doc.lastUpdated)}
                                </Typography>
                              </Stack>
                            </Box>
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  );
                })}
              </Stack>
            )}
          </Grid>
          
          <Grid item xs={12} lg={4}>
            <Stack spacing={4}>
              {/* Popular Guides */}
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Popular Guides
                  </Typography>
                  <Stack spacing={2}>
                    {popularDocs.map((doc, index) => (
                      <Paper
                        key={doc.id}
                        component={Link}
                        to={`/docs/${doc.id}`}
                        sx={{
                          p: 2,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 2,
                          textDecoration: 'none',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            backgroundColor: 'primary.light',
                            color: 'white'
                          }
                        }}
                      >
                        <Avatar
                          sx={{
                            width: 32,
                            height: 32,
                            bgcolor: 'primary.main',
                            fontSize: '0.875rem'
                          }}
                        >
                          {index + 1}
                        </Avatar>
                        <Box flexGrow={1}>
                          <Typography variant="body2" fontWeight="medium" noWrap>
                            {doc.title}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {doc.views} views
                          </Typography>
                        </Box>
                        <ArrowForward fontSize="small" />
                      </Paper>
                    ))}
                  </Stack>
                </CardContent>
              </Card>

              {/* Quick Links */}
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Quick Links
                  </Typography>
                  <Stack spacing={1}>
                    {[
                      { label: 'Frequently Asked Questions', to: '/faq', icon: Help },
                      { label: 'Submit Support Ticket', to: '/tickets/new', icon: BugReport },
                      { label: 'Request New Feature', to: '/features', icon: Lightbulb },
                      { label: 'Contact Support Team', to: 'mailto:support@enboq.com', icon: Email }
                    ].map((link) => (
                      <Paper
                        key={link.label}
                        component={link.to.startsWith('mailto:') ? 'a' : Link}
                        to={link.to.startsWith('mailto:') ? undefined : link.to}
                        href={link.to.startsWith('mailto:') ? link.to : undefined}
                        sx={{
                          p: 2,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          textDecoration: 'none',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            backgroundColor: 'primary.light',
                            color: 'white'
                          }
                        }}
                      >
                        <Box display="flex" alignItems="center" gap={1}>
                          <link.icon fontSize="small" />
                          <Typography variant="body2">
                            {link.label}
                          </Typography>
                        </Box>
                        <ArrowForward fontSize="small" />
                      </Paper>
                    ))}
                  </Stack>
                </CardContent>
              </Card>

              {/* Help CTA */}
              <Paper
                sx={{
                  p: 3,
                  background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
                  textAlign: 'center'
                }}
              >
                <Typography variant="h6" gutterBottom>
                  Need Personal Help?
                </Typography>
                <Typography color="text.secondary" paragraph>
                  Can't find what you're looking for? Our support team is ready to help.
                </Typography>
                <Button
                  component={Link}
                  to="/tickets/new"
                  variant="contained"
                  endIcon={<ArrowForward />}
                  fullWidth
                  sx={{ borderRadius: 3 }}
                >
                  Get Support
                </Button>
              </Paper>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default SupportDocs;