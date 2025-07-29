import { useState, useRef, useEffect } from 'react';
import { Box, Skeleton } from '@mui/material';

const LazyImage = ({ 
  src, 
  alt, 
  style = {}, 
  skeletonHeight = 200,
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [error, setError] = useState(false);
  const imgRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px' // Start loading 50px before the image comes into view
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setError(true);
    setIsLoaded(true);
  };

  return (
    <Box ref={imgRef} sx={{ position: 'relative', ...style }}>
      {!isLoaded && !error && (
        <Skeleton
          variant="rectangular"
          width="100%"
          height={skeletonHeight}
          sx={{
            borderRadius: 2,
            position: isInView ? 'absolute' : 'static',
            top: 0,
            left: 0,
            zIndex: 1
          }}
        />
      )}
      
      {isInView && !error && (
        <img
          src={src}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          style={{
            ...style,
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 0.3s ease-in-out',
            display: error ? 'none' : 'block'
          }}
          {...props}
        />
      )}
      
      {error && (
        <Box
          sx={{
            width: '100%',
            height: skeletonHeight,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'grey.100',
            borderRadius: 2,
            color: 'text.secondary'
          }}
        >
          Image failed to load
        </Box>
      )}
    </Box>
  );
};

export default LazyImage;