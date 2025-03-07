import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, ArrowRight, Mail, Lock, AlertCircle } from 'lucide-react';
import TenXSection from '../../srcOld/firstDeploy/TenXSection';

function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch(
        "http://13.201.170.14:5009/users/verify-user",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const data = await response.json();
      localStorage.setItem("userId", data.user._id);
      console.log('Login successful:', data);
      onLoginSuccess();
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Left Section - Login Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-16">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold mb-2">
              <span className="text-black">xto</span>
              <span className="text-red-500">10x</span>
            </h1>
            <p className="text-gray-600">Hackathon Feb 2025</p>
          </div>
          
          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-md flex items-start">
              <AlertCircle className="mr-2 flex-shrink-0 mt-0.5" size={18} />
              <p>{error}</p>
            </div>
          )}
          
          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-150 ease-in-out disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Logging in...
                  </>
                ) : (
                  <>
                    Login <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </button>
            </div>
          </form>
          
          {/* Additional Links */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <a href="#" className="font-medium text-red-500 hover:text-red-600 transition">
                Register now
              </a>
            </p>
          </div>
        </div>
      </div>
      
      {/* Right Section - Banner */}
      <div className="hidden md:block md:w-1/2 bg-gradient-to-r from-red-500 to-red-700 p-12 flex flex-col justify-center">
        <div className="max-w-lg mx-auto text-white">
          <h2 className="text-3xl font-bold mb-6">Welcome to the xto10x Hackathon</h2>
          <p className="text-xl mb-8">Join the most exciting coding competition of 2025 and showcase your skills!</p>
          
          {/* Countdown Timer */}
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg mb-8">
            <div className="flex items-center mb-4">
              <Clock className="mr-2" size={20} />
              <h3 className="font-semibold text-lg">Event Countdown</h3>
            </div>
            <div className="flex justify-between">
              <div className="text-center">
                <div className="text-2xl font-mono bg-white/10 rounded-md px-4 py-2">28</div>
                <div className="text-xs mt-1">DAYS</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-mono bg-white/10 rounded-md px-4 py-2">14</div>
                <div className="text-xs mt-1">HOURS</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-mono bg-white/10 rounded-md px-4 py-2">36</div>
                <div className="text-xs mt-1">MINUTES</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-mono bg-white/10 rounded-md px-4 py-2">42</div>
                <div className="text-xs mt-1">SECONDS</div>
              </div>
            </div>
          </div>
          
          {/* Prizes */}
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-yellow-400 text-yellow-800 flex items-center justify-center font-bold mr-4">1</div>
              <div>
                <p className="font-semibold">First Prize</p>
                <p className="text-xl font-bold">$5,000</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gray-300 text-gray-800 flex items-center justify-center font-bold mr-4">2</div>
              <div>
                <p className="font-semibold">Second Prize</p>
                <p className="text-xl font-bold">$3,000</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-amber-600 text-amber-900 flex items-center justify-center font-bold mr-4">3</div>
              <div>
                <p className="font-semibold">Third Prize</p>
                <p className="text-xl font-bold">$2,000</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* TenXSection component */}
      <TenXSection />
    </div>
  );
}

export default Login;
