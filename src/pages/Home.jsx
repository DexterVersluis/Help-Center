import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, MessageCircle, Book, Lightbulb, ArrowRight, HelpCircle, Settings, Code, Database, Shield, Workflow, FileText } from 'lucide-react';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const quickActions = [
    {
      title: 'Submit a Ticket',
      description: 'Get personalized help from our support team',
      icon: MessageCircle,
      link: '/tickets/new',
      actionText: 'Get started',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Browse Documentation',
      description: 'Step-by-step guides and tutorials',
      icon: Book,
      link: '/docs',
      actionText: 'Get started',
      gradient: 'from-blue-500 to-purple-500'
    },
    {
      title: 'Request a Feature',
      description: 'Share your ideas for new features',
      icon: Lightbulb,
      link: '/features',
      actionText: 'Get started',
      gradient: 'from-orange-500 to-pink-500'
    },
    {
      title: 'View FAQ',
      description: 'Quick answers to common questions',
      icon: HelpCircle,
      link: '/faq',
      actionText: 'Get started',
      gradient: 'from-green-500 to-blue-500'
    }
  ];

  const popularTopics = [
    'Getting Started with ENBOQ',
    'Account Setup and Management',
    'Project Collaboration'
  ];

  const enboqFeatures = [
    {
      icon: Database,
      title: 'Data Management',
      description: 'Organize and manage your data efficiently with ENBOQ\'s powerful database tools',
      link: '/docs/data-management'
    },
    {
      icon: Workflow,
      title: 'Workflow Automation',
      description: 'Streamline your processes with automated workflows and custom triggers',
      link: '/docs/workflows'
    },
    {
      icon: Code,
      title: 'API Integration',
      description: 'Connect ENBOQ with your existing tools using our comprehensive API',
      link: '/docs/api'
    },
    {
      icon: Shield,
      title: 'Security & Permissions',
      description: 'Control access and secure your data with advanced permission settings',
      link: '/docs/security'
    }
  ];

  const howToGuides = [
    {
      title: 'Setting Up Your First Project',
      description: 'Learn how to create and configure your first ENBOQ project',
      category: 'Getting Started',
      readTime: '5 min read',
      link: '/docs/first-project'
    },
    {
      title: 'Managing Team Permissions',
      description: 'Configure user roles and permissions for your team members',
      category: 'Administration',
      readTime: '8 min read',
      link: '/docs/team-permissions'
    },
    {
      title: 'Creating Custom Workflows',
      description: 'Build automated workflows to streamline your business processes',
      category: 'Automation',
      readTime: '12 min read',
      link: '/docs/custom-workflows'
    },
    {
      title: 'Integrating with External APIs',
      description: 'Connect ENBOQ with third-party services and applications',
      category: 'Integration',
      readTime: '10 min read',
      link: '/docs/api-integration'
    }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // Navigate to docs page with search term as URL parameter
      navigate(`/docs?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
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
              Master ENBOQ with ease
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
              Find guides, tutorials, and documentation to help you get the most out of ENBOQ's powerful features
            </p>
            
            {/* Modern Search Bar */}
            <div className="max-w-3xl mx-auto mb-12">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                <div className="relative bg-white rounded-2xl p-2 shadow-2xl border border-gray-200">
                  <form onSubmit={handleSearch} className="flex items-center">
                    <Search className="w-6 h-6 text-gray-400 ml-4" />
                    <input
                      type="text"
                      placeholder="Search ENBOQ docs... Try 'How do I create a workflow?'"
                      className="modern-search-input"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      onKeyPress={handleKeyPress}
                    />
                    <button 
                      type="submit"
                      className="modern-search-button"
                      disabled={!searchTerm.trim()}
                    >
                      Search
                    </button>
                  </form>
                </div>
              </div>
            </div>

            {/* Popular Topics */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-lg">
              <span className="text-gray-600 font-semibold text-xl">Popular topics:</span>
              {['Data Management', 'API Integration', 'Workflow Setup', 'User Permissions'].map((topic, index) => (
                <Link
                  key={index}
                  to="/docs"
                  className="group bg-white backdrop-blur-sm rounded-2xl border-2 border-purple-200/80 hover:border-purple-400 hover:shadow-xl hover:shadow-purple-300/40 transition-all duration-300 text-gray-800 hover:text-purple-700 font-semibold text-lg transform hover:-translate-y-1 hover:scale-105"
                  style={{ padding: '5px 10px' }}
                >
                  <span className="flex items-center whitespace-nowrap">
                    {topic}
                    <div className="ml-4 w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-0 group-hover:scale-100"></div>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions with Modern Cards */}
      <section className="py-24 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              What would you like to do?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose your path to getting the help you need
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <div key={index} className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur opacity-0 group-hover:opacity-20 transition duration-500"></div>
                  <div className="relative bg-white rounded-3xl p-8 border border-gray-100 hover:border-gray-200 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 h-full flex flex-col">
                    <div className="mb-6">
                      <div className={`w-16 h-16 bg-gradient-to-r ${action.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors">
                        {action.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {action.description}
                      </p>
                    </div>
                    <div className="mt-auto">
                      <Link
                        to={action.link}
                        className="inline-flex items-center text-purple-600 hover:text-pink-600 font-semibold group-hover:translate-x-2 transition-all duration-300"
                      >
                        <span>{action.actionText}</span>
                        <ArrowRight className="h-5 w-5 ml-2" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ENBOQ Features Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Discover ENBOQ Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore the powerful capabilities that make ENBOQ the perfect solution for your business needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {enboqFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="group">
                  <div className="bg-white rounded-3xl p-8 border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full">
                    <div className="flex items-start space-x-6">
                      <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors">
                          {feature.title}
                        </h3>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                          {feature.description}
                        </p>
                        <Link
                          to={feature.link}
                          className="inline-flex items-center text-purple-600 hover:text-pink-600 font-semibold group-hover:translate-x-2 transition-all duration-300"
                        >
                          Learn more
                          <ArrowRight className="h-5 w-5 ml-2" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center">
            <Link 
              to="/docs" 
              className="modern-cta-button"
            >
              View All Features
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* How-to Guides Section */}
      <section className="py-24 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Step-by-Step Guides
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Learn how to make the most of ENBOQ with our comprehensive tutorials and guides
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {howToGuides.map((guide, index) => (
              <div key={index} className="group">
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full">
                  <div className="flex items-start justify-between mb-4">
                    <span className="px-3 py-1 text-sm font-medium rounded-full" style={{ backgroundColor: 'rgba(255, 142, 0, 0.1)', color: '#FF8E00' }}>
                      {guide.category}
                    </span>
                    <span className="text-sm text-gray-500">{guide.readTime}</span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors">
                    {guide.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {guide.description}
                  </p>
                  
                  <Link
                    to={guide.link}
                    className="inline-flex items-center text-purple-600 hover:text-pink-600 font-semibold group-hover:translate-x-2 transition-all duration-300"
                  >
                    Read guide
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 border border-purple-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Popular Topics</h3>
              <div className="space-y-4">
                {popularTopics.concat(['Data Import & Export', 'Custom Field Configuration', 'Reporting & Analytics']).map((topic, index) => (
                  <Link
                    key={index}
                    to="/docs"
                    className="flex items-center justify-between p-4 bg-white/60 backdrop-blur-sm rounded-xl hover:bg-white/80 transition-all group"
                  >
                    <span className="font-medium text-gray-700">{topic}</span>
                    <ArrowRight className="h-5 w-5 text-purple-600 group-hover:translate-x-1 transition-transform" />
                  </Link>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Comprehensive Documentation</h3>
                  <p className="text-gray-600">Detailed guides covering every aspect of ENBOQ functionality</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center">
                  <Settings className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Configuration Examples</h3>
                  <p className="text-gray-600">Real-world examples and best practices for setup and configuration</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Code className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Code Samples</h3>
                  <p className="text-gray-600">Ready-to-use code snippets and integration examples</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative container text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            Need personalized help?
          </h2>
          <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
            Can't find the answer in our documentation? Get direct support from our ENBOQ experts 
            who can help with your specific use case.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link 
              to="/tickets/new" 
              className="modern-primary-button"
            >
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

export default Home;