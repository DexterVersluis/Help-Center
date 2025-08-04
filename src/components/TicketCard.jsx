import { memo } from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  Stack
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
    <Card
      component={Link}
      to={`/tickets/${ticket.id}`}
      sx={{
        textDecoration: 'none',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 6
        }
      }}
    >
      <CardContent sx={{ p: 4 }}>
        <Box>
          <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
            <Typography variant="h5" component="h3" color="text.primary">
              {ticket.title}
            </Typography>
            <Box display="flex" alignItems="center" gap={2}>
              <Stack direction="row" spacing={1} flexWrap="wrap">
                <Chip
                  label={ticket.priority.toUpperCase()}
                  size="small"
                  {...getPriorityChipProps(ticket.priority)}
                />
                <Chip
                  label={ticket.category}
                  color="warning"
                  variant="outlined"
                  size="small"
                />
              </Stack>
              <Chip
                label={ticket.status}
                size="small"
                {...getStatusChipProps(ticket.status)}
              />
              <ArrowRightIcon color="action" />
            </Box>
          </Box>
          
          <Typography color="text.secondary" paragraph>
            {ticket.description}
          </Typography>
          
          <Box display="flex" justifyContent="flex-end" alignItems="center">
            <Box display="flex" alignItems="center" gap={2}>
              <Box display="flex" alignItems="center" gap={0.5}>
                <TagIcon fontSize="small" />
                <Typography variant="body2" color="text.secondary">
                  {ticket.ticketNumber || ticket.id}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={0.5}>
                <ClockIcon fontSize="small" />
                <Typography variant="body2" color="text.secondary">
                  {formatDate(ticket.createdAt)}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
});

TicketCard.displayName = 'TicketCard';

export default TicketCard;