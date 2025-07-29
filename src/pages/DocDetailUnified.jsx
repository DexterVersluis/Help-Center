import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Paper,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  Card,
  CardContent,
  Chip,
  Stack,
  Rating,
  Divider,
  Alert,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Breadcrumbs
} from '@mui/material';
import {
  ArrowBack,
  PlayArrow,
  AccessTime,
  CalendarToday,
  CheckCircle,
  ThumbUp,
  ThumbDown,
  Lightbulb,
  Help,
  BugReport,
  Email,
  Visibility
} from '@mui/icons-material';
import { DocumentationService } from '../services/documentationService';
import LoadingSpinner from '../components/LoadingSpinner';
import { DocumentDetailSkeleton } from '../components/SkeletonLoaders';
import LazyImage from '../components/LazyImage';

const DocDetailUnified = () => {
  const { id } = useParams();
  const [doc, setDoc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isHelpful, setIsHelpful] = useState(null);
  const [submittingFeedback, setSubmittingFeedback] = useState(false);

  useEffect(() => {
    const loadDocument = async () => {
      try {
        console.log('Loading document with ID:', id);
        setLoading(true);
        
        // Load document data (with caching)
        const { data, error } = await DocumentationService.getDocumentBySlug(id);
        console.log('Document data received:', data);
        console.log('Document error:', error);
        
        if (error) {
          console.error('DocumentationService error:', error);
          throw error;
        }
        
        if (!data) {
          console.log('No document data found');
          setError('Document not found');
          return;
        }

        console.log('Setting document data:', data);
        setDoc(data);
        
        // Preload images in background
        if (data.steps) {
          DocumentationService.preloadImages(data.steps);
        }
        
        // Increment view count in background (non-blocking)
        DocumentationService.incrementViews(id).catch(console.warn);
        
      } catch (err) {
        console.error('Error loading document:', err);
        setError(err.message || 'Failed to load document');
      } finally {
        setLoading(false);
        setInitialLoading(false);
      }
    };

    if (id) {
      console.log('useEffect triggered with ID:', id);
      loadDocument();
    } else {
      console.log('No ID provided');
    }
  }, [id]);

  const getDifficultyColor = (difficulty) => {
    const colors = {
      'Beginner': 'success',
      'Intermediate': 'warning',
      'Advanced': 'error'
    };
    return colors[difficulty] || 'default';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleFeedback = async (helpful) => {
    if (submittingFeedback) return;
    
    try {
      setSubmittingFeedback(true);
      await DocumentationService.submitFeedback(doc.id, helpful);
      setIsHelpful(helpful);
    } catch (err) {
      console.error('Error submitting feedback:', err);
    } finally {
      setSubmittingFeedback(false);
    }
  };

  if (initialLoading) {
    return <DocumentDetailSkeleton />;
  }

  if (error || !doc) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Paper sx={{ p: 8, textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom>
            Documentation Not Found
          </Typography>
          <Typography color="text.secondary" paragraph>
            {error || "The documentation you're looking for doesn't exist."}
          </Typography>

          <Button
            component={Link}
            to="/docs"
            variant="contained"
            startIcon={<ArrowBack />}
          >
            Back to Documentation
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Breadcrumbs */}
      <Breadcrumbs sx={{ mb: 4 }}>
        <Button
          component={Link}
          to="/docs"
          startIcon={<ArrowBack />}
          color="primary"
        >
          Documentation
        </Button>
        <Typography color="text.primary">{doc.title}</Typography>
      </Breadcrumbs>

      <Box display="flex" gap={4}>
        <Box flex={1}>
          {/* Header */}
          <Paper sx={{ p: 4, mb: 4 }}>
            {/* Date at the top */}
            <Box display="flex" alignItems="center" gap={1} mb={2}>
              <CalendarToday fontSize="small" color="action" />
              <Typography variant="body2" color="text.secondary">
                Updated {formatDate(doc.updated_at)}
              </Typography>
            </Box>
            
            {/* Title and Description - Full Width */}
            <Box mb={3}>
              <Typography variant="h3" component="h1" gutterBottom color="primary">
                {doc.title}
              </Typography>
              <Typography variant="h6" color="text.secondary" paragraph>
                {doc.description}
              </Typography>
            </Box>

            {/* Tags */}
            <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
              <Chip
                icon={<AccessTime />}
                label={doc.read_time}
                variant="outlined"
              />
              <Chip
                label={doc.difficulty}
                color={getDifficultyColor(doc.difficulty)}
              />
              {doc.category && (
                <Chip
                  label={doc.category.name}
                  color="warning"
                  variant="outlined"
                />
              )}
            </Stack>
          </Paper>

          {/* Video Tutorial */}
          {doc.has_video && doc.video_url && (
            <Paper sx={{ p: 4, mb: 4 }}>
              <Box display="flex" alignItems="center" gap={1} mb={2}>
                <PlayArrow color="secondary" />
                <Typography variant="h5">Video Tutorial</Typography>
              </Box>
              <Box
                sx={{
                  position: 'relative',
                  paddingBottom: '56.25%',
                  height: 0,
                  overflow: 'hidden',
                  borderRadius: 2,
                  bgcolor: 'grey.100'
                }}
              >
                <iframe
                  src={doc.video_url}
                  title={doc.title}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    border: 'none'
                  }}
                  allowFullScreen
                />
              </Box>
            </Paper>
          )}

          {/* Step-by-Step Guide */}
          {doc.steps && doc.steps.length > 0 && (
            <Paper sx={{ p: 4, mb: 4 }}>
              <Typography variant="h5" gutterBottom>
                Step-by-Step Guide
              </Typography>
              <Stepper orientation="vertical">
                {doc.steps.map((step, index) => (
                  <Step key={step.id} active={true} completed={false}>
                    <StepLabel>
                      <Typography variant="h6">
                        {step.title}
                      </Typography>
                    </StepLabel>
                    <StepContent>
                      <Typography paragraph sx={{ mb: 3 }}>
                        {step.content}
                      </Typography>
                      
                      {/* Step Image */}
                      {step.image_url && (
                        <Box sx={{ mb: 3 }}>
                          <LazyImage
                            src={step.image_url}
                            alt={step.image_alt || step.title}
                            style={{
                              width: '100%',
                              height: 'auto',
                              borderRadius: 8,
                              boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                              display: 'block'
                            }}
                            skeletonHeight={300}
                          />
                        </Box>
                      )}
                      
                      {step.tips && step.tips.length > 0 && (
                        <Alert
                          icon={<Lightbulb />}
                          severity="info"
                          sx={{ mb: 2 }}
                        >
                          <Typography variant="subtitle2" gutterBottom>
                            Pro Tips:
                          </Typography>
                          <List dense>
                            {step.tips.map((tip, tipIndex) => (
                              <ListItem key={tipIndex} sx={{ py: 0 }}>
                                <ListItemIcon sx={{ minWidth: 20 }}>
                                  <CheckCircle fontSize="small" color="success" />
                                </ListItemIcon>
                                <ListItemText
                                  primary={tip}
                                  primaryTypographyProps={{ variant: 'body2' }}
                                />
                              </ListItem>
                            ))}
                          </List>
                        </Alert>
                      )}
                    </StepContent>
                  </Step>
                ))}
              </Stepper>
            </Paper>
          )}

          {/* Feedback */}
          <Paper sx={{ p: 4 }}>
            <Typography variant="h6" gutterBottom>
              Was this helpful?
            </Typography>
            <Typography color="text.secondary" paragraph>
              Let us know if this documentation helped you accomplish your goal.
            </Typography>
            <Stack direction="row" spacing={2} mb={2}>
              <Button
                variant={isHelpful === true ? 'contained' : 'outlined'}
                startIcon={<ThumbUp />}
                onClick={() => handleFeedback(true)}
                color="success"
                disabled={submittingFeedback}
              >
                Yes, helpful
              </Button>
              <Button
                variant={isHelpful === false ? 'contained' : 'outlined'}
                startIcon={<ThumbDown />}
                onClick={() => handleFeedback(false)}
                color="error"
                disabled={submittingFeedback}
              >
                Needs improvement
              </Button>
            </Stack>
            {isHelpful !== null && (
              <Alert severity={isHelpful ? 'success' : 'info'}>
                {isHelpful 
                  ? "Thanks for your feedback! 🎉" 
                  : "Thanks for your feedback. We'll work on improving this guide."
                }
              </Alert>
            )}
          </Paper>
        </Box>

        {/* Sidebar */}
        <Box 
          sx={{ 
            width: 300, 
            flexShrink: 0,
            position: 'sticky',
            top: 24,
            alignSelf: 'flex-start',
            maxHeight: 'calc(100vh - 48px)',
            overflowY: 'auto'
          }}
        >
          <Stack spacing={3}>
            {/* Related Documentation */}
            {doc.relatedDocs && doc.relatedDocs.length > 0 && (
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Related Documentation
                  </Typography>
                  <Stack spacing={1}>
                    {doc.relatedDocs.map((relatedDoc) => (
                      <Paper
                        key={relatedDoc.id}
                        component={Link}
                        to={`/docs/${relatedDoc.slug}`}
                        sx={{
                          p: 2,
                          textDecoration: 'none',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            backgroundColor: 'primary.light',
                            color: 'white'
                          }
                        }}
                      >
                        <Typography variant="body2" fontWeight="medium">
                          {relatedDoc.title}
                        </Typography>
                      </Paper>
                    ))}
                  </Stack>
                </CardContent>
              </Card>
            )}

            {/* Need More Help */}
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Need More Help?
                </Typography>
                <Stack spacing={1}>
                  {[
                    { label: 'Check FAQ', to: '/faq', icon: Help },
                    { label: 'Submit Support Ticket', to: '/tickets/new', icon: BugReport },
                    { label: 'Email Support', to: 'mailto:support@enboq.com', icon: Email }
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
                        gap: 1,
                        textDecoration: 'none',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          backgroundColor: 'primary.light',
                          color: 'white'
                        }
                      }}
                    >
                      <link.icon fontSize="small" />
                      <Typography variant="body2">
                        {link.label}
                      </Typography>
                    </Paper>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Box>
      </Box>
    </Container>
  );
};

export default DocDetailUnified;