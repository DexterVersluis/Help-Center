import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Plus, Clock, User, Tag, ArrowRight, MessageCircle } from 'lucide-react';

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
              My Support Tickets
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
              Track and manage your support requests
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
                      placeholder="Search tickets... Try ticket ID or description"
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
                      <option value="open">Open</option>
                      <option value="in-progress">In Progress</option>
                      <option value="resolved">Resolved</option>
                      <option value="closed">Closed</option>
                    </select>
                    <select
                      className="modern-search-select"
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
            </div>

            {/* Create New Ticket Button */}
            <div className="flex justify-center">
              <Link 
                to="/tickets/new" 
                className="modern-cta-button"
              >
                <Plus className="w-5 h-5 mr-2" />
                Create New Ticket
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Tickets Content Section */}
      <section className="py-24 bg-white">
        <div className="container">

          {filteredTickets.length === 0 ? (
            <div className="bg-white rounded-3xl p-16 border border-gray-100 shadow-xl text-center max-w-2xl mx-auto">
              {tickets.length === 0 ? (
                <>
                  <MessageCircle className="mx-auto h-20 w-20 text-purple-300 mb-6" />
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">No tickets yet</h3>
                  <p className="text-xl text-gray-600 mb-8">
                    Create your first support ticket to get started.
                  </p>
                  <Link to="/tickets/new" className="modern-cta-button">
                    <Plus className="w-5 h-5 mr-2" />
                    Create First Ticket
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </>
              ) : (
                <>
                  <Search className="mx-auto h-20 w-20 text-purple-300 mb-6" />
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">No tickets found</h3>
                  <p className="text-xl text-gray-600">
                    Try adjusting your search or filter criteria.
                  </p>
                </>
              )}
            </div>
          ) : (
            <div className="space-y-6 max-w-4xl mx-auto">
              {filteredTickets.map((ticket) => (
                <Link
                  key={ticket.id}
                  to={`/tickets/${ticket.id}`}
                  className="group"
                >
                  <div className="bg-white rounded-3xl p-8 border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4 mb-4">
                          <h3 className="text-2xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                            {ticket.title}
                          </h3>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadgeClass(ticket.status)}`}>
                            {ticket.status}
                          </span>
                        </div>
                        <p className="text-lg text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                          {ticket.description}
                        </p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className={`px-3 py-1 rounded-full text-sm font-bold ${getPriorityColor(ticket.priority)} bg-opacity-10`}>
                          {ticket.priority.toUpperCase()}
                        </div>
                        <ArrowRight className="h-6 w-6 text-gray-400 group-hover:translate-x-2 group-hover:text-purple-600 transition-all" />
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
                      <div className="flex items-center space-x-6">
                        <div className="flex items-center space-x-2">
                          <Tag className="h-4 w-4" />
                          <span className="font-medium">{ticket.id}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
                          <span>{ticket.category}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4" />
                        <span>{formatDate(ticket.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default TicketList;