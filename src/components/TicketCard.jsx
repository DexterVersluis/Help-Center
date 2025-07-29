import { memo } from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  Fade
} from '@mui/material';
import {
  AccessTime as ClockIcon,
  LocalOffer as TagIcon,
  ArrowForward as ArrowRightIcon
} from '@mui/icons-material';

const TicketCard = memo(({ 
  ticket, 
  index, 
  getStatusChipProps, 
  getPriorityChipProps, 
  formatDate 
}) => {
  return (
    <Fade in timeout={400 + index * 100}>
      <Card
        component={Link}
        to={`/tickets/${ticket.id}`}
        sx={{
          textDecoration: 'none',
          
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: 8,
            '& .ticket-arrow': {
              transform: 'translateX(8px)'
            }
          },
          background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
          border: '1px solid',
          borderColor: 'grey.200'
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={3}>
            <Box flex={1}>
              <Box display="flex" alignItems="center" gap={2} mb={2}>
                <Typography
                  variant="h5"
                  component="h3"
                  fontWeight="bold"
                  color="primary.main"
                  sx={{ 
                    transition: 'color 0.3s ease',
                    '&:hover': { color: 'secondary.main' }
                  }}
                >
                  {ticket.title}
                </Typography>
                <Chip
                  label={ticket.status}
                  size="small"
                  {...getStatusChipProps(ticket.status)}
                />
              </Box>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{
                  mb: 2,
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}
              >
                {ticket.description}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={2}>
              <Chip
                label={ticket.priority.toUpperCase()}
                size="small"
                {...getPriorityChipProps(ticket.priority)}
              />
              <ArrowRightIcon
                className="ticket-arrow"
                sx={{
                  color: 'action.active',
                  transition: 'all 0.3s ease'
                }}
              />
            </Box>
          </Box>
          
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            pt={2}
            borderTop={1}
            borderColor="grey.200"
          >
            <Box display="flex" alignItems="center" gap={3}>
              <Box display="flex" alignItems="center" gap={1}>
                <TagIcon fontSize="small" color="action" />
                <Typography variant="body2" fontWeight="medium">
                  {ticket.id}
                </Typography>
              </Box>
              <Chip
                label={ticket.category}
                size="small"
                variant="outlined"
                color="warning"
              />
            </Box>
            <Box display="flex" alignItems="center" gap={1}>
              <ClockIcon fontSize="small" color="action" />
              <Typography variant="body2" color="text.secondary">
                {formatDate(ticket.createdAt)}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Fade>
  );
});

TicketCard.displayName = 'TicketCard';

export default TicketCard;