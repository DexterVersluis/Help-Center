import { Link } from 'react-router-dom';
import { Search, MessageCircle, Book, Lightbulb, ArrowRight, HelpCircle, Users, Zap } from 'lucide-react';

const Home = () => {
  const quickActions = [
    {
      title: 'Submit a Ticket',
      description: 'Get personalized help from our support team',
      icon: MessageCircle,
      link: '/tickets/new',
      actionText: 'Get started'
    },
    {
      title: 'Browse Documentation',
      description: 'Step-by-step guides and tutorials',
      icon: Book,
      link: '/docs',
      actionText: 'Get started'
    },
    {
      title: 'Request a Feature',
      description: 'Share your ideas for new features',
      icon: Lightbulb,
      link: '/features',
      actionText: 'Get started'
    },
    {
      title: 'View FAQ',
      description: 'Quick answers to common questions',
      icon: HelpCircle,
      link: '/faq',
      actionText: 'Get started'
    }
  ];

  const popularTopics = [
    'Getting Started with ENBOQ',
    'Account Setup and Management',
    'Project Collaboration'
  ];

  const stats = [
    { label: 'Support Articles', value: '150+', icon: Book },
    { label: 'Happy Users', value: '10K+', icon: Users },
    { label: 'Average Response', value: '< 2hrs', icon: Zap }
  ];

  return (
    <div>
      <section className="hero-gradient py-32">
        <div className="container text-center">
          <h1 className="text-6xl md:text-7xl font-bold text-purple mb-8 leading-tight">
            How can we help you today?
          </h1>
          <p className="text-2xl text-text-secondary mb-16 max-w-4xl mx-auto leading-relaxed">
            Find answers, get support, and discover everything you need to succeed with ENBOQ
          </p>
          
          <div className="max-w-2xl mx-auto mb-8">
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search for help articles, guides, or common questions..."
                className="search-input"
              />
              <Search className="search-icon" />
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-lg">
            <span className="text-text-muted">Popular searches:</span>
            {popularTopics.map((topic, index) => (
              <Link
                key={index}
                to="/docs"
                className="text-orange hover:text-pink font-medium"
              >
                {topic}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 bg-white">
        <div className="container">
          <div className="text-center mb-20">
            <h2 className="text-pink text-5xl font-bold mb-6">What would you like to do?</h2>
            <p className="text-text-secondary text-xl max-w-2xl mx-auto leading-relaxed">
              Choose the option that best fits your needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <div key={index} className="group">
                  <div className="card hover:shadow-lg transition-all duration-300 hover:-translate-y-2 h-full flex flex-col">
                    <div className="mb-8">
                      <div className="w-16 h-16 bg-purple rounded-2xl flex items-center justify-center mb-6">
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-purple font-semibold text-2xl mb-4 group-hover:text-pink transition-colors">
                        {action.title}
                      </h3>
                      <p className="text-text-secondary text-lg mb-8 leading-relaxed">
                        {action.description}
                      </p>
                    </div>
                    <div className="mt-auto">
                      <Link
                        to={action.link}
                        className="inline-flex items-center text-orange hover:text-pink font-medium text-lg group-hover:translate-x-1 transition-all"
                      >
                        <span>{action.actionText}</span>
                        <ArrowRight className="h-5 w-5 ml-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-bg-secondary py-32">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-5xl font-bold text-text-primary mb-8">Get Support That Works</h2>
              <p className="text-text-secondary text-xl mb-12 leading-relaxed">
                Our comprehensive support system is designed to help you succeed. From detailed documentation 
                to personalized assistance, we're here to ensure you get the most out of ENBOQ.
              </p>
              
              <div className="grid grid-cols-3 gap-12 mb-12">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div key={index} className="text-center">
                      <div className="bg-light-purple p-6 rounded-3xl inline-block mb-4">
                        <Icon className="h-10 w-10 text-purple" />
                      </div>
                      <div className="font-bold text-4xl text-purple mb-2">{stat.value}</div>
                      <div className="text-base text-text-muted font-medium">{stat.label}</div>
                    </div>
                  );
                })}
              </div>

              <Link to="/docs" className="btn btn-primary text-xl px-10 py-5">
                Explore Documentation
              </Link>
            </div>

            <div className="bg-white p-12 rounded-3xl border border-border-light">
              <h3 className="text-purple font-bold text-3xl mb-8">Popular Help Topics</h3>
              <div className="space-y-6">
                {popularTopics.concat(['Billing and Subscriptions', 'API Integration', 'Troubleshooting Common Issues']).map((topic, index) => (
                  <Link
                    key={index}
                    to="/docs"
                    className="flex items-center justify-between p-6 bg-bg-secondary rounded-2xl hover:bg-light-purple transition-all group"
                  >
                    <span className="text-text-primary font-medium text-lg">{topic}</span>
                    <ArrowRight className="h-6 w-6 text-purple group-hover:translate-x-1 transition-transform" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="hero-gradient py-32">
        <div className="container text-center">
          <h2 className="text-5xl font-bold text-purple mb-8">Still need help?</h2>
          <p className="text-text-secondary text-xl mb-12 max-w-4xl mx-auto leading-relaxed">
            Can't find what you're looking for? Our support team is standing by to provide 
            personalized assistance for your specific needs.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/tickets/new" className="btn btn-primary text-xl px-10 py-5">
              Submit Support Ticket
            </Link>
            <a 
              href="mailto:support@enboq.com" 
              className="btn btn-secondary text-xl px-10 py-5"
            >
              Email Support Team
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;