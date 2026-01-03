import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register'; // You can use the Login template to build this
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import GeographicView from './components/GeographicView'; // Import the new file
import Demographics from './components/Demographics'; // Import the new file
import Reports from './components/Reports';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Dashboard */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />

        {/* Redirects */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
        <Route  
          path="/map" 
          element={
            <ProtectedRoute>
              <GeographicView />
            </ProtectedRoute>
          } 
        />

        <Route 
          path="/demographics" 
          element={
          <ProtectedRoute>
            <Demographics />
          </ProtectedRoute>
          } 
        />

        <Route 
          path="/reports" 
          element={
            <ProtectedRoute>
              <Reports />
            </ProtectedRoute>
          } 
        />

      </Routes>
    </Router>
  );
}

export default App;