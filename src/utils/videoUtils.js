// Utility functions for video URL validation and processing

export const validateVideoUrl = (url) => {
  if (!url || !url.trim()) {
    return { valid: true, error: null }; // Empty URL is valid (optional field)
  }

  const cleanUrl = url.trim();

  // First, validate that it's a proper URL
  try {
    new URL(cleanUrl);
  } catch {
    return { valid: false, error: 'Please enter a valid URL (must start with http:// or https://)' };
  }

  // Check if it's a supported video platform
  const supportedPatterns = [
    // YouTube
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/,
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/v\/([a-zA-Z0-9_-]{11})/,
    /(?:https?:\/\/)?youtu\.be\/([a-zA-Z0-9_-]{11})/,
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
    
    // Loom
    /(?:https?:\/\/)?(?:www\.)?loom\.com\/share\/([a-zA-Z0-9]{32})/,
    /(?:https?:\/\/)?(?:www\.)?loom\.com\/embed\/([a-zA-Z0-9]{32})/,
    
    // Vimeo
    /(?:https?:\/\/)?(?:www\.)?vimeo\.com\/(\d+)/,
    /(?:https?:\/\/)?player\.vimeo\.com\/video\/(\d+)/,
    
    // Wistia
    /(?:https?:\/\/)?(?:www\.)?wistia\.com\/medias\/([a-zA-Z0-9]+)/,
    /(?:https?:\/\/)?fast\.wistia\.net\/embed\/iframe\/([a-zA-Z0-9]+)/,
    
    // Twitch
    /(?:https?:\/\/)?(?:www\.)?twitch\.tv\/videos\/(\d+)/,
    /(?:https?:\/\/)?clips\.twitch\.tv\/([a-zA-Z0-9]+)/,
    
    // Direct video files
    /^https?:\/\/.*\.(mp4|webm|ogg|mov|avi|mkv|flv|wmv|m4v)(\?.*)?$/i
  ];

  const isSupported = supportedPatterns.some(pattern => pattern.test(cleanUrl));

  if (!isSupported) {
    // Check if it's from a video platform but not supported
    const videoDomainsRegex = /(youtube|youtu\.be|vimeo|loom|wistia|twitch|dailymotion|streamable)/i;
    if (videoDomainsRegex.test(cleanUrl)) {
      return { 
        valid: false, 
        error: 'This video platform is recognized but the URL format is not supported. Please check the URL format.' 
      };
    } else {
      return { 
        valid: false, 
        error: 'Please enter a valid video URL from supported platforms (YouTube, Loom, Vimeo, Wistia, Twitch, or direct video files)' 
      };
    }
  }

  return { valid: true, error: null };
};

export const getSupportedPlatforms = () => [
  'YouTube (youtube.com, youtu.be)',
  'Loom (loom.com/share)',
  'Vimeo (vimeo.com)',
  'Wistia (wistia.com)',
  'Twitch (twitch.tv)',
  'Direct video files (.mp4, .webm, .ogg, .mov, .avi, etc.)'
];

export const getVideoUrlExamples = () => [
  'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  'https://youtu.be/dQw4w9WgXcQ',
  'https://www.loom.com/share/1234567890abcdef1234567890abcdef',
  'https://vimeo.com/123456789',
  'https://example.com/video.mp4'
];