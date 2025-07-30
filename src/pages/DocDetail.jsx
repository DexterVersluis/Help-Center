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

const DocDetail = () => {
  const { id } = useParams();
  const [doc, setDoc] = useState(null);
  const [isHelpful, setIsHelpful] = useState(null);

  useEffect(() => {
    // If the ID is for the platform demo, redirect to the OnboardingDoc component
    if (id === 'onboarding-platform-demo-enboq') {
      window.location.href = '/docs/onboarding-platform-demo-enboq';
      return;
    }
    
    // If the ID is for the new hire onboarding flow, redirect to the NewHireOnboardingFlow component
    if (id === 'new-hire-onboarding-flow') {
      window.location.href = '/docs/new-hire-onboarding-flow';
      return;
    }
    
    // Redirect to 404 or docs page since this mock doc is being removed
    window.location.href = '/docs';
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

  const handleFeedback = (helpful) => {
    setIsHelpful(helpful);
  };

  if (!doc) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Paper sx={{ p: 8, textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom>
            Documentation Not Found
          </Typography>
          <Typography color="text.secondary" paragraph>
            The documentation you're looking for doesn't exist.
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
            <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={3}>
              <Box flex={1}>
                <Typography variant="h1" component="h1" gutterBottom color="primary">
                  {doc.title}
                </Typography>
                <Typography variant="h6" color="text.secondary" paragraph>
                  {doc.description}
                </Typography>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Chip
                    icon={<AccessTime />}
                    label={doc.readTime}
                    variant="outlined"
                  />
                  <Chip
                    label={doc.difficulty}
                    color={getDifficultyColor(doc.difficulty)}
                  />
                  <Box display="flex" alignItems="center" gap={1}>
                    <Rating value={doc.rating} precision={0.1} size="small" readOnly />
                    <Typography variant="body2">({doc.rating})</Typography>
                  </Box>
                  <Box display="flex" alignItems="center" gap={0.5}>
                    <Visibility fontSize="small" />
                    <Typography variant="body2">{doc.views} views</Typography>
                  </Box>
                </Stack>
              </Box>
              <Box display="flex" alignItems="center" gap={1}>
                <CalendarToday fontSize="small" />
                <Typography variant="body2" color="text.secondary">
                  Updated {formatDate(doc.lastUpdated)}
                </Typography>
              </Box>
            </Box>
          </Paper>

          {/* Video Tutorial */}
          {doc.hasVideo && (
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
                  src={doc.videoUrl}
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
              >
                Yes, helpful
              </Button>
              <Button
                variant={isHelpful === false ? 'contained' : 'outlined'}
                startIcon={<ThumbDown />}
                onClick={() => handleFeedback(false)}
                color="error"
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
        <Box sx={{ width: 300, flexShrink: 0 }}>
          <Stack spacing={3}>
            {/* Related Documentation */}
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
                      to={`/docs/${relatedDoc.id}`}
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

export default DocDetail;