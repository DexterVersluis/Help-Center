import { memo } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  IconButton,
  Fade
} from '@mui/material';
import {
  ThumbUp as ThumbsUpIcon,
  ThumbDown as ThumbsDownIcon,
  CalendarToday as CalendarIcon
} from '@mui/icons-material';

const FeatureCard = memo(({ 
  feature, 
  index, 
  getStatusChipProps, 
  getStatusLabel,
  formatDate,
  handleVote,
  hasVoted
}) => {
  return (
    <Fade in timeout={400 + index * 100}>
      <Card
        sx={{
          transition: 'all 0.3s ease',
          cursor: 'pointer',
          height: '100%',
          width: '100%',
          minWidth: 0,
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: 8,
            borderColor: 'primary.main'
          },
          background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
          border: '2px solid',
          borderColor: 'grey.200',
          position: 'relative'
        }}
      >
        <CardContent sx={{ p: 4, flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Box display="flex" alignItems="flex-start" gap={3}>
            {/* Vote Section */}
            <Box display="flex" flexDirection="column" alignItems="center" sx={{ minWidth: 80 }}>
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  handleVote(feature.id, 'up');
                }}
                disabled={hasVoted(feature.id) === 'up'}
                sx={{
                  p: 1,
                  bgcolor: hasVoted(feature.id) === 'up' ? 'success.100' : 'transparent',
                  color: hasVoted(feature.id) === 'up' ? 'success.main' : 'text.secondary',
                  '&:hover': {
                    bgcolor: 'success.50',
                    color: 'success.main',
                    transform: 'scale(1.1)'
                  },
                  '&:disabled': {
                    color: 'success.main',
                    bgcolor: 'success.100'
                  }
                }}
              >
                <ThumbsUpIcon sx={{ fontSize: 20 }} />
              </IconButton>
              
              <Typography variant="h6" fontWeight="bold" sx={{ my: 0.5 }}>
                {feature.votes}
              </Typography>
              
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  handleVote(feature.id, 'down');
                }}
                disabled={hasVoted(feature.id) === 'down'}
                sx={{
                  p: 1,
                  bgcolor: hasVoted(feature.id) === 'down' ? 'error.100' : 'transparent',
                  color: hasVoted(feature.id) === 'down' ? 'error.main' : 'text.secondary',
                  '&:hover': {
                    bgcolor: 'error.50',
                    color: 'error.main',
                    transform: 'scale(1.1)'
                  },
                  '&:disabled': {
                    color: 'error.main',
                    bgcolor: 'error.100'
                  }
                }}
              >
                <ThumbsDownIcon sx={{ fontSize: 20 }} />
              </IconButton>
            </Box>

            {/* Content Section */}
            <Box flex={1} display="flex" flexDirection="column">
              <Box display="flex" alignItems="center" gap={2} mb={2}>
                <Typography
                  variant="h5"
                  component="h3"
                  fontWeight="bold"
                  color="primary.main"
                >
                  {feature.title}
                </Typography>
                <Chip
                  label={getStatusLabel(feature.status)}
                  size="small"
                  {...getStatusChipProps(feature.status)}
                />
                <Chip
                  label={feature.category}
                  size="small"
                  variant="outlined"
                  color="warning"
                />
              </Box>
              
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{
                  mb: 3,
                  flex: 1,
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}
              >
                {feature.description}
              </Typography>

              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                pt={2}
                borderTop={1}
                borderColor="grey.200"
              >
                <Box display="flex" alignItems="center" gap={3}>
                  <Typography variant="body2" fontWeight="medium">
                    #{feature.id}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    by {feature.author}
                  </Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={1}>
                  <CalendarIcon fontSize="small" color="action" />
                  <Typography variant="body2" color="text.secondary">
                    {formatDate(feature.createdAt)}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Fade>
  );
});

FeatureCard.displayName = 'FeatureCard';

export default FeatureCard;