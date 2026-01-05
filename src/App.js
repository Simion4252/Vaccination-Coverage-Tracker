// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Login from './components/Login';
// import Register from './components/Register'; // You can use the Login template to build this
// import Dashboard from './components/Dashboard';
// import ProtectedRoute from './components/ProtectedRoute';
// import GeographicView from './components/GeographicView'; // Import the new file
// import Demographics from './components/Demographics'; // Import the new file
// import Reports from './components/Reports';

// import ForgotPassword from './components/ForgotPassword';
// import ResetPassword from './components/ResetPassword';




// function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* Public Routes */}
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />

//         {/* Protected Dashboard */}
//         <Route 
//           path="/dashboard" 
//           element={
//             <ProtectedRoute>
//               <Dashboard />
//             </ProtectedRoute>
//           } 
//         />

//         {/* Redirects */}
//         <Route path="/" element={<Navigate to="/login" replace />} />
//         <Route path="*" element={<Navigate to="/dashboard" replace />} />
//         <Route  
//           path="/map" 
//           element={
//             <ProtectedRoute>
//               <GeographicView />
//             </ProtectedRoute>
//           } 
//         />

//         <Route 
//           path="/demographics" 
//           element={
//           <ProtectedRoute>
//             <Demographics />
//           </ProtectedRoute>
//           } 
//         />


//         <Route 
//           path="/reports" 
//           element={
//             <ProtectedRoute>
//               <Reports />
//             </ProtectedRoute>
//           } 
//         />

//       </Routes>

//       <Routes>
//   <Route path="/forgot-password" element={<ForgotPassword />} />
// <Route path="/reset-password/:token" element={<ResetPassword />} />
// </Routes>


//     </Router>

    

//   );
// }

// export default App;


import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import GeographicView from './components/GeographicView';
import Demographics from './components/Demographics';
import Reports from './components/Reports';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';

function App() {
  return (
    <Router>
      <Routes>
        {/* --- Public Routes --- */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Password Recovery Routes (Public) */}
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* --- Protected Routes --- */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />

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

        {/* --- Navigation & Redirects --- */}
        {/* If the user hits the root, send them to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* Catch-all: Send unknown routes to dashboard (Protected) */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
}

export default App;