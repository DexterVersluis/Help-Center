import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/Layout/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import SupportDocs from './pages/SupportDocs';
import DocDetail from './pages/DocDetail';
import OnboardingDoc from './pages/OnboardingDoc';
import TicketForm from './pages/TicketForm';
import TicketList from './pages/TicketList';
import TicketDetail from './pages/TicketDetail';
import FAQ from './pages/FAQ';
import FeatureRequests from './pages/FeatureRequests';
import FeatureRequestForm from './pages/FeatureRequestForm';
import './styles/globals.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={
            <Layout>
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
            </Layout>
          } />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
