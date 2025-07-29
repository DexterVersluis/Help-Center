import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { Suspense, lazy } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/Layout/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import ScrollToTop from './components/ScrollToTop';
import LoadingSpinner from './components/LoadingSpinner';
import theme from './theme/theme';

// Lazy load components for better performance
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const SupportDocs = lazy(() => import('./pages/SupportDocs'));
const DocDetail = lazy(() => import('./pages/DocDetail'));
const OnboardingDoc = lazy(() => import('./pages/OnboardingDoc'));
const FAQ = lazy(() => import('./pages/FAQ'));

// Lazy load ticket components with preloading hints
const TicketForm = lazy(() => 
  import(/* webpackChunkName: "tickets" */ './pages/TicketForm')
);
const TicketList = lazy(() => 
  import(/* webpackChunkName: "tickets" */ './pages/TicketList')
);
const TicketDetail = lazy(() => 
  import(/* webpackChunkName: "tickets" */ './pages/TicketDetail')
);

// Lazy load feature request components with preloading hints
const FeatureRequests = lazy(() => 
  import(/* webpackChunkName: "features" */ './pages/FeatureRequests')
);
const FeatureRequestForm = lazy(() => 
  import(/* webpackChunkName: "features" */ './pages/FeatureRequestForm')
);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <ScrollToTop />
        <AuthProvider>
          <Suspense fallback={<LoadingSpinner message="Loading application..." />}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/*" element={
                <Layout>
                  <Suspense fallback={<LoadingSpinner message="Loading page..." />}>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/docs" element={<SupportDocs />} />
                      <Route path="/docs/getting-started" element={<DocDetail />} />
                      <Route path="/docs/:id" element={<DocDetail />} />
                      <Route path="/docs/onboarding-platform-demo-enboq" element={<OnboardingDoc />} />
                      <Route path="/faq" element={<FAQ />} />
                      <Route path="/tickets" element={
                        <ProtectedRoute>
                          <TicketList />
                        </ProtectedRoute>
                      } />
                      <Route path="/tickets/new" element={
                        <ProtectedRoute>
                          <TicketForm />
                        </ProtectedRoute>
                      } />
                      <Route path="/tickets/:id" element={
                        <ProtectedRoute>
                          <TicketDetail />
                        </ProtectedRoute>
                      } />
                      <Route path="/features" element={<FeatureRequests />} />
                      <Route path="/features/new" element={
                        <ProtectedRoute>
                          <FeatureRequestForm />
                        </ProtectedRoute>
                      } />
                    </Routes>
                  </Suspense>
                </Layout>
              } />
            </Routes>
          </Suspense>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
