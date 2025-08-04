import { useState } from 'react';
import { Box, Typography, Paper, IconButton } from '@mui/material';
import { PlayArrow as PlayIcon, Videocam as VideoIcon } from '@mui/icons-material';

const VideoEmbed = ({ url, title = "Video" }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  if (!url) return null;

  // Function to validate if URL is actually a video URL and extract video info
  const getVideoInfo = (url) => {
    // First, validate that it's a proper URL
    try {
      new URL(url);
    } catch {
      return null;
    }

    // Clean the URL
    const cleanUrl = url.trim().toLowerCase();

    // YouTube patterns - more comprehensive
    const youtubePatterns = [
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/,
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/v\/([a-zA-Z0-9_-]{11})/,
      /(?:https?:\/\/)?youtu\.be\/([a-zA-Z0-9_-]{11})/,
      /(?:https?:\/\/)?(?:www\.)?youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/
    ];
    
    for (const pattern of youtubePatterns) {
      const match = url.match(pattern);
      if (match) {
        return {
          platform: 'youtube',
          id: match[1],
          embedUrl: `https://www.youtube.com/embed/${match[1]}?rel=0&modestbranding=1`
        };
      }
    }

    // Loom patterns - more specific
    const loomPatterns = [
      /(?:https?:\/\/)?(?:www\.)?loom\.com\/share\/([a-zA-Z0-9]{32})/,
      /(?:https?:\/\/)?(?:www\.)?loom\.com\/embed\/([a-zA-Z0-9]{32})/
    ];
    
    for (const pattern of loomPatterns) {
      const match = url.match(pattern);
      if (match) {
        return {
          platform: 'loom',
          id: match[1],
          embedUrl: `https://www.loom.com/embed/${match[1]}`
        };
      }
    }

    // Vimeo patterns - more comprehensive
    const vimeoPatterns = [
      /(?:https?:\/\/)?(?:www\.)?vimeo\.com\/(\d+)/,
      /(?:https?:\/\/)?player\.vimeo\.com\/video\/(\d+)/
    ];
    
    for (const pattern of vimeoPatterns) {
      const match = url.match(pattern);
      if (match) {
        return {
          platform: 'vimeo',
          id: match[1],
          embedUrl: `https://player.vimeo.com/video/${match[1]}`
        };
      }
    }

    // Wistia patterns
    const wistiaPatterns = [
      /(?:https?:\/\/)?(?:www\.)?wistia\.com\/medias\/([a-zA-Z0-9]+)/,
      /(?:https?:\/\/)?fast\.wistia\.net\/embed\/iframe\/([a-zA-Z0-9]+)/
    ];
    
    for (const pattern of wistiaPatterns) {
      const match = url.match(pattern);
      if (match) {
        return {
          platform: 'wistia',
          id: match[1],
          embedUrl: `https://fast.wistia.net/embed/iframe/${match[1]}`
        };
      }
    }

    // Twitch patterns
    const twitchPatterns = [
      /(?:https?:\/\/)?(?:www\.)?twitch\.tv\/videos\/(\d+)/,
      /(?:https?:\/\/)?clips\.twitch\.tv\/([a-zA-Z0-9]+)/
    ];
    
    for (const pattern of twitchPatterns) {
      const match = url.match(pattern);
      if (match) {
        const isClip = url.includes('clips.twitch.tv');
        return {
          platform: 'twitch',
          id: match[1],
          embedUrl: isClip 
            ? `https://clips.twitch.tv/embed?clip=${match[1]}&parent=localhost`
            : `https://player.twitch.tv/?video=${match[1]}&parent=localhost`
        };
      }
    }

    // Generic video file extensions - must be direct links to video files
    const videoFileRegex = /^https?:\/\/.*\.(mp4|webm|ogg|mov|avi|mkv|flv|wmv|m4v)(\?.*)?$/i;
    if (videoFileRegex.test(url)) {
      return {
        platform: 'direct',
        id: null,
        embedUrl: url
      };
    }

    // Check if URL contains video-related domains but doesn't match patterns
    const videoDomainsRegex = /(youtube|youtu\.be|vimeo|loom|wistia|twitch|dailymotion|streamable)/i;
    if (videoDomainsRegex.test(url)) {
      // It's from a video platform but doesn't match our patterns
      return {
        platform: 'unsupported',
        id: null,
        embedUrl: null,
        originalUrl: url
      };
    }

    return null;
  };

  const videoInfo = getVideoInfo(url);

  if (!videoInfo) {
    return (
      <Paper 
        variant="outlined" 
        sx={{ 
          p: 3, 
          textAlign: 'center',
          borderRadius: 2,
          bgcolor: 'warning.50',
          borderColor: 'warning.200'
        }}
      >
        <VideoIcon sx={{ fontSize: 48, color: 'warning.main', mb: 1 }} />
        <Typography variant="body1" color="warning.dark" gutterBottom>
          Invalid Video URL
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          The provided URL doesn't appear to be a valid video link.
        </Typography>
        <Typography 
          variant="body2" 
          component="a" 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer"
          sx={{ 
            color: 'primary.main',
            textDecoration: 'none',
            '&:hover': { textDecoration: 'underline' },
            wordBreak: 'break-all'
          }}
        >
          {url}
        </Typography>
      </Paper>
    );
  }

  if (videoInfo.platform === 'unsupported') {
    return (
      <Paper 
        variant="outlined" 
        sx={{ 
          p: 3, 
          textAlign: 'center',
          borderRadius: 2,
          bgcolor: 'info.50',
          borderColor: 'info.200'
        }}
      >
        <VideoIcon sx={{ fontSize: 48, color: 'info.main', mb: 1 }} />
        <Typography variant="body1" color="info.dark" gutterBottom>
          Video Platform Not Supported
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          This video platform isn't supported for embedding, but you can view it externally.
        </Typography>
        <Typography 
          variant="body2" 
          component="a" 
          href={videoInfo.originalUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          sx={{ 
            color: 'primary.main',
            textDecoration: 'none',
            '&:hover': { textDecoration: 'underline' },
            wordBreak: 'break-all'
          }}
        >
          Open Video in New Tab
        </Typography>
      </Paper>
    );
  }

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  if (videoInfo.platform === 'direct') {
    return (
      <Paper elevation={2} sx={{ borderRadius: 2, overflow: 'hidden' }}>
        <video
          controls
          style={{ width: '100%', height: 'auto', display: 'block' }}
          onLoadedData={handleLoad}
          onError={handleError}
        >
          <source src={videoInfo.embedUrl} />
          Your browser does not support the video tag.
        </video>
      </Paper>
    );
  }

  return (
    <Paper elevation={2} sx={{ borderRadius: 2, overflow: 'hidden', position: 'relative' }}>
      {isLoading && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'grey.100',
            zIndex: 1
          }}
        >
          <Box textAlign="center">
            <PlayIcon sx={{ fontSize: 64, color: 'primary.main', mb: 1 }} />
            <Typography variant="body2" color="text.secondary">
              Loading video...
            </Typography>
          </Box>
        </Box>
      )}
      
      {hasError ? (
        <Box
          sx={{
            p: 4,
            textAlign: 'center',
            bgcolor: 'error.50',
            color: 'error.main'
          }}
        >
          <VideoIcon sx={{ fontSize: 48, mb: 1 }} />
          <Typography variant="body1" gutterBottom>
            Unable to load video
          </Typography>
          <Typography 
            variant="body2" 
            component="a" 
            href={url} 
            target="_blank" 
            rel="noopener noreferrer"
            sx={{ 
              color: 'primary.main',
              textDecoration: 'none',
              '&:hover': { textDecoration: 'underline' }
            }}
          >
            Open in new tab
          </Typography>
        </Box>
      ) : (
        <iframe
          src={videoInfo.embedUrl}
          title={title}
          width="100%"
          height="400"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          onLoad={handleLoad}
          onError={handleError}
          style={{ 
            display: 'block',
            border: 'none'
          }}
        />
      )}
    </Paper>
  );
};

export default VideoEmbed;