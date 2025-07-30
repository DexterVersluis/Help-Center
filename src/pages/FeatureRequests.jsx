import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FeatureRequestService } from '../services/featureRequestService';
import FeatureCard from '../components/FeatureCard';
import SEO from '../components/SEO';
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
  const { user, isAuthenticated } = useAuth();
  const [features, setFeatures] = useState([]);
  const [filteredFeatures, setFilteredFeatures] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [loading, setLoading] = useState(true);
  const [userVotes, setUserVotes] = useState({});

  // Load feature requests from database
  useEffect(() => {
    const loadFeatureRequests = async () => {
      try {
        setLoading(true);
        const { data, error } = await FeatureRequestService.getAllFeatureRequests();
        
        if (error) {
          console.error('Error loading feature requests:', error);
          return;
        }

        setFeatures(data || []);

        // Load user votes if authenticated
        if (isAuthenticated && user && data?.length > 0) {
          const featureIds = data.map(f => f.id);
          const { data: votes } = await FeatureRequestService.getUserVotes(featureIds, user.id);
          setUserVotes(votes || {});
        }
      } catch (error) {
        console.error('Error loading feature requests:', error);
      } finally {
        setLoading(false);
      }
    };

    loadFeatureRequests();
  }, [isAuthenticated, user]);

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

  const handleVote = useCallback(async (featureId, voteType) => {
    if (!isAuthenticated || !user) {
      // Redirect to login or show login modal
      alert('Please log in to vote on feature requests');
      return;
    }

    try {
      const { data, error } = await FeatureRequestService.voteOnFeatureRequest(featureId, user.id, voteType);
      
      if (error) {
        console.error('Error voting:', error);
        return;
      }

      // Update local state
      setUserVotes(prev => ({
        ...prev,
        [featureId]: voteType
      }));

      // Update the feature's vote count
      setFeatures(prev => prev.map(feature => {
        if (feature.id === featureId) {
          return {
            ...feature,
            votes: feature.votes + (data?.voteChange || 0)
          };
        }
        return feature;
      }));

    } catch (error) {
      console.error('Error voting on feature request:', error);
    }
  }, [isAuthenticated, user]);

  const hasVoted = useCallback((featureId) => {
    return userVotes[featureId] || null;
  }, [userVotes]);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50' }}>
      <SEO
        title="Feature Requests - ENBOQ Help Center"
        description="Share your ideas and vote on feature requests for ENBOQ's employee onboarding platform. Help shape the future of our gamification and preboarding solutions."
        keywords="ENBOQ feature requests, product feedback, onboarding platform improvements, gamification features, employee engagement ideas"
        url="/features"
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
              Feature Requests
            </Typography>
            
            <Typography
              variant="h5"
              color="text.secondary"
              sx={{ mb: 6, lineHeight: 1.6 }}
            >
              Share your ideas and vote on features you'd like to see
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
                      <SearchIcon />
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

      {/* Feature Requests Content Section */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        {loading ? (
          <Box display="flex" justifyContent="center" py={8}>
            <Typography variant="h6" color="text.secondary">
              Loading feature requests...
            </Typography>
          </Box>
        ) : filteredFeatures.length === 0 ? (
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
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Paper
          elevation={4}
          sx={{
            p: 6,
            background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
            borderRadius: 4,
            textAlign: 'center'
          }}
        >
          <LightbulbIcon
            sx={{
              fontSize: 80,
              color: 'primary.main',
              mb: 3
            }}
          />
          <Typography variant="h3" gutterBottom fontWeight={700} color="primary.main">
            Have an idea for a new feature?
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}>
            We love hearing from our users! Share your ideas and help shape the future of ENBOQ.
          </Typography>
          <Button
            component={Link}
            to={isAuthenticated ? "/features/new" : "/login"}
            variant="contained"
            size="large"
            startIcon={<LightbulbIcon />}
            endIcon={<ArrowRightIcon />}
            sx={{ 
              borderRadius: 3,
              px: 5,
              py: 2,
              textTransform: 'none',
              fontSize: '1.2rem',
              fontWeight: 600
            }}
          >
            {isAuthenticated ? 'Submit Feature Request' : 'Login to Submit Request'}
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default FeatureRequests;