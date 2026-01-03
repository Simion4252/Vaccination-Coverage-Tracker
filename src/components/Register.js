// import React from 'react';
// import { Link } from 'react-router-dom';

// const Register = () => {
//   return (
//     <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
//       <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
//         <h2 className="text-2xl font-bold text-slate-800 mb-6">Create account</h2>
        
//         <form className="space-y-4">
//           <input type="text" placeholder="Full Name" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all" />
//           <input type="email" placeholder="Email Address" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all" />
//           <input type="password" placeholder="Password" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all" />
          
//           <div className="pt-2">
//             <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition-colors shadow-lg">
//               Sign up
//             </button>
//           </div>
//         </form>

//         <p className="mt-6 text-center text-sm text-gray-600">
//             Already have an account? 
//             <Link to="/login" className="text-indigo-600 font-medium hover:underline ml-1">
//                 Sign in
//             </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Register;



import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AlertCircle, Loader2 } from 'lucide-react';

const Register = () => {
  const navigate = useNavigate();

  // State for form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // State for status handling
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('https://vaccination-coverage-tracker-3.onrender.com/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Registration successful
        // Usually, you might want to auto-login or redirect to Login page
        alert('Account created successfully! Please sign in.');
        navigate('/login');
      } else {
        // Handle backend errors like "Email already exists"
        setError(data.message || 'Registration failed.');
      }
    } catch (err) {
      setError('Connection failed. Please check your internet or try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Create account</h2>
        <p className="text-slate-500 text-sm mb-6">Join the VCT Tracker system</p>

        {/* Error Notification */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg flex items-center">
            <AlertCircle size={18} className="mr-2" />
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            required
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
          />
          <input
            type="email"
            required
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
          />
          <input
            type="password"
            required
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
          />

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition-all shadow-lg flex justify-center items-center disabled:bg-indigo-400"
            >
              {loading ? <Loader2 className="animate-spin mr-2" size={20} /> : 'Sign up'}
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?
          <Link to="/login" className="text-indigo-600 font-medium hover:underline ml-1">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;




