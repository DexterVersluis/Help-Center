import { useState } from 'react';
import { Search, ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedItems, setExpandedItems] = useState(new Set());

  const categories = [
    'Getting Started',
    'Account Management',
    'Billing & Payments',
    'Technical Issues',
    'Features & Functionality',
    'Security & Privacy'
  ];

  const faqData = [
    {
      id: 1,
      category: 'Getting Started',
      question: 'How do I create my first project?',
      answer: 'To create your first project, log into your ENBOQ dashboard and click the "New Project" button. Follow the setup wizard to configure your project settings, choose your template, and invite team members. The process typically takes 2-3 minutes.'
    },
    {
      id: 2,
      category: 'Getting Started',
      question: 'What are the system requirements?',
      answer: 'ENBOQ works on all modern web browsers including Chrome, Firefox, Safari, and Edge. For mobile apps, we support iOS 12+ and Android 8+. No additional software installation is required for the web version.'
    },
    {
      id: 3,
      category: 'Account Management',
      question: 'How do I reset my password?',
      answer: 'Click "Forgot Password" on the login page, enter your email address, and we\'ll send you a reset link. The link expires after 24 hours for security. If you don\'t receive the email, check your spam folder or contact support.'
    },
    {
      id: 4,
      category: 'Account Management',
      question: 'Can I change my email address?',
      answer: 'Yes, you can update your email address in Account Settings. You\'ll need to verify the new email address before the change takes effect. This ensures account security and prevents unauthorized changes.'
    },
    {
      id: 5,
      category: 'Billing & Payments',
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for enterprise accounts. All payments are processed securely through our encrypted payment gateway.'
    },
    {
      id: 6,
      category: 'Billing & Payments',
      question: 'Can I upgrade or downgrade my plan?',
      answer: 'Yes, you can change your plan at any time from the Billing section in your account settings. Upgrades take effect immediately, while downgrades take effect at the next billing cycle. You\'ll be prorated for any changes.'
    },
    {
      id: 7,
      category: 'Technical Issues',
      question: 'Why is the app running slowly?',
      answer: 'Slow performance can be caused by several factors: poor internet connection, browser cache issues, or high server load. Try clearing your browser cache, checking your internet speed, or switching to a different browser. If issues persist, contact our technical support.'
    },
    {
      id: 8,
      category: 'Technical Issues',
      question: 'I\'m getting error messages. What should I do?',
      answer: 'First, try refreshing the page or logging out and back in. If the error persists, take a screenshot of the error message and contact support with details about what you were doing when the error occurred.'
    },
    {
      id: 9,
      category: 'Features & Functionality',
      question: 'How do I invite team members?',
      answer: 'Go to Team Settings in your project dashboard, click "Invite Members," enter their email addresses, and select their permission level. They\'ll receive an invitation email with setup instructions.'
    },
    {
      id: 10,
      category: 'Features & Functionality',
      question: 'Can I export my data?',
      answer: 'Yes, you can export your data in multiple formats (CSV, JSON, PDF) from the Export section in your account settings. Enterprise users have access to automated backup options and API access for data integration.'
    },
    {
      id: 11,
      category: 'Security & Privacy',
      question: 'How secure is my data?',
      answer: 'We use enterprise-grade security including 256-bit SSL encryption, regular security audits, and SOC 2 compliance. Your data is stored in secure data centers with 24/7 monitoring and automatic backups.'
    },
    {
      id: 12,
      category: 'Security & Privacy',
      question: 'Do you share my data with third parties?',
      answer: 'No, we never sell or share your personal data with third parties for marketing purposes. We only share data when required by law or with your explicit consent. Read our Privacy Policy for complete details.'
    }
  ];

  const filteredFAQs = faqData.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleExpanded = (id) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const expandAll = () => {
    setExpandedItems(new Set(filteredFAQs.map(faq => faq.id)));
  };

  const collapseAll = () => {
    setExpandedItems(new Set());
  };

  return (
    <div className="container py-8">
      <div className="text-center mb-8">
        <h1>Frequently Asked Questions</h1>
        <p className="text-gray-text">
          Find quick answers to common questions about ENBOQ
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="card mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-purple" />
              <input
                type="text"
                placeholder="Search FAQs..."
                className="form-input pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <select
              className="form-select md:w-64"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-between items-center mt-4 pt-4 border-t border-light-purple">
            <span className="text-sm text-gray-text">
              {filteredFAQs.length} question{filteredFAQs.length !== 1 ? 's' : ''} found
            </span>
            <div className="flex space-x-2">
              <button
                onClick={expandAll}
                className="text-sm text-purple hover:text-pink"
              >
                Expand All
              </button>
              <span className="text-gray-text">|</span>
              <button
                onClick={collapseAll}
                className="text-sm text-purple hover:text-pink"
              >
                Collapse All
              </button>
            </div>
          </div>
        </div>

        {filteredFAQs.length === 0 ? (
          <div className="card text-center py-12">
            <HelpCircle className="mx-auto h-16 w-16 text-light-purple mb-4" />
            <h3>No FAQs found</h3>
            <p className="text-gray-text mb-4">
              Try adjusting your search terms or category filter.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              className="btn btn-secondary"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredFAQs.map((faq) => (
              <div key={faq.id} className="card">
                <button
                  onClick={() => toggleExpanded(faq.id)}
                  className="w-full text-left flex items-center justify-between"
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="text-xs font-semibold text-pink bg-light-pink px-2 py-1 rounded">
                        {faq.category}
                      </span>
                    </div>
                    <h3 className="text-purple font-semibold text-lg">
                      {faq.question}
                    </h3>
                  </div>
                  <div className="ml-4">
                    {expandedItems.has(faq.id) ? (
                      <ChevronUp className="h-5 w-5 text-purple" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-purple" />
                    )}
                  </div>
                </button>

                {expandedItems.has(faq.id) && (
                  <div className="mt-4 pt-4 border-t border-light-purple">
                    <p className="text-gray-text leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="card mt-8 text-center gradient-bg">
          <h3>Still have questions?</h3>
          <p className="text-gray-text mb-4">
            Can't find what you're looking for? Our support team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/tickets/new"
              className="btn btn-primary"
            >
              Submit a Ticket
            </a>
            <a
              href="mailto:support@enboq.com"
              className="btn btn-secondary"
            >
              Email Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;