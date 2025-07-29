import { Box, CircularProgress, Typography, Fade } from '@mui/material';
import { useState, useEffect } from 'react';

const LoadingSpinner = ({ message = 'Loading...', delay = 200 }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  if (!show) return null;

  return (
    <Fade in timeout={300}>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="400px"
        sx={{
          background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
          borderRadius: 4,
          m: 2
        }}
      >
        <CircularProgress
          size={60}
          thickness={4}
          sx={{
            color: 'primary.main',
            mb: 3,
            '& .MuiCircularProgress-circle': {
              strokeLinecap: 'round',
            },
          }}
        />
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{
            fontWeight: 500,
            opacity: 0.8
          }}
        >
          {message}
        </Typography>
      </Box>
    </Fade>
  );
};

export default LoadingSpinner;