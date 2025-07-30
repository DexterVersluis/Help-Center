import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Paper,
  Card,
  CardContent,
  Button,
  Stack,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Alert,
  Breadcrumbs,
  Chip
} from '@mui/material';
import {
  ArrowBack,
  PlayArrow,
  AccessTime,
  CalendarToday,
  ThumbUp,
  ThumbDown,
  CheckCircle,
  Lightbulb,
  Help,
  BugReport,
  Email
} from '@mui/icons-material';

const OnboardingDoc = () => {
  const { id } = useParams();
  const [isHelpful, setIsHelpful] = useState(null);

  const handleFeedback = (helpful) => {
    setIsHelpful(helpful);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

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
        <Typography color="text.primary">Full ENBOQ Platform Demo</Typography>
      </Breadcrumbs>

      <Box display="flex" gap={4}>
        <Box flex={1}>
          {/* Header */}
          <Paper sx={{ p: 4, mb: 4 }}>
            <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={3}>
              <Box flex={1}>
                <Typography variant="h1" component="h1" gutterBottom color="primary">
                  Full ENBOQ Platform Demo
                </Typography>
                <Typography variant="h6" color="text.secondary" paragraph>
                  Comprehensive walkthrough of the ENBOQ platform features and capabilities, showcasing how to create engaging onboarding experiences.
                </Typography>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Chip
                    icon={<AccessTime />}
                    label="10 min"
                    variant="outlined"
                  />
                  <Chip
                    label="Beginner"
                    color="success"
                  />
                </Stack>
              </Box>
              <Box display="flex" alignItems="center" gap={1}>
                <CalendarToday fontSize="small" />
                <Typography variant="body2" color="text.secondary">
                  Updated {formatDate('2024-07-20T09:30:00Z')}
                </Typography>
              </Box>
            </Box>
          </Paper>

          {/* Video */}
          <Paper sx={{ p: 4, mb: 4 }}>
            <Box display="flex" alignItems="center" gap={1} mb={2}>
              <PlayArrow color="secondary" />
              <Typography variant="h5">Platform Demo Video</Typography>
            </Box>
            <Box
              sx={{
                position: 'relative',
                paddingBottom: '59.21%',
                height: 0,
                overflow: 'hidden',
                borderRadius: 2,
                bgcolor: 'grey.100'
              }}
            >
              <iframe
                src="https://www.loom.com/embed/3faa8ae6cc5b46a59a51b69bfdaf4107?sid=732a61fa-e83c-4662-ba52-51b1fb3a0034"
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

          {/* Objective */}
          <Alert icon={<Lightbulb />} severity="info" sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              🎯 Objective
            </Typography>
            <Typography>
              This guide demonstrates the key features of the ENBOQ platform, showing how to create engaging onboarding experiences for new employees at any organization.
            </Typography>
          </Alert>

          {/* Key Steps */}
          <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
            📋 Key Steps
          </Typography>

          <Stack spacing={4}>
            {/* Step 1 */}
            <Card>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <Typography variant="h6" color="primary">
                    Step 1: Core Values Integration
                  </Typography>
                  <Chip label="1 of 9" color="primary" variant="outlined" />
                </Box>
                <Box mb={3}>
                  <img
                    src="/assets/fullDemo/2.jpg"
                    alt="Core Values Integration"
                    style={{
                      width: '75%',
                      maxWidth: '100%',
                      height: 'auto',
                      borderRadius: 8,
                      display: 'block',
                      margin: '0 auto',
                      boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                    }}
                  />
                </Box>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircle color="success" />
                    </ListItemIcon>
                    <ListItemText primary="Integrate your organization's core values into the onboarding experience." />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <CheckCircle color="success" />
                    </ListItemIcon>
                    <ListItemText primary="Create interactive elements that reinforce company culture and mission." />
                  </ListItem>
                </List>
              </CardContent>
            </Card>

            {/* All 9 steps */}
            {[
              {
                step: 2,
                title: "Interactive Learning Activities",
                image: "/assets/fullDemo/3.jpg",
                points: [
                  "Design engaging puzzles and activities that reinforce key company information.",
                  "Create gamified learning experiences that make onboarding fun and memorable."
                ]
              },
              {
                step: 3,
                title: "Multi-Channel Communication",
                image: "/assets/fullDemo/4.jpg",
                points: [
                  "Set up automated communication across multiple channels (email, chat, SMS).",
                  "Create interactive response systems that guide new hires through their onboarding journey."
                ]
              },
              {
                step: 4,
                title: "Employee Dashboard Configuration",
                image: "/assets/fullDemo/5.jpg",
                points: [
                  "Configure personalized dashboards for new employees with tailored onboarding tasks.",
                  "Design intuitive navigation and clear progress indicators to guide the onboarding journey."
                ]
              },
              {
                step: 5,
                title: "Document Management & Task Automation",
                image: "/assets/fullDemo/6.jpg",
                points: [
                  "Set up secure document collection systems for employee contracts and paperwork.",
                  "Automate meeting scheduling and key milestone reminders throughout the onboarding process."
                ]
              },
              {
                step: 6,
                title: "Interactive Learning Modules",
                image: "/assets/fullDemo/7.jpg",
                points: [
                  "Create immersive learning experiences with interactive stories and multimedia content.",
                  "Implement gamification elements like points, badges, and leaderboards to increase engagement."
                ]
              },
              {
                step: 7,
                title: "Communication Workflow Builder",
                image: "/assets/fullDemo/8.jpg",
                points: [
                  "Use the intuitive drag-and-drop workflow builder to create automated communication sequences.",
                  "Set up time-based triggers and conditional logic for personalized employee journeys."
                ]
              },
              {
                step: 8,
                title: "AI-Powered Content Creation",
                image: "/assets/fullDemo/9.jpg",
                points: [
                  "Leverage ENBOQ's AI-powered content creation tools to quickly generate engaging onboarding materials.",
                  "Customize templates with your branding and company-specific information for a personalized experience."
                ]
              },
              {
                step: 9,
                title: "Analytics & Optimization",
                image: "/assets/fullDemo/10.jpg",
                points: [
                  "Access comprehensive analytics dashboards to track employee engagement and progress.",
                  "Use data-driven insights to continuously optimize your onboarding process for better results."
                ]
              }
            ].map((stepData) => (
              <Card key={stepData.step}>
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="h6" color="primary">
                      Step {stepData.step}: {stepData.title}
                    </Typography>
                    <Chip label={`${stepData.step} of 9`} color="primary" variant="outlined" />
                  </Box>
                  <Box mb={3}>
                    <img
                      src={stepData.image}
                      alt={stepData.title}
                      style={{
                        width: '75%',
                        maxWidth: '100%',
                        height: 'auto',
                        borderRadius: 8,
                        display: 'block',
                        margin: '0 auto',
                        boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                      }}
                    />
                  </Box>
                  <List>
                    {stepData.points.map((point, index) => (
                      <ListItem key={index}>
                        <ListItemIcon>
                          <CheckCircle color="success" />
                        </ListItemIcon>
                        <ListItemText primary={point} />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            ))}

            {/* Best Practices */}

            {/* Best Practices */}
            <Alert severity="success" sx={{ mt: 4 }}>
              <Typography variant="h6" gutterBottom>
                ✨ Best Practices
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircle color="success" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Design mobile-friendly experiences that allow employees to complete onboarding tasks from any device." />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircle color="success" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Create personalized journeys based on role, department, and experience level." />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircle color="success" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Maintain a balance between automation and human connection throughout the onboarding process." />
                </ListItem>
              </List>
            </Alert>

            {/* Tips for Success */}
            <Alert severity="warning">
              <Typography variant="h6" gutterBottom>
                💡 Tips for Success
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircle color="warning" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Start with pre-built templates and customize them to match your organization's needs." />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircle color="warning" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Use A/B testing to determine which onboarding elements drive the highest engagement." />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <CheckCircle color="warning" fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Collect feedback from new hires to continuously improve your onboarding experience." />
                </ListItem>
              </List>
            </Alert>
          </Stack>

          {/* Feedback */}
          <Paper sx={{ p: 4, mt: 4 }}>
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
                  {[
                    { id: 'getting-started-with-enboq', title: 'Getting Started with ENBOQ' },
                    { id: 'new-hire-onboarding-flow', title: 'What the New Hire Onboarding Flow Looks Like' }
                  ].map((doc) => (
                    <Paper
                      key={doc.id}
                      component={Link}
                      to={`/docs/${doc.id}`}
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
                        {doc.title}
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

export default OnboardingDoc;