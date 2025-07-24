import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const userDropdownRef = useRef(null);
  const navDropdownRef = useRef(null);


  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Add blur effect to main content when dropdown is active
    const body = document.body;
    const html = document.documentElement;
    
    if (activeDropdown) {
      body.classList.add('dropdown-blur-active');
      html.classList.add('dropdown-blur-active');
    } else {
      body.classList.remove('dropdown-blur-active');
      html.classList.remove('dropdown-blur-active');
    }

    return () => {
      body.classList.remove('dropdown-blur-active');
      html.classList.remove('dropdown-blur-active');
    };
  }, [activeDropdown]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
      if (navDropdownRef.current && !navDropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };

    if (userDropdownOpen || activeDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [userDropdownOpen, activeDropdown]);



  const supportDocsOptions = [
    { label: 'All Documentation', value: '/docs', icon: '📚', description: 'Browse all documentation' },
    { label: 'FAQ', value: '/faq', icon: '❓', description: 'Frequently asked questions' },
    { label: 'Account Setup and Management', value: '/docs/account-setup', icon: '⚙️', description: 'Manage your account' },
    { label: 'Project Collaboration', value: '/docs/collaboration', icon: '👥', description: 'Work with your team' },
    { label: 'Advanced Features', value: '/docs/advanced', icon: '⚡', description: 'Power user features' },
    { label: 'API Documentation', value: '/docs/api', icon: '🔧', description: 'Developer resources' }
  ];

  const ticketsOptions = [
    { label: 'Submit Ticket', value: '/tickets/new', icon: '✉️', description: 'Create a new support ticket' },
    { label: 'My Tickets', value: '/tickets', icon: '📋', description: 'View your tickets' },
    { label: 'Open Tickets', value: '/tickets?status=open', icon: '🔓', description: 'Active support requests' },
    { label: 'Closed Tickets', value: '/tickets?status=closed', icon: '✅', description: 'Resolved tickets' }
  ];

  const featureRequestsOptions = [
    { label: 'Feature Requests', value: '/features', icon: '💡', description: 'Browse all feature requests' },
    { label: 'Popular Requests', value: '/features?sort=popular', icon: '🔥', description: 'Most requested features' },
    { label: 'Recently Added', value: '/features?sort=recent', icon: '🆕', description: 'Latest feature requests' }
  ];



  const handleOptionClick = (value) => {
    navigate(value);
    setActiveDropdown(null);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleMobileToggle = (dropdown) => {
    // On mobile, still use click behavior
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const DropdownMenu = ({ title, options, isActive, isMobile }) => (
    <div className="relative group">
      <button
        onClick={() => handleMobileToggle(title)}
        className={`modern-nav-item ${isActive ? 'active' : ''}`}
        aria-expanded={isActive}
      >
        <span>{title}</span>
        <svg 
          className={`nav-chevron ${isActive ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isActive && (
        <div className="modern-dropdown">
          <div className="dropdown-content">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleOptionClick(option.value)}
                className="dropdown-item"
              >
                <div className="item-icon">{option.icon}</div>
                <div className="item-content">
                  <div className="item-title">{option.label}</div>
                  <div className="item-description">{option.description}</div>
                </div>
                <svg className="item-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7-7" />
                </svg>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <header className={`modern-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        <Link to="/" className="brand-logo">
          <div className="logo-text">
            <span className="logo-primary">ENBOQ</span>
            <span className="logo-secondary">Support</span>
          </div>
          <div className="logo-glow"></div>
        </Link>

        <nav className={`main-nav ${isMobileMenuOpen ? 'mobile-open' : ''}`} ref={navDropdownRef}>
          <Link 
            to="/docs/getting-started" 
            className={`modern-nav-item ${location.pathname === '/docs/getting-started' ? 'active' : ''}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Getting Started
          </Link>
          
          <DropdownMenu
            title="Documentation"
            options={supportDocsOptions}
            isActive={activeDropdown === 'Documentation'}
            isMobile={isMobileMenuOpen}
          />
          
          <DropdownMenu
            title="Feature Requests"
            options={featureRequestsOptions}
            isActive={activeDropdown === 'Feature Requests'}
            isMobile={isMobileMenuOpen}
          />


        </nav>

        <div className="auth-section">
          {isAuthenticated ? (
            <div 
              className="user-menu-container"
              ref={userDropdownRef}
            >
              <button 
                className="user-menu-trigger"
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              >
                <span className="user-greeting">
                  Welcome, {user?.name || user?.username}
                </span>
                <svg 
                  className={`user-chevron ${userDropdownOpen ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {userDropdownOpen && (
                <div className="user-dropdown">
                  <div className="user-dropdown-content">
                    {ticketsOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          handleOptionClick(option.value);
                          setUserDropdownOpen(false);
                        }}
                        className="user-dropdown-item"
                      >
                        <div className="item-icon">{option.icon}</div>
                        <div className="item-content">
                          <div className="item-title">{option.label}</div>
                          <div className="item-description">{option.description}</div>
                        </div>
                        <svg className="item-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    ))}
                    
                    <div className="dropdown-divider"></div>
                    
                    <button 
                      onClick={() => {
                        handleLogout();
                        setUserDropdownOpen(false);
                      }}
                      className="user-dropdown-item logout-item"
                    >
                      <div className="item-icon">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                      </div>
                      <div className="item-content">
                        <div className="item-title">Logout</div>
                        <div className="item-description">Sign out of your account</div>
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link 
              to="/login" 
              className="header-login-button"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Login
            </Link>
          )}

          <a 
            href="https://start.enboq.com/admin/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="admin-button"
          >
            <span>Admin Dashboard</span>
            <svg className="external-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>

        <button 
          className="mobile-menu-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          <span className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></span>
          <span className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></span>
          <span className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></span>
        </button>
      </div>


    </header>
  );
};

export default Header;