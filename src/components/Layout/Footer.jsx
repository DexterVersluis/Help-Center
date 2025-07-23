import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-text-primary text-white mt-32">
      <div className="container py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
          <div>
            <div className="text-white font-bold text-3xl mb-6">ENBOQ</div>
            <p className="text-gray-300 leading-relaxed text-lg">
              Get the support you need, when you need it.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-white mb-8 text-xl">Support</h3>
            <ul className="space-y-4">
              <li><Link to="/docs" className="text-gray-300 hover:text-white transition-colors text-lg">Documentation</Link></li>
              <li><Link to="/faq" className="text-gray-300 hover:text-white transition-colors text-lg">FAQ</Link></li>
              <li><Link to="/tickets/new" className="text-gray-300 hover:text-white transition-colors text-lg">Submit Ticket</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-white mb-8 text-xl">Community</h3>
            <ul className="space-y-4">
              <li><Link to="/features" className="text-gray-300 hover:text-white transition-colors text-lg">Feature Requests</Link></li>
              <li><Link to="/tickets" className="text-gray-300 hover:text-white transition-colors text-lg">My Tickets</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-white mb-8 text-xl">Contact</h3>
            <p className="text-gray-300 leading-relaxed text-lg">
              Need immediate help?<br />
              <a href="mailto:support@enboq.com" className="text-orange hover:text-pink transition-colors font-medium">
                support@enboq.com
              </a>
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-16 pt-10 text-center">
          <p className="text-gray-400 text-lg">
            © 2024 ENBOQ. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;