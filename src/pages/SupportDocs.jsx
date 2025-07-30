import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { DocumentationService } from '../services/documentationService';
import LoadingSpinner from '../components/LoadingSpinner';
import { DocumentListingSkeleton } from '../components/SkeletonLoaders';
import { usePrefetch } from '../hooks/usePrefetch';
import SEO from '../components/SEO';
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
  Email,
  Rocket,
  Launch
} from '@mui/icons-material';

const SupportDocs = () => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [docs, setDocs] = useState([]);
  const [filteredDocs, setFilteredDocs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { prefetchOnHover } = usePrefetch();

  // Load categories and documents
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        // Load categories
        const { data: categoriesData, error: categoriesError } = await DocumentationService.getCategories();
        if (categoriesError) throw categoriesError;
        setCategories(categoriesData || []);

        // Load documents
        const { data: docsData, error: docsError } = await DocumentationService.getAllDocuments();
        if (docsError) throw docsError;
        
        // Transform data to match existing component structure
        const transformedDocs = (docsData || []).map(doc => ({
          id: doc.slug,
          title: doc.title,
          description: doc.description,
          category: doc.category?.name || 'Uncategorized',
          type: doc.type,
          readTime: doc.read_time,
          difficulty: doc.difficulty,
          hasVideo: doc.has_video,
          videoUrl: doc.video_url,
          steps: 0, // We'll get this from steps count if needed
          rating: parseFloat(doc.rating),
          views: doc.views,
          lastUpdated: doc.updated_at
        }));

        setDocs(transformedDocs);
        setFilteredDocs(transformedDocs);

        // Check for search parameter in URL
        const urlParams = new URLSearchParams(location.search);
        const searchParam = urlParams.get('search');
        if (searchParam) {
          setSearchTerm(searchParam);
        }
      } catch (err) {
        console.error('Error loading documentation:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [location.search]);

  // Handle search and filtering
  useEffect(() => {
    const filterDocs = async () => {
      let filtered = docs;

      // If there's a search term, use Supabase search
      if (searchTerm.trim()) {
        try {
          const { data: searchResults, error } = await DocumentationService.searchDocuments(searchTerm);
          if (!error && searchResults) {
            filtered = searchResults.map(doc => ({
              id: doc.slug,
              title: doc.title,
              description: doc.description,
              category: doc.category?.name || 'Uncategorized',
              type: doc.type,
              readTime: doc.read_time,
              difficulty: doc.difficulty,
              hasVideo: doc.has_video,
              videoUrl: doc.video_url,
              steps: 0,
              rating: parseFloat(doc.rating),
              views: doc.views,
              lastUpdated: doc.updated_at
            }));
          }
        } catch (err) {
          console.error('Search error:', err);
          // Fall back to local filtering
          filtered = docs.filter(doc =>
            doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            doc.category.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }
      }

      // Apply category filter
      if (selectedCategory !== 'all') {
        filtered = filtered.filter(doc => doc.category === selectedCategory);
      }

      setFilteredDocs(filtered);
    };

    filterDocs();
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

  if (loading) {
    return <DocumentListingSkeleton />;
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Paper sx={{ p: 8, textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom color="error">
            Error Loading Documentation
          </Typography>
          <Typography color="text.secondary" paragraph>
            {error}
          </Typography>
          <Button
            variant="contained"
            onClick={() => window.location.reload()}
          >
            Try Again
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Box>
      <SEO
        title="Documentation - ENBOQ Help Center"
        description="Comprehensive guides, tutorials, and references to help you master ENBOQ's employee onboarding platform. Find step-by-step instructions for all features."
        keywords="ENBOQ documentation, onboarding guides, tutorials, help articles, employee onboarding platform, preboarding software"
        url="/docs"
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
              All documentation
            </Typography>
            
            <Typography
              variant="h5"
              color="text.secondary"
              sx={{ mb: 6, lineHeight: 1.6 }}
            >
              Comprehensive guides, tutorials, and references to help you master ENBOQ
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
                {categories.map((category) => (
                  <Chip
                    key={category.slug}
                    label={category.name}
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
          <Grid size={{ xs: 12, md: 8 }}>
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
                      {...prefetchOnHover(doc.id)}
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
                              </Stack>
                              
                              <Typography variant="body2" color="text.secondary">
                                Updated {formatDate(doc.lastUpdated)}
                              </Typography>
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

          {/* Sidebar */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ position: 'sticky', top: 88 }}>
              {/* CTA Card */}
              <Card 
                elevation={4}
                sx={{ 
                  mb: 4,
                  background: 'linear-gradient(135deg, #823BEB 0%, #ED00B8 100%)',
                  color: 'white',
                  borderRadius: 3,
                  overflow: 'hidden'
                }}
              >
                <CardContent sx={{ p: 4, textAlign: 'center' }}>
                  <Box display="flex" justifyContent="center" mb={2}>
                    <Box
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: '50%',
                        bgcolor: 'rgba(255,255,255,0.25)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 2,
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                      }}
                    >
                      <Rocket sx={{ fontSize: 30, color: 'white' }} />
                    </Box>
                  </Box>
                  
                  <Typography 
                    variant="h6" 
                    gutterBottom 
                    fontWeight={700}
                    sx={{ 
                      color: 'white',
                      textShadow: '0 1px 2px rgba(0,0,0,0.1)'
                    }}
                  >
                    Not yet using ENBOQ?
                  </Typography>
                  
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      mb: 3, 
                      lineHeight: 1.5,
                      color: 'white',
                      fontWeight: 500,
                      textShadow: '0 1px 2px rgba(0,0,0,0.1)'
                    }}
                  >
                    Get it 2 weeks for free now!
                  </Typography>
                  
                  <Button
                    href="https://start.enboq.com/admin/register?utm_source=help_center&utm_medium=sidebar_cta&utm_campaign=docs_trial&utm_content=2_week_trial"
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="contained"
                    fullWidth
                    endIcon={<Launch />}
                    sx={{
                      bgcolor: 'white',
                      color: '#823BEB',
                      fontWeight: 700,
                      py: 1.5,
                      borderRadius: 2,
                      textTransform: 'none',
                      fontSize: '1rem',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                      '&:hover': {
                        bgcolor: '#f8f9fa',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 6px 20px rgba(0,0,0,0.2)'
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Start Free Trial
                  </Button>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card sx={{ mb: 4 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Quick Actions
                  </Typography>
                  <Stack spacing={1}>
                    <Button
                      component={Link}
                      to="/tickets/new"
                      variant="outlined"
                      fullWidth
                      startIcon={<BugReport />}
                      sx={{ 
                        justifyContent: 'flex-start',
                        textTransform: 'none',
                        borderRadius: 2
                      }}
                    >
                      Get Support
                    </Button>
                    <Button
                      component={Link}
                      to="/features/new"
                      variant="outlined"
                      fullWidth
                      startIcon={<Lightbulb />}
                      sx={{ 
                        justifyContent: 'flex-start',
                        textTransform: 'none',
                        borderRadius: 2
                      }}
                    >
                      Request Feature
                    </Button>
                    <Button
                      component={Link}
                      to="/roadmap"
                      variant="outlined"
                      fullWidth
                      startIcon={<TrendingUp />}
                      sx={{ 
                        justifyContent: 'flex-start',
                        textTransform: 'none',
                        borderRadius: 2
                      }}
                    >
                      View Roadmap
                    </Button>
                  </Stack>
                </CardContent>
              </Card>

              {/* Popular Docs */}
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Popular Guides
                  </Typography>
                  <Stack spacing={2}>
                    {popularDocs.slice(0, 2).map((doc, index) => (
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
                            color: 'white',
                            transform: 'translateX(4px)'
                          }
                        }}
                      >
                        <Box
                          sx={{
                            width: 24,
                            height: 24,
                            borderRadius: '50%',
                            bgcolor: 'primary.main',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            flexShrink: 0
                          }}
                        >
                          {index + 1}
                        </Box>
                        <Box flexGrow={1} sx={{ minWidth: 0 }}>
                          <Typography 
                            variant="body2" 
                            fontWeight="medium" 
                            sx={{
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden',
                              lineHeight: 1.3,
                              fontSize: '0.875rem'
                            }}
                          >
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
            </Box>
          </Grid>
        </Grid>

      </Container>

    </Box>
  );
};

export default SupportDocs;