import { useState, useEffect } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
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
  ListItemText,
  Fade,
  Zoom
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
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Paper elevation={4} sx={{ p: 8, textAlign: 'center', borderRadius: 4 }}>
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
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50' }}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
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

        <Grid container spacing={4}>
          <Grid item xs={12} lg={8}>
            <Fade in timeout={600}>
              <Paper elevation={4} sx={{ p: 4, borderRadius: 3, mb: 3 }}>
                <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={4}>
                  <Box flex={1}>
                    <Box display="flex" alignItems="center" gap={2} mb={2}>
                      <Typography variant="h4" component="h1" fontWeight="bold" color="primary.main">
                        {ticket.title}
                      </Typography>
                      <Chip
                        label={ticket.status}
                        {...getStatusChipProps(ticket.status)}
                      />
                    </Box>
                    <Box display="flex" alignItems="center" gap={3} color="text.secondary">
                      <Box display="flex" alignItems="center" gap={1}>
                        <TagIcon fontSize="small" />
                        <Typography variant="body2">{ticket.id}</Typography>
                      </Box>
                      <Box display="flex" alignItems="center" gap={1}>
                        <ClockIcon fontSize="small" />
                        <Typography variant="body2">Created {formatDate(ticket.createdAt)}</Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Chip
                    label={`${ticket.priority.toUpperCase()} PRIORITY`}
                    {...getPriorityChipProps(ticket.priority)}
                  />
                </Box>

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
                                {formatDate(comment.createdAt)}
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
                            borderRadius: 2,
                            background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                            '&:hover': {
                              transform: 'translateY(-2px)',
                              boxShadow: 4
                            }
                          }}
                        >
                          Add Comment
                        </Button>
                      </Box>
                    </form>
                  </Paper>
                </Box>
              </Paper>
            </Fade>
          </Grid>

          <Grid item xs={12} lg={4}>
            <Box sx={{ position: 'sticky', top: 24 }}>
              <Zoom in timeout={800}>
                <Paper elevation={4} sx={{ p: 3, borderRadius: 3, mb: 3 }}>
                  <Typography variant="h6" gutterBottom fontWeight="bold">
                    Ticket Details
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Status
                      </Typography>
                      <Chip
                        label={ticket.status}
                        {...getStatusChipProps(ticket.status)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Priority
                      </Typography>
                      <Chip
                        label={ticket.priority.toUpperCase()}
                        {...getPriorityChipProps(ticket.priority)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Category
                      </Typography>
                      <Chip
                        label={ticket.category}
                        variant="outlined"
                        color="warning"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Created
                      </Typography>
                      <Typography variant="body2">{formatDate(ticket.createdAt)}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Last Updated
                      </Typography>
                      <Typography variant="body2">{formatDate(ticket.updatedAt)}</Typography>
                    </Grid>
                  </Grid>
                </Paper>
              </Zoom>

              <Zoom in timeout={1000}>
                <Paper elevation={4} sx={{ p: 3, borderRadius: 3 }}>
                  <Typography variant="h6" gutterBottom fontWeight="bold">
                    Need Help?
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Check out our resources while you wait for a response.
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
                    <Button
                      href="mailto:support@enboq.com"
                      variant="text"
                      sx={{ justifyContent: 'flex-start', color: 'primary.main' }}
                    >
                      → Email Support
                    </Button>
                  </Box>
                </Paper>
              </Zoom>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default TicketDetail;