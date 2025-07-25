import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Play, Clock, Calendar, ThumbsUp, ThumbsDown, Check } from 'lucide-react';

const OnboardingDoc = () => {
  const { id } = useParams();
  const [isHelpful, setIsHelpful] = useState(null);

  const handleFeedback = (helpful) => {
    setIsHelpful(helpful);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

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
                  Full ENBOQ Platform Demo
                </h1>
                <p className="text-gray-text text-lg mb-4">
                  Comprehensive walkthrough of the ENBOQ platform features and capabilities, showcasing how to create engaging onboarding experiences.
                </p>
                <div className="flex items-center space-x-1 text-sm text-gray-text">
                  <Clock className="h-4 w-4" />
                  <span>10 min</span>
                </div>
              </div>
              <div className="flex items-center space-x-1 text-sm text-gray-text">
                <Calendar className="h-4 w-4" />
                <span>Last updated {formatDate('2024-07-20T09:30:00Z')}</span>
              </div>
            </div>
            
            <div className="mb-8 mt-6">
              <div style={{ position: 'relative', paddingBottom: '59.21%', height: 0 }}>
                <iframe 
                  src="https://www.loom.com/embed/3faa8ae6cc5b46a59a51b69bfdaf4107?sid=732a61fa-e83c-4662-ba52-51b1fb3a0034" 
                  frameBorder="0" 
                  webkitallowfullscreen="true"
                  mozallowfullscreen="true"
                  allowFullScreen 
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                ></iframe>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-100">
                <h3 className="text-purple mb-3">🎯 Objective</h3>
                <p className="text-gray-text leading-relaxed">
                  This guide demonstrates the key features of the ENBOQ platform, showing how to create engaging onboarding experiences for new employees at any organization.
                </p>
              </div>

              <div>
                <h3 className="text-purple mb-6">📋 Key Steps</h3>
              </div>



              <div className="border border-light-purple rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="bg-gradient-to-r from-light-purple to-light-pink p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-purple">
                        Step 1: Core Values Integration
                      </h4>
                    </div>
                    <div className="text-sm text-purple font-semibold bg-white bg-opacity-50 px-3 py-1 rounded-full">
                      1 of 9
                    </div>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="mb-4">
                    <img 
                      src="/assets/fullDemo/2.jpg" 
                      alt="Core Values Integration" 
                      className="rounded-lg mx-auto max-w-[75%] w-full shadow-md"
                    />
                  </div>
                  <div className="flex flex-col space-y-3">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-5 h-5 mt-0.5 bg-green rounded-full mr-4 flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <p className="text-gray-700">Integrate your organization's core values into the onboarding experience.</p>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-5 h-5 mt-0.5 bg-green rounded-full mr-4 flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <p className="text-gray-700">Create interactive elements that reinforce company culture and mission.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border border-light-purple rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 mt-6">
                <div className="bg-gradient-to-r from-light-purple to-light-pink p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-purple">
                        Step 2: Interactive Learning Activities
                      </h4>
                    </div>
                    <div className="text-sm text-purple font-semibold bg-white bg-opacity-50 px-3 py-1 rounded-full">
                      2 of 9
                    </div>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="mb-4">
                    <img 
                      src="/assets/fullDemo/3.jpg" 
                      alt="Interactive Learning Activities" 
                      className="rounded-lg mx-auto max-w-[75%] w-full shadow-md"
                    />
                  </div>
                  <div className="flex flex-col space-y-3">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-5 h-5 mt-0.5 bg-green rounded-full mr-4 flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <p className="text-gray-700">Design engaging puzzles and activities that reinforce key company information.</p>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-5 h-5 mt-0.5 bg-green rounded-full mr-4 flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <p className="text-gray-700">Create gamified learning experiences that make onboarding fun and memorable.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border border-light-purple rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 mt-6">
                <div className="bg-gradient-to-r from-light-purple to-light-pink p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-purple">
                        Step 3: Multi-Channel Communication
                      </h4>
                    </div>
                    <div className="text-sm text-purple font-semibold bg-white bg-opacity-50 px-3 py-1 rounded-full">
                      3 of 9
                    </div>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="mb-4">
                    <img 
                      src="/assets/fullDemo/4.jpg" 
                      alt="Multi-Channel Communication" 
                      className="rounded-lg mx-auto max-w-[75%] w-full shadow-md"
                    />
                  </div>
                  <div className="flex flex-col space-y-3">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-5 h-5 mt-0.5 bg-green rounded-full mr-4 flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <p className="text-gray-700">Set up automated communication across multiple channels (email, chat, SMS).</p>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-5 h-5 mt-0.5 bg-green rounded-full mr-4 flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <p className="text-gray-700">Create interactive response systems that guide new hires through their onboarding journey.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border border-light-purple rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 mt-6">
                <div className="bg-gradient-to-r from-light-purple to-light-pink p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-purple">
                        Step 4: Employee Dashboard Configuration
                      </h4>
                    </div>
                    <div className="text-sm text-purple font-semibold bg-white bg-opacity-50 px-3 py-1 rounded-full">
                      4 of 9
                    </div>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="mb-4">
                    <img 
                      src="/assets/fullDemo/5.jpg" 
                      alt="Employee Dashboard Configuration" 
                      className="rounded-lg mx-auto max-w-[75%] w-full shadow-md"
                    />
                  </div>
                  <div className="flex flex-col space-y-3">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-5 h-5 mt-0.5 bg-green rounded-full mr-4 flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <p className="text-gray-700">Configure personalized dashboards for new employees with tailored onboarding tasks.</p>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-5 h-5 mt-0.5 bg-green rounded-full mr-4 flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <p className="text-gray-700">Design intuitive navigation and clear progress indicators to guide the onboarding journey.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border border-light-purple rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 mt-6">
                <div className="bg-gradient-to-r from-light-purple to-light-pink p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-purple">
                        Step 5: Document Management & Task Automation
                      </h4>
                    </div>
                    <div className="text-sm text-purple font-semibold bg-white bg-opacity-50 px-3 py-1 rounded-full">
                      5 of 9
                    </div>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="mb-4">
                    <img 
                      src="/assets/fullDemo/6.jpg" 
                      alt="Document Management & Task Automation" 
                      className="rounded-lg mx-auto max-w-[75%] w-full shadow-md"
                    />
                  </div>
                  <div className="flex flex-col space-y-3">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-5 h-5 mt-0.5 bg-green rounded-full mr-4 flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <p className="text-gray-700">Set up secure document collection systems for employee contracts and paperwork.</p>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-5 h-5 mt-0.5 bg-green rounded-full mr-4 flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <p className="text-gray-700">Automate meeting scheduling and key milestone reminders throughout the onboarding process.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border border-light-purple rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 mt-6">
                <div className="bg-gradient-to-r from-light-purple to-light-pink p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-purple">
                        Step 6: Interactive Learning Modules
                      </h4>
                    </div>
                    <div className="text-sm text-purple font-semibold bg-white bg-opacity-50 px-3 py-1 rounded-full">
                      6 of 9
                    </div>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="mb-4">
                    <img 
                      src="/assets/fullDemo/7.jpg" 
                      alt="Interactive Learning Modules" 
                      className="rounded-lg mx-auto max-w-[75%] w-full shadow-md"
                    />
                  </div>
                  <div className="flex flex-col space-y-3">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-5 h-5 mt-0.5 bg-green rounded-full mr-4 flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <p className="text-gray-700">Create immersive learning experiences with interactive stories and multimedia content.</p>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-5 h-5 mt-0.5 bg-green rounded-full mr-4 flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <p className="text-gray-700">Implement gamification elements like points, badges, and leaderboards to increase engagement.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border border-light-purple rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 mt-6">
                <div className="bg-gradient-to-r from-light-purple to-light-pink p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-purple">
                        Step 7: Communication Workflow Builder
                      </h4>
                    </div>
                    <div className="text-sm text-purple font-semibold bg-white bg-opacity-50 px-3 py-1 rounded-full">
                      7 of 9
                    </div>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="mb-4">
                    <img 
                      src="/assets/fullDemo/8.jpg" 
                      alt="Communication Workflow Builder" 
                      className="rounded-lg mx-auto max-w-[75%] w-full shadow-md"
                    />
                  </div>
                  <div className="flex flex-col space-y-3">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-5 h-5 mt-0.5 bg-green rounded-full mr-4 flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <p className="text-gray-700">Use the intuitive drag-and-drop workflow builder to create automated communication sequences.</p>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-5 h-5 mt-0.5 bg-green rounded-full mr-4 flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <p className="text-gray-700">Set up time-based triggers and conditional logic for personalized employee journeys.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border border-light-purple rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 mt-6">
                <div className="bg-gradient-to-r from-light-purple to-light-pink p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-purple">
                        Step 8: AI-Powered Content Creation
                      </h4>
                    </div>
                    <div className="text-sm text-purple font-semibold bg-white bg-opacity-50 px-3 py-1 rounded-full">
                      8 of 9
                    </div>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="mb-4">
                    <img 
                      src="/assets/fullDemo/9.jpg" 
                      alt="AI-Powered Content Creation" 
                      className="rounded-lg mx-auto max-w-[75%] w-full shadow-md"
                    />
                  </div>
                  <div className="flex flex-col space-y-3">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-5 h-5 mt-0.5 bg-green rounded-full mr-4 flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <p className="text-gray-700">Leverage ENBOQ's AI-powered content creation tools to quickly generate engaging onboarding materials.</p>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-5 h-5 mt-0.5 bg-green rounded-full mr-4 flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <p className="text-gray-700">Customize templates with your branding and company-specific information for a personalized experience.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border border-light-purple rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 mt-6">
                <div className="bg-gradient-to-r from-light-purple to-light-pink p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-purple">
                        Step 9: Analytics & Optimization
                      </h4>
                    </div>
                    <div className="text-sm text-purple font-semibold bg-white bg-opacity-50 px-3 py-1 rounded-full">
                      9 of 9
                    </div>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="mb-4">
                    <img 
                      src="/assets/fullDemo/10.jpg" 
                      alt="Analytics & Optimization" 
                      className="rounded-lg mx-auto max-w-[75%] w-full shadow-md"
                    />
                  </div>
                  <div className="flex flex-col space-y-3">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-5 h-5 mt-0.5 bg-green rounded-full mr-4 flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <p className="text-gray-700">Access comprehensive analytics dashboards to track employee engagement and progress.</p>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-5 h-5 mt-0.5 bg-green rounded-full mr-4 flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <p className="text-gray-700">Use data-driven insights to continuously optimize your onboarding process for better results.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl border border-green-100">
                <h3 className="text-green mb-4">✨ Best Practices</h3>
                <div className="flex flex-col space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-5 h-5 mt-0.5 bg-green rounded-full mr-3 flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <p className="text-gray-700">Design mobile-friendly experiences that allow employees to complete onboarding tasks from any device.</p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-5 h-5 mt-0.5 bg-green rounded-full mr-3 flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <p className="text-gray-700">Create personalized journeys based on role, department, and experience level.</p>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-5 h-5 mt-0.5 bg-green rounded-full mr-3 flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <p className="text-gray-700">Maintain a balance between automation and human connection throughout the onboarding process.</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-6 rounded-xl border border-orange-100">
                <h3 className="text-orange mb-4">💡 Tips for Success</h3>
                <div className="flex flex-col space-y-4">
                  <div className="flex items-start">
                      <div className="flex-shrink-0 w-5 h-5 mt-0.5 bg-orange rounded-full mr-4 flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>                    <p className="text-gray-700">Start with pre-built templates and customize them to match your organization's needs.</p>
                  </div>
                  <div className="flex items-start">
                      <div className="flex-shrink-0 w-5 h-5 mt-0.5 bg-orange rounded-full mr-4 flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>                    <p className="text-gray-700">Use A/B testing to determine which onboarding elements drive the highest engagement.</p>
                  </div>
                  <div className="flex items-start">
                      <div className="flex-shrink-0 w-5 h-5 mt-0.5 bg-orange rounded-full mr-4 flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>                    <p className="text-gray-700">Collect feedback from new hires to continuously improve your onboarding experience.</p>
                  </div>
                  <div className="flex items-start">
                      <div className="flex-shrink-0 w-5 h-5 mt-0.5 bg-orange rounded-full mr-4 flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>                    <p className="text-gray-700">Integrate with your existing HR systems for seamless data flow and reduced manual work.</p>
                  </div>
                </div>
              </div>


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
              <Link
                to="/docs/doc-001"
                className="block p-3 rounded-lg hover:bg-light-purple transition-colors"
              >
                <h4 className="font-semibold text-purple text-sm">
                  Getting Started with ENBOQ
                </h4>
              </Link>
              <Link
                to="/docs/doc-003"
                className="block p-3 rounded-lg hover:bg-light-purple transition-colors"
              >
                <h4 className="font-semibold text-purple text-sm">
                  Advanced User Management
                </h4>
              </Link>
              <Link
                to="/docs/doc-004"
                className="block p-3 rounded-lg hover:bg-light-purple transition-colors"
              >
                <h4 className="font-semibold text-purple text-sm">
                  Real-time Collaboration Features
                </h4>
              </Link>
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

export default OnboardingDoc;