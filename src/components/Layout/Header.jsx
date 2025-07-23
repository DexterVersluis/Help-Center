import { Link, useLocation } from 'react-router-dom';
import { Search, Menu, X } from 'lucide-react';
import { useState } from 'react';

const Header = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Support Docs', href: '/docs' },
    { name: 'Submit Ticket', href: '/tickets/new' },
    { name: 'My Tickets', href: '/tickets' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Feature Requests', href: '/features' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-white border-b border-border-light sticky top-0 z-50 backdrop-blur-sm bg-white/95">
      <div className="container">
        <div className="flex items-center justify-between h-24">
          <Link to="/" className="flex items-center space-x-3">
            <div className="text-purple font-bold text-2xl">ENBOQ</div>
            <span className="text-text-secondary font-medium text-lg">Support</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-10">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`font-medium transition-colors py-3 px-4 rounded-xl text-lg ${
                  isActive(item.href)
                    ? 'text-pink bg-light-pink'
                    : 'text-text-secondary hover:text-orange hover:bg-bg-secondary'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <button
            className="md:hidden p-3 rounded-lg hover:bg-bg-secondary transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-purple" />
            ) : (
              <Menu className="h-6 w-6 text-purple" />
            )}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden py-8 border-t border-border-light">
            <nav className="flex flex-col space-y-3">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`font-medium transition-colors py-4 px-5 rounded-xl text-lg ${
                    isActive(item.href)
                      ? 'text-pink bg-light-pink'
                      : 'text-text-secondary hover:text-orange hover:bg-bg-secondary'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;