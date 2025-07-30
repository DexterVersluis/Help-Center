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
    <Box>
      <SEO
        title="Support Tickets - ENBOQ Help Center"
        description="View and manage your ENBOQ support tickets. Get help with employee onboarding platform issues, track ticket status, and communicate with our support team."
        keywords="ENBOQ support tickets, help desk, customer support, onboarding platform support, technical assistance"
        url="/tickets"
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
              My Support Tickets
            </Typography>
            
            <Typography
              variant="h5"
              color="text.secondary"
              sx={{ mb: 6, lineHeight: 1.6 }}
            >
              Track and manage your support requests with ease
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
                placeholder="Search tickets... Try ticket ID or description"
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
                  { label: 'Account Issues', filter: 'account' },
                  { label: 'Technical Support', filter: 'technical' },
                  { label: 'Feature Requests', filter: 'feature' },
                  { label: 'Billing Questions', filter: 'billing' }
                ].map((topic) => (
                  <Chip
                    key={topic.label}
                    label={topic.label}
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

      {/* Filters and Actions Section */}
      <Box sx={{ bgcolor: 'background.default', py: 4 }}>
        <Container maxWidth="lg">
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems="center" justifyContent="space-between">
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
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
                fontSize: '1rem',
                fontWeight: 600,
                textTransform: 'none'
              }}
            >
              Create New Ticket
            </Button>
          </Stack>
        </Container>
      </Box>

      {/* Tickets Content Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        {filteredTickets.length === 0 ? (
          <Paper
            sx={{
              p: 8,
              textAlign: 'center',
              borderRadius: 3
            }}
          >
            {tickets.length === 0 ? (
              <>
                <TicketIcon sx={{ fontSize: 80, color: 'primary.light', mb: 3 }} />
                <Typography variant="h4" gutterBottom>
                  No tickets yet
                </Typography>
                <Typography color="text.secondary" sx={{ mb: 4 }}>
                  Create your first support ticket to get started.
                </Typography>
                <Button
                  component={Link}
                  to="/tickets/new"
                  variant="contained"
                  size="large"
                  startIcon={<AddIcon />}
                  sx={{
                    py: 1.5,
                    px: 3,
                    borderRadius: 3
                  }}
                >
                  Create First Ticket
                </Button>
              </>
            ) : (
              <>
                <SearchIcon sx={{ fontSize: 80, color: 'primary.light', mb: 3 }} />
                <Typography variant="h4" gutterBottom>
                  No tickets found
                </Typography>
                <Typography color="text.secondary">
                  Try adjusting your search or filter criteria.
                </Typography>
              </>
            )}
          </Paper>
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