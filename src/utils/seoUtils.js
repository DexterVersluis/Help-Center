// SEO utility functions for optimizing content for onboarding software keywords

export const SEO_KEYWORDS = {
  primary: [
    'onboarding software',
    'preboarding software',
    'employee onboarding platform',
    'new hire onboarding',
    'digital onboarding'
  ],
  secondary: [
    'HR onboarding tools',
    'employee engagement platform',
    'onboarding automation',
    'workforce onboarding',
    'employee onboarding system',
    'onboarding process software',
    'HR technology',
    'employee experience platform'
  ],
  longtail: [
    'best employee onboarding software',
    'digital preboarding platform',
    'automated onboarding process',
    'employee onboarding checklist software',
    'remote employee onboarding tools',
    'onboarding software for small business',
    'enterprise onboarding platform'
  ]
};

export const generateOptimizedTitle = (doc) => {
  if (!doc) return 'ENBOQ Help Center';
  
  const title = doc.title || '';
  const category = doc.category?.name || '';
  const difficulty = doc.difficulty || '';
  
  // Title patterns optimized for different content types
  const patterns = {
    gettingStarted: () => `${title} | Complete ENBOQ Onboarding Software Guide`,
    setup: () => `${title} - ENBOQ Preboarding Software Setup Tutorial`,
    integration: () => `${title} | Employee Onboarding Platform Integration`,
    beginner: () => `${title} - Easy Onboarding Software Tutorial for Beginners`,
    advanced: () => `${title} | Advanced ENBOQ Employee Onboarding Guide`,
    troubleshooting: () => `${title} - ENBOQ Onboarding Software Troubleshooting`,
    default: () => `${title} | ENBOQ Employee Onboarding Platform Help`
  };
  
  // Determine the best pattern based on content
  if (title.toLowerCase().includes('getting started')) {
    return patterns.gettingStarted();
  } else if (title.toLowerCase().includes('setup') || title.toLowerCase().includes('configure')) {
    return patterns.setup();
  } else if (category.toLowerCase().includes('integration')) {
    return patterns.integration();
  } else if (difficulty === 'Beginner') {
    return patterns.beginner();
  } else if (difficulty === 'Advanced') {
    return patterns.advanced();
  } else if (title.toLowerCase().includes('troubleshoot') || title.toLowerCase().includes('fix')) {
    return patterns.troubleshooting();
  } else {
    return patterns.default();
  }
};

export const generateOptimizedDescription = (doc) => {
  if (!doc) return 'ENBOQ Help Center - Your guide to employee onboarding software';
  
  const baseDescription = doc.description || '';
  const category = doc.category?.name || 'onboarding';
  const difficulty = doc.difficulty || 'Beginner';
  const readTime = doc.read_time || '5 min read';
  
  // Create keyword-rich descriptions with natural language
  const templates = {
    withDescription: () => 
      `${baseDescription} This ${difficulty.toLowerCase()} guide shows you how to use ENBOQ's employee onboarding software effectively. Perfect for HR teams looking to streamline their preboarding and onboarding processes. ${readTime}.`,
    
    withoutDescription: () => 
      `Complete ${difficulty.toLowerCase()} tutorial for ${doc.title} in ENBOQ's employee onboarding platform. Learn how to optimize your preboarding software and onboarding processes with step-by-step instructions. Ideal for HR professionals and managers. ${readTime}.`,
    
    gettingStarted: () =>
      `Get started with ${doc.title} in ENBOQ's onboarding software. This comprehensive guide covers everything you need to know about our employee onboarding platform. Perfect for new users and HR teams. ${readTime}.`,
    
    integration: () =>
      `Learn how to integrate ${doc.title} with ENBOQ's employee onboarding platform. Step-by-step instructions for connecting your HR systems and optimizing your preboarding workflow. ${readTime}.`
  };
  
  if (doc.title.toLowerCase().includes('getting started')) {
    return templates.gettingStarted();
  } else if (category.toLowerCase().includes('integration')) {
    return templates.integration();
  } else if (baseDescription) {
    return templates.withDescription();
  } else {
    return templates.withoutDescription();
  }
};

export const generateOptimizedKeywords = (doc) => {
  if (!doc) return SEO_KEYWORDS.primary.join(', ');
  
  const docSpecificKeywords = [
    doc.title?.toLowerCase(),
    doc.category?.name?.toLowerCase(),
    doc.difficulty?.toLowerCase(),
    'ENBOQ',
    'help center',
    'tutorial',
    'guide'
  ].filter(Boolean);
  
  // Add step-specific keywords if available
  const stepKeywords = doc.steps ? 
    doc.steps.map(step => 
      step.title.toLowerCase().split(' ').filter(word => word.length > 3)
    ).flat().slice(0, 5) : [];
  
  // Combine all keywords and remove duplicates
  const allKeywords = [
    ...SEO_KEYWORDS.primary,
    ...SEO_KEYWORDS.secondary.slice(0, 3), // Limit secondary keywords
    ...docSpecificKeywords,
    ...stepKeywords
  ].filter((keyword, index, arr) => 
    keyword && arr.indexOf(keyword) === index
  );
  
  return allKeywords.join(', ');
};

export const generateBreadcrumbs = (doc) => {
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Documentation', url: '/docs' }
  ];
  
  if (doc?.category?.name) {
    breadcrumbs.push({
      name: doc.category.name,
      url: `/docs?category=${doc.category.slug || doc.category.name.toLowerCase().replace(/\s+/g, '-')}`
    });
  }
  
  if (doc?.title) {
    breadcrumbs.push({
      name: doc.title,
      url: `/docs/${doc.slug}`
    });
  }
  
  return breadcrumbs;
};

export const generateArticleSchema = (doc) => {
  if (!doc) return null;
  
  return {
    datePublished: doc.created_at,
    dateModified: doc.updated_at,
    steps: doc.steps,
    estimatedTime: doc.read_time ? `PT${doc.read_time.replace(/[^\d]/g, '')}M` : 'PT10M'
  };
};

export const optimizeImageAlt = (step, fallbackTitle = '') => {
  if (step.image_alt) return step.image_alt;
  
  const stepTitle = step.title || fallbackTitle;
  return `${stepTitle} - ENBOQ onboarding software screenshot showing ${stepTitle.toLowerCase()}`;
};

// Performance optimization: Preload critical resources
export const preloadCriticalResources = () => {
  // Preload fonts
  const fontLink = document.createElement('link');
  fontLink.rel = 'preload';
  fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
  fontLink.as = 'style';
  fontLink.crossOrigin = 'anonymous';
  document.head.appendChild(fontLink);
  
  // Preconnect to external domains
  const preconnectDomains = [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
    'https://enboq.com',
    'https://start.enboq.com'
  ];
  
  preconnectDomains.forEach(domain => {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = domain;
    if (domain.includes('gstatic')) {
      link.crossOrigin = 'anonymous';
    }
    document.head.appendChild(link);
  });
};

// SEO validation helper
export const validateSEO = (title, description, keywords) => {
  const issues = [];
  
  // Title validation
  if (!title) {
    issues.push('Missing title');
  } else if (title.length > 60) {
    issues.push('Title too long (>60 characters)');
  } else if (title.length < 30) {
    issues.push('Title too short (<30 characters)');
  }
  
  // Description validation
  if (!description) {
    issues.push('Missing description');
  } else if (description.length > 160) {
    issues.push('Description too long (>160 characters)');
  } else if (description.length < 120) {
    issues.push('Description too short (<120 characters)');
  }
  
  // Keywords validation
  if (!keywords) {
    issues.push('Missing keywords');
  } else {
    const keywordArray = keywords.split(',').map(k => k.trim());
    if (keywordArray.length < 5) {
      issues.push('Too few keywords (<5)');
    } else if (keywordArray.length > 15) {
      issues.push('Too many keywords (>15)');
    }
    
    // Check for primary keyword presence
    const hasOnboardingKeyword = keywordArray.some(k => 
      k.includes('onboarding') || k.includes('preboarding')
    );
    if (!hasOnboardingKeyword) {
      issues.push('Missing primary onboarding keywords');
    }
  }
  
  return {
    isValid: issues.length === 0,
    issues,
    score: Math.max(0, 100 - (issues.length * 20))
  };
};

export default {
  generateOptimizedTitle,
  generateOptimizedDescription,
  generateOptimizedKeywords,
  generateBreadcrumbs,
  generateArticleSchema,
  optimizeImageAlt,
  preloadCriticalResources,
  validateSEO,
  SEO_KEYWORDS
};