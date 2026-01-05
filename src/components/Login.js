import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { EyeOff, Eye, AlertCircle, Loader2 } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  
  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // UI State
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Toggle for password visibility

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
        localStorage.setItem('userToken', data.token);
        localStorage.setItem('userData', JSON.stringify(data.user));
        navigate('/dashboard');
      } else {
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
      {/* Branding Header */}
      <div className="flex items-center mb-8">
        <div className="bg-indigo-600 p-2 rounded-lg mr-2">
          <div className="text-white font-bold text-xl">V</div>
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

          {/* Password Input with Visibility Toggle */}
          <div className="relative">
            <input 
              type={showPassword ? "text" : "password"} 
              required 
              placeholder="Enter your password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3.5 text-gray-400 hover:text-indigo-600 transition-colors"
            >
              {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>


{/* --- Change this in your Login.js --- */}
<div className="flex items-center justify-between text-sm">
  <label className="flex items-center text-gray-600">
    <input type="checkbox" className="mr-2 rounded border-gray-300" />
    Remember me
  </label>
  
  {/* USE THIS LINK TAG: It fixes the "clearing data" issue */}
  <Link 
    to="/forgot-password" 
    className="text-indigo-600 font-medium hover:underline"
  >
    Forgot password?
  </Link>
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
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-200"></span>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-gray-400 font-medium">or sign in with</span>
          </div>
        </div>

        <div className="flex justify-center">
          <button 
            type="button"
            onClick={() => window.open('https://accounts.google.com', '_blank')}
            className="flex items-center justify-center gap-2 px-8 py-2.5 bg-[#f1f5f9] hover:bg-[#e2e8f0] rounded-lg text-gray-700 text-sm font-medium transition w-full"
          >
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-4 h-4" alt="Google" /> 
            Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;