import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Plus, ThumbsUp, MessageCircle, Calendar, Filter, Lightbulb } from 'lucide-react';

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
    <div className="container py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1>Feature Requests</h1>
          <p className="text-gray-text">
            Share your ideas and vote on features you'd like to see
          </p>
        </div>
        <Link to="/features/new" className="btn btn-primary flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Request Feature</span>
        </Link>
      </div>

      <div className="card mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-purple" />
            <input
              type="text"
              placeholder="Search feature requests..."
              className="form-input pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-4">
            <select
              className="form-select"
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
              className="form-select"
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

      {filteredFeatures.length === 0 ? (
        <div className="card text-center py-12">
          <Lightbulb className="mx-auto h-16 w-16 text-light-purple mb-4" />
          <h3>No feature requests found</h3>
          <p className="text-gray-text mb-4">
            {features.length === 0 
              ? "Be the first to suggest a new feature!"
              : "Try adjusting your search or filter criteria."
            }
          </p>
          {features.length === 0 && (
            <Link to="/features/new" className="btn btn-primary">
              Submit First Request
            </Link>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredFeatures.map((feature) => (
            <div key={feature.id} className="card">
              <div className="flex items-start space-x-4">
                <div className="flex flex-col items-center space-y-2">
                  <button
                    onClick={() => handleVote(feature.id)}
                    disabled={hasVoted(feature.id)}
                    className={`flex flex-col items-center p-3 rounded-lg transition-colors ${
                      hasVoted(feature.id)
                        ? 'bg-light-purple text-purple cursor-not-allowed'
                        : 'bg-white border-2 border-light-purple hover:bg-light-purple text-purple'
                    }`}
                  >
                    <ThumbsUp className={`h-5 w-5 ${hasVoted(feature.id) ? 'fill-current' : ''}`} />
                    <span className="text-sm font-bold">{feature.votes}</span>
                  </button>
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-purple font-semibold text-lg">
                          {feature.title}
                        </h3>
                        <span className={getStatusBadgeClass(feature.status)}>
                          {getStatusLabel(feature.status)}
                        </span>
                        <span className="text-xs font-semibold text-orange bg-light-pink px-2 py-1 rounded">
                          {feature.category}
                        </span>
                      </div>
                      <p className="text-gray-text mb-3 line-clamp-2">
                        {feature.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-text">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <span className="font-medium">#{feature.id}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageCircle className="h-3 w-3" />
                        <span>{feature.comments} comments</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span>by {feature.author}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3" />
                      <span>{formatDate(feature.createdAt)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="card mt-8 text-center gradient-bg">
        <h3>Have an idea for a new feature?</h3>
        <p className="text-gray-text mb-4">
          We love hearing from our users! Share your ideas and help shape the future of ENBOQ.
        </p>
        <Link to="/features/new" className="btn btn-primary">
          Submit Feature Request
        </Link>
      </div>
    </div>
  );
};

export default FeatureRequests;