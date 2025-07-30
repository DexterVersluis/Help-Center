import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
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
  Zoom
} from '@mui/material';
import {
  Send as SendIcon,
  CloudUpload as UploadIcon,
  Close as CloseIcon,
  VideoLibrary as VideoIcon
} from '@mui/icons-material';

const TicketForm = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    priority: 'medium',
    description: '',
    videoUrl: '',
    attachments: []
  });

  // Get real user data from auth context
  const userEmail = user?.email || '';
  const userName = user?.name || '';

  // Show loading if user data is still being fetched
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <Typography>Loading...</Typography>
      </Box>
    );
  }

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
      email: userEmail, // Include the user's email
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
              Submit a Support Ticket
            </Typography>
            
            <Typography
              variant="h5"
              color="text.secondary"
              sx={{ mb: 6, lineHeight: 1.6 }}
            >
              Tell us about your issue and we'll get back to you as soon as possible
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Form Section */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
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
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {/* Row 1: Name | Email */}
                <Box sx={{ display: 'flex', gap: 3 }}>
                  <TextField
                    label="Name"
                    value={userName}
                    disabled
                    variant="outlined"
                    sx={{
                      flex: 1,
                      '& .MuiInputBase-input.Mui-disabled': {
                        WebkitTextFillColor: 'rgba(0, 0, 0, 0.7)',
                      },
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        backgroundColor: 'grey.50'
                      }
                    }}
                  />
                  <TextField
                    label="Email"
                    value={userEmail}
                    disabled
                    variant="outlined"
                    sx={{
                      flex: 1,
                      '& .MuiInputBase-input.Mui-disabled': {
                        WebkitTextFillColor: 'rgba(0, 0, 0, 0.7)',
                      },
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                        backgroundColor: 'grey.50'
                      }
                    }}
                  />
                </Box>

                {/* Row 2: Priority | Category */}
                <Box sx={{ display: 'flex', gap: 3 }}>
                  <FormControl sx={{ flex: 1 }} required>
                    <InputLabel>Priority</InputLabel>
                    <Select
                      name="priority"
                      value={formData.priority}
                      label="Priority"
                      onChange={handleInputChange}
                      sx={{ 
                        borderRadius: 2,
                        '& .MuiSelect-select': {
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1
                        }
                      }}
                      renderValue={(value) => {
                        const priority = priorities.find(p => p.value === value);
                        return (
                          <Box display="flex" alignItems="center" gap={1}>
                            <Box
                              sx={{
                                width: 12,
                                height: 12,
                                borderRadius: '50%',
                                bgcolor: priority?.color === 'green' ? 'success.main' :
                                         priority?.color === 'orange' ? 'warning.main' :
                                         priority?.color === 'pink' ? 'error.main' :
                                         'secondary.main'
                              }}
                            />
                            {priority?.label}
                          </Box>
                        );
                      }}
                    >
                      {priorities.map(priority => (
                        <MenuItem key={priority.value} value={priority.value}>
                          <Box display="flex" alignItems="center" gap={1}>
                            <Box
                              sx={{
                                width: 12,
                                height: 12,
                                borderRadius: '50%',
                                bgcolor: priority.color === 'green' ? 'success.main' :
                                         priority.color === 'orange' ? 'warning.main' :
                                         priority.color === 'pink' ? 'error.main' :
                                         'secondary.main'
                              }}
                            />
                            {priority.label}
                          </Box>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl sx={{ flex: 1 }} required>
                    <InputLabel>Category</InputLabel>
                    <Select
                      name="category"
                      value={formData.category}
                      label="Category"
                      onChange={handleInputChange}
                      sx={{ borderRadius: 2 }}
                    >
                      {categories.map(category => (
                        <MenuItem key={category} value={category}>
                          {category}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>

                {/* Row 3: Subject */}
                <TextField
                  fullWidth
                  label="Subject"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., Unable to upload employee documents in onboarding workflow"
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2
                    }
                  }}
                />

                {/* Row 4: Description */}
                <TextField
                  fullWidth
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  multiline
                  rows={12}
                  placeholder="Please provide detailed information about your issue:

• What were you trying to do?
• What happened instead?
• What steps did you take before the issue occurred?
• What browser/device are you using?
• When did this issue first occur?
• Are there any error messages? (please include exact text)

Example: 'I was trying to upload a PDF document for a new employee's onboarding checklist. When I clicked the upload button in the Documents section, the page froze and showed an error message: File upload failed - invalid format. This started happening yesterday around 2 PM. I'm using Chrome on Windows 11, and the PDF is 2MB in size.'"
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      fontSize: '1rem',
                      lineHeight: 1.6
                    }
                  }}
                />

                {/* Row 5: Loom Video */}
                <TextField
                  fullWidth
                  label="Loom Video (Optional)"
                  name="videoUrl"
                  value={formData.videoUrl}
                  onChange={handleInputChange}
                  placeholder="e.g., https://www.loom.com/share/your-video-id or any video URL showing the issue"
                  variant="outlined"
                  helperText="Share a Loom, screen recording, or any video URL that demonstrates the issue"
                  InputProps={{
                    startAdornment: (
                      <VideoIcon sx={{ mr: 1, color: 'action.active' }} />
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2
                    }
                  }}
                />

                {/* Row 6: Additional Documents */}
                <Box>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 1 }}>
                    Additional Documents (Optional)
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    Upload screenshots, documents, or any files that help explain your issue
                  </Typography>
                  <Paper
                    variant="outlined"
                    sx={{
                      p: 4,
                      textAlign: 'center',
                      borderStyle: 'dashed',
                      borderWidth: 2,
                      borderColor: 'primary.main',
                      borderRadius: 3,
                      bgcolor: 'primary.50',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        bgcolor: 'primary.100',
                        transform: 'translateY(-2px)',
                        boxShadow: 4
                      }
                    }}
                    onClick={() => document.getElementById('file-upload').click()}
                  >
                    <UploadIcon sx={{ fontSize: 48, color: 'primary.main', mb: 1.5 }} />
                    <Typography variant="body1" gutterBottom sx={{ fontWeight: 500 }}>
                      Drag and drop files here, or click to select
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      Supports: Images, PDFs, Documents (Max 10MB each)
                    </Typography>
                    <input
                      type="file"
                      multiple
                      onChange={handleFileUpload}
                      style={{ display: 'none' }}
                      id="file-upload"
                      accept=".jpg,.jpeg,.png,.gif,.pdf,.doc,.docx,.txt,.xlsx,.csv"
                    />
                    <Button 
                      variant="contained" 
                      sx={{ 
                        borderRadius: 2,
                        px: 3,
                        py: 1,
                        textTransform: 'none',
                        fontWeight: 600
                      }}
                    >
                      Choose Files
                    </Button>
                  </Paper>

                  {formData.attachments.length > 0 && (
                    <Box sx={{ mt: 3 }}>
                      <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                        Attached Files:
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {formData.attachments.map((file, index) => (
                          <Chip
                            key={index}
                            label={`${file.name} (${(file.size / 1024 / 1024).toFixed(1)}MB)`}
                            onDelete={() => removeAttachment(index)}
                            deleteIcon={<CloseIcon />}
                            variant="outlined"
                            color="primary"
                            sx={{ 
                              maxWidth: 300,
                              borderRadius: 2
                            }}
                          />
                        ))}
                      </Box>
                    </Box>
                  )}
                </Box>

                {/* Row 7: Submit Button */}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, pt: 2 }}>
                  <Button
                    variant="outlined"
                    onClick={() => navigate('/tickets')}
                    size="large"
                    sx={{ 
                      px: 4,
                      py: 1.5,
                      borderRadius: 2,
                      textTransform: 'none',
                      fontWeight: 600
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    startIcon={<SendIcon />}
                    size="large"
                    sx={{
                      px: 4,
                      py: 1.5,
                      fontWeight: 700,
                      borderRadius: 2,
                      textTransform: 'none',
                      fontSize: '1rem',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 6px 20px rgba(0,0,0,0.2)'
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Submit Ticket
                  </Button>
                </Box>
              </Box>
            </form>
          </Paper>
        </Zoom>
      </Container>
    </Box>
  );
};

export default TicketForm;