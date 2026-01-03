import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { EyeOff, AlertCircle, Loader2 } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  
  // State for form inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // State for API handling
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('https://vaccination-coverage-tracker-3.onrender.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // 1. Save the real token and user info returned by your backend
        localStorage.setItem('userToken', data.token);
        localStorage.setItem('userData', JSON.stringify(data.user));
        
        // 2. Navigate to dashboard
        navigate('/dashboard');
      } else {
        // Handle error messages from backend (e.g., "Invalid credentials")
        setError(data.message || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      setError('Server error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="flex items-center mb-8">
        <div className="bg-indigo-600 p-2 rounded-lg mr-2">
          <div className="text-white font-bold text-xl">S</div>
        </div>
        <span className="text-2xl font-bold text-slate-800 tracking-tight">VCT Tracker</span>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
        <div className="flex justify-between items-baseline mb-6">
          <h2 className="text-2xl font-bold text-slate-800">Sign in</h2>
          <Link to="/register" className="text-sm text-indigo-600 font-medium hover:underline">
            or Create an account
          </Link>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg flex items-center">
            <AlertCircle size={18} className="mr-2" />
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <input 
              type="email" 
              required 
              placeholder="Enter your email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            />
          </div>
          <div className="relative">
            <input 
              type="password" 
              required 
              placeholder="Enter your password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            />
            <EyeOff className="absolute right-3 top-3.5 text-gray-400 w-5 h-5 cursor-pointer" />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center text-gray-600">
              <input type="checkbox" className="mr-2 rounded border-gray-300" />
              Remember me
            </label>
            <button type="button" className="text-indigo-600 font-medium hover:underline">Forgot password?</button>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition-all shadow-lg shadow-indigo-200 flex justify-center items-center"
          >
            {loading ? <Loader2 className="animate-spin mr-2" size={20} /> : 'Sign in'}
          </button>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-gray-200"></span></div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-gray-400 font-medium">or sign in with</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button 
            type="button"
            onClick={() => window.open('https://accounts.google.com', '_blank')}
            className="flex items-center justify-center py-2.5 border border-red-100 rounded-lg hover:bg-red-50 text-sm font-medium transition-colors"
          >
            <span className="text-red-500 mr-2 font-bold text-lg">G</span> Google
          </button>
          <button className="flex items-center justify-center py-2.5 border border-blue-100 rounded-lg hover:bg-blue-50 text-sm font-medium transition-colors">
            <span className="text-blue-600 mr-2 font-bold text-lg">f</span> Facebook
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;