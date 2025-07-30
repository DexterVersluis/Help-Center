import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import enboqWhiteLogo from '../../../assets/enboq-white.svg';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
  IconButton,
  Box,
  Avatar,
  Divider,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  Collapse
} from '@mui/material';
import {
  ExpandMore,
  ExpandLess,
  Menu as MenuIcon,
  AccountCircle,
  Logout,
  Description,
  Help,
  BugReport,
  Lightbulb,
  Dashboard,
  Launch,
  Timeline
} from '@mui/icons-material';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [anchorEl, setAnchorEl] = useState(null);
  const [userMenuAnchor, setUserMenuAnchor] = useState(null);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState(null);






  const supportDocsOptions = [
    { label: 'All Documentation', value: '/docs', icon: <Description />, description: 'Browse all documentation' },
    { label: 'Configure Platform Settings', value: '/docs/how-to-configure-platform-settings-in-enboq', icon: <Description />, description: 'Set up your ENBOQ onboarding environment' },
    { label: 'Add Employees', value: '/docs/how-to-add-employees-to-your-onboarding-platform', icon: <Description />, description: 'Learn how to add employees to your platform' },
    { label: 'Create Your First Journey', value: '/docs/how-to-create-your-first-onboarding-journey', icon: <Description />, description: 'Build complete onboarding journeys for new hires' }
  ];

  const ticketsOptions = [
    { label: 'Submit Ticket', value: '/tickets/new', icon: <BugReport />, description: 'Create a new support ticket' },
    { label: 'My Tickets', value: '/tickets', icon: <Description />, description: 'View your tickets' },
    { label: 'Open Tickets', value: '/tickets?status=open', icon: <Description />, description: 'Active support requests' },
    { label: 'Closed Tickets', value: '/tickets?status=closed', icon: <Description />, description: 'Resolved tickets' }
  ];





  const handleOptionClick = (value) => {
    navigate(value);
    setAnchorEl(null);
    setUserMenuAnchor(null);
    setMobileDrawerOpen(false);
    setExpandedMenu(null);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
      setUserMenuAnchor(null);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleMenuClick = (event, menuType) => {
    setAnchorEl(event.currentTarget);
    setExpandedMenu(menuType);
  };

  const handleUserMenuClick = (event) => {
    setUserMenuAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setUserMenuAnchor(null);
    setExpandedMenu(null);
  };

  // Helper function to check if a path is active
  const isActivePath = (path) => {
    if (path === '/docs') {
      return location.pathname.startsWith('/docs');
    }
    return location.pathname === path;
  };

  const toggleMobileMenu = (menuType) => {
    setExpandedMenu(expandedMenu === menuType ? null : menuType);
  };

  const renderMobileMenu = () => (
    <Drawer
      anchor="left"
      open={mobileDrawerOpen}
      onClose={() => setMobileDrawerOpen(false)}
      sx={{ '& .MuiDrawer-paper': { width: 280 } }}
    >
      <Box sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <img 
            src={enboqWhiteLogo} 
            alt="ENBOQ" 
            style={{ 
              height: '24px',
              marginRight: '8px',
              filter: 'invert(1)'
            }} 
          />
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Support
          </Typography>
        </Box>
        <List>
          <ListItem disablePadding>
            <ListItemButton 
              component={Link} 
              to="/docs/onboarding-platform-demo-enboq" 
              onClick={() => setMobileDrawerOpen(false)}
              sx={{
                backgroundColor: isActivePath('/docs/onboarding-platform-demo-enboq') ? 'rgba(0,0,0,0.1)' : 'transparent'
              }}
            >
              <ListItemText primary="Full Platform Demo" />
            </ListItemButton>
          </ListItem>
          
          <ListItem disablePadding>
            <ListItemButton 
              onClick={() => toggleMobileMenu('Documentation')}
              sx={{
                backgroundColor: isActivePath('/docs') ? 'rgba(0,0,0,0.1)' : 'transparent'
              }}
            >
              <ListItemText primary="Documentation" />
              {expandedMenu === 'Documentation' ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </ListItem>
          <Collapse in={expandedMenu === 'Documentation'} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {supportDocsOptions.map((option) => (
                <ListItem key={option.value} disablePadding sx={{ pl: 4 }}>
                  <ListItemButton onClick={() => handleOptionClick(option.value)}>
                    <ListItemIcon>{option.icon}</ListItemIcon>
                    <ListItemText primary={option.label} secondary={option.description} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Collapse>

          <ListItem disablePadding>
            <ListItemButton 
              component={Link} 
              to="/faq" 
              onClick={() => setMobileDrawerOpen(false)}
              sx={{
                backgroundColor: isActivePath('/faq') ? 'rgba(0,0,0,0.1)' : 'transparent'
              }}
            >
              <ListItemText primary="FAQ" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton 
              component={Link} 
              to="/roadmap" 
              onClick={() => setMobileDrawerOpen(false)}
              sx={{
                backgroundColor: isActivePath('/roadmap') ? 'rgba(0,0,0,0.1)' : 'transparent'
              }}
            >
              <ListItemIcon><Timeline /></ListItemIcon>
              <ListItemText primary="Roadmap" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton 
              component={Link} 
              to="/features" 
              onClick={() => setMobileDrawerOpen(false)}
              sx={{
                backgroundColor: isActivePath('/features') ? 'rgba(0,0,0,0.1)' : 'transparent'
              }}
            >
              <ListItemText primary="Feature Requests" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );

  return (
    <>
      <AppBar 
        position="sticky" 
        elevation={1} 
        sx={{ 
          borderRadius: 0,
          background: 'linear-gradient(135deg, #823BEB 0%, #ED00B8 100%)'
        }}
      >
        <Toolbar>
          <Box
            component={Link}
            to="/"
            sx={{
              flexGrow: 1,
              textDecoration: 'none',
              color: 'inherit',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <img 
              src={enboqWhiteLogo} 
              alt="ENBOQ" 
              style={{ 
                height: '32px',
                marginRight: '12px'
              }} 
            />
            <Typography variant="body2" sx={{ color: 'white', opacity: 0.9, fontWeight: 500 }}>
              Support
            </Typography>
          </Box>

          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Button
                color="inherit"
                component={Link}
                to="/docs/onboarding-platform-demo-enboq"
                sx={{ 
                  textTransform: 'none',
                  backgroundColor: isActivePath('/docs/onboarding-platform-demo-enboq') ? 'rgba(255,255,255,0.2)' : 'transparent',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.1)'
                  }
                }}
              >
                Full Platform Demo
              </Button>

              <Button
                color="inherit"
                endIcon={<ExpandMore />}
                onClick={(e) => handleMenuClick(e, 'Documentation')}
                sx={{ 
                  textTransform: 'none',
                  backgroundColor: isActivePath('/docs') ? 'rgba(255,255,255,0.2)' : 'transparent',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.1)'
                  }
                }}
              >
                Documentation
              </Button>

              <Button
                color="inherit"
                component={Link}
                to="/faq"
                sx={{ 
                  textTransform: 'none',
                  backgroundColor: isActivePath('/faq') ? 'rgba(255,255,255,0.2)' : 'transparent',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.1)'
                  }
                }}
              >
                FAQ
              </Button>

              <Button
                color="inherit"
                component={Link}
                to="/roadmap"
                startIcon={<Timeline />}
                sx={{ 
                  textTransform: 'none',
                  backgroundColor: isActivePath('/roadmap') ? 'rgba(255,255,255,0.2)' : 'transparent',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.1)'
                  }
                }}
              >
                Roadmap
              </Button>

              <Button
                color="inherit"
                component={Link}
                to="/features"
                sx={{ 
                  textTransform: 'none',
                  backgroundColor: isActivePath('/features') ? 'rgba(255,255,255,0.2)' : 'transparent',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.1)'
                  }
                }}
              >
                Feature Requests
              </Button>
            </Box>
          )}

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 2 }}>
            {isAuthenticated ? (
              <Button
                color="inherit"
                startIcon={<Avatar sx={{ width: 24, height: 24 }}>{user?.name?.[0] || user?.username?.[0] || 'U'}</Avatar>}
                endIcon={<ExpandMore />}
                onClick={handleUserMenuClick}
                sx={{ textTransform: 'none' }}
              >
                {user?.name || user?.username}
              </Button>
            ) : (
              <Button
                color="inherit"
                component={Link}
                to="/login"
                sx={{ textTransform: 'none' }}
              >
                Login
              </Button>
            )}

            <Button
              color="inherit"
              href="https://start.enboq.com/admin/"
              target="_blank"
              rel="noopener noreferrer"
              startIcon={<Dashboard />}
              endIcon={<Launch />}
              sx={{ textTransform: 'none' }}
            >
              Admin
            </Button>

            {isMobile && (
              <IconButton
                color="inherit"
                onClick={() => setMobileDrawerOpen(true)}
                edge="end"
              >
                <MenuIcon />
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{ sx: { minWidth: 280, borderRadius: 0 } }}
      >
        {supportDocsOptions.map((option) => (
          <MenuItem key={option.value} onClick={() => handleOptionClick(option.value)}>
            <ListItemIcon>{option.icon}</ListItemIcon>
            <Box>
              <Typography variant="body2" fontWeight="medium">
                {option.label}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {option.description}
              </Typography>
            </Box>
          </MenuItem>
        ))}
      </Menu>

      <Menu
        anchorEl={userMenuAnchor}
        open={Boolean(userMenuAnchor)}
        onClose={handleClose}
        PaperProps={{ sx: { minWidth: 280, borderRadius: 0 } }}
      >
        {ticketsOptions.map((option) => (
          <MenuItem key={option.value} onClick={() => handleOptionClick(option.value)}>
            <ListItemIcon>{option.icon}</ListItemIcon>
            <Box>
              <Typography variant="body2" fontWeight="medium">
                {option.label}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {option.description}
              </Typography>
            </Box>
          </MenuItem>
        ))}
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout />
          </ListItemIcon>
          <Box>
            <Typography variant="body2" fontWeight="medium">
              Logout
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Sign out of your account
            </Typography>
          </Box>
        </MenuItem>
      </Menu>

      {renderMobileMenu()}
    </>
  );
};

export default Header;