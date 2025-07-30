import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { AuthService } from '../services/authService'
import {
  Box,
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Alert,
  InputAdornment,
  CircularProgress,
  Link as MuiLink,
  Avatar,
  Stack,
  Divider,
  IconButton
} from '@mui/material'
import {
  Person,
  Lock,
  Login as LoginIcon,
  ArrowForward,
  Visibility,
  VisibilityOff
} from '@mui/icons-material'

export default function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    if (error) setError('')
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const result = await AuthService.login(formData.username, formData.password)
      navigate('/')
      window.dispatchEvent(new CustomEvent('userLoggedIn', { detail: result }))
    } catch (err) {
      console.error('Login failed:', err)
      if (err.message === 'auth/invalid-credentials') {
        setError('Invalid username or password')
      } else {
        setError(err.message || 'Login failed. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #823BEB 0%, #ED00B8 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background decorative elements */}
      <Box
        sx={{
          position: 'absolute',
          top: '10%',
          left: '10%',
          width: 200,
          height: 200,
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.1)',
          filter: 'blur(40px)',
          '@keyframes float': {
            '0%, 100%': { transform: 'translateY(0px)' },
            '50%': { transform: 'translateY(-20px)' }
          },
          animation: 'float 6s ease-in-out infinite'
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '10%',
          right: '10%',
          width: 150,
          height: 150,
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.1)',
          filter: 'blur(40px)',
          '@keyframes floatReverse': {
            '0%, 100%': { transform: 'translateY(0px)' },
            '50%': { transform: 'translateY(20px)' }
          },
          animation: 'floatReverse 8s ease-in-out infinite'
        }}
      />

      <Container maxWidth="sm">
        <Paper
          elevation={24}
          sx={{
            p: 6,
            borderRadius: 4,
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}
        >
          {/* Logo and Header */}
          <Box textAlign="center" mb={4}>
            <Box sx={{ mb: 3 }}>
              <img 
                src="/assets/Enboq-Logo-NoPayoff-Svg.svg" 
                alt="Enboq" 
                style={{ width: '120px', height: '120px' }}
              />
            </Box>
            <Typography variant="h1" component="h1" gutterBottom fontWeight="900">
              Welcome Back
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Sign in to access your admin dashboard
            </Typography>
          </Box>

          {/* Admin Account Notice */}
          <Alert 
            severity="info" 
            sx={{ 
              mb: 3, 
              borderRadius: 2,
              backgroundColor: 'rgba(25, 118, 210, 0.08)',
              border: '1px solid rgba(25, 118, 210, 0.2)'
            }}
          >
            <Typography variant="body2">
              You can use the same account credentials that you use for the admin environment.
            </Typography>
          </Alert>

          {/* Login Form */}
          <Box component="form" onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <TextField
                fullWidth
                id="username"
                name="username"
                label="Username"
                type="text"
                required
                autoComplete="username"
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleChange}
                disabled={loading}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person color="action" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  }
                }}
              />

              <TextField
                fullWidth
                id="password"
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                required
                autoComplete="current-password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                disabled={loading}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={togglePasswordVisibility}
                        edge="end"
                        disabled={loading}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  }
                }}
              />

              <Box textAlign="right">
                <MuiLink
                  href="https://start.enboq.com/admin/reset-password"
                  target="_blank"
                  rel="noopener noreferrer"
                  underline="hover"
                  sx={{
                    color: '#823BEB',
                    '&:hover': {
                      color: '#FF8E00'
                    }
                  }}
                >
                  Forgot your password?
                </MuiLink>
              </Box>

              {error && (
                <Alert severity="error" sx={{ borderRadius: 2 }}>
                  {error}
                </Alert>
              )}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20} /> : <LoginIcon />}
                sx={{
                  py: 2,
                  borderRadius: 2,
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  backgroundColor: '#823BEB',
                  '&:hover': {
                    backgroundColor: '#6B2BC7',
                  }
                }}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
            </Stack>
          </Box>

          <Divider sx={{ my: 4 }} />

          {/* Footer */}
          <Box textAlign="center">
            <Typography variant="body2" color="text.secondary">
              Need help?{' '}
              <MuiLink
                component={Link}
                to="/docs"
                underline="hover"
                sx={{ 
                  fontWeight: 'medium',
                  color: '#823BEB',
                  '&:hover': {
                    color: '#FF8E00'
                  }
                }}
              >
                Visit our documentation
              </MuiLink>
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              No account yet?{' '}
              <MuiLink
                href="https://start.enboq.com/admin/register"
                target="_blank"
                rel="noopener noreferrer"
                underline="hover"
                sx={{ 
                  fontWeight: 'medium',
                  color: '#823BEB',
                  '&:hover': {
                    color: '#FF8E00'
                  }
                }}
              >
                Sign up
              </MuiLink>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  )
}