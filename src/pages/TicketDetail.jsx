import { useState, useEffect } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { ArrowLeft, Clock, User, Tag, MessageCircle, Send } from 'lucide-react';

const TicketDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const [ticket, setTicket] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const tickets = JSON.parse(localStorage.getItem('tickets') || '[]');
    const foundTicket = tickets.find(t => t.id === id);
    setTicket(foundTicket);

    const savedComments = JSON.parse(localStorage.getItem(`comments_${id}`) || '[]');
    setComments(savedComments);
  }, [id]);

  const getStatusBadgeClass = (status) => {
    const classes = {
      'open': 'status-open',
      'in-progress': 'status-in-progress',
      'resolved': 'status-completed',
      'closed': 'status-closed'
    };
    return `status-badge ${classes[status] || 'status-open'}`;
  };

  const getPriorityColor = (priority) => {
    const colors = {
      'low': 'text-green',
      'medium': 'text-orange',
      'high': 'text-pink',
      'urgent': 'text-purple'
    };
    return colors[priority] || 'text-gray-text';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment = {
      id: Date.now(),
      text: newComment,
      author: ticket.email,
      createdAt: new Date().toISOString(),
      isCustomer: true
    };

    const updatedComments = [...comments, comment];
    setComments(updatedComments);
    localStorage.setItem(`comments_${id}`, JSON.stringify(updatedComments));
    setNewComment('');

    const tickets = JSON.parse(localStorage.getItem('tickets') || '[]');
    const updatedTickets = tickets.map(t => 
      t.id === id ? { ...t, updatedAt: new Date().toISOString() } : t
    );
    localStorage.setItem('tickets', JSON.stringify(updatedTickets));
  };

  if (!ticket) {
    return (
      <div className="container py-8">
        <div className="card text-center py-12">
          <h2>Ticket Not Found</h2>
          <p className="text-gray-text mb-4">
            The ticket you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/tickets" className="btn btn-primary">
            Back to Tickets
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="mb-6">
        <Link 
          to="/tickets" 
          className="flex items-center space-x-2 text-purple hover:text-pink mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Tickets</span>
        </Link>

        {location.state?.message && (
          <div className="bg-green text-white p-4 rounded-lg mb-4">
            {location.state.message}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="card">
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h1 className="text-2xl font-bold text-purple">
                    {ticket.title}
                  </h1>
                  <span className={getStatusBadgeClass(ticket.status)}>
                    {ticket.status}
                  </span>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-text">
                  <div className="flex items-center space-x-1">
                    <Tag className="h-3 w-3" />
                    <span>{ticket.id}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>Created {formatDate(ticket.createdAt)}</span>
                  </div>
                </div>
              </div>
              <div className={`font-bold ${getPriorityColor(ticket.priority)}`}>
                {ticket.priority.toUpperCase()} PRIORITY
              </div>
            </div>

            <div className="prose max-w-none mb-8">
              <h3>Description</h3>
              <p className="whitespace-pre-wrap text-gray-text">
                {ticket.description}
              </p>
            </div>

            {ticket.attachments && ticket.attachments.length > 0 && (
              <div className="mb-8">
                <h3>Attachments</h3>
                <div className="space-y-2">
                  {ticket.attachments.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 bg-light-purple p-3 rounded-lg"
                    >
                      <span className="text-purple font-medium">
                        {file.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="border-t border-light-purple pt-6">
              <div className="flex items-center space-x-2 mb-4">
                <MessageCircle className="h-5 w-5 text-purple" />
                <h3>Comments ({comments.length})</h3>
              </div>

              <div className="space-y-4 mb-6">
                {comments.map((comment) => (
                  <div
                    key={comment.id}
                    className={`p-4 rounded-lg ${
                      comment.isCustomer 
                        ? 'bg-light-purple ml-8' 
                        : 'bg-light-pink mr-8'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-purple">
                        {comment.isCustomer ? 'You' : 'Support Team'}
                      </span>
                      <span className="text-sm text-gray-text">
                        {formatDate(comment.createdAt)}
                      </span>
                    </div>
                    <p className="text-gray-text whitespace-pre-wrap">
                      {comment.text}
                    </p>
                  </div>
                ))}
              </div>

              <form onSubmit={handleCommentSubmit} className="space-y-4">
                <textarea
                  className="form-textarea"
                  placeholder="Add a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  rows="4"
                />
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="btn btn-primary flex items-center space-x-2"
                    disabled={!newComment.trim()}
                  >
                    <Send className="h-4 w-4" />
                    <span>Add Comment</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="card">
            <h3>Ticket Details</h3>
            <div className="space-y-3">
              <div>
                <span className="text-sm font-semibold text-purple">Status:</span>
                <div className="mt-1">
                  <span className={getStatusBadgeClass(ticket.status)}>
                    {ticket.status}
                  </span>
                </div>
              </div>
              <div>
                <span className="text-sm font-semibold text-purple">Priority:</span>
                <div className={`mt-1 font-bold ${getPriorityColor(ticket.priority)}`}>
                  {ticket.priority.toUpperCase()}
                </div>
              </div>
              <div>
                <span className="text-sm font-semibold text-purple">Category:</span>
                <div className="mt-1">
                  <span className="px-3 py-1 text-sm font-medium rounded-full" style={{ backgroundColor: 'rgba(255, 142, 0, 0.1)', color: '#FF8E00' }}>
                    {ticket.category}
                  </span>
                </div>
              </div>
              <div>
                <span className="text-sm font-semibold text-purple">Created:</span>
                <div className="mt-1 text-gray-text">{formatDate(ticket.createdAt)}</div>
              </div>
              <div>
                <span className="text-sm font-semibold text-purple">Last Updated:</span>
                <div className="mt-1 text-gray-text">{formatDate(ticket.updatedAt)}</div>
              </div>
            </div>
          </div>

          <div className="card">
            <h3>Need Help?</h3>
            <p className="text-gray-text text-sm mb-4">
              Check out our resources while you wait for a response.
            </p>
            <div className="space-y-2">
              <Link to="/docs" className="block text-orange hover:text-pink">
                → Browse Documentation
              </Link>
              <Link to="/faq" className="block text-orange hover:text-pink">
                → View FAQ
              </Link>
              <a 
                href="mailto:support@enboq.com" 
                className="block text-orange hover:text-pink"
              >
                → Email Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketDetail;