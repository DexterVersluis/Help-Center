import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Book, Play, FileText, Clock, ChevronRight, Star, ArrowRight } from 'lucide-react';

const SupportDocs = () => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [docs, setDocs] = useState([]);
  const [filteredDocs, setFilteredDocs] = useState([]);

  const categories = [
    'Getting Started',
    'Account Management',
    'Project Setup',
    'Collaboration',
    'Advanced Features',
    'Integrations',
    'Troubleshooting',
    'Setup Integrations'
  ];

  useEffect(() => {
    const sampleDocs = [
      {
        id: 'doc-001',
        title: 'Getting Started with ENBOQ',
        description: 'Complete guide to setting up your first project and understanding the basics',
        category: 'Getting Started',
        type: 'guide',
        readTime: '5 min',
        difficulty: 'Beginner',
        hasVideo: true,
        videoUrl: 'https://example.com/video1',
        steps: 6,
        rating: 4.8,
        views: 1250,
        lastUpdated: '2024-01-20T10:00:00Z'
      },
      {
        id: 'doc-002',
        title: 'Creating Your First Project',
        description: 'Step-by-step walkthrough of project creation with best practices',
        category: 'Project Setup',
        type: 'tutorial',
        readTime: '8 min',
        difficulty: 'Beginner',
        hasVideo: true,
        videoUrl: 'https://example.com/video2',
        steps: 10,
        rating: 4.9,
        views: 980,
        lastUpdated: '2024-01-18T14:30:00Z'
      },
      {
        id: 'doc-003',
        title: 'Advanced User Management',
        description: 'Managing team members, roles, and permissions in complex organizations',
        category: 'Account Management',
        type: 'guide',
        readTime: '12 min',
        difficulty: 'Advanced',
        hasVideo: false,
        steps: 15,
        rating: 4.6,
        views: 567,
        lastUpdated: '2024-01-15T09:15:00Z'
      },
      {
        id: 'doc-004',
        title: 'Real-time Collaboration Features',
        description: 'Learn how to use live editing, comments, and team communication tools',
        category: 'Collaboration',
        type: 'tutorial',
        readTime: '10 min',
        difficulty: 'Intermediate',
        hasVideo: true,
        videoUrl: 'https://example.com/video4',
        steps: 8,
        rating: 4.7,
        views: 743,
        lastUpdated: '2024-01-22T11:45:00Z'
      },
      {
        id: 'doc-005',
        title: 'Third-Party Integration Setup',
        description: 'Complete guide to setting up and configuring third-party integrations',
        category: 'Setup Integrations',
        type: 'reference',
        readTime: '15 min',
        difficulty: 'Advanced',
        hasVideo: false,
        steps: 12,
        rating: 4.5,
        views: 432,
        lastUpdated: '2024-01-10T16:20:00Z'
      },
      {
        id: 'doc-006',
        title: 'Troubleshooting Common Issues',
        description: 'Solutions to frequently encountered problems and error messages',
        category: 'Troubleshooting',
        type: 'reference',
        readTime: '6 min',
        difficulty: 'Beginner',
        hasVideo: false,
        steps: 0,
        rating: 4.4,
        views: 1100,
        lastUpdated: '2024-01-25T13:10:00Z'
      },
      {
        id: 'onboarding-platform-demo-enboq',
        title: 'Full ENBOQ Platform Demo',
        description: 'Comprehensive walkthrough of the ENBOQ platform features and capabilities, showcasing how to create engaging onboarding experiences',
        category: 'Getting Started',
        type: 'guide',
        readTime: '10 min',
        difficulty: 'Beginner',
        hasVideo: true,
        videoUrl: 'https://loom.com/share/3faa8ae6cc5b46a59a51b69bfdaf4107',
        steps: 10,
        rating: 4.9,
        views: 1250,
        lastUpdated: '2024-07-20T09:30:00Z'
      }
    ];
    setDocs(sampleDocs);
    setFilteredDocs(sampleDocs);

    // Check for search parameter in URL
    const urlParams = new URLSearchParams(location.search);
    const searchParam = urlParams.get('search');
    if (searchParam) {
      setSearchTerm(searchParam);
    }
  }, [location.search]);

  useEffect(() => {
    let filtered = docs;

    if (searchTerm) {
      filtered = filtered.filter(doc =>
        doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(doc => doc.category === selectedCategory);
    }

    setFilteredDocs(filtered);
  }, [docs, searchTerm, selectedCategory]);

  const getDifficultyColor = (difficulty) => {
    const colors = {
      'Beginner': 'text-green bg-green bg-opacity-10',
      'Intermediate': 'text-orange bg-orange bg-opacity-10',
      'Advanced': 'text-pink bg-pink bg-opacity-10'
    };
    return colors[difficulty] || 'text-gray-text bg-gray-100';
  };

  const getTypeIcon = (type) => {
    const icons = {
      'guide': Book,
      'tutorial': Play,
      'reference': FileText
    };
    return icons[type] || FileText;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const popularDocs = docs.filter(doc => doc.views > 700).slice(0, 3);

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
              Support Documentation
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
              Comprehensive guides, tutorials, and references to help you master ENBOQ
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
                      placeholder="Search documentation... Try 'API setup' or 'getting started'"
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

            {/* Popular Topics */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-lg">
              <span className="text-gray-600 font-semibold text-xl">Popular topics:</span>
              {['Getting Started', 'Setup Integrations', 'Project Setup', 'Troubleshooting'].map((topic, index) => (
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

      {/* Documentation Content Section */}
      <section className="py-24 bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            <div className="lg:col-span-3">

              {filteredDocs.length === 0 ? (
                <div className="bg-white rounded-3xl p-16 border border-gray-100 shadow-xl text-center">
                  <Book className="mx-auto h-20 w-20 text-purple-300 mb-6" />
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">No documentation found</h3>
                  <p className="text-xl text-gray-600">
                    Try adjusting your search terms or category filter.
                  </p>
                </div>
              ) : (
                <div className="space-y-8">
                  {filteredDocs.map((doc) => {
                    const TypeIcon = getTypeIcon(doc.type);
                    return (
                      <Link
                        key={doc.id}
                        to={`/docs/${doc.id}`}
                        className="group"
                      >
                        <div className="bg-white rounded-3xl p-8 border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                          <div className="flex items-start space-x-8">
                            <div className="flex-shrink-0">
                              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <TypeIcon className="h-8 w-8 text-white" />
                              </div>
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between mb-4">
                                <h3 className="text-2xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                                  {doc.title}
                                </h3>
                                <ArrowRight className="h-6 w-6 text-gray-400 flex-shrink-0 ml-6 group-hover:translate-x-2 group-hover:text-purple-600 transition-all" />
                              </div>

                              <p className="text-lg text-gray-600 mb-6 line-clamp-2 leading-relaxed">
                                {doc.description}
                              </p>

                              <div className="flex flex-wrap items-center gap-3 mb-6">
                                <span className={`text-sm font-semibold px-3 py-1 rounded-full ${getDifficultyColor(doc.difficulty)}`}>
                                  {doc.difficulty}
                                </span>
                                <span className="text-sm font-semibold px-3 py-1 rounded-full" style={{ backgroundColor: 'rgba(255, 142, 0, 0.1)', color: '#FF8E00' }}>
                                  {doc.category}
                                </span>
                                {doc.hasVideo && (
                                  <span className="text-sm font-semibold text-pink-700 bg-pink-100 px-3 py-1 rounded-full flex items-center space-x-1">
                                    <Play className="h-3 w-3" />
                                    <span>Video</span>
                                  </span>
                                )}
                              </div>

                              <div className="flex items-center justify-between text-sm text-gray-500">
                                <div className="flex items-center space-x-6">
                                  <div className="flex items-center space-x-1">
                                    <Clock className="h-4 w-4" />
                                    <span>{doc.readTime}</span>
                                  </div>
                                  {doc.steps > 0 && (
                                    <span>{doc.steps} steps</span>
                                  )}
                                  <div className="flex items-center space-x-1">
                                    <Star className="h-4 w-4 fill-current text-orange-400" />
                                    <span>{doc.rating}</span>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-6">
                                  <span>{doc.views} views</span>
                                  <span>Updated {formatDate(doc.lastUpdated)}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
        </div>

            <div className="space-y-8">
              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Popular Guides</h3>
                <div className="space-y-4">
                  {popularDocs.map((doc, index) => (
                    <Link
                      key={doc.id}
                      to={`/docs/${doc.id}`}
                      className="block p-4 rounded-2xl hover:bg-purple-50 transition-colors group"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full flex items-center justify-center text-sm font-bold group-hover:scale-110 transition-transform">
                          {index + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-900 truncate mb-1">
                            {doc.title}
                          </h4>
                          <p className="text-sm text-gray-500">
                            {doc.views} views
                          </p>
                        </div>
                        <ArrowRight className="h-4 w-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Quick Links</h3>
                <div className="space-y-3">
                  <Link to="/faq" className="flex items-center justify-between p-4 rounded-xl hover:bg-purple-50 transition-colors group">
                    <span className="font-medium text-gray-700 group-hover:text-purple-600">Frequently Asked Questions</span>
                    <ArrowRight className="h-4 w-4 text-gray-400 group-hover:translate-x-1 group-hover:text-purple-600 transition-all" />
                  </Link>
                  <Link to="/tickets/new" className="flex items-center justify-between p-4 rounded-xl hover:bg-purple-50 transition-colors group">
                    <span className="font-medium text-gray-700 group-hover:text-purple-600">Submit Support Ticket</span>
                    <ArrowRight className="h-4 w-4 text-gray-400 group-hover:translate-x-1 group-hover:text-purple-600 transition-all" />
                  </Link>
                  <Link to="/features" className="flex items-center justify-between p-4 rounded-xl hover:bg-purple-50 transition-colors group">
                    <span className="font-medium text-gray-700 group-hover:text-purple-600">Request New Feature</span>
                    <ArrowRight className="h-4 w-4 text-gray-400 group-hover:translate-x-1 group-hover:text-purple-600 transition-all" />
                  </Link>
                  <a 
                    href="mailto:support@enboq.com" 
                    className="flex items-center justify-between p-4 rounded-xl hover:bg-purple-50 transition-colors group"
                  >
                    <span className="font-medium text-gray-700 group-hover:text-purple-600">Contact Support Team</span>
                    <ArrowRight className="h-4 w-4 text-gray-400 group-hover:translate-x-1 group-hover:text-purple-600 transition-all" />
                  </a>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 border border-purple-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Need Personal Help?</h3>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  Can't find what you're looking for? Our support team is ready to help.
                </p>
                <Link to="/tickets/new" className="modern-cta-button w-full justify-center">
                  Get Support
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SupportDocs;