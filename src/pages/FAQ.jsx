import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronDown, ChevronUp, HelpCircle, ArrowRight, MessageCircle, Users, Gamepad2, Building, Zap, BookOpen, Calendar, MessageSquare, Target, Sparkles, Shield, CreditCard, Settings, Rocket, Globe, Star, Award, TrendingUp } from 'lucide-react';

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedItems, setExpandedItems] = useState(new Set());

  const categories = [
    'Getting Started & Onboarding',
    'Employee Dashboard & Gamification',
    'Buddy Matchmaking & 3D Island',
    'Admin Dashboard & Management',
    'Journey Builder & Workflows',
    'Daily Missions & Engagement',
    'Story Builder & AI Features',
    'Knowledge Base & Chat',
    'Events & Company Culture',
    'Jargon & Terminology',
    'Company DNA & Automation',
    'Pricing & Plans',
    'Technical Support',
    'Security & Compliance',
    'Integration & API',
    'Mobile & Accessibility'
  ];

  const faqData = [
    // Getting Started & Onboarding
    {
      id: 1,
      category: 'Getting Started & Onboarding',
      question: 'What is ENBOQ and how does it improve employee onboarding?',
      answer: 'ENBOQ is a comprehensive employee onboarding and preboarding software platform that transforms the traditional hiring process into an engaging, gamified experience. Our platform reduces time-to-productivity by 60% and increases new hire retention by 40% through interactive journeys, buddy matchmaking, and personalized learning paths.'
    },
    {
      id: 2,
      category: 'Getting Started & Onboarding',
      question: 'How quickly can we implement ENBOQ for our organization?',
      answer: 'Most organizations can be up and running with ENBOQ within 2-5 business days. Our implementation includes initial setup, data migration, admin training, and customization of your onboarding journeys. Enterprise clients receive dedicated implementation support and can typically launch within 1-2 weeks.'
    },
    {
      id: 3,
      category: 'Getting Started & Onboarding',
      question: 'What makes ENBOQ different from other onboarding software?',
      answer: 'ENBOQ uniquely combines gamification with AI-powered personalization. Our 3D island environment, XP/levels system, buddy matchmaking algorithm, and AI story builder create an immersive experience that traditional onboarding platforms cannot match. We focus on engagement and cultural integration, not just paperwork completion.'
    },
    {
      id: 4,
      category: 'Getting Started & Onboarding',
      question: 'Do you offer preboarding capabilities?',
      answer: 'Yes! ENBOQ excels at preboarding - the critical period between job acceptance and first day. Our preboarding software engages new hires immediately with welcome videos, company culture content, buddy introductions, and preparatory tasks that build excitement and reduce first-day anxiety.'
    },
    {
      id: 5,
      category: 'Getting Started & Onboarding',
      question: 'Can ENBOQ handle remote and hybrid onboarding?',
      answer: 'Absolutely. ENBOQ was designed with remote-first principles. Our virtual 3D island, video meetings integration, digital buddy system, and online collaboration tools ensure remote employees receive the same engaging onboarding experience as in-office staff.'
    },

    // Employee Dashboard & Gamification
    {
      id: 6,
      category: 'Employee Dashboard & Gamification',
      question: 'How does the XP and levels system work?',
      answer: 'Employees earn Experience Points (XP) by completing onboarding tasks, attending meetings, engaging with content, and participating in company activities. As they accumulate XP, they level up and unlock new features, badges, and recognition. This gamification increases engagement by 75% compared to traditional onboarding.'
    },
    {
      id: 7,
      category: 'Employee Dashboard & Gamification',
      question: 'What can employees see on their dashboard?',
      answer: 'The employee dashboard displays their current level, XP progress, active missions, upcoming events, buddy connections, learning progress, company announcements, and personalized recommendations. It serves as their central hub for all onboarding activities and ongoing engagement.'
    },
    {
      id: 8,
      category: 'Employee Dashboard & Gamification',
      question: 'Are there different achievement badges and rewards?',
      answer: 'Yes! We offer 50+ achievement badges including "First Week Champion," "Culture Ambassador," "Knowledge Seeker," "Team Player," and custom badges you can create. Rewards can include virtual items, real-world perks, recognition certificates, and early access to company benefits.'
    },
    {
      id: 9,
      category: 'Employee Dashboard & Gamification',
      question: 'Can employees compete with each other?',
      answer: 'ENBOQ includes optional leaderboards and team challenges that promote friendly competition while maintaining a supportive environment. Employees can see top performers, participate in group missions, and celebrate collective achievements without creating unhealthy pressure.'
    },

    // Buddy Matchmaking & 3D Island
    {
      id: 10,
      category: 'Buddy Matchmaking & 3D Island',
      question: 'How does the buddy matchmaking system work?',
      answer: 'Our AI-powered algorithm matches new hires with experienced employees based on role similarity, personality traits, interests, location, and availability. The system considers 15+ factors to create meaningful connections that support both professional development and cultural integration.'
    },
    {
      id: 11,
      category: 'Buddy Matchmaking & 3D Island',
      question: 'What is the 3D island feature?',
      answer: 'The 3D island is an immersive virtual environment where employees can explore, interact, and learn. Different areas represent various departments, meeting spaces, and activity zones. Employees can customize their avatars, visit virtual offices, attend meetings, and participate in interactive experiences that make remote onboarding feel more connected.'
    },
    {
      id: 12,
      category: 'Buddy Matchmaking & 3D Island',
      question: 'Can buddies interact within the 3D environment?',
      answer: 'Yes! Buddies can meet in the 3D island, take virtual tours together, participate in guided activities, and use integrated chat and video features. This creates a more natural and engaging way for new hires to connect with their mentors compared to traditional buddy systems.'
    },
    {
      id: 13,
      category: 'Buddy Matchmaking & 3D Island',
      question: 'Is the 3D island accessible on mobile devices?',
      answer: 'The 3D island is optimized for desktop and tablet experiences for the best visual quality. Mobile users can access a streamlined 2D version with all the same functionality, ensuring no one is excluded from the experience regardless of their device.'
    },

    // Admin Dashboard & Management
    {
      id: 14,
      category: 'Admin Dashboard & Management',
      question: 'What analytics and insights does the admin dashboard provide?',
      answer: 'Admins can track engagement rates, completion times, satisfaction scores, retention metrics, buddy relationship success, and individual progress. Real-time dashboards show bottlenecks, popular content, and areas needing improvement, enabling data-driven onboarding optimization.'
    },
    {
      id: 15,
      category: 'Admin Dashboard & Management',
      question: 'How do I add and manage employees in the system?',
      answer: 'The admin dashboard allows bulk employee import via CSV, individual additions, and integration with HRIS systems. You can set roles, assign buddies, customize journeys, track progress, and manage permissions all from a centralized interface.'
    },
    {
      id: 16,
      category: 'Admin Dashboard & Management',
      question: 'Can I see detailed employee progress and engagement?',
      answer: 'Yes! The employee detail pages show comprehensive progress tracking, engagement metrics, time spent on activities, completion rates, feedback scores, and interaction history. This helps identify employees who may need additional support or recognition.'
    },
    {
      id: 17,
      category: 'Admin Dashboard & Management',
      question: 'What reporting capabilities are available?',
      answer: 'ENBOQ provides 20+ pre-built reports including onboarding completion rates, time-to-productivity metrics, engagement analytics, buddy program effectiveness, and ROI calculations. Custom reports can be created and scheduled for automatic delivery to stakeholders.'
    },

    // Journey Builder & Workflows
    {
      id: 18,
      category: 'Journey Builder & Workflows',
      question: 'How does the Journey Builder work?',
      answer: 'The Journey Builder is a drag-and-drop interface that lets you create custom onboarding workflows. You can add file uploads, schedule meetings, assign tasks, create communication touchpoints, set up questionnaires, and define goals - all with conditional logic and personalization.'
    },
    {
      id: 19,
      category: 'Journey Builder & Workflows',
      question: 'Can I create different journeys for different roles?',
      answer: 'Absolutely! You can create unlimited journey templates for different departments, roles, seniority levels, and locations. Each journey can be customized with role-specific content, tasks, timelines, and requirements while maintaining consistent company-wide elements.'
    },
    {
      id: 20,
      category: 'Journey Builder & Workflows',
      question: 'What types of content can I include in journeys?',
      answer: 'Journeys support videos, documents, interactive presentations, quizzes, surveys, virtual meetings, file uploads, approval workflows, e-learning modules, and external integrations. Content can be scheduled, made conditional, and personalized based on employee attributes.'
    },
    {
      id: 21,
      category: 'Journey Builder & Workflows',
      question: 'How do meeting integrations work within journeys?',
      answer: 'ENBOQ integrates with Zoom, Teams, Google Meet, and Calendly to automatically schedule and manage meetings within onboarding journeys. Meetings can be triggered by progress milestones, scheduled at specific times, or requested on-demand by employees.'
    },
    {
      id: 22,
      category: 'Journey Builder & Workflows',
      question: 'Can I set up automated communications and reminders?',
      answer: 'Yes! The communication system sends automated emails, SMS, and in-app notifications based on triggers like journey progress, missed deadlines, achievements, or custom events. All communications can be personalized and branded to match your company voice.'
    },

    // Daily Missions & Engagement
    {
      id: 23,
      category: 'Daily Missions & Engagement',
      question: 'What are Daily Missions and how do they work?',
      answer: 'Daily Missions are bite-sized, engaging tasks that keep new hires active and learning every day. These might include "Meet 3 new colleagues," "Complete a training module," "Share feedback on your first week," or "Explore the company values page." Missions earn XP and maintain momentum.'
    },
    {
      id: 24,
      category: 'Daily Missions & Engagement',
      question: 'Can I customize Daily Missions for my company?',
      answer: 'Yes! You can create custom missions aligned with your company culture, values, and specific onboarding goals. Missions can be role-specific, time-sensitive, or triggered by certain conditions. Our mission library includes 100+ templates to get you started.'
    },
    {
      id: 25,
      category: 'Daily Missions & Engagement',
      question: 'How do Daily Missions improve engagement?',
      answer: 'Daily Missions create consistent touchpoints that prevent onboarding fatigue. They break large tasks into manageable pieces, provide regular wins through XP rewards, and encourage exploration of different company aspects. This approach increases daily active usage by 85%.'
    },

    // Story Builder & AI Features
    {
      id: 26,
      category: 'Story Builder & AI Features',
      question: 'What is the AI Story Builder feature?',
      answer: 'The AI Story Builder uses advanced language models to create personalized onboarding narratives, company culture stories, and interactive scenarios. It can generate welcome messages, department introductions, role-specific content, and even create choose-your-own-adventure style learning experiences.'
    },
    {
      id: 27,
      category: 'Story Builder & AI Features',
      question: 'How does AI personalization work in ENBOQ?',
      answer: 'Our AI analyzes employee profiles, learning preferences, progress patterns, and engagement data to personalize content recommendations, mission suggestions, buddy matches, and communication timing. This creates a unique experience for each employee while maintaining consistency.'
    },
    {
      id: 28,
      category: 'Story Builder & AI Features',
      question: 'Can the AI create content in different languages?',
      answer: 'Yes! Our AI Story Builder supports 25+ languages and can create culturally appropriate content for global organizations. It maintains brand voice and company values while adapting to local customs and communication styles.'
    },
    {
      id: 29,
      category: 'Story Builder & AI Features',
      question: 'Is the AI-generated content reviewed for accuracy?',
      answer: 'All AI-generated content goes through quality checks and can be reviewed by admins before publication. You can set approval workflows, edit generated content, and maintain full control over what employees see while leveraging AI efficiency.'
    },

    // Knowledge Base & Chat
    {
      id: 30,
      category: 'Knowledge Base & Chat',
      question: 'How does the knowledge source and chat system work?',
      answer: 'Employees can access a searchable knowledge base and chat with an AI assistant that understands your company-specific information. The system learns from your documents, policies, and FAQs to provide instant, accurate answers to common questions 24/7.'
    },
    {
      id: 31,
      category: 'Knowledge Base & Chat',
      question: 'Can the chat system integrate with our existing knowledge base?',
      answer: 'Yes! ENBOQ can import content from Confluence, SharePoint, Notion, Google Drive, and other knowledge management systems. The AI chat assistant indexes this content and provides contextual answers with source citations.'
    },
    {
      id: 32,
      category: 'Knowledge Base & Chat',
      question: 'What types of questions can the AI chat assistant answer?',
      answer: 'The assistant can answer questions about company policies, benefits, procedures, org charts, office locations, IT setup, cultural norms, and role-specific information. It gets smarter over time by learning from interactions and feedback.'
    },

    // Events & Company Culture
    {
      id: 33,
      category: 'Events & Company Culture',
      question: 'How does ENBOQ handle company events and cultural activities?',
      answer: 'The events system manages virtual and in-person company events, social activities, training sessions, and cultural celebrations. Employees can RSVP, receive reminders, earn XP for attendance, and connect with colleagues through event participation.'
    },
    {
      id: 34,
      category: 'Events & Company Culture',
      question: 'Can I create recurring events and celebrations?',
      answer: 'Yes! You can set up recurring events like weekly team meetings, monthly all-hands, quarterly reviews, and annual celebrations. The system automatically manages invitations, reminders, and tracks participation for engagement analytics.'
    },
    {
      id: 35,
      category: 'Events & Company Culture',
      question: 'How do events integrate with the gamification system?',
      answer: 'Event participation earns XP, unlocks achievements, and can trigger special missions or rewards. Popular events might award bonus points, and consistent attendance can unlock exclusive badges or recognition within the platform.'
    },

    // Jargon & Terminology
    {
      id: 36,
      category: 'Jargon & Terminology',
      question: 'How does ENBOQ help with company jargon and terminology?',
      answer: 'ENBOQ includes a smart glossary system that automatically detects company-specific terms, acronyms, and jargon in content and provides instant definitions. New hires can quickly understand company language without feeling overwhelmed or excluded.'
    },
    {
      id: 37,
      category: 'Jargon & Terminology',
      question: 'Can I build a custom company dictionary?',
      answer: 'Yes! Admins can create and maintain a comprehensive company dictionary with terms, definitions, pronunciations, and usage examples. The system can also suggest new terms based on content analysis and employee questions.'
    },
    {
      id: 38,
      category: 'Jargon & Terminology',
      question: 'Does the jargon system work across different departments?',
      answer: 'Absolutely! You can create department-specific terminology while maintaining company-wide terms. The system shows relevant jargon based on the employee\'s role and current content, preventing information overload while ensuring comprehensive understanding.'
    },

    // Company DNA & Automation
    {
      id: 39,
      category: 'Company DNA & Automation',
      question: 'What is Company DNA and how does it work?',
      answer: 'Company DNA is our proprietary system that captures and codifies your organization\'s culture, values, communication style, and operational patterns. It uses this data to automatically personalize experiences, suggest content, and maintain cultural consistency across all onboarding touchpoints.'
    },
    {
      id: 40,
      category: 'Company DNA & Automation',
      question: 'How does automation data improve the onboarding process?',
      answer: 'Our automation engine analyzes patterns in successful onboarding journeys, identifies bottlenecks, predicts at-risk employees, and automatically adjusts content delivery, timing, and support interventions. This reduces manual admin work while improving outcomes.'
    },
    {
      id: 41,
      category: 'Company DNA & Automation',
      question: 'Can the system learn and adapt over time?',
      answer: 'Yes! ENBOQ continuously learns from employee interactions, feedback, completion rates, and success metrics. The system automatically optimizes journey timing, content recommendations, buddy matches, and mission difficulty to improve engagement and outcomes.'
    },

    // Pricing & Plans
    {
      id: 42,
      category: 'Pricing & Plans',
      question: 'What pricing plans does ENBOQ offer?',
      answer: 'We offer flexible pricing starting with a Starter plan for small teams, Professional for growing companies, and Enterprise for large organizations. Pricing is based on active employees and includes all core features. Contact us for custom pricing on enterprise deployments.'
    },
    {
      id: 43,
      category: 'Pricing & Plans',
      question: 'Is there a free trial available?',
      answer: 'Yes! We offer a 14-day free trial with full access to all features for up to 25 employees. No credit card required. Our team provides setup assistance and training during your trial to ensure you experience the full value of ENBOQ.'
    },
    {
      id: 44,
      category: 'Pricing & Plans',
      question: 'What\'s included in each pricing tier?',
      answer: 'All plans include core onboarding features, gamification, buddy matching, and basic analytics. Professional adds advanced reporting, integrations, and custom branding. Enterprise includes AI features, advanced automation, dedicated support, and unlimited customization.'
    },
    {
      id: 45,
      category: 'Pricing & Plans',
      question: 'Do you offer discounts for non-profits or educational institutions?',
      answer: 'Yes! We provide special pricing for qualified non-profit organizations, educational institutions, and startups. Contact our sales team with your organization details to learn about available discounts and special programs.'
    },

    // Technical Support
    {
      id: 46,
      category: 'Technical Support',
      question: 'What technical support options are available?',
      answer: 'We provide email support for all plans, live chat for Professional plans, and dedicated phone support for Enterprise clients. Our support team includes onboarding specialists, technical experts, and customer success managers to ensure your success.'
    },
    {
      id: 47,
      category: 'Technical Support',
      question: 'What are your system requirements and browser compatibility?',
      answer: 'ENBOQ works on all modern browsers (Chrome, Firefox, Safari, Edge) and is optimized for desktop, tablet, and mobile devices. The 3D island requires WebGL support. No software installation is required - everything runs in your browser.'
    },
    {
      id: 48,
      category: 'Technical Support',
      question: 'Do you provide implementation and training services?',
      answer: 'Yes! All plans include basic setup assistance. Professional and Enterprise plans include dedicated implementation support, admin training, and best practices consultation. We ensure your team is confident and successful with ENBOQ from day one.'
    },
    {
      id: 49,
      category: 'Technical Support',
      question: 'What is your uptime and reliability guarantee?',
      answer: 'ENBOQ maintains 99.9% uptime with redundant infrastructure, automatic failover, and 24/7 monitoring. We provide status page updates, maintenance notifications, and service level agreements for Enterprise clients.'
    },

    // Security & Compliance
    {
      id: 50,
      category: 'Security & Compliance',
      question: 'How secure is employee data in ENBOQ?',
      answer: 'ENBOQ uses enterprise-grade security including 256-bit SSL encryption, SOC 2 Type II compliance, GDPR compliance, and regular security audits. All data is encrypted at rest and in transit, with role-based access controls and audit logging.'
    },
    {
      id: 51,
      category: 'Security & Compliance',
      question: 'Is ENBOQ GDPR and privacy regulation compliant?',
      answer: 'Yes! ENBOQ is fully GDPR compliant and supports privacy regulations worldwide. We provide data processing agreements, privacy controls, data export capabilities, and deletion tools to meet all regulatory requirements.'
    },
    {
      id: 52,
      category: 'Security & Compliance',
      question: 'Can we control data residency and where information is stored?',
      answer: 'Enterprise clients can choose data residency options including US, EU, and other regions. We offer private cloud deployments and on-premises options for organizations with strict data sovereignty requirements.'
    },
    {
      id: 53,
      category: 'Security & Compliance',
      question: 'What authentication and access control options are available?',
      answer: 'ENBOQ supports single sign-on (SSO) with SAML, OAuth, and popular identity providers like Okta, Azure AD, and Google Workspace. We also offer multi-factor authentication, role-based permissions, and session management controls.'
    },

    // Integration & API
    {
      id: 54,
      category: 'Integration & API',
      question: 'What systems does ENBOQ integrate with?',
      answer: 'ENBOQ integrates with popular HRIS systems (Workday, BambooHR, ADP), communication tools (Slack, Teams), calendar systems (Google, Outlook), learning platforms (Cornerstone, Docebo), and 100+ other business applications via API and webhooks.'
    },
    {
      id: 55,
      category: 'Integration & API',
      question: 'Do you provide API access for custom integrations?',
      answer: 'Yes! ENBOQ offers comprehensive REST APIs for data synchronization, custom integrations, and workflow automation. Professional and Enterprise plans include API access with documentation, SDKs, and developer support.'
    },
    {
      id: 56,
      category: 'Integration & API',
      question: 'Can ENBOQ sync with our existing HR systems?',
      answer: 'Absolutely! We provide pre-built connectors for major HRIS platforms and can create custom integrations for proprietary systems. Data syncing includes employee records, org charts, job information, and status updates in real-time or scheduled batches.'
    },
    {
      id: 57,
      category: 'Integration & API',
      question: 'How does the Slack/Teams integration work?',
      answer: 'Our communication integrations send notifications, reminders, and celebrations directly to Slack or Teams channels. Employees can complete certain tasks, view progress, and interact with buddies without leaving their preferred communication platform.'
    },

    // Mobile & Accessibility
    {
      id: 58,
      category: 'Mobile & Accessibility',
      question: 'Is ENBOQ available on mobile devices?',
      answer: 'Yes! ENBOQ is fully responsive and optimized for mobile browsers. We also offer native iOS and Android apps with offline capabilities, push notifications, and mobile-specific features like QR code scanning and location-based check-ins.'
    },
    {
      id: 59,
      category: 'Mobile & Accessibility',
      question: 'What accessibility features does ENBOQ provide?',
      answer: 'ENBOQ is WCAG 2.1 AA compliant with screen reader support, keyboard navigation, high contrast modes, text scaling, and alternative text for images. We regularly test with assistive technologies to ensure inclusive experiences for all employees.'
    },
    {
      id: 60,
      category: 'Mobile & Accessibility',
      question: 'Can employees complete onboarding entirely on mobile?',
      answer: 'Yes! While the 3D island is optimized for desktop, all essential onboarding tasks, communications, learning content, and social features work seamlessly on mobile devices. Employees can complete their entire journey using just their smartphone if needed.'
    },
    {
      id: 61,
      category: 'Mobile & Accessibility',
      question: 'Do you support offline functionality?',
      answer: 'Our mobile apps support offline viewing of downloaded content, task completion, and note-taking. Changes sync automatically when connectivity is restored, ensuring employees can continue their onboarding journey even with limited internet access.'
    },

    // Additional Popular Questions
    {
      id: 62,
      category: 'Getting Started & Onboarding',
      question: 'How long does a typical onboarding journey take?',
      answer: 'Onboarding journeys typically range from 2 weeks to 6 months depending on role complexity and company requirements. ENBOQ\'s engaging format reduces perceived time and increases completion rates by 65% compared to traditional methods.'
    },
    {
      id: 63,
      category: 'Employee Dashboard & Gamification',
      question: 'Can employees opt out of gamification features?',
      answer: 'Yes! While gamification significantly improves engagement, employees can disable XP notifications, leaderboards, and competitive elements while still accessing all core onboarding functionality. Admins can also customize gamification levels per employee.'
    },
    {
      id: 64,
      category: 'Admin Dashboard & Management',
      question: 'How many administrators can manage the system?',
      answer: 'There\'s no limit on administrator accounts. You can assign different permission levels including super admin, department admin, content manager, and viewer roles. This allows distributed management while maintaining security and control.'
    },
    {
      id: 65,
      category: 'Journey Builder & Workflows',
      question: 'Can I clone and modify existing journey templates?',
      answer: 'Absolutely! ENBOQ includes a template library with industry-specific journeys that you can clone, customize, and adapt to your needs. This accelerates setup while ensuring best practices are followed.'
    },
    {
      id: 66,
      category: 'Buddy Matchmaking & 3D Island',
      question: 'What if a buddy relationship isn\'t working well?',
      answer: 'The system monitors buddy interactions and satisfaction. If issues arise, admins can reassign buddies, and our algorithm learns from these changes to improve future matches. We also provide buddy training resources and best practices.'
    },
    {
      id: 67,
      category: 'Story Builder & AI Features',
      question: 'Can I control what the AI generates and modify content?',
      answer: 'Yes! You have full editorial control over AI-generated content. You can set guidelines, review before publishing, edit generated text, and train the AI on your preferred style and tone. The AI serves as a creative assistant, not a replacement for human oversight.'
    },
    {
      id: 68,
      category: 'Knowledge Base & Chat',
      question: 'How accurate is the AI chat assistant?',
      answer: 'Our AI assistant achieves 95%+ accuracy on company-specific questions when properly trained on your content. It continuously improves through machine learning and can escalate complex queries to human support when needed.'
    },
    {
      id: 69,
      category: 'Events & Company Culture',
      question: 'Can remote employees participate in office-based events?',
      answer: 'Yes! ENBOQ supports hybrid events with virtual participation options, live streaming, interactive polls, and virtual networking. Remote employees can fully engage with company culture regardless of their location.'
    },
    {
      id: 70,
      category: 'Company DNA & Automation',
      question: 'How long does it take for the system to learn our company culture?',
      answer: 'The Company DNA system begins learning immediately and shows meaningful insights within 2-4 weeks. Full cultural modeling typically develops over 2-3 months as more employees complete journeys and provide feedback.'
    }
  ];

  const filteredFAQs = faqData.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleExpanded = (id) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const expandAll = () => {
    setExpandedItems(new Set(filteredFAQs.map(faq => faq.id)));
  };

  const collapseAll = () => {
    setExpandedItems(new Set());
  };

  const getCategoryIcon = (category) => {
    const iconMap = {
      'Getting Started & Onboarding': Rocket,
      'Employee Dashboard & Gamification': Gamepad2,
      'Buddy Matchmaking & 3D Island': Users,
      'Admin Dashboard & Management': Building,
      'Journey Builder & Workflows': Target,
      'Daily Missions & Engagement': Zap,
      'Story Builder & AI Features': Sparkles,
      'Knowledge Base & Chat': BookOpen,
      'Events & Company Culture': Calendar,
      'Jargon & Terminology': MessageSquare,
      'Company DNA & Automation': TrendingUp,
      'Pricing & Plans': CreditCard,
      'Technical Support': Settings,
      'Security & Compliance': Shield,
      'Integration & API': Globe,
      'Mobile & Accessibility': Star
    };
    return iconMap[category] || HelpCircle;
  };

  const categoryStats = categories.map(category => ({
    name: category,
    count: faqData.filter(faq => faq.category === category).length,
    icon: getCategoryIcon(category)
  }));

  return (
    <div className="min-h-screen">
      {/* SEO Meta Tags */}
      <div style={{ display: 'none' }}>
        <h1>ENBOQ Employee Onboarding Software FAQ - Preboarding Platform Questions</h1>
        <p>Get answers to frequently asked questions about ENBOQ's employee onboarding software, preboarding platform, gamification features, buddy matching, and more.</p>
      </div>

      {/* Hero Section with Modern Gradient */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-40 w-72 h-72 bg-orange-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="relative container py-24 md:py-32">
          <div className="text-center max-w-6xl mx-auto">
            <div className="mb-8">
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-medium mb-4">
                <Award className="w-4 h-4 mr-2" />
                Employee Onboarding & Preboarding Software
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent mb-8 leading-tight">
              Frequently Asked Questions
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
              Everything you need to know about ENBOQ's employee onboarding platform, gamification features, buddy matching, and preboarding solutions
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-12 text-sm text-gray-600">
              <span className="flex items-center">
                <Rocket className="w-4 h-4 mr-1 text-purple-500" />
                Onboarding Software
              </span>
              <span className="flex items-center">
                <Users className="w-4 h-4 mr-1 text-pink-500" />
                Preboarding Platform
              </span>
              <span className="flex items-center">
                <Gamepad2 className="w-4 h-4 mr-1 text-orange-500" />
                Employee Gamification
              </span>
              <span className="flex items-center">
                <Sparkles className="w-4 h-4 mr-1 text-green-500" />
                AI-Powered Features
              </span>
            </div>
            
            {/* Enhanced Search Bar */}
            <div className="max-w-4xl mx-auto mb-12">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                <div className="relative bg-white rounded-2xl p-3 shadow-2xl border border-gray-200">
                  <div className="flex flex-col md:flex-row items-center gap-3">
                    <div className="flex items-center flex-1 w-full">
                      <Search className="w-6 h-6 text-gray-400 ml-4" />
                      <input
                        type="text"
                        placeholder="Search 70+ FAQs... Try 'buddy matching', 'gamification', or 'pricing'"
                        className="modern-search-input"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <select
                      className="modern-search-select w-full md:w-auto"
                      style={{minWidth: '120px', maxWidth: '180px'}}
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                      <option value="all">All Categories ({faqData.length})</option>
                      {categories.map(category => {
                        const count = faqData.filter(faq => faq.category === category).length;
                        return (
                          <option key={category} value={category}>
                            {category} ({count})
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">{faqData.length}+</div>
                <div className="text-sm text-gray-600">FAQ Answers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-600">{categories.length}</div>
                <div className="text-sm text-gray-600">Categories</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600">24/7</div>
                <div className="text-sm text-gray-600">Support</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">99.9%</div>
                <div className="text-sm text-gray-600">Uptime</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Overview Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Browse by Category</h2>
            <p className="text-lg text-gray-600">Find answers organized by feature and topic</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {categoryStats.map((category) => {
              const IconComponent = category.icon;
              return (
                  <button
                    key={category.name}
                    onClick={() => setSelectedCategory(category.name)}
                    className={`p-8 rounded-2xl transition-all duration-300 text-left hover:shadow-xl hover:-translate-y-1 !border-0 !outline-0 ${
                      selectedCategory === category.name
                        ? 'bg-gradient-to-br from-purple-100 to-pink-100 shadow-xl'
                        : 'bg-gradient-to-br from-white to-purple-50/30 shadow-lg hover:from-purple-50 hover:to-pink-50'
                    }`}
                    style={{border: 'none', outline: 'none'}}
                  >                  <div className="flex items-center mb-3">
                    <div className={`p-2 rounded-lg ${
                      selectedCategory === category.name ? 'bg-purple-100' : 'bg-gray-100'
                    }`}>
                      <IconComponent className={`w-5 h-5 ${
                        selectedCategory === category.name ? 'text-purple-600' : 'text-gray-600'
                      }`} />
                    </div>
                    <span className="ml-3 text-sm font-medium text-gray-900">
                      {category.count} FAQs
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm leading-tight">
                    {category.name}
                  </h3>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Content Section */}
      <section className="py-24 bg-white">
        <div className="container">
          <div className="max-w-5xl mx-auto">
            {/* Results Header */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-12">
              <div className="text-center md:text-left mb-4 md:mb-0">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {selectedCategory === 'all' ? 'All Questions' : selectedCategory}
                </h2>
                <span className="text-lg text-gray-600">
                  {filteredFAQs.length} question{filteredFAQs.length !== 1 ? 's' : ''} found
                  {searchTerm && ` for "${searchTerm}"`}
                </span>
              </div>
              
              {filteredFAQs.length > 0 && (
                <div className="flex gap-3">
                  <button
                    onClick={expandAll}
                    className="py-2.5 text-sm font-bold text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-full hover:shadow-lg transition-all duration-300 !border-0 !outline-0 hover:scale-105"
                    style={{border: 'none', outline: 'none', paddingLeft: '10px', paddingRight: '10px'}}
                  >
                    Expand All
                  </button>
                  <button
                    onClick={collapseAll}
                    className="py-2.5 text-sm font-bold text-white bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 rounded-full hover:shadow-lg transition-all duration-300 !border-0 !outline-0 hover:scale-105"
                    style={{border: 'none', outline: 'none', paddingLeft: '10px', paddingRight: '10px'}}
                  >
                    Collapse All
                  </button>
                </div>
              )}
            </div>

            {filteredFAQs.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 border border-gray-100 shadow-xl text-center">
                <HelpCircle className="mx-auto h-20 w-20 text-purple-300 mb-6" />
                <h3 className="text-3xl font-bold text-gray-900 mb-4">No FAQs found</h3>
                <p className="text-xl text-gray-600 mb-8">
                  Try adjusting your search terms or browse a different category.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory('all');
                    }}
                    className="py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-full hover:shadow-xl transition-all duration-300 font-bold !border-0 !outline-0 hover:scale-105"
                    style={{border: 'none', outline: 'none', paddingLeft: '10px', paddingRight: '10px'}}
                  >
                    Clear Filters
                  </button>
                  <Link
                    to="/tickets/new"
                    className="py-4 bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white rounded-full hover:shadow-xl transition-all duration-300 font-bold border-0 hover:scale-105"
                    style={{paddingLeft: '10px', paddingRight: '10px'}}
                  >
                    Ask a Question
                  </Link>
                </div>
              </div>
            ) : (
              <div className="space-y-12">
                {filteredFAQs.map((faq, index) => {
                  const IconComponent = getCategoryIcon(faq.category);
                  return (
                    <div key={faq.id} className="group">
                      <div className="relative bg-gradient-to-br from-purple-50/50 via-white to-pink-50/50 rounded-3xl p-12 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] transform border-0 overflow-hidden">
                        {/* Colorful gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-100/40 via-pink-100/30 to-orange-100/40 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        {/* Decorative corner accent */}
                        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-200/60 to-pink-200/60 rounded-bl-3xl opacity-30"></div>
                        
                        <button
                          onClick={() => toggleExpanded(faq.id)}
                          className="relative w-full text-left flex items-start justify-between !border-0 !outline-0"
                          style={{border: 'none', outline: 'none'}}
                        >
                            <div className="flex items-start flex-1 pr-12">
                              <div className="flex-shrink-0 mr-8 mt-2">
                                <div className="w-18 h-18 bg-gradient-to-br from-purple-200 via-pink-200 to-orange-200 group-hover:from-purple-300 group-hover:via-pink-300 group-hover:to-orange-300 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-lg group-hover:shadow-xl border-0">
                                  <IconComponent className="h-9 w-9 text-purple-700 group-hover:text-purple-800" />
                                </div>
                              </div>                            <div className="flex-1">
                              <div className="flex items-center mb-6">
                                <span className="text-sm font-bold text-white bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 py-2 rounded-full shadow-lg border-0" style={{paddingLeft: '10px', paddingRight: '10px'}}>
                                  {faq.category}
                                </span>
                              </div>
                              <h3 className="text-xl font-bold text-gray-800 group-hover:text-purple-700 transition-colors leading-relaxed pr-4">
                                {faq.question}
                              </h3>
                            </div>
                          </div>
                          <div className="flex-shrink-0 ml-4">
                            <div className="w-14 h-14 bg-gradient-to-br from-purple-200 to-pink-200 group-hover:from-purple-300 group-hover:to-pink-300 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-lg group-hover:shadow-xl border-0">
                              {expandedItems.has(faq.id) ? (
                                <ChevronUp className="h-7 w-7 text-purple-700 group-hover:text-purple-800" />
                              ) : (
                                <ChevronDown className="h-7 w-7 text-purple-700 group-hover:text-purple-800" />
                              )}
                            </div>
                          </div>
                        </button>

                        {expandedItems.has(faq.id) && (
                          <div className="relative mt-10 pt-10 bg-gradient-to-r from-purple-50/60 via-pink-50/40 to-orange-50/60 rounded-2xl p-8 mx-2 border-0">
                            <div className="ml-20 mr-8">
                              <div className="prose prose-gray max-w-none mb-8">
                                <p className="text-gray-700 leading-relaxed text-lg font-medium px-4 py-2">
                                  {faq.answer}
                                </p>
                              </div>
                              
                              {/* Modern helpful actions */}
                              <div className="flex items-center justify-between pt-8 bg-gradient-to-r from-white/80 via-purple-50/50 to-pink-50/50 rounded-2xl p-8 mx-2 border-0">
                                <div className="flex items-center gap-6">
                                  <span className="text-sm font-semibold text-gray-700 px-2">Was this helpful?</span>
                                  <div className="flex gap-4">
                                    <button className="flex items-center gap-3 py-3 text-sm text-white font-bold bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl !border-0 !outline-0 hover:scale-105" style={{border: 'none', outline: 'none', paddingLeft: '10px', paddingRight: '10px'}}>
                                      <span>👍</span> Yes
                                    </button>
                                    <button className="flex items-center gap-3 py-3 text-sm text-white font-bold bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-600 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl !border-0 !outline-0 hover:scale-105" style={{border: 'none', outline: 'none', paddingLeft: '10px', paddingRight: '10px'}}>
                                      <span>👎</span> No
                                    </button>
                                  </div>
                                </div>
                                <Link
                                  to="/tickets/new"
                                  className="text-sm text-white font-bold flex items-center gap-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl border-0 hover:scale-105 ml-4"
                                  style={{paddingLeft: '10px', paddingRight: '10px'}}
                                >
                                  Need more help?
                                  <ArrowRight className="w-4 h-4" />
                                </Link>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Popular Topics */}
            {filteredFAQs.length > 0 && (
              <div className="mt-16 p-8 bg-gradient-to-r from-purple-50 to-pink-50 rounded-3xl">
                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Popular Topics</h3>
                <div className="flex flex-wrap justify-center gap-4">
                  {['Employee Onboarding', 'Preboarding Software', 'Buddy Matching', 'Gamification', 'AI Features', 'Pricing', 'Integration', 'Mobile App'].map((topic) => (
                    <button
                      key={topic}
                      onClick={() => setSearchTerm(topic.toLowerCase())}
                      className="py-4 bg-gradient-to-r from-white to-purple-50 text-gray-800 hover:text-white rounded-full text-sm font-bold hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 transition-all duration-300 !border-0 !outline-0 shadow-md hover:shadow-lg hover:scale-105"
                      style={{border: 'none', outline: 'none', paddingLeft: '10px', paddingRight: '10px'}}
                    >
                      {topic}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Why Choose ENBOQ for Employee Onboarding?
            </h2>
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">60% Faster Onboarding</h3>
                <p className="text-gray-600">Reduce time-to-productivity with our gamified onboarding platform</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-pink-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">40% Better Retention</h3>
                <p className="text-gray-600">AI-powered buddy matching and engagement features improve retention</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">AI-Powered Experience</h3>
                <p className="text-gray-600">Personalized journeys with intelligent content and story generation</p>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Transform Your Employee Onboarding Today
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Join thousands of companies using ENBOQ's employee onboarding software to create engaging preboarding experiences, 
                implement effective buddy matching programs, and leverage gamification to boost new hire engagement and retention.
              </p>
              <div className="flex flex-wrap justify-center gap-2 text-sm text-gray-500">
                <span className="bg-gray-100 px-3 py-1 rounded-full">Employee Onboarding Software</span>
                <span className="bg-gray-100 px-3 py-1 rounded-full">Preboarding Platform</span>
                <span className="bg-gray-100 px-3 py-1 rounded-full">Buddy Matching System</span>
                <span className="bg-gray-100 px-3 py-1 rounded-full">Gamification Features</span>
                <span className="bg-gray-100 px-3 py-1 rounded-full">AI Story Builder</span>
                <span className="bg-gray-100 px-3 py-1 rounded-full">3D Virtual Environment</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-white/5 rounded-full blur-2xl"></div>
        </div>
        <div className="relative container text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Still have questions about our onboarding software?
            </h2>
            <p className="text-xl text-white/90 mb-12 leading-relaxed">
              Can't find what you're looking for? Our expert support team is here to help you understand how ENBOQ's 
              employee onboarding and preboarding platform can transform your new hire experience.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
              <Link 
                to="/tickets/new" 
                className="modern-primary-button text-lg px-8 py-4"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Submit Support Ticket
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <a 
                href="mailto:support@enboq.com" 
                className="modern-secondary-button text-lg px-8 py-4"
              >
                Email Support Team
              </a>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-white/80 text-sm">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                Average response time: 2 hours
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                24/7 support available
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                Free 14-day trial
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;