import { 
  Box, 
  Paper, 
  Skeleton, 
  Stack, 
  Card, 
  CardContent,
  Container 
} from '@mui/material';

// Skeleton for document cards in listing
export const DocumentCardSkeleton = () => (
  <Card sx={{ mb: 2 }}>
    <CardContent sx={{ p: 4 }}>
      <Box display="flex" alignItems="flex-start" gap={3}>
        <Skeleton variant="circular" width={64} height={64} />
        <Box flexGrow={1}>
          <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
            <Skeleton variant="text" width="60%" height={32} />
            <Skeleton variant="circular" width={24} height={24} />
          </Box>
          <Skeleton variant="text" width="90%" height={20} sx={{ mb: 1 }} />
          <Skeleton variant="text" width="75%" height={20} sx={{ mb: 2 }} />
          
          <Stack direction="row" spacing={1} mb={2}>
            <Skeleton variant="rounded" width={80} height={24} />
            <Skeleton variant="rounded" width={70} height={24} />
            <Skeleton variant="rounded" width={60} height={24} />
          </Stack>
          
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Skeleton variant="text" width={100} height={20} />
            <Skeleton variant="text" width={120} height={20} />
          </Box>
        </Box>
      </Box>
    </CardContent>
  </Card>
);

// Skeleton for document detail header
export const DocumentHeaderSkeleton = () => (
  <Paper sx={{ p: 4, mb: 4 }}>
    <Box display="flex" alignItems="center" gap={1} mb={2}>
      <Skeleton variant="circular" width={16} height={16} />
      <Skeleton variant="text" width={150} height={16} />
    </Box>
    
    <Skeleton variant="text" width="80%" height={48} sx={{ mb: 2 }} />
    <Skeleton variant="text" width="95%" height={24} sx={{ mb: 1 }} />
    <Skeleton variant="text" width="85%" height={24} sx={{ mb: 3 }} />
    
    <Stack direction="row" spacing={2}>
      <Skeleton variant="rounded" width={80} height={32} />
      <Skeleton variant="rounded" width={90} height={32} />
      <Skeleton variant="rounded" width={120} height={32} />
    </Stack>
  </Paper>
);

// Skeleton for video section
export const VideoSkeleton = () => (
  <Paper sx={{ p: 4, mb: 4 }}>
    <Box display="flex" alignItems="center" gap={1} mb={2}>
      <Skeleton variant="circular" width={24} height={24} />
      <Skeleton variant="text" width={150} height={24} />
    </Box>
    <Skeleton 
      variant="rectangular" 
      width="100%" 
      height={300}
      sx={{ borderRadius: 2 }}
    />
  </Paper>
);

// Skeleton for step content
export const StepSkeleton = () => (
  <Box sx={{ mb: 3 }}>
    <Box display="flex" alignItems="center" gap={2} mb={2}>
      <Skeleton variant="circular" width={24} height={24} />
      <Skeleton variant="text" width="40%" height={24} />
    </Box>
    <Box sx={{ ml: 4 }}>
      <Skeleton variant="text" width="95%" height={20} sx={{ mb: 1 }} />
      <Skeleton variant="text" width="88%" height={20} sx={{ mb: 1 }} />
      <Skeleton variant="text" width="70%" height={20} sx={{ mb: 2 }} />
      
      {/* Optional image skeleton */}
      <Skeleton 
        variant="rectangular" 
        width="75%" 
        height={200}
        sx={{ borderRadius: 2, mx: 'auto', mb: 2 }}
      />
      
      {/* Tips skeleton */}
      <Skeleton variant="rounded" width="100%" height={80} />
    </Box>
  </Box>
);

// Skeleton for sidebar
export const SidebarSkeleton = () => (
  <Stack spacing={3}>
    <Card>
      <CardContent>
        <Skeleton variant="text" width="60%" height={24} sx={{ mb: 2 }} />
        <Stack spacing={1}>
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} variant="rounded" width="100%" height={40} />
          ))}
        </Stack>
      </CardContent>
    </Card>
    
    <Card>
      <CardContent>
        <Skeleton variant="text" width="50%" height={24} sx={{ mb: 2 }} />
        <Stack spacing={1}>
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} variant="rounded" width="100%" height={40} />
          ))}
        </Stack>
      </CardContent>
    </Card>
  </Stack>
);

// Complete document detail skeleton
export const DocumentDetailSkeleton = () => (
  <Container maxWidth="lg" sx={{ py: 4 }}>
    {/* Breadcrumbs skeleton */}
    <Box sx={{ mb: 4 }}>
      <Skeleton variant="text" width={200} height={24} />
    </Box>

    <Box display="flex" gap={4}>
      <Box flex={1}>
        <DocumentHeaderSkeleton />
        <VideoSkeleton />
        
        {/* Steps skeleton */}
        <Paper sx={{ p: 4, mb: 4 }}>
          <Skeleton variant="text" width={200} height={32} sx={{ mb: 3 }} />
          {[1, 2, 3, 4].map((i) => (
            <StepSkeleton key={i} />
          ))}
        </Paper>
        
        {/* Feedback skeleton */}
        <Paper sx={{ p: 4 }}>
          <Skeleton variant="text" width={150} height={24} sx={{ mb: 2 }} />
          <Skeleton variant="text" width="80%" height={20} sx={{ mb: 2 }} />
          <Stack direction="row" spacing={2}>
            <Skeleton variant="rounded" width={120} height={36} />
            <Skeleton variant="rounded" width={140} height={36} />
          </Stack>
        </Paper>
      </Box>

      {/* Sidebar skeleton */}
      <Box sx={{ width: 300, flexShrink: 0 }}>
        <SidebarSkeleton />
      </Box>
    </Box>
  </Container>
);

// Listing page skeleton
export const DocumentListingSkeleton = () => (
  <Container maxWidth="lg" sx={{ py: 8 }}>
    {[1, 2, 3, 4, 5].map((i) => (
      <DocumentCardSkeleton key={i} />
    ))}
  </Container>
);