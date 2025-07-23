import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, Lightbulb } from 'lucide-react';

const FeatureRequestForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    useCase: '',
    priority: 'medium',
    email: ''
  });

  const categories = [
    'UI/UX',
    'Performance',
    'Integration',
    'Mobile',
    'API',
    'Security',
    'Analytics',
    'Collaboration',
    'Automation',
    'Search',
    'Productivity',
    'Other'
  ];

  const priorities = [
    { value: 'low', label: 'Nice to Have' },
    { value: 'medium', label: 'Would be Helpful' },
    { value: 'high', label: 'Important' },
    { value: 'urgent', label: 'Critical for Business' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const featureId = `FEAT-${Date.now().toString().slice(-6)}`;
    const feature = {
      id: featureId,
      ...formData,
      status: 'under-review',
      votes: 1,
      comments: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      author: formData.email
    };

    const existingFeatures = JSON.parse(localStorage.getItem('featureRequests') || '[]');
    localStorage.setItem('featureRequests', JSON.stringify([feature, ...existingFeatures]));
    
    localStorage.setItem(`voted_${featureId}`, 'true');

    navigate('/features', { 
      state: { message: 'Feature request submitted successfully!' }
    });
  };

  return (
    <div className="container py-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-purple to-pink p-4 rounded-full">
              <Lightbulb className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1>Request a New Feature</h1>
          <p className="text-gray-text">
            Help us improve ENBOQ by sharing your ideas and suggestions
          </p>
        </div>

        <div className="card">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="email">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-input"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="your.email@example.com"
              />
              <p className="text-xs text-gray-text mt-1">
                We'll use this to follow up on your request and notify you of updates
              </p>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="title">
                Feature Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                className="form-input"
                value={formData.title}
                onChange={handleInputChange}
                required
                placeholder="Brief, descriptive title for your feature request"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-group">
                <label className="form-label" htmlFor="category">
                  Category *
                </label>
                <select
                  id="category"
                  name="category"
                  className="form-select"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="priority">
                  Priority Level *
                </label>
                <select
                  id="priority"
                  name="priority"
                  className="form-select"
                  value={formData.priority}
                  onChange={handleInputChange}
                  required
                >
                  {priorities.map(priority => (
                    <option key={priority.value} value={priority.value}>
                      {priority.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="description">
                Detailed Description *
              </label>
              <textarea
                id="description"
                name="description"
                className="form-textarea"
                value={formData.description}
                onChange={handleInputChange}
                required
                placeholder="Describe the feature you'd like to see. Be as specific as possible about what it should do and how it should work..."
                rows="6"
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="useCase">
                Use Case & Benefits *
              </label>
              <textarea
                id="useCase"
                name="useCase"
                className="form-textarea"
                value={formData.useCase}
                onChange={handleInputChange}
                required
                placeholder="Explain how this feature would be used and what problems it would solve. Who would benefit from it and why is it important?"
                rows="4"
              />
            </div>

            <div className="bg-light-purple p-4 rounded-lg mb-6">
              <h4 className="font-semibold text-purple mb-2">💡 Tips for a Great Feature Request</h4>
              <ul className="text-sm text-gray-text space-y-1">
                <li>• Be specific about what you want the feature to do</li>
                <li>• Explain the problem you're trying to solve</li>
                <li>• Consider how it might work with existing features</li>
                <li>• Think about who else might benefit from this feature</li>
              </ul>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate('/features')}
                className="btn btn-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary flex items-center space-x-2"
              >
                <Send className="h-4 w-4" />
                <span>Submit Request</span>
              </button>
            </div>
          </form>
        </div>

        <div className="card mt-6 gradient-bg">
          <h3>What happens next?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="text-center">
              <div className="bg-white bg-opacity-50 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                <span className="text-purple font-bold">1</span>
              </div>
              <h4 className="font-semibold text-purple mb-1">Review</h4>
              <p className="text-sm text-gray-text">Our team reviews your request</p>
            </div>
            <div className="text-center">
              <div className="bg-white bg-opacity-50 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                <span className="text-purple font-bold">2</span>
              </div>
              <h4 className="font-semibold text-purple mb-1">Planning</h4>
              <p className="text-sm text-gray-text">We evaluate and plan implementation</p>
            </div>
            <div className="text-center">
              <div className="bg-white bg-opacity-50 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                <span className="text-purple font-bold">3</span>
              </div>
              <h4 className="font-semibold text-purple mb-1">Updates</h4>
              <p className="text-sm text-gray-text">You'll receive status updates via email</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureRequestForm;