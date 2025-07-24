import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronDown, ChevronUp, HelpCircle, ArrowRight, MessageCircle } from 'lucide-react';

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
    <div className="min-h-screen">
      {/* Hero Section with Modern Gradient */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-40 w-72 h-72 bg-orange-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="relative container py-24 md:py-32">
          <div className="text-center max-w-5xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent mb-8 leading-tight">
              Frequently Asked Questions
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
              Find quick answers to common questions about ENBOQ
            </p>
            
            {/* Modern Search Bar */}
            <div className="max-w-3xl mx-auto mb-12">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                <div className="relative bg-white rounded-2xl p-2 shadow-2xl border border-gray-200">
                  <div className="flex items-center">
                    <Search className="w-6 h-6 text-gray-400 ml-4" />
                    <input
                      type="text"
                      placeholder="Search FAQs... Try 'How do I reset my password?'"
                      className="modern-search-input"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <select
                      className="modern-search-select"
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
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap justify-center items-center gap-3 text-sm">
              <span className="text-gray-500 font-medium mr-2">Quick actions:</span>
              <button
                onClick={expandAll}
                className="group relative px-5 py-2.5 bg-gradient-to-r from-white to-gray-50 backdrop-blur-sm rounded-full border border-gray-200/60 hover:border-purple-300/80 hover:shadow-lg hover:shadow-purple-100/50 transition-all duration-300 text-gray-700 hover:text-purple-600 font-medium overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-50/0 via-purple-50/50 to-pink-50/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10 flex items-center">
                  Expand All
                  <div className="ml-2 w-1.5 h-1.5 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-0 group-hover:scale-100"></div>
                </span>
              </button>
              <button
                onClick={collapseAll}
                className="group relative px-5 py-2.5 bg-gradient-to-r from-white to-gray-50 backdrop-blur-sm rounded-full border border-gray-200/60 hover:border-purple-300/80 hover:shadow-lg hover:shadow-purple-100/50 transition-all duration-300 text-gray-700 hover:text-purple-600 font-medium overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-50/0 via-purple-50/50 to-pink-50/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10 flex items-center">
                  Collapse All
                  <div className="ml-2 w-1.5 h-1.5 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-0 group-hover:scale-100"></div>
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Content Section */}
      <section className="py-24 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-lg text-gray-600">
                {filteredFAQs.length} question{filteredFAQs.length !== 1 ? 's' : ''} found
              </span>
            </div>

            {filteredFAQs.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 border border-gray-100 shadow-xl text-center">
                <HelpCircle className="mx-auto h-20 w-20 text-purple-300 mb-6" />
                <h3 className="text-3xl font-bold text-gray-900 mb-4">No FAQs found</h3>
                <p className="text-xl text-gray-600 mb-8">
                  Try adjusting your search terms or category filter.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                  }}
                  className="modern-secondary-button"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredFAQs.map((faq) => (
                  <div key={faq.id} className="group">
                    <div className="bg-white rounded-2xl border border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all duration-300">
                      <button
                        onClick={() => toggleExpanded(faq.id)}
                        className="w-full text-left p-6 flex items-start justify-between"
                      >
                        <div className="flex-1 pr-4">
                          <div className="flex items-center space-x-3 mb-3">
                            <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
                              {faq.category}
                            </span>
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-purple-600 transition-colors leading-tight">
                            {faq.question}
                          </h3>
                        </div>
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 bg-gray-100 group-hover:bg-purple-100 rounded-lg flex items-center justify-center transition-all duration-300">
                            {expandedItems.has(faq.id) ? (
                              <ChevronUp className="h-4 w-4 text-gray-600 group-hover:text-purple-600" />
                            ) : (
                              <ChevronDown className="h-4 w-4 text-gray-600 group-hover:text-purple-600" />
                            )}
                          </div>
                        </div>
                      </button>

                      {expandedItems.has(faq.id) && (
                        <div className="px-6 pb-6">
                          <div className="pt-4 border-t border-gray-100">
                            <p className="text-gray-600 leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative container text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            Still have questions?
          </h2>
          <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
            Can't find what you're looking for? Our support team is here to help with personalized assistance.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link 
              to="/tickets/new" 
              className="modern-primary-button"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Submit Support Ticket
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <a 
              href="mailto:support@enboq.com" 
              className="modern-secondary-button"
            >
              Email Support Team
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;