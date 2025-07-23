import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, Upload, X } from 'lucide-react';

const TicketForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    priority: 'medium',
    description: '',
    email: '',
    attachments: []
  });

  const categories = [
    'Technical Issue',
    'Account Problem',
    'Billing Question',
    'Feature Request',
    'Bug Report',
    'General Inquiry'
  ];

  const priorities = [
    { value: 'low', label: 'Low', color: 'green' },
    { value: 'medium', label: 'Medium', color: 'orange' },
    { value: 'high', label: 'High', color: 'pink' },
    { value: 'urgent', label: 'Urgent', color: 'purple' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...files]
    }));
  };

  const removeAttachment = (index) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const ticketId = `ENBOQ-${Date.now()}`;
    const ticket = {
      id: ticketId,
      ...formData,
      status: 'open',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const existingTickets = JSON.parse(localStorage.getItem('tickets') || '[]');
    localStorage.setItem('tickets', JSON.stringify([ticket, ...existingTickets]));

    navigate(`/tickets/${ticketId}`, { 
      state: { message: 'Ticket submitted successfully!' }
    });
  };

  return (
    <div className="container py-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1>Submit a Support Ticket</h1>
          <p className="text-gray-text">
            Tell us about your issue and we'll get back to you as soon as possible.
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
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="title">
                Subject *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                className="form-input"
                value={formData.title}
                onChange={handleInputChange}
                required
                placeholder="Brief description of your issue"
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
                  Priority *
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
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                className="form-textarea"
                value={formData.description}
                onChange={handleInputChange}
                required
                placeholder="Please provide as much detail as possible about your issue..."
                rows="6"
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                Attachments
              </label>
              <div className="border-2 border-dashed border-light-purple rounded-lg p-6 text-center">
                <Upload className="mx-auto h-12 w-12 text-purple mb-4" />
                <p className="text-gray-text mb-2">
                  Drag and drop files here, or click to select
                </p>
                <input
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                  accept=".jpg,.jpeg,.png,.gif,.pdf,.doc,.docx,.txt"
                />
                <label
                  htmlFor="file-upload"
                  className="btn btn-secondary cursor-pointer"
                >
                  Choose Files
                </label>
              </div>

              {formData.attachments.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-semibold text-purple mb-2">Attached Files:</h4>
                  <div className="space-y-2">
                    {formData.attachments.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-light-purple p-3 rounded-lg"
                      >
                        <span className="text-purple font-medium">
                          {file.name}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeAttachment(index)}
                          className="text-pink hover:text-purple"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate('/tickets')}
                className="btn btn-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary flex items-center space-x-2"
              >
                <Send className="h-4 w-4" />
                <span>Submit Ticket</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TicketForm;