import { useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import {
  Box,
  Container,
  Typography,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Card,
  CardContent,
  Grid,
  Chip,
  InputAdornment,
  Button,
  Paper,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Avatar
} from '@mui/material';
import {
  Search,
  ExpandMore,
  Help,
  ArrowForward,
  Email,
  BugReport,
  Lightbulb,
  Rocket,
  SportsEsports,
  People,
  Business,
  Bolt,
  MenuBook,
  Event,
  Chat,
  TrackChanges,
  AutoAwesome,
  Security,
  CreditCard,
  Settings,
  Language,
  Star,
  EmojiEvents,
  TrendingUp
} from '@mui/icons-material';

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
      'Employee Dashboard & Gamification': SportsEsports,
      'Buddy Matchmaking & 3D Island': People,
      'Admin Dashboard & Management': Business,
      'Journey Builder & Workflows': TrackChanges,
      'Daily Missions & Engagement': Bolt,
      'Story Builder & AI Features': AutoAwesome,
      'Knowledge Base & Chat': MenuBook,
      'Events & Company Culture': Event,
      'Jargon & Terminology': Chat,
      'Company DNA & Automation': TrendingUp,
      'Pricing & Plans': CreditCard,
      'Technical Support': Settings,
      'Security & Compliance': Security,
      'Integration & API': Language,
      'Mobile & Accessibility': Star
    };
    return iconMap[category] || Help;
  };

  const categoryStats = categories.map(category => ({
    name: category,
    count: faqData.filter(faq => faq.category === category).length,
    icon: getCategoryIcon(category)
  }));

  return (
    <Box>
      <SEO
        title="Frequently Asked Questions - ENBOQ Help Center"
        description="Find answers to common questions about ENBOQ's employee onboarding platform, gamification features, buddy matching, preboarding solutions, and more."
        keywords="ENBOQ FAQ, employee onboarding questions, preboarding software help, gamification platform, buddy matching, onboarding support"
        url="/faq"
      />
      {/* Hero Section */}
      <Box
        sx={{
          background: 'white',
          py: { xs: 8, md: 12 },
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="lg">
          <Box textAlign="center" maxWidth="800px" mx="auto">
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '2.5rem', md: '4rem' },
                fontWeight: 900,
                mb: 3
              }}
            >
              Frequently Asked Questions
            </Typography>
            
            <Typography
              variant="h5"
              color="text.secondary"
              sx={{ mb: 4, lineHeight: 1.6 }}
            >
              Everything you need to know about ENBOQ's employee onboarding platform, gamification features, buddy matching, and preboarding solutions
            </Typography>

            {/* Search Bar */}
            <Paper
              elevation={3}
              sx={{
                p: 1,
                mb: 6,
                borderRadius: 3,
                mx: 'auto'
              }}
            >
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Search ENBOQ docs... Try 'How do I create a workflow?'"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button
                        variant="contained"
                        disabled={!searchTerm.trim()}
                        sx={{ borderRadius: 2 }}
                      >
                        Search
                      </Button>
                    </InputAdornment>
                  ),
                  sx: { '& .MuiOutlinedInput-notchedOutline': { border: 'none' } }
                }}
              />
            </Paper>

            {/* Popular Topics */}
            <Box>
              <Typography variant="h6" sx={{ mb: 2, color: 'text.secondary' }}>
                Popular topics:
              </Typography>
              <Stack direction="row" spacing={2} flexWrap="wrap" justifyContent="center">
                {[
                  { label: 'Data Management', path: '/docs?search=data+management' },
                  { label: 'HRIS integrations', path: '/docs?search=HRIS+integrations' },
                  { label: 'Workflow Setup', path: '/docs?search=workflow+setup' },
                  { label: 'User Permissions', path: '/docs?search=user+permissions' }
                ].map((topic) => (
                  <Chip
                    key={topic.label}
                    label={topic.label}
                    component={Link}
                    to={topic.path}
                    clickable
                    variant="outlined"
                    sx={{
                      borderRadius: 3,
                      '&:hover': {
                        backgroundColor: 'primary.main',
                        color: 'white',
                        transform: 'translateY(-2px)'
                      },
                      transition: 'all 0.3s ease'
                    }}
                  />
                ))}
              </Stack>
            </Box>


          </Box>
        </Container>
      </Box>

      {/* Category Overview */}
      <Box sx={{ bgcolor: 'background.default', py: 8 }}>
        <Container maxWidth="lg">
          <Box textAlign="center" mb={6}>
            <Typography variant="h3" gutterBottom>
              Browse by Category
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Find answers organized by feature and topic
            </Typography>
          </Box>
          
          <Grid container spacing={3}>
            {categoryStats.slice(0, 8).map((category) => {
              const IconComponent = category.icon;
              return (
                <Grid item xs={12} sm={6} md={3} key={category.name}>
                  <Card
                    sx={{
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: 6
                      },
                      bgcolor: selectedCategory === category.name ? 'primary.light' : 'background.paper'
                    }}
                    onClick={() => setSelectedCategory(category.name)}
                  >
                    <CardContent>
                      <Box display="flex" alignItems="center" mb={2}>
                        <IconComponent 
                          color={selectedCategory === category.name ? 'inherit' : 'primary'} 
                          sx={{ mr: 1 }}
                        />
                        <Typography variant="body2" fontWeight="medium">
                          {category.count} FAQs
                        </Typography>
                      </Box>
                      <Typography variant="body1" fontWeight="medium">
                        {category.name}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </Box>

      {/* FAQ Content */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
          <Box>
            <Typography variant="h4" gutterBottom>
              {selectedCategory === 'all' ? 'All Questions' : selectedCategory}
            </Typography>
            <Typography color="text.secondary">
              {filteredFAQs.length} question{filteredFAQs.length !== 1 ? 's' : ''} found
              {searchTerm && ` for "${searchTerm}"`}
            </Typography>
          </Box>
          
          {filteredFAQs.length > 0 && (
            <Stack direction="row" spacing={2}>
              <Button variant="contained" onClick={expandAll}>
                Expand All
              </Button>
              <Button variant="outlined" onClick={collapseAll}>
                Collapse All
              </Button>
            </Stack>
          )}
        </Box>

        {filteredFAQs.length === 0 ? (
          <Paper sx={{ p: 8, textAlign: 'center' }}>
            <Help sx={{ fontSize: 80, color: 'primary.light', mb: 3 }} />
            <Typography variant="h4" gutterBottom>
              No FAQs found
            </Typography>
            <Typography color="text.secondary" paragraph>
              Try adjusting your search terms or browse a different category.
            </Typography>
            <Stack direction="row" spacing={2} justifyContent="center">
              <Button
                variant="contained"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
              >
                Clear Filters
              </Button>
              <Button
                component={Link}
                to="/tickets/new"
                variant="outlined"
              >
                Ask a Question
              </Button>
            </Stack>
          </Paper>
        ) : (
          <Stack spacing={3}>
            {filteredFAQs.slice(0, 20).map((faq) => {
              const IconComponent = getCategoryIcon(faq.category);
              return (
                <Accordion
                  key={faq.id}
                  expanded={expandedItems.has(faq.id)}
                  onChange={() => toggleExpanded(faq.id)}
                  sx={{
                    '&:before': { display: 'none' },
                    boxShadow: 2,
                    borderRadius: 2,
                    '&.Mui-expanded': { margin: 0 }
                  }}
                >
                  <AccordionSummary expandIcon={<ExpandMore />}>
                    <Box display="flex" alignItems="center" gap={2} width="100%">
                      <IconComponent color="primary" />
                      <Box flex={1}>
                        <Chip
                          label={faq.category}
                          size="small"
                          color="primary"
                          sx={{ mb: 1 }}
                        />
                        <Typography variant="h6" component="div">
                          {faq.question}
                        </Typography>
                      </Box>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography paragraph>
                      {faq.answer}
                    </Typography>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
                      <Box>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                          Was this helpful?
                        </Typography>
                        <Stack direction="row" spacing={1}>
                          <Button size="small" startIcon="👍" color="success">
                            Yes
                          </Button>
                          <Button size="small" startIcon="👎" color="error">
                            No
                          </Button>
                        </Stack>
                      </Box>
                      <Button
                        component={Link}
                        to="/tickets/new"
                        variant="outlined"
                        endIcon={<ArrowForward />}
                      >
                        Need more help?
                      </Button>
                    </Box>
                  </AccordionDetails>
                </Accordion>
              );
            })}
          </Stack>
        )}

        {/* Popular Topics */}
        {filteredFAQs.length > 0 && (
          <Paper sx={{ p: 4, mt: 6, textAlign: 'center' }}>
            <Typography variant="h5" gutterBottom>
              Popular Topics
            </Typography>
            <Stack direction="row" spacing={2} flexWrap="wrap" justifyContent="center">
              {['Employee Onboarding', 'Preboarding Software', 'Buddy Matching', 'Gamification', 'AI Features', 'Pricing', 'Integration', 'Mobile App'].map((topic) => (
                <Chip
                  key={topic}
                  label={topic}
                  clickable
                  onClick={() => setSearchTerm(topic.toLowerCase())}
                  sx={{
                    '&:hover': {
                      backgroundColor: 'primary.main',
                      color: 'white'
                    }
                  }}
                />
              ))}
            </Stack>
          </Paper>
        )}
      </Container>

      {/* CTA Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Paper
          elevation={4}
          sx={{
            p: 6,
            background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
            borderRadius: 4,
            textAlign: 'center'
          }}
        >
          <Box display="flex" justifyContent="center" mb={3}>
            <Avatar
              sx={{
                width: 80,
                height: 80,
                bgcolor: 'primary.main',
                boxShadow: 3
              }}
            >
              <Help sx={{ fontSize: 40 }} />
            </Avatar>
          </Box>
          
          <Typography variant="h3" gutterBottom fontWeight={700} color="primary.main">
            Still have questions about our onboarding software?
          </Typography>
          
          <Typography variant="h6" color="text.secondary" sx={{ mb: 4, maxWidth: 700, mx: 'auto', lineHeight: 1.6 }}>
            Can't find what you're looking for? Our expert support team is here to help you understand how ENBOQ's 
            employee onboarding and preboarding platform can transform your new hire experience.
          </Typography>
          
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} justifyContent="center" mb={4}>
            <Button
              component={Link}
              to="/tickets/new"
              variant="contained"
              size="large"
              startIcon={<BugReport />}
              endIcon={<ArrowForward />}
              sx={{ 
                borderRadius: 3,
                px: 4,
                py: 1.5,
                textTransform: 'none',
                fontSize: '1.1rem',
                fontWeight: 600,
                boxShadow: 2,
                '&:hover': {
                  boxShadow: 4,
                  transform: 'translateY(-2px)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              Submit Support Ticket
            </Button>
            <Button
              href="mailto:support@enboq.com"
              variant="outlined"
              size="large"
              startIcon={<Email />}
              sx={{
                borderRadius: 3,
                px: 4,
                py: 1.5,
                textTransform: 'none',
                fontSize: '1.1rem',
                fontWeight: 600,
                borderWidth: 2,
                color: 'primary.main',
                borderColor: 'primary.main',
                '&:hover': { 
                  borderColor: 'primary.dark',
                  bgcolor: 'primary.main',
                  color: 'white',
                  transform: 'translateY(-2px)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              Email Support Team
            </Button>
          </Stack>

          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: { xs: 2, sm: 4 },
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Box display="flex" alignItems="center" gap={1}>
              <Chip 
                label="2 hours" 
                color="success" 
                size="small" 
                sx={{ fontWeight: 600 }}
              />
              <Typography variant="body2" color="text.secondary" fontWeight={500}>
                Average response time
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={1}>
              <Chip 
                label="24/7" 
                color="primary" 
                size="small" 
                sx={{ fontWeight: 600 }}
              />
              <Typography variant="body2" color="text.secondary" fontWeight={500}>
                Support available
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={1}>
              <Chip 
                label="14 days" 
                color="secondary" 
                size="small" 
                sx={{ fontWeight: 600 }}
              />
              <Typography variant="body2" color="text.secondary" fontWeight={500}>
                Free trial
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default FAQ;