import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Button } from '../../components/Button';
import { UserRole } from '../../types';
import { Lock, Mail, ArrowLeft } from 'lucide-react';

export const Login: React.FC = () => {
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation(); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('GUEST');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Admin/Super Admin Logic - Strict Password Check
    if (role === 'ADMIN' || role === 'SUPER_ADMIN') {
      if (password !== 'admin123') {
        showToast('error', 'Invalid credentials. Hint: use "admin123"');
        return;
      }
    } 
    // Guest Logic - Flexible Password for Mock App
    else if (role === 'GUEST') {
      if (password.length < 6) {
        showToast('error', 'Password must be at least 6 characters.');
        return;
      }
    }

    login(email, role);
    showToast('success', `Welcome back, ${email.split('@')[0]}!`);
    
    // Smart Redirect:
    const state = location.state as { from?: { pathname: string, search?: string } } | null;
    const from = state?.from?.pathname 
      ? state.from.pathname + (state.from.search || '')
      : (role === 'ADMIN' || role === 'SUPER_ADMIN' ? '/admin' : '/');
    
    navigate(from, { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 relative">
       {/* Background Decoration */}
       <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-emerald-100/40 rounded-full blur-3xl"></div>
          <div className="absolute top-[60%] -right-[10%] w-[40%] h-[60%] bg-emerald-50/60 rounded-full blur-3xl"></div>
       </div>

      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full animate-fade-in border border-gray-100 relative z-10">
        
        {/* Back Button */}
        <Link 
          to="/" 
          className="absolute top-6 left-6 p-2 rounded-full text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 transition-all duration-300"
          title="Back to Home"
        >
          <ArrowLeft size={20} />
        </Link>

        <div className="text-center mb-8 mt-2">
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Welcome Back</h1>
          <p className="text-gray-500 mt-2 text-sm">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <div className="relative group">
              <Mail className="absolute left-3 top-3.5 text-gray-400 group-focus-within:text-emerald-500 transition-colors" size={18} />
              <input
                type="email"
                required
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <div className="relative group">
              <Lock className="absolute left-3 top-3.5 text-gray-400 group-focus-within:text-emerald-500 transition-colors" size={18} />
              <input
                type="password"
                required
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
             <label className="block text-sm font-medium text-gray-700 mb-2">I am a...</label>
             <div className="grid grid-cols-3 gap-2">
               <button
                 type="button"
                 onClick={() => { setRole('GUEST'); }}
                 className={`py-3 rounded-lg border font-medium transition-all text-sm ${
                   role === 'GUEST' 
                   ? 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-600/20' 
                   : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
                 }`}
               >
                 Guest
               </button>
               <button
                 type="button"
                 onClick={() => setRole('ADMIN')}
                 className={`py-3 rounded-lg border font-medium transition-all text-sm ${
                   role === 'ADMIN' 
                   ? 'bg-slate-900 text-white border-slate-900 shadow-md shadow-slate-900/20' 
                   : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
                 }`}
               >
                 Admin
               </button>
               <button
                 type="button"
                 onClick={() => setRole('SUPER_ADMIN')}
                 className={`py-3 rounded-lg border font-medium transition-all text-sm ${
                   role === 'SUPER_ADMIN' 
                   ? 'bg-purple-900 text-white border-purple-900 shadow-md shadow-purple-900/20' 
                   : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
                 }`}
               >
                 Super Admin
               </button>
             </div>
          </div>

          <Button type="submit" className="w-full py-3" size="lg">
            Sign In
          </Button>

          <div className="text-center mt-4">
             <p className="text-sm text-gray-600 mb-2">
               Don't have an account?{' '}
               <Link to="/register" className="text-emerald-600 font-medium hover:underline">
                 Sign up
               </Link>
             </p>
             {(role === 'ADMIN' || role === 'SUPER_ADMIN') && (
               <p className="text-xs text-gray-400 mt-2">
                 Hint: The mock admin password is 'admin123'
               </p>
             )}
          </div>
        </form>
      </div>
    </div>
  );
};
