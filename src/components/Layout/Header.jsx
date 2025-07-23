import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoverTimeout, setHoverTimeout] = useState(null);

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

  const supportDocsOptions = [
    { label: 'Support Docs', value: '/docs', icon: '📚', description: 'Browse all documentation' },
    { label: 'FAQ', value: '/faq', icon: '❓', description: 'Frequently asked questions' },
    { label: 'Getting Started with ENBOQ', value: '/docs/getting-started', icon: '🚀', description: 'Quick start guide' },
    { label: 'Account Setup and Management', value: '/docs/account-setup', icon: '⚙️', description: 'Manage your account' },
    { label: 'Project Collaboration', value: '/docs/collaboration', icon: '👥', description: 'Work with your team' }
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

  const handleMouseEnter = (dropdown) => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
    }
    setActiveDropdown(dropdown);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setActiveDropdown(null);
    }, 150); // Small delay to prevent flickering
    setHoverTimeout(timeout);
  };

  const handleDropdownMouseEnter = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
    }
  };

  const handleOptionClick = (value) => {
    navigate(value);
    setActiveDropdown(null);
    setIsMobileMenuOpen(false);
  };

  const handleMobileToggle = (dropdown) => {
    // On mobile, still use click behavior
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const DropdownMenu = ({ title, options, isActive, isMobile }) => (
    <div 
      className="relative group"
      onMouseEnter={() => !isMobile && handleMouseEnter(title)}
      onMouseLeave={() => !isMobile && handleMouseLeave()}
    >
      <button
        onClick={() => isMobile && handleMobileToggle(title)}
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
        <div 
          className="modern-dropdown"
          onMouseEnter={() => !isMobile && handleDropdownMouseEnter()}
          onMouseLeave={() => !isMobile && handleMouseLeave()}
        >
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

        <nav className={`main-nav ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          <DropdownMenu
            title="Support Docs"
            options={supportDocsOptions}
            isActive={activeDropdown === 'Support Docs'}
            isMobile={isMobileMenuOpen}
          />
          
          <DropdownMenu
            title="Tickets"
            options={ticketsOptions}
            isActive={activeDropdown === 'Tickets'}
            isMobile={isMobileMenuOpen}
          />
          
          <DropdownMenu
            title="Feature Requests"
            options={featureRequestsOptions}
            isActive={activeDropdown === 'Feature Requests'}
            isMobile={isMobileMenuOpen}
          />

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
        </nav>

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

      {activeDropdown && (
        <div 
          className="dropdown-overlay" 
          onClick={() => setActiveDropdown(null)}
        ></div>
      )}
    </header>
  );
};

export default Header;