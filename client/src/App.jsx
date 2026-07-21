import { BrowserRouter, Link, Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';

const Home = () => (
  <div className="home-page">
    <div className="hero card">
      <h1>Shorten URLs. Track Clicks.</h1>
      <p>
        Create custom short links, manage them from your dashboard, and see how
        many times each link was visited.
      </p>
      <div className="hero-actions">
        <Link to="/signup" className="btn btn-primary">
          Get Started
        </Link>
        <Link to="/login" className="btn btn-outline">
          Login
        </Link>
      </div>
    </div>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
