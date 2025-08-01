import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FeatureRequestService } from '../services/featureRequestService';
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
  Button,
  Paper,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Fade,
  Zoom
} from '@mui/material';
import {
  Send as SendIcon,
  EmojiObjects as LightbulbIcon,
  ArrowForward as ArrowRightIcon,
  CheckCircle as CheckCircleIcon
} from '@mui/icons-material';

const FeatureRequestForm = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, loading } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    useCase: '',
    priority: 'medium'
  });
  const [submitting, setSubmitting] = useState(false);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/login', { 
        state: { 
          from: '/features/new',
          message: 'Please log in to submit a feature request'
        }
      });
    }
  }, [isAuthenticated, loading, navigate]);

  const categories = [
    'UI/UX',
    'Performance',
    'Integration',
    'Mobile',
    'API',
    'Security',
    'Analytics',
    'Collaboration',
    'Automation',
    'Search',
    'Productivity',
    'Other'
  ];

  const priorities = [
    { value: 'low', label: 'Nice to Have' },
    { value: 'medium', label: 'Would be Helpful' },
    { value: 'high', label: 'Important' },
    { value: 'urgent', label: 'Critical for Business' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated || !user) {
      alert('Please log in to submit a feature request');
      return;
    }

    try {
      setSubmitting(true);
      
      const { data, error } = await FeatureRequestService.createFeatureRequest(formData, user.id);
      
      if (error) {
        console.error('Error submitting feature request:', error);
        alert('Error submitting feature request. Please try again.');
        return;
      }

      navigate('/features', { 
        state: { message: 'Feature request submitted successfully!' }
      });
    } catch (error) {
      console.error('Error submitting feature request:', error);
      alert('Error submitting feature request. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50' }}>
      <SEO
        title="Submit Feature Request - ENBOQ Help Center"
        description="Share your ideas to improve ENBOQ's employee onboarding platform. Submit feature requests for gamification, buddy matching, and preboarding enhancements."
        keywords="ENBOQ feature request, product feedback, onboarding platform improvements, gamification ideas, employee engagement features"
        url="/features/new"
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
              Request a New Feature
            </Typography>
            
            <Typography
              variant="h5"
              color="text.secondary"
              sx={{ mb: 6, lineHeight: 1.6 }}
            >
              Help us improve ENBOQ by sharing your ideas and suggestions
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Form Section */}
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Zoom in timeout={600}>
          <Paper
            elevation={8}
            sx={{
              p: 4,
              borderRadius: 4,
              background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
              mb: 4
            }}
          >
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>


                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Feature Title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    placeholder="Brief, descriptive title for your feature request"
                    variant="outlined"
                    sx={{}}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth required>
                    <InputLabel>Category</InputLabel>
                    <Select
                      name="category"
                      value={formData.category}
                      label="Category"
                      onChange={handleInputChange}
                      sx={{}}
                    >
                      {categories.map(category => (
                        <MenuItem key={category} value={category}>
                          {category}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth required>
                    <InputLabel>Priority Level</InputLabel>
                    <Select
                      name="priority"
                      value={formData.priority}
                      label="Priority Level"
                      onChange={handleInputChange}
                      sx={{}}
                    >
                      {priorities.map(priority => (
                        <MenuItem key={priority.value} value={priority.value}>
                          {priority.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Detailed Description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    multiline
                    rows={6}
                    placeholder="Describe the feature you'd like to see. Be as specific as possible about what it should do and how it should work..."
                    variant="outlined"
                    sx={{}}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Use Case & Benefits"
                    name="useCase"
                    value={formData.useCase}
                    onChange={handleInputChange}
                    required
                    multiline
                    rows={4}
                    placeholder="Explain how this feature would be used and what problems it would solve. Who would benefit from it and why is it important?"
                    variant="outlined"
                    sx={{}}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Paper
                    variant="outlined"
                    sx={{
                      p: 3,
                      
                      bgcolor: 'primary.50',
                      borderColor: 'primary.200'
                    }}
                  >
                    <Box display="flex" alignItems="center" mb={2}>
                      <LightbulbIcon sx={{ color: 'primary.main', mr: 1 }} />
                      <Typography variant="h6" fontWeight="bold">
                        Tips for a Great Feature Request
                      </Typography>
                    </Box>
                    <List dense>
                      <ListItem>
                        <ListItemIcon>
                          <CheckCircleIcon color="primary" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Be specific about what you want the feature to do" />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <CheckCircleIcon color="primary" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Explain the problem you're trying to solve" />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <CheckCircleIcon color="primary" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Consider how it might work with existing features" />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <CheckCircleIcon color="primary" fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Think about who else might benefit from this feature" />
                      </ListItem>
                    </List>
                  </Paper>
                </Grid>

                <Grid item xs={12}>
                  <Box display="flex" justifyContent="flex-end" gap={2} pt={2}>
                    <Button
                      variant="outlined"
                      onClick={() => navigate('/features')}
                      size="large"
                      sx={{}}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      startIcon={<SendIcon />}
                      endIcon={<ArrowRightIcon />}
                      size="large"
                      disabled={submitting}
                      sx={{
                        borderRadius: 3,
                        px: 5,
                        py: 2,
                        textTransform: 'none',
                        fontSize: '1.2rem',
                        fontWeight: 600
                      }}
                    >
                      {submitting ? 'Submitting...' : 'Submit Request'}
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Zoom>

        {/* Process Steps */}
        <Fade in timeout={1000}>
          <Paper
            elevation={4}
            sx={{
              p: 4,
              borderRadius: 4,
              background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
            }}
          >
            <Typography variant="h5" component="h3" fontWeight="bold" textAlign="center" mb={4}>
              What happens next?
            </Typography>
            <Grid container spacing={4}>
              {[
                { step: '1', title: 'Review', description: 'Our team reviews your request' },
                { step: '2', title: 'Planning', description: 'We evaluate and plan implementation' },
                { step: '3', title: 'Updates', description: 'You\'ll receive status updates via email' }
              ].map((item, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <Card sx={{ textAlign: 'center', height: '100%', borderRadius: 3 }}>
                    <CardContent sx={{ p: 3 }}>
                      <Box
                        sx={{
                          width: 64,
                          height: 64,
                          background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                          borderRadius: 3,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mx: 'auto',
                          mb: 2
                        }}
                      >
                        <Typography variant="h4" fontWeight="bold" color="white">
                          {item.step}
                        </Typography>
                      </Box>
                      <Typography variant="h6" fontWeight="bold" gutterBottom>
                        {item.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Fade>
      </Container>
    </Box>
  );
};

export default FeatureRequestForm;