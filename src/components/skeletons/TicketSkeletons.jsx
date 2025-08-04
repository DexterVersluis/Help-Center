import {
  Box,
  Container,
  Paper,
  Skeleton,
  Stack,
  Grid,
  Card,
  CardContent,
  Divider
} from '@mui/material';

// Skeleton for individual ticket card in the list
export const TicketCardSkeleton = () => (
  <Card sx={{ mb: 2 }}>
    <CardContent sx={{ p: 4 }}>
      <Box>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
          <Skeleton variant="text" width="60%" height={32} />
          <Box display="flex" alignItems="center" gap={2}>
            <Stack direction="row" spacing={1}>
              <Skeleton variant="rounded" width={80} height={24} />
              <Skeleton variant="rounded" width={100} height={24} />
            </Stack>
            <Skeleton variant="rounded" width={70} height={24} />
            <Skeleton variant="circular" width={24} height={24} />
          </Box>
        </Box>
        
        <Skeleton variant="text" width="90%" height={20} sx={{ mb: 1 }} />
        <Skeleton variant="text" width="75%" height={20} sx={{ mb: 2 }} />
        
        <Box display="flex" justifyContent="flex-end" alignItems="center">
          <Box display="flex" alignItems="center" gap={2}>
            <Box display="flex" alignItems="center" gap={0.5}>
              <Skeleton variant="circular" width={16} height={16} />
              <Skeleton variant="text" width={120} height={16} />
            </Box>
            <Box display="flex" alignItems="center" gap={0.5}>
              <Skeleton variant="circular" width={16} height={16} />
              <Skeleton variant="text" width={80} height={16} />
            </Box>
          </Box>
        </Box>
      </Box>
    </CardContent>
  </Card>
);

// Skeleton for ticket list page
export const TicketListSkeleton = () => (
  <Box>
    {/* Hero Section Skeleton */}
    <Box sx={{ background: 'white', py: { xs: 4, md: 6 } }}>
      <Container maxWidth="lg">
        <Box textAlign="center" maxWidth="800px" mx="auto">
          <Skeleton variant="text" width="60%" height={64} sx={{ mx: 'auto', mb: 3 }} />
          <Skeleton variant="text" width="80%" height={32} sx={{ mx: 'auto', mb: 6 }} />
          
          {/* Search Bar Skeleton */}
          <Paper elevation={3} sx={{ p: 1, mb: 6, borderRadius: 3 }}>
            <Skeleton variant="rounded" height={56} />
          </Paper>

          {/* Popular Topics Skeleton */}
          <Skeleton variant="text" width="40%" height={24} sx={{ mx: 'auto', mb: 2 }} />
          <Stack direction="row" spacing={2} flexWrap="wrap" justifyContent="center">
            {[1, 2, 3, 4].map((item) => (
              <Skeleton key={item} variant="rounded" width={120} height={32} />
            ))}
          </Stack>
        </Box>
      </Container>
    </Box>

    {/* Filters Section Skeleton */}
    <Box sx={{ bgcolor: 'background.default', py: 4 }}>
      <Container maxWidth="lg">
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems="center" justifyContent="space-between">
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <Skeleton variant="rounded" width={150} height={56} />
            <Skeleton variant="rounded" width={150} height={56} />
          </Stack>
          <Skeleton variant="rounded" width={200} height={48} />
        </Stack>
      </Container>
    </Box>

    {/* Tickets List Skeleton */}
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stack spacing={4}>
        {[1, 2, 3, 4, 5].map((index) => (
          <TicketCardSkeleton key={index} />
        ))}
      </Stack>
    </Container>
  </Box>
);

// Skeleton for ticket detail page
export const TicketDetailSkeleton = () => (
  <Box>
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Skeleton variant="text" width={150} height={40} sx={{ mb: 2 }} />
      </Box>

      {/* Ticket Header Skeleton */}
      <Paper elevation={2} sx={{ p: 4, borderRadius: 3, mb: 4 }}>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start">
          <Box flex={1}>
            <Box display="flex" alignItems="center" gap={2} mb={2}>
              <Skeleton variant="text" width="50%" height={40} />
              <Skeleton variant="rounded" width={80} height={32} />
              <Skeleton variant="rounded" width={120} height={32} />
            </Box>
            <Box display="flex" alignItems="center" gap={1}>
              <Skeleton variant="circular" width={16} height={16} />
              <Skeleton variant="text" width={150} height={20} />
            </Box>
          </Box>
          
          <Box display="flex" gap={4} alignItems="flex-start">
            <Box>
              <Skeleton variant="text" width={80} height={16} sx={{ mb: 1 }} />
              <Skeleton variant="rounded" width={100} height={24} />
            </Box>
            <Box>
              <Skeleton variant="text" width={100} height={16} sx={{ mb: 1 }} />
              <Skeleton variant="text" width={80} height={20} />
            </Box>
            <Box>
              <Skeleton variant="text" width={90} height={16} sx={{ mb: 1 }} />
              <Skeleton variant="text" width={70} height={20} />
            </Box>
          </Box>
        </Box>
      </Paper>

      {/* Main Content Skeleton */}
      <Paper elevation={2} sx={{ p: 4, borderRadius: 3, mb: 4 }}>
        {/* Description Section */}
        <Box mb={4}>
          <Skeleton variant="text" width={120} height={28} sx={{ mb: 2 }} />
          <Skeleton variant="text" width="100%" height={20} sx={{ mb: 1 }} />
          <Skeleton variant="text" width="95%" height={20} sx={{ mb: 1 }} />
          <Skeleton variant="text" width="80%" height={20} sx={{ mb: 1 }} />
          <Skeleton variant="text" width="70%" height={20} />
        </Box>

        {/* Video Section Skeleton */}
        <Box mb={4}>
          <Skeleton variant="text" width={80} height={28} sx={{ mb: 2 }} />
          <Skeleton variant="rounded" width="100%" height={400} />
        </Box>

        {/* Attachments Section Skeleton */}
        <Box mb={4}>
          <Skeleton variant="text" width={120} height={28} sx={{ mb: 2 }} />
          <Grid container spacing={1}>
            {[1, 2, 3].map((item) => (
              <Grid item key={item}>
                <Skeleton variant="rounded" width={200} height={32} />
              </Grid>
            ))}
          </Grid>
        </Box>

        <Divider sx={{ my: 4 }} />

        {/* Comments Section Skeleton */}
        <Box>
          <Box display="flex" alignItems="center" gap={1} mb={3}>
            <Skeleton variant="circular" width={24} height={24} />
            <Skeleton variant="text" width={150} height={28} />
          </Box>

          {/* Comment Items Skeleton */}
          <Stack spacing={2} sx={{ mb: 3 }}>
            {[1, 2, 3].map((item) => (
              <Box
                key={item}
                sx={{
                  bgcolor: 'grey.50',
                  borderRadius: 2,
                  p: 2,
                  display: 'flex',
                  gap: 2
                }}
              >
                <Skeleton variant="circular" width={40} height={40} />
                <Box flex={1}>
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                    <Skeleton variant="text" width={100} height={20} />
                    <Skeleton variant="text" width={80} height={16} />
                  </Box>
                  <Skeleton variant="text" width="90%" height={16} sx={{ mb: 0.5 }} />
                  <Skeleton variant="text" width="70%" height={16} />
                </Box>
              </Box>
            ))}
          </Stack>

          {/* Comment Form Skeleton */}
          <Paper variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
            <Skeleton variant="rounded" width="100%" height={120} sx={{ mb: 2 }} />
            <Box display="flex" justifyContent="flex-end">
              <Skeleton variant="rounded" width={140} height={40} />
            </Box>
          </Paper>
        </Box>
      </Paper>

      {/* Help Resources Skeleton */}
      <Paper elevation={2} sx={{ p: 4, borderRadius: 3, bgcolor: 'grey.50' }}>
        <Skeleton variant="text" width={150} height={28} sx={{ mb: 1 }} />
        <Skeleton variant="text" width="80%" height={20} sx={{ mb: 3 }} />
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Skeleton variant="rounded" width={180} height={40} />
          <Skeleton variant="rounded" width={120} height={40} />
        </Box>
      </Paper>
    </Container>
  </Box>
);

// Skeleton for ticket form page
export const TicketFormSkeleton = () => (
  <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50' }}>
    {/* Hero Section Skeleton */}
    <Box sx={{ background: 'white', py: { xs: 8, md: 12 } }}>
      <Container maxWidth="lg">
        <Box textAlign="center" maxWidth="800px" mx="auto">
          <Skeleton variant="text" width="70%" height={64} sx={{ mx: 'auto', mb: 3 }} />
          <Skeleton variant="text" width="90%" height={32} sx={{ mx: 'auto', mb: 6 }} />
        </Box>
      </Container>
    </Box>

    {/* Form Section Skeleton */}
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Paper elevation={8} sx={{ p: 4, borderRadius: 4, background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {/* Row 1: Name | Email */}
          <Box sx={{ display: 'flex', gap: 3 }}>
            <Skeleton variant="rounded" height={56} sx={{ flex: 1 }} />
            <Skeleton variant="rounded" height={56} sx={{ flex: 1 }} />
          </Box>

          {/* Row 2: Priority | Category */}
          <Box sx={{ display: 'flex', gap: 3 }}>
            <Skeleton variant="rounded" height={56} sx={{ flex: 1 }} />
            <Skeleton variant="rounded" height={56} sx={{ flex: 1 }} />
          </Box>

          {/* Row 3: Subject */}
          <Skeleton variant="rounded" height={56} />

          {/* Row 4: Description */}
          <Skeleton variant="rounded" height={300} />

          {/* Row 5: Video URL */}
          <Skeleton variant="rounded" height={56} />

          {/* Row 6: File Upload */}
          <Box>
            <Skeleton variant="text" width={250} height={28} sx={{ mb: 1 }} />
            <Skeleton variant="text" width="80%" height={20} sx={{ mb: 3 }} />
            <Paper
              variant="outlined"
              sx={{
                p: 4,
                textAlign: 'center',
                borderStyle: 'dashed',
                borderWidth: 2,
                borderColor: 'grey.300',
                borderRadius: 3,
                bgcolor: 'grey.50'
              }}
            >
              <Skeleton variant="circular" width={48} height={48} sx={{ mx: 'auto', mb: 1.5 }} />
              <Skeleton variant="text" width="60%" height={24} sx={{ mx: 'auto', mb: 1 }} />
              <Skeleton variant="text" width="80%" height={20} sx={{ mx: 'auto', mb: 2 }} />
              <Skeleton variant="rounded" width={120} height={40} sx={{ mx: 'auto' }} />
            </Paper>
          </Box>

          {/* Row 7: Submit Button */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, pt: 2 }}>
            <Skeleton variant="rounded" width={100} height={48} />
            <Skeleton variant="rounded" width={140} height={48} />
          </Box>
        </Box>
      </Paper>
    </Container>
  </Box>
);