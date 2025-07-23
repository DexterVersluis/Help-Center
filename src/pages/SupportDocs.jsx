import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Book, Play, FileText, Clock, ChevronRight, Star } from 'lucide-react';

const SupportDocs = () => {
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
    'API Documentation'
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
        title: 'API Authentication & Setup',
        description: 'Complete guide to setting up API access and authentication methods',
        category: 'API Documentation',
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
      }
    ];
    setDocs(sampleDocs);
    setFilteredDocs(sampleDocs);
  }, []);

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
    <div className="bg-bg-primary min-h-screen">
      <div className="container py-16">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-purple mb-6">Support Documentation</h1>
          <p className="text-text-secondary text-2xl max-w-4xl mx-auto leading-relaxed">
            Comprehensive guides, tutorials, and references to help you master ENBOQ
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-3">
            <div className="modern-search mb-12">
              <Search className="h-5 w-5 text-purple ml-2" />
              <input
                type="text"
                placeholder="Search documentation..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <select
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

          {filteredDocs.length === 0 ? (
            <div className="card text-center py-16">
              <Book className="mx-auto h-16 w-16 text-light-purple mb-6" />
              <h3 className="text-2xl font-semibold text-text-primary mb-2">No documentation found</h3>
              <p className="text-text-secondary">
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
                    <div className="card hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                      <div className="flex items-start space-x-8">
                        <div className="flex-shrink-0">
                          <div className="bg-purple p-6 rounded-3xl group-hover:bg-pink transition-colors">
                            <TypeIcon className="h-10 w-10 text-white" />
                          </div>
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-4">
                            <h3 className="text-purple font-semibold text-3xl group-hover:text-pink transition-colors">
                              {doc.title}
                            </h3>
                            <ChevronRight className="h-7 w-7 text-text-muted flex-shrink-0 ml-6 group-hover:translate-x-1 transition-transform" />
                          </div>

                          <p className="text-text-secondary mb-6 line-clamp-2 text-xl leading-relaxed">
                            {doc.description}
                          </p>

                          <div className="flex flex-wrap items-center gap-4 mb-6">
                            <span className={`text-sm font-semibold px-4 py-2 rounded-full ${getDifficultyColor(doc.difficulty)}`}>
                              {doc.difficulty}
                            </span>
                            <span className="text-sm font-semibold text-purple bg-light-purple px-4 py-2 rounded-full">
                              {doc.category}
                            </span>
                            {doc.hasVideo && (
                              <span className="text-sm font-semibold text-pink bg-light-pink px-4 py-2 rounded-full flex items-center space-x-2">
                                <Play className="h-4 w-4" />
                                <span>Video</span>
                              </span>
                            )}
                          </div>

                          <div className="flex items-center justify-between text-base text-text-muted">
                            <div className="flex items-center space-x-8">
                              <div className="flex items-center space-x-2">
                                <Clock className="h-5 w-5" />
                                <span>{doc.readTime}</span>
                              </div>
                              {doc.steps > 0 && (
                                <div className="flex items-center space-x-2">
                                  <span>{doc.steps} steps</span>
                                </div>
                              )}
                              <div className="flex items-center space-x-2">
                                <Star className="h-5 w-5 fill-current text-orange" />
                                <span>{doc.rating}</span>
                              </div>
                            </div>
                            <div className="flex items-center space-x-8">
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

        <div className="space-y-10">
          <div className="card">
            <h3 className="text-purple text-2xl font-semibold mb-8">Popular Guides</h3>
            <div className="space-y-6">
              {popularDocs.map((doc, index) => (
                <Link
                  key={doc.id}
                  to={`/docs/${doc.id}`}
                  className="block p-6 rounded-2xl hover:bg-light-purple transition-colors group"
                >
                  <div className="flex items-center space-x-6">
                    <div className="bg-purple text-white rounded-full w-12 h-12 flex items-center justify-center text-lg font-bold group-hover:bg-pink transition-colors">
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-text-primary truncate mb-2 text-lg">
                        {doc.title}
                      </h4>
                      <p className="text-base text-text-muted">
                        {doc.views} views
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="card">
            <h3 className="text-purple text-2xl font-semibold mb-8">Quick Links</h3>
            <div className="space-y-4">
              <Link to="/faq" className="block text-orange hover:text-pink font-medium py-4 px-4 rounded-xl hover:bg-bg-secondary transition-all text-lg">
                → Frequently Asked Questions
              </Link>
              <Link to="/tickets/new" className="block text-orange hover:text-pink font-medium py-4 px-4 rounded-xl hover:bg-bg-secondary transition-all text-lg">
                → Submit Support Ticket
              </Link>
              <Link to="/features" className="block text-orange hover:text-pink font-medium py-4 px-4 rounded-xl hover:bg-bg-secondary transition-all text-lg">
                → Request New Feature
              </Link>
              <a 
                href="mailto:support@enboq.com" 
                className="block text-orange hover:text-pink font-medium py-4 px-4 rounded-xl hover:bg-bg-secondary transition-all text-lg"
              >
                → Contact Support Team
              </a>
            </div>
          </div>

          <div className="card hero-gradient">
            <h3 className="text-purple text-2xl font-semibold mb-4">Need Personal Help?</h3>
            <p className="text-text-secondary mb-8 leading-relaxed text-lg">
              Can't find what you're looking for? Our support team is ready to help.
            </p>
            <Link to="/tickets/new" className="btn btn-primary w-full text-lg">
              Get Support
            </Link>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default SupportDocs;