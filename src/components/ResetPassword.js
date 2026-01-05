import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Lock, Eye, EyeOff, Loader2 } from 'lucide-react';

const ResetPassword = () => {
  const { token } = useParams(); // This token validates the reset request
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`https://vaccination-coverage-tracker-3.onrender.com/auth/reset-password/${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (response.ok) {
        alert("Password updated! Now, please log in with your NEW password.");
        navigate('/login'); // Redirect to login, not the dashboard
      } else {
        alert("Link expired or invalid.");
      }
    } catch (err) {
      alert("Error resetting password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">Change Password</h2>
        <form onSubmit={handleUpdate} className="space-y-4">
          <div className="relative">
            <Lock className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
            <input 
              type={showPassword ? "text" : "password"} 
              required placeholder="Enter NEW password"
              className="w-full pl-10 pr-12 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
              value={password} onChange={(e) => setPassword(e.target.value)}
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3.5 text-gray-400">
              {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>
          <button type="submit" disabled={loading} className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold flex justify-center items-center">
            {loading ? <Loader2 className="animate-spin" /> : 'Update and Go to Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;