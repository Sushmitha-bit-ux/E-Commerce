import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Lock, Mail, Eye, EyeOff, ArrowRight, ShoppingBag, ShieldCheck, Sparkles, UserCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const { login, demoLogin, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectPath = location.state?.from || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(email, password);
    if (result.success) {
      navigate(redirectPath);
    }
  };

  const handleQuickDemo = async (role) => {
    const result = await demoLogin(role);
    if (result.success) {
      navigate(redirectPath);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/80 shadow-card-hover">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-brand-600 text-white flex items-center justify-center mx-auto shadow-md">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Welcome Back to NOVA LUXE
          </h1>
          <p className="text-xs text-slate-500">
            Sign in to access your order history, tracked packages, and saved cart.
          </p>
        </div>

        {/* Quick Demo Login Switcher */}
        <div className="p-3.5 rounded-2xl bg-brand-50/60 border border-brand-100 space-y-2">
          <p className="text-[11px] font-bold uppercase tracking-wider text-brand-700 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Instant Demo Sign-In (1 Click)</span>
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickDemo('CUSTOMER')}
              className="py-2 px-3 rounded-xl bg-white hover:bg-brand-50 border border-brand-200 text-slate-800 hover:text-brand-700 text-xs font-bold transition flex items-center justify-center gap-1 shadow-2xs"
            >
              <UserCheck className="w-3.5 h-3.5 text-brand-600" />
              <span>Customer Demo</span>
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemo('ADMIN')}
              className="py-2 px-3 rounded-xl bg-white hover:bg-purple-50 border border-purple-200 text-slate-800 hover:text-purple-700 text-xs font-bold transition flex items-center justify-center gap-1 shadow-2xs"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
              <span>Admin Demo</span>
            </button>
          </div>
        </div>

        {/* Main Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-[11px] font-bold text-slate-600 uppercase block mb-1">Email Address</label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                required
                className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-500"
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-[11px] font-bold text-slate-600 uppercase">Password</label>
              <Link to="/forgot-password" className="text-[11px] font-bold text-brand-600 hover:underline">
                Forgot Password?
              </Link>
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-brand-500"
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-600">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded text-brand-600 accent-brand-600 w-4 h-4"
              />
              <span>Remember this device</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-slate-900 hover:bg-brand-600 text-white font-extrabold text-sm py-3.5 rounded-2xl shadow-md transition flex items-center justify-center gap-2"
          >
            <span>{loading ? 'Authenticating...' : 'Sign In'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Footer link to register */}
        <div className="text-center pt-2 border-t border-slate-100 text-xs text-slate-500">
          <span>Don't have an account yet? </span>
          <Link to="/register" className="font-bold text-brand-600 hover:underline">
            Create an Account
          </Link>
        </div>
      </div>
    </div>
  );
};
