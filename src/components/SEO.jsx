import { Helmet } from 'react-helmet-async';

const SEO = ({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
  author = 'ENBOQ',
  siteName = 'ENBOQ Help Center',
  twitterCard = 'summary_large_image',
  article = null,
  breadcrumbs = null,
  faqPage = null
}) => {
  const baseUrl = 'https://help.enboq.com';
  const defaultImage = `${baseUrl}/assets/enboq-og-image.jpg`;
  const fullUrl = url ? `${baseUrl}${url}` : baseUrl;
  const fullImage = image ? `${baseUrl}${image}` : defaultImage;

  // Enhanced keywords for onboarding software focus
  const enhancedKeywords = keywords ? 
    `${keywords}, onboarding software, preboarding software, employee onboarding platform, new hire onboarding, digital onboarding, HR onboarding tools, employee engagement platform, onboarding automation, workforce onboarding` : 
    'onboarding software, preboarding software, employee onboarding platform, new hire onboarding, digital onboarding, HR onboarding tools';

  // Generate structured data based on content type
  const generateStructuredData = () => {
    const baseSchema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": siteName,
      "url": baseUrl,
      "description": "ENBOQ Help Center - Comprehensive guides and support for employee onboarding, preboarding, and gamification platform",
      "publisher": {
        "@type": "Organization",
        "name": "ENBOQ",
        "url": "https://enboq.com",
        "logo": {
          "@type": "ImageObject",
          "url": `${baseUrl}/assets/Enboq-Logo-NoPayoff-Svg.svg`
        }
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": `${baseUrl}/docs?search={search_term_string}`
        },
        "query-input": "required name=search_term_string"
      }
    };

    // Add article schema for documentation pages
    if (article) {
      return [
        baseSchema,
        {
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": title,
          "description": description,
          "image": fullImage,
          "author": {
            "@type": "Organization",
            "name": "ENBOQ"
          },
          "publisher": {
            "@type": "Organization",
            "name": "ENBOQ",
            "logo": {
              "@type": "ImageObject",
              "url": `${baseUrl}/assets/Enboq-Logo-NoPayoff-Svg.svg`
            }
          },
          "datePublished": article.datePublished,
          "dateModified": article.dateModified,
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": fullUrl
          },
          "articleSection": "Employee Onboarding",
          "keywords": enhancedKeywords,
          "about": {
            "@type": "Thing",
            "name": "Employee Onboarding Software",
            "description": "Digital platform for streamlining employee onboarding and preboarding processes"
          }
        }
      ];
    }

    // Add HowTo schema for step-by-step guides
    if (article && article.steps && article.steps.length > 0) {
      return [
        baseSchema,
        {
          "@context": "https://schema.org",
          "@type": "HowTo",
          "name": title,
          "description": description,
          "image": fullImage,
          "totalTime": article.estimatedTime || "PT10M",
          "supply": [
            {
              "@type": "HowToSupply",
              "name": "ENBOQ Account"
            }
          ],
          "tool": [
            {
              "@type": "HowToTool",
              "name": "ENBOQ Onboarding Platform"
            }
          ],
          "step": article.steps.map((step, index) => ({
            "@type": "HowToStep",
            "position": index + 1,
            "name": step.title,
            "text": step.content,
            "image": step.image_url || fullImage
          }))
        }
      ];
    }

    // Add FAQ schema for FAQ pages
    if (faqPage && faqPage.length > 0) {
      return [
        baseSchema,
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faqPage.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faq.answer
            }
          }))
        }
      ];
    }

    // Add breadcrumb schema
    if (breadcrumbs && breadcrumbs.length > 0) {
      return [
        baseSchema,
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": breadcrumbs.map((crumb, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": crumb.name,
            "item": `${baseUrl}${crumb.url}`
          }))
        }
      ];
    }

    return baseSchema;
  };

  const structuredData = generateStructuredData();

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={enhancedKeywords} />
      <meta name="author" content={author} />
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:image:alt" content={title} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="en_US" />
      
      {/* Additional Open Graph tags for better social sharing */}
      <meta property="article:author" content="ENBOQ" />
      <meta property="article:publisher" content="https://enboq.com" />
      {article && <meta property="article:published_time" content={article.datePublished} />}
      {article && <meta property="article:modified_time" content={article.dateModified} />}
      <meta property="article:section" content="Employee Onboarding" />
      <meta property="article:tag" content="onboarding software" />
      <meta property="article:tag" content="preboarding software" />
      <meta property="article:tag" content="employee onboarding" />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />
      <meta name="twitter:image:alt" content={title} />
      <meta name="twitter:site" content="@enboq" />
      <meta name="twitter:creator" content="@enboq" />
      <meta name="twitter:domain" content="help.enboq.com" />

      {/* Additional SEO Meta Tags */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="distribution" content="global" />
      <meta name="rating" content="general" />
      
      {/* Additional meta tags for better SEO */}
      <meta name="theme-color" content="#823BEB" />
      <meta name="msapplication-TileColor" content="#823BEB" />
      <meta name="application-name" content="ENBOQ Help Center" />
      <meta name="apple-mobile-web-app-title" content="ENBOQ Help" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      
      {/* Preconnect to external domains for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* DNS prefetch for better performance */}
      <link rel="dns-prefetch" href="//enboq.com" />
      <link rel="dns-prefetch" href="//start.enboq.com" />

      {/* Schema.org structured data */}
      <script type="application/ld+json">
        {JSON.stringify(Array.isArray(structuredData) ? structuredData : [structuredData])}
      </script>
    </Helmet>
  );
};

export default SEO;