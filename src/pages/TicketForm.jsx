import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  Chip,
  Alert,
  Card,
  CardContent,
  Fade,
  Zoom
} from '@mui/material';
import {
  Send as SendIcon,
  CloudUpload as UploadIcon,
  Close as CloseIcon,
  SupportAgent as SupportIcon
} from '@mui/icons-material';

const TicketForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    priority: 'medium',
    description: '',
    email: '',
    attachments: []
  });

  const categories = [
    'Technical Issue',
    'Account Problem',
    'Billing Question',
    'Feature Request',
    'Bug Report',
    'General Inquiry'
  ];

  const priorities = [
    { value: 'low', label: 'Low', color: 'green' },
    { value: 'medium', label: 'Medium', color: 'orange' },
    { value: 'high', label: 'High', color: 'pink' },
    { value: 'urgent', label: 'Urgent', color: 'purple' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...files]
    }));
  };

  const removeAttachment = (index) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const ticketId = `ENBOQ-${Date.now()}`;
    const ticket = {
      id: ticketId,
      ...formData,
      status: 'open',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const existingTickets = JSON.parse(localStorage.getItem('tickets') || '[]');
    localStorage.setItem('tickets', JSON.stringify([ticket, ...existingTickets]));

    navigate(`/tickets/${ticketId}`, { 
      state: { message: 'Ticket submitted successfully!' }
    });
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50' }}>
      <SEO
        title="Submit Support Ticket - ENBOQ Help Center"
        description="Get expert help with ENBOQ's employee onboarding platform. Submit a support ticket for technical issues, feature requests, or general questions."
        keywords="ENBOQ support, submit ticket, technical support, onboarding platform help, customer service"
        url="/tickets/new"
      />
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          py: { xs: 6, md: 8 },
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="md">
          <Fade in timeout={800}>
            <Box textAlign="center">
              <Box sx={{ mb: 3 }}>
                <SupportIcon sx={{ fontSize: 60, mb: 2 }} />
              </Box>
              <Typography
                variant="h3"
                component="h1"
                sx={{
                  fontWeight: 800,
                  mb: 2,
                  fontSize: { xs: '2rem', md: '3rem' }
                }}
              >
                Submit a Support Ticket
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.9 }}>
                Tell us about your issue and we'll get back to you as soon as possible
              </Typography>
            </Box>
          </Fade>
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
              background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)'
            }}
          >
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="your.email@example.com"
                    variant="outlined"
                    sx={{}}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Subject"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    placeholder="Brief description of your issue"
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
                      sx={{ 
                        
                        minHeight: '56px',
                        '& .MuiSelect-select': {
                          minHeight: '24px',
                          display: 'flex',
                          alignItems: 'center',
                          paddingTop: '16.5px',
                          paddingBottom: '16.5px'
                        }
                      }}
                      MenuProps={{
                        PaperProps: {
                          sx: {
                            maxHeight: 300,
                            '& .MuiMenuItem-root': {
                              minHeight: '48px',
                              whiteSpace: 'normal',
                              wordWrap: 'break-word',
                              padding: '12px 16px'
                            }
                          }
                        }
                      }}
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
                    <InputLabel>Priority</InputLabel>
                    <Select
                      name="priority"
                      value={formData.priority}
                      label="Priority"
                      onChange={handleInputChange}
                      sx={{ 
                        
                        minHeight: '56px',
                        '& .MuiSelect-select': {
                          minHeight: '24px',
                          display: 'flex',
                          alignItems: 'center',
                          paddingTop: '16.5px',
                          paddingBottom: '16.5px'
                        }
                      }}
                      MenuProps={{
                        PaperProps: {
                          sx: {
                            maxHeight: 300,
                            '& .MuiMenuItem-root': {
                              minHeight: '48px',
                              padding: '12px 16px'
                            }
                          }
                        }
                      }}
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
                    label="Description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    multiline
                    rows={6}
                    placeholder="Please provide as much detail as possible about your issue..."
                    variant="outlined"
                    sx={{}}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom>
                    Attachments
                  </Typography>
                  <Paper
                    variant="outlined"
                    sx={{
                      p: 4,
                      textAlign: 'center',
                      borderStyle: 'dashed',
                      borderWidth: 2,
                      borderColor: 'primary.main',
                      
                      bgcolor: 'primary.50',
                      cursor: 'pointer',
                      '&:hover': {
                        bgcolor: 'primary.100'
                      }
                    }}
                    onClick={() => document.getElementById('file-upload').click()}
                  >
                    <UploadIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                    <Typography variant="body1" gutterBottom>
                      Drag and drop files here, or click to select
                    </Typography>
                    <input
                      type="file"
                      multiple
                      onChange={handleFileUpload}
                      style={{ display: 'none' }}
                      id="file-upload"
                      accept=".jpg,.jpeg,.png,.gif,.pdf,.doc,.docx,.txt"
                    />
                    <Button variant="outlined" sx={{ mt: 1 }}>
                      Choose Files
                    </Button>
                  </Paper>

                  {formData.attachments.length > 0 && (
                    <Box sx={{ mt: 3 }}>
                      <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                        Attached Files:
                      </Typography>
                      <Grid container spacing={1}>
                        {formData.attachments.map((file, index) => (
                          <Grid item key={index}>
                            <Chip
                              label={file.name}
                              onDelete={() => removeAttachment(index)}
                              deleteIcon={<CloseIcon />}
                              variant="outlined"
                              color="primary"
                            />
                          </Grid>
                        ))}
                      </Grid>
                    </Box>
                  )}
                </Grid>

                <Grid item xs={12}>
                  <Box display="flex" justifyContent="flex-end" gap={2} pt={2}>
                    <Button
                      variant="outlined"
                      onClick={() => navigate('/tickets')}
                      size="large"
                      sx={{}}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      startIcon={<SendIcon />}
                      size="large"
                      sx={{
                        
                        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: 4
                        }
                      }}
                    >
                      Submit Ticket
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Zoom>
      </Container>
    </Box>
  );
};

export default TicketForm;