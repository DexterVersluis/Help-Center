import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Play, Clock, Calendar, CheckCircle, Circle, ThumbsUp, ThumbsDown } from 'lucide-react';

const DocDetail = () => {
  const { id } = useParams();
  const [doc, setDoc] = useState(null);
  const [isHelpful, setIsHelpful] = useState(null);

  useEffect(() => {
    // If the ID is for the platform demo, redirect to the OnboardingDoc component
    if (id === 'onboarding-platform-demo-enboq') {
      window.location.href = '/docs/onboarding-platform-demo-enboq';
      return;
    }
    
    const sampleDoc = {
      id: 'doc-001',
      title: 'Getting Started with ENBOQ',
      description: 'Complete guide to setting up your first project and understanding the basics',
      category: 'Getting Started',
      type: 'guide',
      readTime: '5 min',
      difficulty: 'Beginner',
      hasVideo: true,
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      steps: [
        {
          id: 1,
          title: 'Create Your Account',
          content: 'Start by signing up for a new ENBOQ account. Visit our homepage and click the "Sign Up" button in the top right corner. Fill in your email address, create a secure password, and verify your email.',
          tips: ['Use a strong password with at least 8 characters', 'Check your spam folder for the verification email']
        },
        {
          id: 2,
          title: 'Complete Your Profile',
          content: 'Once logged in, complete your profile by adding your name, company information, and profile picture. This helps your team members identify you in collaborative projects.',
          tips: ['Upload a professional profile picture', 'Add your job title for better team collaboration']
        },
        {
          id: 3,
          title: 'Explore the Dashboard',
          content: 'Take a moment to familiarize yourself with the main dashboard. You\'ll see navigation menus, recent projects, and quick action buttons. The sidebar contains all major features.',
          tips: ['Bookmark important pages for quick access', 'Customize your dashboard layout in settings']
        },
        {
          id: 4,
          title: 'Create Your First Project',
          content: 'Click the "New Project" button to create your first project. Choose a template that matches your needs, give it a descriptive name, and set up basic project settings.',
          tips: ['Choose templates carefully as they affect available features', 'Project names should be descriptive and unique']
        },
        {
          id: 5,
          title: 'Invite Team Members',
          content: 'Add team members to your project by going to Project Settings > Team. Enter their email addresses and assign appropriate roles (Admin, Editor, or Viewer).',
          tips: ['Start with fewer permissions and upgrade as needed', 'Send a welcome message with project context']
        },
        {
          id: 6,
          title: 'Start Building',
          content: 'Now you\'re ready to start using ENBOQ! Explore the various tools and features available in your project. Don\'t hesitate to check out our other documentation for specific features.',
          tips: ['Take advantage of keyboard shortcuts for efficiency', 'Save your work frequently using Ctrl+S']
        }
      ],
      rating: 4.8,
      views: 1250,
      lastUpdated: '2024-01-20T10:00:00Z',
      relatedDocs: [
        { id: 'doc-002', title: 'Creating Your First Project' },
        { id: 'doc-004', title: 'Real-time Collaboration Features' },
        { id: 'doc-003', title: 'Advanced User Management' }
      ]
    };
    setDoc(sampleDoc);
  }, [id]);



  const getDifficultyColor = (difficulty) => {
    const colors = {
      'Beginner': 'text-green bg-green bg-opacity-10',
      'Intermediate': 'text-orange bg-orange bg-opacity-10',
      'Advanced': 'text-pink bg-pink bg-opacity-10'
    };
    return colors[difficulty] || 'text-gray-text bg-gray-100';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleFeedback = (helpful) => {
    setIsHelpful(helpful);
  };

  if (!doc) {
    return (
      <div className="container py-8">
        <div className="card text-center py-12">
          <h2>Documentation Not Found</h2>
          <p className="text-gray-text mb-4">
            The documentation you're looking for doesn't exist.
          </p>
          <Link to="/docs" className="btn btn-primary">
            Back to Documentation
          </Link>
        </div>
      </div>
    );
  }



  return (
    <div className="container py-8">
      <div className="mb-6">
        <Link 
          to="/docs" 
          className="flex items-center space-x-2 text-purple hover:text-pink mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Documentation</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <div className="card mb-6">
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-purple mb-2">
                  {doc.title}
                </h1>
                <p className="text-gray-text text-lg mb-4">
                  {doc.description}
                </p>
                <div className="flex items-center space-x-1 text-sm text-gray-text">
                  <Clock className="h-4 w-4" />
                  <span>{doc.readTime}</span>
                </div>
              </div>
              <div className="flex items-center space-x-1 text-sm text-gray-text">
                <Calendar className="h-4 w-4" />
                <span>Last updated {formatDate(doc.lastUpdated)}</span>
              </div>
            </div>

            {doc.hasVideo && (
              <div className="mb-8">
                <div className="flex items-center space-x-2 mb-4">
                  <Play className="h-5 w-5 text-pink" />
                  <h3>Video Tutorial</h3>
                </div>
                <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                  <iframe
                    src={doc.videoUrl}
                    title={doc.title}
                    className="w-full h-full"
                    frameBorder="0"
                    allowFullScreen
                  />
                </div>
              </div>
            )}

            <div className="space-y-6">
              <h3>Step-by-Step Guide</h3>
              {doc.steps.map((step, index) => (
                <div key={step.id} className="border border-light-purple rounded-lg overflow-hidden">
                  <div className="bg-light-purple p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-purple">
                          Step {index + 1}: {step.title}
                        </h4>
                      </div>
                      <div className="text-sm text-purple font-semibold">
                        {index + 1} of {doc.steps.length}
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <p className="text-gray-text mb-4 leading-relaxed">
                      {step.content}
                    </p>
                    
                    {step.tips && step.tips.length > 0 && (
                      <div className="bg-gradient-to-r from-light-purple to-light-pink p-4 rounded-lg">
                        <h5 className="font-semibold text-purple mb-2">💡 Pro Tips:</h5>
                        <ul className="space-y-1">
                          {step.tips.map((tip, tipIndex) => (
                            <li key={tipIndex} className="text-sm text-gray-text">
                              • {tip}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="card mt-8 gradient-bg">
              <h3>Was this helpful?</h3>
              <p className="text-gray-text mb-4">
                Let us know if this documentation helped you accomplish your goal.
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={() => handleFeedback(true)}
                  className={`btn flex items-center space-x-2 ${
                    isHelpful === true ? 'btn-primary' : 'btn-secondary'
                  }`}
                >
                  <ThumbsUp className="h-4 w-4" />
                  <span>Yes, helpful</span>
                </button>
                <button
                  onClick={() => handleFeedback(false)}
                  className={`btn flex items-center space-x-2 ${
                    isHelpful === false ? 'btn-primary' : 'btn-secondary'
                  }`}
                >
                  <ThumbsDown className="h-4 w-4" />
                  <span>Needs improvement</span>
                </button>
              </div>
              {isHelpful !== null && (
                <div className="mt-4 p-3 bg-white bg-opacity-50 rounded-lg">
                  <p className="text-sm text-purple font-semibold">
                    {isHelpful 
                      ? "Thanks for your feedback! 🎉" 
                      : "Thanks for your feedback. We'll work on improving this guide."
                    }
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="card">
            <h3>Related Documentation</h3>
            <div className="space-y-3">
              {doc.relatedDocs.map((relatedDoc) => (
                <Link
                  key={relatedDoc.id}
                  to={`/docs/${relatedDoc.id}`}
                  className="block p-3 rounded-lg hover:bg-light-purple transition-colors"
                >
                  <h4 className="font-semibold text-purple text-sm">
                    {relatedDoc.title}
                  </h4>
                </Link>
              ))}
            </div>
          </div>

          <div className="card">
            <h3>Need More Help?</h3>
            <div className="space-y-2">
              <Link to="/faq" className="block text-orange hover:text-pink text-sm">
                → Check FAQ
              </Link>
              <Link to="/tickets/new" className="block text-orange hover:text-pink text-sm">
                → Submit Support Ticket
              </Link>
              <a 
                href="mailto:support@enboq.com" 
                className="block text-orange hover:text-pink text-sm"
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

export default DocDetail;