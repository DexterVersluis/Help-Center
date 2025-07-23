import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import SupportDocs from './pages/SupportDocs';
import DocDetail from './pages/DocDetail';
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
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/docs" element={<SupportDocs />} />
          <Route path="/docs/:id" element={<DocDetail />} />
          <Route path="/tickets" element={<TicketList />} />
          <Route path="/tickets/new" element={<TicketForm />} />
          <Route path="/tickets/:id" element={<TicketDetail />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/features" element={<FeatureRequests />} />
          <Route path="/features/new" element={<FeatureRequestForm />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
