import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Plus, Clock, User, Tag } from 'lucide-react';

const TicketList = () => {
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  useEffect(() => {
    const savedTickets = JSON.parse(localStorage.getItem('tickets') || '[]');
    setTickets(savedTickets);
    setFilteredTickets(savedTickets);
  }, []);

  useEffect(() => {
    let filtered = tickets;

    if (searchTerm) {
      filtered = filtered.filter(ticket =>
        ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(ticket => ticket.status === statusFilter);
    }

    if (priorityFilter !== 'all') {
      filtered = filtered.filter(ticket => ticket.priority === priorityFilter);
    }

    setFilteredTickets(filtered);
  }, [tickets, searchTerm, statusFilter, priorityFilter]);

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

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1>My Support Tickets</h1>
          <p className="text-gray-text">
            Track and manage your support requests
          </p>
        </div>
        <Link to="/tickets/new" className="btn btn-primary flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>New Ticket</span>
        </Link>
      </div>

      <div className="card mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-purple" />
            <input
              type="text"
              placeholder="Search tickets..."
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
              <option value="open">Open</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed</option>
            </select>
            
            <select
              className="form-select"
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
            >
              <option value="all">All Priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>
        </div>
      </div>

      {filteredTickets.length === 0 ? (
        <div className="card text-center py-12">
          <div className="text-gray-text mb-4">
            {tickets.length === 0 ? (
              <>
                <User className="mx-auto h-16 w-16 mb-4 text-light-purple" />
                <h3>No tickets yet</h3>
                <p>Create your first support ticket to get started.</p>
              </>
            ) : (
              <>
                <Search className="mx-auto h-16 w-16 mb-4 text-light-purple" />
                <h3>No tickets found</h3>
                <p>Try adjusting your search or filter criteria.</p>
              </>
            )}
          </div>
          {tickets.length === 0 && (
            <Link to="/tickets/new" className="btn btn-primary">
              Create First Ticket
            </Link>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredTickets.map((ticket) => (
            <Link
              key={ticket.id}
              to={`/tickets/${ticket.id}`}
              className="card block hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-purple font-semibold text-lg">
                      {ticket.title}
                    </h3>
                    <span className={getStatusBadgeClass(ticket.status)}>
                      {ticket.status}
                    </span>
                  </div>
                  <p className="text-gray-text text-sm mb-2 line-clamp-2">
                    {ticket.description}
                  </p>
                </div>
                <div className={`font-bold text-sm ${getPriorityColor(ticket.priority)}`}>
                  {ticket.priority.toUpperCase()}
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-text">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Tag className="h-3 w-3" />
                    <span>{ticket.id}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="w-2 h-2 bg-purple rounded-full"></span>
                    <span>{ticket.category}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-3 w-3" />
                  <span>{formatDate(ticket.createdAt)}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default TicketList;