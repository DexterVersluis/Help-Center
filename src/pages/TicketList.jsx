import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import TicketCard from '../components/TicketCard';
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
  Skeleton,
  Fade,
  Zoom,
  Stack
} from '@mui/material';
import {
  Search as SearchIcon,
  Add as AddIcon,
  AccessTime as ClockIcon,
  LocalOffer as TagIcon,
  ArrowForward as ArrowRightIcon,
  ChatBubbleOutline as MessageCircleIcon,
  ConfirmationNumber as TicketIcon
} from '@mui/icons-material';

const TicketList = () => {
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  useEffect(() => {
    const savedTickets = JSON.parse(localStorage.getItem('tickets') || '[]');
    setTickets(savedTickets);
    setFilteredTickets(savedTickets);
  }, []);

  useEffect(() => {
    let filtered = tickets;

    if (searchTerm) {
      filtered = filtered.filter(ticket =>
        ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(ticket => ticket.status === statusFilter);
    }

    if (priorityFilter !== 'all') {
      filtered = filtered.filter(ticket => ticket.priority === priorityFilter);
    }

    setFilteredTickets(filtered);
  }, [tickets, searchTerm, statusFilter, priorityFilter]);

  const getStatusChipProps = useCallback((status) => {
    const statusMap = {
      'open': { color: 'primary', variant: 'filled' },
      'in-progress': { color: 'warning', variant: 'filled' },
      'resolved': { color: 'success', variant: 'filled' },
      'closed': { color: 'default', variant: 'outlined' }
    };
    return statusMap[status] || { color: 'primary', variant: 'filled' };
  }, []);

  const getPriorityChipProps = useCallback((priority) => {
    const priorityMap = {
      'low': { color: 'success', variant: 'outlined' },
      'medium': { color: 'warning', variant: 'filled' },
      'high': { color: 'error', variant: 'filled' },
      'urgent': { color: 'error', variant: 'filled', sx: { fontWeight: 'bold' } }
    };
    return priorityMap[priority] || { color: 'default', variant: 'outlined' };
  }, []);

  const formatDate = useCallback((dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }, []);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50' }}>
      <SEO
        title="Support Tickets - ENBOQ Help Center"
        description="View and manage your ENBOQ support tickets. Get help with employee onboarding platform issues, track ticket status, and communicate with our support team."
        keywords="ENBOQ support tickets, help desk, customer support, onboarding platform support, technical assistance"
        url="/tickets"
      />
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
                My Support Tickets
              </Typography>
              
              <Typography
                variant="h5"
                sx={{ mb: 6, opacity: 0.9, maxWidth: '600px', mx: 'auto' }}
              >
                Track and manage your support requests with ease
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
                    placeholder="Search tickets... Try ticket ID or description"
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
                      <MenuItem value="open">Open</MenuItem>
                      <MenuItem value="in-progress">In Progress</MenuItem>
                      <MenuItem value="resolved">Resolved</MenuItem>
                      <MenuItem value="closed">Closed</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl sx={{ minWidth: 150 }}>
                    <InputLabel>Priority</InputLabel>
                    <Select
                      value={priorityFilter}
                      label="Priority"
                      onChange={(e) => setPriorityFilter(e.target.value)}
                    >
                      <MenuItem value="all">All Priority</MenuItem>
                      <MenuItem value="low">Low</MenuItem>
                      <MenuItem value="medium">Medium</MenuItem>
                      <MenuItem value="high">High</MenuItem>
                      <MenuItem value="urgent">Urgent</MenuItem>
                    </Select>
                  </FormControl>
                </Stack>
              </Paper>

              {/* Create New Ticket Button */}
              <Zoom in timeout={1000}>
                <Button
                  component={Link}
                  to="/tickets/new"
                  variant="contained"
                  size="large"
                  startIcon={<AddIcon />}
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
                  Create New Ticket
                </Button>
              </Zoom>
            </Box>
          </Fade>
        </Container>
      </Box>

      {/* Tickets Content Section */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        {filteredTickets.length === 0 ? (
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
              {tickets.length === 0 ? (
                <>
                  <TicketIcon sx={{ fontSize: 80, color: 'primary.main', mb: 3 }} />
                  <Typography variant="h4" gutterBottom fontWeight="bold">
                    No tickets yet
                  </Typography>
                  <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
                    Create your first support ticket to get started.
                  </Typography>
                  <Button
                    component={Link}
                    to="/tickets/new"
                    variant="contained"
                    size="large"
                    startIcon={<AddIcon />}
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
                    Create First Ticket
                  </Button>
                </>
              ) : (
                <>
                  <SearchIcon sx={{ fontSize: 80, color: 'primary.main', mb: 3 }} />
                  <Typography variant="h4" gutterBottom fontWeight="bold">
                    No tickets found
                  </Typography>
                  <Typography variant="h6" color="text.secondary">
                    Try adjusting your search or filter criteria.
                  </Typography>
                </>
              )}
            </Paper>
          </Fade>
        ) : (
          <Grid container spacing={3}>
            {filteredTickets.map((ticket, index) => (
              <Grid item xs={12} key={ticket.id}>
                <TicketCard
                  ticket={ticket}
                  index={index}
                  getStatusChipProps={getStatusChipProps}
                  getPriorityChipProps={getPriorityChipProps}
                  formatDate={formatDate}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default TicketList;