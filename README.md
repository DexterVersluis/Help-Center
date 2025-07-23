# ENBOQ Support Site

A comprehensive support site built with React and the ENBOQ design system, featuring ticket management, documentation, FAQ, and feature requests.

## Features

### 🎫 Ticket Management System
- **Submit Support Tickets**: Users can create detailed support tickets with categories, priorities, and file attachments
- **Track Ticket Status**: Real-time status tracking (Open, In Progress, Resolved, Closed)
- **Comment System**: Interactive commenting system for ongoing communication
- **Ticket Search & Filtering**: Advanced search and filtering capabilities

### 📚 Support Documentation
- **Step-by-Step Guides**: Interactive tutorials with progress tracking
- **Video Integration**: Embedded video tutorials with Loom-style presentation
- **Progress Tracking**: Users can mark steps as completed and track their progress
- **Search & Categories**: Comprehensive search and categorization system
- **Difficulty Levels**: Beginner, Intermediate, and Advanced content classification

### ❓ FAQ Section
- **Searchable FAQ**: Dynamic search across questions and answers
- **Category Filtering**: Organized by topics like Getting Started, Billing, etc.
- **Expandable Answers**: Clean accordion-style interface
- **Popular Questions**: Highlighted frequently accessed content

### 💡 Feature Request System
- **Submit Feature Requests**: Users can propose new features with detailed descriptions
- **Voting System**: Community voting on feature requests
- **Status Tracking**: Track feature development progress (Under Review, Planned, In Progress, Completed, Rejected)
- **Category Organization**: Organized by feature type (UI/UX, Performance, API, etc.)

### 🎨 ENBOQ Design System
- **Brand Colors**: Purple (#823BEB), Pink (#ED00B8), Orange (#FF8E00), Green (#00B84D)
- **Typography**: Nunito font family with consistent sizing and weights
- **Responsive Design**: Mobile-first approach with breakpoint-specific layouts
- **Component Library**: Reusable components following ENBOQ guidelines

## Technology Stack

- **Frontend**: React 19.1.0 with Vite
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Styling**: Custom CSS with ENBOQ design system
- **Storage**: Local Storage for demo data persistence

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd enboqhelp
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to the provided localhost URL

### Build for Production

```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   └── Layout/
│       ├── Header.jsx          # Navigation header
│       ├── Footer.jsx          # Site footer
│       └── Layout.jsx          # Main layout wrapper
├── pages/
│   ├── Home.jsx               # Landing page
│   ├── SupportDocs.jsx        # Documentation listing
│   ├── DocDetail.jsx          # Individual documentation page
│   ├── TicketForm.jsx         # Ticket submission form
│   ├── TicketList.jsx         # Ticket management dashboard
│   ├── TicketDetail.jsx       # Individual ticket view
│   ├── FAQ.jsx                # FAQ section
│   ├── FeatureRequests.jsx    # Feature request listing
│   └── FeatureRequestForm.jsx # Feature request form
├── styles/
│   └── globals.css            # Global styles and ENBOQ design system
└── App.jsx                    # Main application component
```

## Key Features

### Documentation System
- **Video Integration**: Embedded YouTube/Loom videos
- **Step-by-Step Guides**: Interactive tutorials with completion tracking
- **Progress Indicators**: Visual progress bars and completion percentages
- **Related Content**: Contextual links to related documentation
- **Feedback System**: Users can rate documentation helpfulness

### Ticket Management
- **Priority Levels**: Low, Medium, High, Urgent with color coding
- **Category System**: Technical Issues, Account Problems, Billing, etc.
- **File Attachments**: Support for multiple file types
- **Status Workflow**: Automated status updates and notifications
- **Comment Threading**: Organized conversation history

### Feature Request Workflow
1. **Submission**: Users submit detailed feature requests
2. **Community Voting**: Other users can vote on requests
3. **Review Process**: Admin review and status updates
4. **Development Tracking**: Progress updates through development lifecycle
5. **Completion Notification**: Users notified when features are released

## Design System Implementation

### Colors
- **Primary Purple**: `#823BEB` - Headings and primary actions
- **Secondary Pink**: `#ED00B8` - Subheadings and accents
- **Action Orange**: `#FF8E00` - Links and interactive elements
- **Success Green**: `#00B84D` - Success states and confirmations

### Typography
- **Font Family**: Nunito (Google Fonts)
- **Heading Hierarchy**: 30px, 22px, 20px with appropriate weights
- **Body Text**: 12px regular weight

## Data Storage

The application uses Local Storage for demo purposes. For production deployment, replace with a proper backend API.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is proprietary to ENBOQ. All rights reserved.
