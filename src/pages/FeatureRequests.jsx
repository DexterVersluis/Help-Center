import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Plus, ThumbsUp, MessageCircle, Calendar, Filter, Lightbulb, ArrowRight } from 'lucide-react';

const FeatureRequests = () => {
  const [features, setFeatures] = useState([]);
  const [filteredFeatures, setFilteredFeatures] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    const savedFeatures = JSON.parse(localStorage.getItem('featureRequests') || '[]');
    if (savedFeatures.length === 0) {
      const sampleFeatures = [
        {
          id: 'FEAT-001',
          title: 'Dark Mode Support',
          description: 'Add a dark mode theme option for better user experience during night time usage.',
          status: 'in-progress',
          votes: 45,
          comments: 12,
          category: 'UI/UX',
          createdAt: '2024-01-15T10:00:00Z',
          updatedAt: '2024-01-20T14:30:00Z',
          author: 'user@example.com'
        },
        {
          id: 'FEAT-002',
          title: 'Advanced Search Filters',
          description: 'Implement more granular search filters including date ranges, custom fields, and saved search queries.',
          status: 'planned',
          votes: 32,
          comments: 8,
          category: 'Search',
          createdAt: '2024-01-10T09:15:00Z',
          updatedAt: '2024-01-18T11:45:00Z',
          author: 'admin@enboq.com'
        },
        {
          id: 'FEAT-003',
          title: 'Mobile App Push Notifications',
          description: 'Add push notification support for mobile apps to keep users informed about important updates.',
          status: 'completed',
          votes: 67,
          comments: 23,
          category: 'Mobile',
          createdAt: '2023-12-20T16:20:00Z',
          updatedAt: '2024-01-25T09:10:00Z',
          author: 'mobile@example.com'
        },
        {
          id: 'FEAT-004',
          title: 'Bulk Operations',
          description: 'Allow users to perform bulk operations on multiple items simultaneously for improved efficiency.',
          status: 'under-review',
          votes: 28,
          comments: 5,
          category: 'Productivity',
          createdAt: '2024-01-08T13:45:00Z',
          updatedAt: '2024-01-12T10:20:00Z',
          author: 'power@example.com'
        },
        {
          id: 'FEAT-005',
          title: 'API Rate Limiting Dashboard',
          description: 'Provide a dashboard to monitor API usage and rate limiting status for developers.',
          status: 'rejected',
          votes: 15,
          comments: 3,
          category: 'API',
          createdAt: '2024-01-05T11:30:00Z',
          updatedAt: '2024-01-07T15:15:00Z',
          author: 'dev@example.com'
        }
      ];
      localStorage.setItem('featureRequests', JSON.stringify(sampleFeatures));
      setFeatures(sampleFeatures);
    } else {
      setFeatures(savedFeatures);
    }
  }, []);

  useEffect(() => {
    let filtered = features;

    if (searchTerm) {
      filtered = filtered.filter(feature =>
        feature.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        feature.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        feature.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(feature => feature.status === statusFilter);
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'votes':
          return b.votes - a.votes;
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'newest':
        default:
          return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });

    setFilteredFeatures(filtered);
  }, [features, searchTerm, statusFilter, sortBy]);

  const getStatusBadgeClass = (status) => {
    const classes = {
      'under-review': 'status-open',
      'planned': 'status-in-progress',
      'in-progress': 'status-in-progress',
      'completed': 'status-completed',
      'rejected': 'status-closed'
    };
    return `status-badge ${classes[status] || 'status-open'}`;
  };

  const getStatusLabel = (status) => {
    const labels = {
      'under-review': 'Under Review',
      'planned': 'Planned',
      'in-progress': 'In Progress',
      'completed': 'Completed',
      'rejected': 'Rejected'
    };
    return labels[status] || status;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleVote = (featureId) => {
    const updatedFeatures = features.map(feature => {
      if (feature.id === featureId) {
        const hasVoted = localStorage.getItem(`voted_${featureId}`) === 'true';
        if (!hasVoted) {
          localStorage.setItem(`voted_${featureId}`, 'true');
          return { ...feature, votes: feature.votes + 1 };
        }
      }
      return feature;
    });
    setFeatures(updatedFeatures);
    localStorage.setItem('featureRequests', JSON.stringify(updatedFeatures));
  };

  const hasVoted = (featureId) => {
    return localStorage.getItem(`voted_${featureId}`) === 'true';
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
              Feature Requests
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
              Share your ideas and vote on features you'd like to see
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
                      placeholder="Search feature requests... Try 'dark mode' or 'mobile app'"
                      className="modern-search-input"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <select
                      className="modern-search-select"
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                    >
                      <option value="all">All Status</option>
                      <option value="under-review">Under Review</option>
                      <option value="planned">Planned</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                      <option value="rejected">Rejected</option>
                    </select>
                    <select
                      className="modern-search-select"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                    >
                      <option value="newest">Newest First</option>
                      <option value="oldest">Oldest First</option>
                      <option value="votes">Most Voted</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Create New Feature Request Button */}
            <div className="flex justify-center">
              <Link 
                to="/features/new" 
                className="modern-cta-button"
              >
                <Lightbulb className="w-5 h-5 mr-2" />
                Request New Feature
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Requests Content Section */}
      <section className="py-24 bg-white">
        <div className="container">

          {filteredFeatures.length === 0 ? (
            <div className="bg-white rounded-3xl p-16 border border-gray-100 shadow-xl text-center max-w-2xl mx-auto">
              <Lightbulb className="mx-auto h-20 w-20 text-purple-300 mb-6" />
              <h3 className="text-3xl font-bold text-gray-900 mb-4">No feature requests found</h3>
              <p className="text-xl text-gray-600 mb-8">
                {features.length === 0 
                  ? "Be the first to suggest a new feature!"
                  : "Try adjusting your search or filter criteria."
                }
              </p>
              {features.length === 0 && (
                <Link to="/features/new" className="modern-cta-button">
                  <Lightbulb className="w-5 h-5 mr-2" />
                  Submit First Request
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              )}
            </div>
          ) : (
            <div className="space-y-6 max-w-4xl mx-auto">
              {filteredFeatures.map((feature) => (
                <div key={feature.id} className="bg-white rounded-3xl p-8 border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <div className="flex items-start space-x-6">
                    <div className="flex flex-col items-center space-y-2">
                      <button
                        onClick={() => handleVote(feature.id)}
                        disabled={hasVoted(feature.id)}
                        className={`flex flex-col items-center p-4 rounded-2xl transition-all duration-300 ${
                          hasVoted(feature.id)
                            ? 'bg-purple-100 text-purple-600 cursor-not-allowed'
                            : 'bg-white border-2 border-purple-200 hover:bg-purple-50 hover:border-purple-400 text-purple-600 hover:scale-105'
                        }`}
                      >
                        <ThumbsUp className={`h-6 w-6 ${hasVoted(feature.id) ? 'fill-current' : ''}`} />
                        <span className="text-lg font-bold mt-1">{feature.votes}</span>
                      </button>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-3">
                            <h3 className="text-2xl font-bold text-gray-900">
                              {feature.title}
                            </h3>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadgeClass(feature.status)}`}>
                              {getStatusLabel(feature.status)}
                            </span>
                            <span className="px-3 py-1 bg-orange-100 text-orange-700 text-sm font-medium rounded-full">
                              {feature.category}
                            </span>
                          </div>
                          <p className="text-lg text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                            {feature.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
                        <div className="flex items-center space-x-6">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">#{feature.id}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <MessageCircle className="h-4 w-4" />
                            <span>{feature.comments} comments</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span>by {feature.author}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(feature.createdAt)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative container text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            Have an idea for a new feature?
          </h2>
          <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
            We love hearing from our users! Share your ideas and help shape the future of ENBOQ.
          </p>
          
          <div className="flex justify-center">
            <Link 
              to="/features/new" 
              className="modern-primary-button"
            >
              <Lightbulb className="w-5 h-5 mr-2" />
              Submit Feature Request
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeatureRequests;