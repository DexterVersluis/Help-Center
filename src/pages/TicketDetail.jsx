import { useState, useEffect } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import SEO from '../components/SEO';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Card,
  CardContent,
  Chip,
  Grid,
  Alert,
  Divider,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText
} from '@mui/material';
import {
  ArrowBack as ArrowLeftIcon,
  AccessTime as ClockIcon,
  Person as UserIcon,
  LocalOffer as TagIcon,
  ChatBubbleOutline as MessageCircleIcon,
  Send as SendIcon,
  SupportAgent as SupportIcon,
  AttachFile as AttachFileIcon
} from '@mui/icons-material';

const TicketDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const [ticket, setTicket] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const tickets = JSON.parse(localStorage.getItem('tickets') || '[]');
    const foundTicket = tickets.find(t => t.id === id);
    setTicket(foundTicket);

    const savedComments = JSON.parse(localStorage.getItem(`comments_${id}`) || '[]');
    setComments(savedComments);
  }, [id]);

  const getStatusChipProps = (status) => {
    const statusMap = {
      'open': { color: 'primary', variant: 'filled' },
      'in-progress': { color: 'warning', variant: 'filled' },
      'resolved': { color: 'success', variant: 'filled' },
      'closed': { color: 'default', variant: 'outlined' }
    };
    return statusMap[status] || { color: 'primary', variant: 'filled' };
  };

  const getPriorityChipProps = (priority) => {
    const priorityMap = {
      'low': { color: 'success', variant: 'outlined' },
      'medium': { color: 'warning', variant: 'filled' },
      'high': { color: 'error', variant: 'filled' },
      'urgent': { color: 'error', variant: 'filled', sx: { fontWeight: 'bold' } }
    };
    return priorityMap[priority] || { color: 'default', variant: 'outlined' };
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatRelativeTime = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) {
      return 'just now';
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 604800) {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days} day${days !== 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 2592000) {
      const weeks = Math.floor(diffInSeconds / 604800);
      return `${weeks} week${weeks !== 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 31536000) {
      const months = Math.floor(diffInSeconds / 2592000);
      return `${months} month${months !== 1 ? 's' : ''} ago`;
    } else {
      const years = Math.floor(diffInSeconds / 31536000);
      return `${years} year${years !== 1 ? 's' : ''} ago`;
    }
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment = {
      id: Date.now(),
      text: newComment,
      author: ticket.email,
      createdAt: new Date().toISOString(),
      isCustomer: true
    };

    const updatedComments = [...comments, comment];
    setComments(updatedComments);
    localStorage.setItem(`comments_${id}`, JSON.stringify(updatedComments));
    setNewComment('');

    const tickets = JSON.parse(localStorage.getItem('tickets') || '[]');
    const updatedTickets = tickets.map(t => 
      t.id === id ? { ...t, updatedAt: new Date().toISOString() } : t
    );
    localStorage.setItem('tickets', JSON.stringify(updatedTickets));
  };

  if (!ticket) {
    return (
      <Container maxWidth="xl" sx={{ py: 8, px: { xs: 2, sm: 3, md: 4 } }}>
        <Paper elevation={2} sx={{ p: 8, textAlign: 'center', borderRadius: 3, maxWidth: 600, mx: 'auto' }}>
          <Typography variant="h4" gutterBottom>
            Ticket Not Found
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            The ticket you're looking for doesn't exist or has been removed.
          </Typography>
          <Button
            component={Link}
            to="/tickets"
            variant="contained"
            size="large"
            sx={{ borderRadius: 2 }}
          >
            Back to Tickets
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Box>
      <SEO
        title={`${ticket.subject} - Support Ticket #${ticket.id} - ENBOQ Help Center`}
        description={`View details and updates for support ticket #${ticket.id}: ${ticket.subject}. Track your ENBOQ platform support request.`}
        keywords={`ENBOQ support ticket, ticket ${ticket.id}, ${ticket.subject}, customer support, help desk`}
        url={`/tickets/${ticket.id}`}
      />
      <Container maxWidth="xl" sx={{ py: 4, px: { xs: 2, sm: 3, md: 4 } }}>
        <Box sx={{ mb: 4 }}>
          <Button
            component={Link}
            to="/tickets"
            startIcon={<ArrowLeftIcon />}
            sx={{ mb: 2, color: 'primary.main' }}
          >
            Back to Tickets
          </Button>

          {location.state?.message && (
            <Alert severity="success" sx={{ mb: 2, borderRadius: 2 }}>
              {location.state.message}
            </Alert>
          )}
        </Box>

        {/* Ticket Metadata Header - Full Width */}
        <Paper elevation={2} sx={{ p: 4, borderRadius: 3, mb: 4 }}>
          <Box display="flex" justifyContent="space-between" alignItems="flex-start">
            {/* Left side - Title, Status, Priority, Ticket ID */}
            <Box flex={1}>
              <Box display="flex" alignItems="center" gap={2} mb={2}>
                <Typography variant="h4" component="h1" fontWeight="bold" color="primary.main">
                  {ticket.title}
                </Typography>
                <Chip
                  label={ticket.status}
                  {...getStatusChipProps(ticket.status)}
                />
                <Chip
                  label={`${ticket.priority.toUpperCase()} PRIORITY`}
                  {...getPriorityChipProps(ticket.priority)}
                />
              </Box>
              <Box display="flex" alignItems="center" gap={1} color="text.secondary">
                <TagIcon fontSize="small" />
                <Typography variant="body2">Ticket ID: {ticket.id}</Typography>
              </Box>
            </Box>
            
            {/* Right side - Category, Dates */}
            <Box display="flex" gap={4} alignItems="flex-start">
              <Box>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Category
                </Typography>
                <Chip
                  label={ticket.category}
                  variant="outlined"
                  color="warning"
                />
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Ticket created
                </Typography>
                <Typography variant="body2" fontWeight="medium">
                  {formatRelativeTime(ticket.createdAt)}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Last updated
                </Typography>
                <Typography variant="body2" fontWeight="medium">
                  {formatRelativeTime(ticket.updatedAt)}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Paper>

        {/* Content Area - Main content with fixed sidebar */}
        <Box display="flex" gap={2} alignItems="flex-start">
          <Box flex="1" minWidth="0">
            <Paper elevation={2} sx={{ p: 4, borderRadius: 3 }}>
              <Box mb={4}>
                <Typography variant="h6" gutterBottom fontWeight="bold">
                  Description
                </Typography>
                <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', lineHeight: 1.7 }}>
                  {ticket.description}
                </Typography>
              </Box>

              {ticket.attachments && ticket.attachments.length > 0 && (
                <Box mb={4}>
                  <Typography variant="h6" gutterBottom fontWeight="bold">
                    Attachments
                  </Typography>
                  <Grid container spacing={1}>
                    {ticket.attachments.map((file, index) => (
                      <Grid item key={index}>
                        <Chip
                          icon={<AttachFileIcon />}
                          label={file.name}
                          variant="outlined"
                          color="primary"
                        />
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              )}

              <Divider sx={{ my: 4 }} />

              <Box>
                <Box display="flex" alignItems="center" gap={1} mb={3}>
                  <MessageCircleIcon color="primary" />
                  <Typography variant="h6" fontWeight="bold">
                    Comments ({comments.length})
                  </Typography>
                </Box>

                <List sx={{ mb: 3 }}>
                  {comments.map((comment) => (
                    <ListItem
                      key={comment.id}
                      sx={{
                        bgcolor: comment.isCustomer ? 'primary.50' : 'secondary.50',
                        borderRadius: 2,
                        mb: 2,
                        alignItems: 'flex-start'
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: comment.isCustomer ? 'primary.main' : 'secondary.main' }}>
                          {comment.isCustomer ? <UserIcon /> : <SupportIcon />}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Box display="flex" justifyContent="space-between" alignItems="center">
                            <Typography variant="subtitle2" fontWeight="bold">
                              {comment.isCustomer ? 'You' : 'Support Team'}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {formatRelativeTime(comment.createdAt)}
                            </Typography>
                          </Box>
                        }
                        secondary={
                          <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap', mt: 1 }}>
                            {comment.text}
                          </Typography>
                        }
                      />
                    </ListItem>
                  ))}
                </List>

                <Paper variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
                  <form onSubmit={handleCommentSubmit}>
                    <TextField
                      fullWidth
                      multiline
                      rows={4}
                      placeholder="Add a comment..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      variant="outlined"
                      sx={{ mb: 2, '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                    />
                    <Box display="flex" justifyContent="flex-end">
                      <Button
                        type="submit"
                        variant="contained"
                        startIcon={<SendIcon />}
                        disabled={!newComment.trim()}
                        sx={{
                          borderRadius: 2
                        }}
                      >
                        Add Comment
                      </Button>
                    </Box>
                  </form>
                </Paper>
              </Box>
            </Paper>
          </Box>

          <Box flex="0 0 280px" maxWidth="280px">
            <Box sx={{ position: 'sticky', top: 24 }}>
              <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
                <Typography variant="h6" gutterBottom fontWeight="bold">
                  Want to checkout what you can already do?
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Explore our resources while you wait for a response.
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Button
                    component={Link}
                    to="/docs"
                    variant="text"
                    sx={{ justifyContent: 'flex-start', color: 'primary.main' }}
                  >
                    → Browse Documentation
                  </Button>
                  <Button
                    component={Link}
                    to="/faq"
                    variant="text"
                    sx={{ justifyContent: 'flex-start', color: 'primary.main' }}
                  >
                    → View FAQ
                  </Button>
                </Box>
              </Paper>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default TicketDetail;