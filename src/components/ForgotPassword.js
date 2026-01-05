import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, ArrowLeft, Loader2, CheckCircle } from 'lucide-react';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleRequest = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('https://vaccination-coverage-tracker-3.onrender.com/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (response.ok) setSubmitted(true);
      else alert("User not found.");
    } catch (err) {
      alert("Server error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
        {!submitted ? (
          <>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Reset Password</h2>
            <p className="text-slate-500 mb-6 text-sm">Enter your email to receive a link to change your old password.</p>
            <form onSubmit={handleRequest} className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
                <input 
                  type="email" required placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                  value={email} onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <button type="submit" disabled={loading} className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold flex justify-center items-center">
                {loading ? <Loader2 className="animate-spin" /> : 'Send Reset Link'}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center">
            <CheckCircle className="text-green-500 mx-auto mb-4" size={48} />
            <h2 className="text-xl font-bold mb-2">Check your email</h2>
            <p className="text-slate-500 text-sm mb-6">We sent a link to change your password to {email}.</p>
          </div>
        )}
        <Link to="/login" className="mt-6 flex items-center justify-center text-indigo-600 text-sm font-medium hover:underline">
          <ArrowLeft size={16} className="mr-1" /> Back to Login
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;