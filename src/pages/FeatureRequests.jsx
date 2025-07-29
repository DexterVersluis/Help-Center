import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import FeatureCard from '../components/FeatureCard';
import {
  Box,
  Container,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Card,
  CardContent,
  Chip,
  Button,
  InputAdornment,
  Grid,
  Paper,
  IconButton,
  Fade,
  Zoom,
  Stack
} from '@mui/material';
import {
  Search as SearchIcon,
  Add as AddIcon,
  ThumbUp as ThumbsUpIcon,
  ChatBubbleOutline as MessageCircleIcon,
  CalendarToday as CalendarIcon,
  EmojiObjects as LightbulbIcon,
  ArrowForward as ArrowRightIcon
} from '@mui/icons-material';

const FeatureRequests = () => {
  const [features, setFeatures] = useState([]);
  const [filteredFeatures, setFilteredFeatures] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    const savedFeatures = JSON.parse(localStorage.getItem('featureRequests') || '[]');
    if (savedFeatures.length === 0) {
      const sampleFeatures = [
        {
          id: 'FEAT-001',
          title: 'Dark Mode Support',
          description: 'Add a dark mode theme option for better user experience during night time usage.',
          status: 'in-progress',
          votes: 45,
          comments: 12,
          category: 'UI/UX',
          createdAt: '2024-01-15T10:00:00Z',
          updatedAt: '2024-01-20T14:30:00Z',
          author: 'user@example.com'
        },
        {
          id: 'FEAT-002',
          title: 'Advanced Search Filters',
          description: 'Implement more granular search filters including date ranges, custom fields, and saved search queries.',
          status: 'planned',
          votes: 32,
          comments: 8,
          category: 'Search',
          createdAt: '2024-01-10T09:15:00Z',
          updatedAt: '2024-01-18T11:45:00Z',
          author: 'admin@enboq.com'
        },
        {
          id: 'FEAT-003',
          title: 'Mobile App Push Notifications',
          description: 'Add push notification support for mobile apps to keep users informed about important updates.',
          status: 'completed',
          votes: 67,
          comments: 23,
          category: 'Mobile',
          createdAt: '2023-12-20T16:20:00Z',
          updatedAt: '2024-01-25T09:10:00Z',
          author: 'mobile@example.com'
        },
        {
          id: 'FEAT-004',
          title: 'Bulk Operations',
          description: 'Allow users to perform bulk operations on multiple items simultaneously for improved efficiency.',
          status: 'under-review',
          votes: 28,
          comments: 5,
          category: 'Productivity',
          createdAt: '2024-01-08T13:45:00Z',
          updatedAt: '2024-01-12T10:20:00Z',
          author: 'power@example.com'
        },
        {
          id: 'FEAT-005',
          title: 'API Rate Limiting Dashboard',
          description: 'Provide a dashboard to monitor API usage and rate limiting status for developers.',
          status: 'rejected',
          votes: 15,
          comments: 3,
          category: 'API',
          createdAt: '2024-01-05T11:30:00Z',
          updatedAt: '2024-01-07T15:15:00Z',
          author: 'dev@example.com'
        }
      ];
      localStorage.setItem('featureRequests', JSON.stringify(sampleFeatures));
      setFeatures(sampleFeatures);
    } else {
      setFeatures(savedFeatures);
    }
  }, []);

  useEffect(() => {
    let filtered = features;

    if (searchTerm) {
      filtered = filtered.filter(feature =>
        feature.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        feature.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        feature.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(feature => feature.status === statusFilter);
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'votes':
          return b.votes - a.votes;
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'newest':
        default:
          return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });

    setFilteredFeatures(filtered);
  }, [features, searchTerm, statusFilter, sortBy]);

  const getStatusChipProps = useCallback((status) => {
    const statusMap = {
      'under-review': { color: 'primary', variant: 'filled' },
      'planned': { color: 'info', variant: 'filled' },
      'in-progress': { color: 'warning', variant: 'filled' },
      'completed': { color: 'success', variant: 'filled' },
      'rejected': { color: 'error', variant: 'outlined' }
    };
    return statusMap[status] || { color: 'primary', variant: 'filled' };
  }, []);

  const getStatusLabel = useCallback((status) => {
    const labels = {
      'under-review': 'Under Review',
      'planned': 'Planned',
      'in-progress': 'In Progress',
      'completed': 'Completed',
      'rejected': 'Rejected'
    };
    return labels[status] || status;
  }, []);

  const formatDate = useCallback((dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }, []);

  const handleVote = useCallback((featureId, voteType) => {
    const currentVote = localStorage.getItem(`voted_${featureId}`);
    
    // If user already voted the same way, do nothing
    if (currentVote === voteType) return;
    
    const updatedFeatures = features.map(feature => {
      if (feature.id === featureId) {
        let newVotes = feature.votes;
        
        // Remove previous vote if exists
        if (currentVote === 'up') {
          newVotes -= 1;
        } else if (currentVote === 'down') {
          newVotes += 1;
        }
        
        // Apply new vote
        if (voteType === 'up') {
          newVotes += 1;
        } else if (voteType === 'down') {
          newVotes -= 1;
        }
        
        localStorage.setItem(`voted_${featureId}`, voteType);
        return { ...feature, votes: newVotes };
      }
      return feature;
    });
    
    setFeatures(updatedFeatures);
    localStorage.setItem('featureRequests', JSON.stringify(updatedFeatures));
  }, [features]);

  const hasVoted = useCallback((featureId) => {
    return localStorage.getItem(`voted_${featureId}`) || null;
  }, []);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50' }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          py: { xs: 8, md: 12 },
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="lg">
          <Fade in timeout={800}>
            <Box textAlign="center">
              <Typography
                variant="h2"
                component="h1"
                sx={{
                  fontWeight: 800,
                  mb: 3,
                  fontSize: { xs: '2.5rem', md: '4rem' },
                  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
                }}
              >
                Feature Requests
              </Typography>
              
              <Typography
                variant="h5"
                sx={{ mb: 6, opacity: 0.9, maxWidth: '600px', mx: 'auto' }}
              >
                Share your ideas and vote on features you'd like to see
              </Typography>
              
              {/* Search and Filter Section */}
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
                    placeholder="Search feature requests... Try 'dark mode' or 'mobile app'"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <FormControl sx={{ minWidth: 150 }}>
                    <InputLabel>Status</InputLabel>
                    <Select
                      value={statusFilter}
                      label="Status"
                      onChange={(e) => setStatusFilter(e.target.value)}
                    >
                      <MenuItem value="all">All Status</MenuItem>
                      <MenuItem value="under-review">Under Review</MenuItem>
                      <MenuItem value="planned">Planned</MenuItem>
                      <MenuItem value="in-progress">In Progress</MenuItem>
                      <MenuItem value="completed">Completed</MenuItem>
                      <MenuItem value="rejected">Rejected</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl sx={{ minWidth: 150 }}>
                    <InputLabel>Sort By</InputLabel>
                    <Select
                      value={sortBy}
                      label="Sort By"
                      onChange={(e) => setSortBy(e.target.value)}
                    >
                      <MenuItem value="newest">Newest First</MenuItem>
                      <MenuItem value="oldest">Oldest First</MenuItem>
                      <MenuItem value="votes">Most Voted</MenuItem>
                    </Select>
                  </FormControl>
                </Stack>
              </Paper>

              {/* Create New Feature Request Button */}
              <Zoom in timeout={1000}>
                <Button
                  component={Link}
                  to="/features/new"
                  variant="contained"
                  size="large"
                  startIcon={<LightbulbIcon />}
                  endIcon={<ArrowRightIcon />}
                  sx={{
                    py: 2,
                    px: 4,
                    borderRadius: 3,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                    boxShadow: '0 8px 32px rgba(254, 107, 139, 0.3)',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 12px 40px rgba(254, 107, 139, 0.4)',
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  Request New Feature
                </Button>
              </Zoom>
            </Box>
          </Fade>
        </Container>
      </Box>

      {/* Feature Requests Content Section */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        {filteredFeatures.length === 0 ? (
          <Fade in timeout={600}>
            <Paper
              elevation={4}
              sx={{
                p: 8,
                textAlign: 'center',
                maxWidth: 600,
                mx: 'auto',
                borderRadius: 4,
                background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
              }}
            >
              <LightbulbIcon sx={{ fontSize: 80, color: 'primary.main', mb: 3 }} />
              <Typography variant="h4" gutterBottom fontWeight="bold">
                No feature requests found
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
                {features.length === 0 
                  ? "Be the first to suggest a new feature!"
                  : "Try adjusting your search or filter criteria."
                }
              </Typography>
              {features.length === 0 && (
                <Button
                  component={Link}
                  to="/features/new"
                  variant="contained"
                  size="large"
                  startIcon={<LightbulbIcon />}
                  endIcon={<ArrowRightIcon />}
                  sx={{
                    py: 1.5,
                    px: 3,
                    borderRadius: 3,
                    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: 4
                    }
                  }}
                >
                  Submit First Request
                </Button>
              )}
            </Paper>
          </Fade>
        ) : (
          <Grid container spacing={3}>
            {filteredFeatures.map((feature, index) => (
              <Grid item xs={12} key={feature.id} sx={{ display: 'flex', width: '100%' }}>
                <FeatureCard
                  feature={feature}
                  index={index}
                  getStatusChipProps={getStatusChipProps}
                  getStatusLabel={getStatusLabel}
                  formatDate={formatDate}
                  handleVote={handleVote}
                  hasVoted={hasVoted}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>

      {/* CTA Section */}
      <Box
        sx={{
          py: 12,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          textAlign: 'center'
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h3" component="h2" fontWeight="bold" sx={{ mb: 3 }}>
            Have an idea for a new feature?
          </Typography>
          <Typography variant="h6" sx={{ mb: 6, opacity: 0.9 }}>
            We love hearing from our users! Share your ideas and help shape the future of ENBOQ.
          </Typography>
          
          <Button
            component={Link}
            to="/features/new"
            variant="contained"
            size="large"
            startIcon={<LightbulbIcon />}
            endIcon={<ArrowRightIcon />}
            sx={{
              py: 2,
              px: 4,
              borderRadius: 3,
              fontSize: '1.1rem',
              fontWeight: 600,
              background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
              boxShadow: '0 8px 32px rgba(254, 107, 139, 0.3)',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 12px 40px rgba(254, 107, 139, 0.4)',
              },
              transition: 'all 0.3s ease'
            }}
          >
            Submit Feature Request
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default FeatureRequests;