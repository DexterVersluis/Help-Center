import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, Lightbulb, ArrowRight } from 'lucide-react';

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
          <div className="text-center max-w-3xl mx-auto">
            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl flex items-center justify-center">
                <Lightbulb className="h-10 w-10 text-white" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent mb-8 leading-tight">
              Request a New Feature
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
              Help us improve ENBOQ by sharing your ideas and suggestions
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-24 bg-white">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-lg font-semibold text-gray-900" htmlFor="email">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-lg"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="your.email@example.com"
                  />
                  <p className="text-sm text-gray-500">
                    We'll use this to follow up on your request and notify you of updates
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-lg font-semibold text-gray-900" htmlFor="title">
                    Feature Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-lg"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    placeholder="Brief, descriptive title for your feature request"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-lg font-semibold text-gray-900" htmlFor="category">
                      Category *
                    </label>
                    <select
                      id="category"
                      name="category"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-lg"
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

                  <div className="space-y-2">
                    <label className="text-lg font-semibold text-gray-900" htmlFor="priority">
                      Priority Level *
                    </label>
                    <select
                      id="priority"
                      name="priority"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-lg"
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

                <div className="space-y-2">
                  <label className="text-lg font-semibold text-gray-900" htmlFor="description">
                    Detailed Description *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-lg resize-none"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    placeholder="Describe the feature you'd like to see. Be as specific as possible about what it should do and how it should work..."
                    rows="6"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-lg font-semibold text-gray-900" htmlFor="useCase">
                    Use Case & Benefits *
                  </label>
                  <textarea
                    id="useCase"
                    name="useCase"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-lg resize-none"
                    value={formData.useCase}
                    onChange={handleInputChange}
                    required
                    placeholder="Explain how this feature would be used and what problems it would solve. Who would benefit from it and why is it important?"
                    rows="4"
                  />
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl border border-purple-100">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <Lightbulb className="h-5 w-5 text-purple-600 mr-2" />
                    Tips for a Great Feature Request
                  </h4>
                  <ul className="text-gray-600 space-y-2">
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-2">•</span>
                      Be specific about what you want the feature to do
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-2">•</span>
                      Explain the problem you're trying to solve
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-2">•</span>
                      Consider how it might work with existing features
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-600 mr-2">•</span>
                      Think about who else might benefit from this feature
                    </li>
                  </ul>
                </div>

                <div className="flex justify-end space-x-4 pt-6">
                  <button
                    type="button"
                    onClick={() => navigate('/features')}
                    className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="modern-cta-button"
                  >
                    <Send className="h-5 w-5 mr-2" />
                    Submit Request
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </button>
                </div>
              </form>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 border border-purple-100 mt-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">What happens next?</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-xl">1</span>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Review</h4>
                  <p className="text-gray-600">Our team reviews your request</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-xl">2</span>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Planning</h4>
                  <p className="text-gray-600">We evaluate and plan implementation</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-xl">3</span>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Updates</h4>
                  <p className="text-gray-600">You'll receive status updates via email</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeatureRequestForm;