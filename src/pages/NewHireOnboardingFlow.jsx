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

const NewHireOnboardingFlow = () => {
  const { id } = useParams();
  const [doc, setDoc] = useState(null);
  const [isHelpful, setIsHelpful] = useState(null);

  useEffect(() => {
    const docData = {
      id: 'new-hire-onboarding-flow',
      title: 'What the New Hire Onboarding Flow Looks Like',
      description: 'Explore the full onboarding experience through the eyes of a new hire. This step-by-step guide walks you through the new hire flow—from receiving the onboarding invite email to accessing a personalized onboarding dashboard. Learn how employees complete tasks, engage with interactive content, and access knowledge tools within a fully branded and mobile-ready onboarding platform.',
      category: 'New Hire Experience',
      type: 'guide',
      readTime: '7 min',
      difficulty: 'Beginner',
      hasVideo: true,
      videoUrl: 'https://www.loom.com/embed/b53be8e8b2434b8a9b6b64001c6af4c2?sid=732a61fa-e83c-4662-ba52-51b1fb3a0034',
      steps: [
        {
          id: 1,
          title: 'Receive the Onboarding Invite Email',
          content: 'New hires receive an automated email with all essential onboarding details, including platform URL, login credentials, and scheduled onboarding events. This marks the start of the digital onboarding experience.',
          tips: ['Check your spam folder if you don\'t receive the invite within 24 hours', 'Save the login credentials in a secure location for easy access']
        },
        {
          id: 2,
          title: 'Log Into the New Hire Portal',
          content: 'Upon logging in, the platform auto-detects the user\'s preferred language based on browser settings. The system adjusts accordingly, ensuring a seamless multilingual onboarding experience.',
          tips: ['Use a modern browser for the best experience', 'Clear your browser cache if you encounter any loading issues']
        },
        {
          id: 3,
          title: 'Complete the Welcome Setup',
          content: 'New hires upload a profile photo and provide basic information like birth year and mobile number. This information personalizes communications with buddies, managers, and other team members.',
          tips: ['Upload a professional profile photo for better team recognition', 'Ensure your contact information is accurate for important notifications']
        },
        {
          id: 4,
          title: 'Access the Personalized Onboarding Dashboard',
          content: 'After setup, new hires land on their main onboarding dashboard. This is a centralized view of all upcoming tasks, activities, events, and communications across the preboarding and onboarding timeline.',
          tips: ['Bookmark the dashboard URL for quick access', 'Check the dashboard daily for new tasks and updates']
        },
        {
          id: 5,
          title: 'Complete Daily Missions and Earn XP',
          content: 'The onboarding platform gamifies the experience by showing "Today\'s Mission" and awarding XP (experience points) for completed tasks. For example: uploading signed documents or completing a survey.',
          tips: ['Complete tasks promptly to stay on track with your onboarding timeline', 'XP points help track your progress and engagement']
        },
        {
          id: 6,
          title: 'Engage with Stories and Quizzes',
          content: 'New hires interact with onboarding stories (e.g., "Helping the President") and quizzes designed to introduce company values, culture, and key contacts. These activities unlock access to next steps like meetings or document submissions.',
          tips: ['Take your time to read through company stories carefully', 'Don\'t worry about quiz scores - they\'re designed to help you learn']
        },
        {
          id: 7,
          title: 'Submit Interactive Surveys and Forms',
          content: 'Employees answer personalized questions such as favorite dishes or ideal workdays. Responses are sent to relevant departments like the canteen or HR to personalize the employee\'s first days.',
          tips: ['Be honest in your responses to get the most personalized experience', 'These surveys help the company better support your needs']
        },
        {
          id: 8,
          title: 'Use AI-Powered Search and Chat',
          content: 'The dashboard includes a knowledge search feature, allowing new hires to ask onboarding-related questions. AI responds with company-specific answers based on internal documents and training materials.',
          tips: ['Try asking specific questions about company policies or procedures', 'The AI learns from company documents, so answers are tailored to your organization']
        },
        {
          id: 9,
          title: 'Access the Mobile Onboarding Experience',
          content: 'The onboarding flow is fully responsive and mobile-friendly. New hires can log in via smartphone, access tasks, scan QR codes, and even install a branded app for easier access.',
          tips: ['Download the company app if available for push notifications', 'Mobile access allows you to complete tasks on-the-go']
        },
        {
          id: 10,
          title: 'Stay Supported Throughout the Journey',
          content: 'Support is always accessible through the integrated help center or via email. The platform ensures every new hire has what they need to start strong and feel welcome from day one.',
          tips: ['Don\'t hesitate to reach out for help if you get stuck', 'Support teams are there to ensure your success']
        }
      ],
      rating: 4.7,
      views: 890,
      lastUpdated: '2024-07-29T14:30:00Z',
      relatedDocs: [
        { id: 'getting-started-with-enboq', title: 'Getting Started with ENBOQ' },
        { id: 'onboarding-platform-demo-enboq', title: 'Full ENBOQ Platform Demo' }
      ]
    };
    setDoc(docData);
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

export default NewHireOnboardingFlow;