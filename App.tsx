import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Login } from './pages/public/Login';
import { Register } from './pages/public/Register';
import { Home } from './pages/public/Home';
import { BookingSummary } from './pages/public/BookingSummary';
import { AdminLayout } from './pages/admin/AdminLayout';
import { Dashboard } from './pages/admin/Dashboard';
import { Rooms } from './pages/admin/Rooms';
import { Facilities } from './pages/admin/Facilities';
import { Bookings } from './pages/admin/Bookings';
import { MyBookings } from './pages/guest/MyBookings';
import { ConciergeChat } from './components/ConciergeChat';
import { UserRole } from './types';

const ProtectedRoute: React.FC<{ children: React.ReactNode, requiredRole?: UserRole }> = ({ children, requiredRole }) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) return <div>Loading...</div>;
  
  if (!user) {
    // Redirect to login but save the current location so we can send them back after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  // Allow SUPER_ADMIN to access ADMIN routes
  if (requiredRole === 'ADMIN' && (user.role === 'ADMIN' || user.role === 'SUPER_ADMIN')) {
    return <>{children}</>;
  }

  if (requiredRole && user.role !== requiredRole) return <Navigate to="/" replace />;

  return <>{children}</>;
};

const LayoutWithChat: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <>
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold tracking-tight text-blue-900">HotelEase</Link>
        <div className="flex items-center gap-4">
           <PublicNav />
        </div>
      </div>
    </nav>
    <main>{children}</main>
    <ConciergeChat />
  </>
);

const PublicNav = () => {
    const { user, logout } = useAuth();
    if (user) {
        return (
            <>
             <span className="text-sm text-gray-600 hidden md:block">Hi, {user.name}</span>
             {(user.role === 'ADMIN' || user.role === 'SUPER_ADMIN') && (
               <Link to="/admin" className="text-sm font-medium text-blue-600 hover:underline">Admin Panel</Link>
             )}
             {/* Show My Bookings for everyone so Admins can test the flow too */}
             <Link to="/my-bookings" className="text-sm font-medium text-blue-600 hover:underline">My Bookings</Link>
             <button onClick={logout} className="text-sm font-medium text-gray-600 hover:text-gray-900">Logout</button>
            </>
        )
    }
    return (
      <div className="flex gap-3">
        <Link 
          to="/login" 
          className="text-sm font-medium text-gray-600 hover:text-blue-600 px-3 py-2 transition-colors"
        >
          Login
        </Link>
        <Link 
          to="/register" 
          className="text-sm font-medium bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Sign Up
        </Link>
      </div>
    );
}

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<LayoutWithChat><Home /></LayoutWithChat>} />
          
          <Route path="/book" element={
            <ProtectedRoute>
              <LayoutWithChat>
                <BookingSummary />
              </LayoutWithChat>
            </ProtectedRoute>
          } />

          <Route path="/my-bookings" element={
            <ProtectedRoute> {/* Removed specific GUEST role requirement to allow Admin testing */}
              <LayoutWithChat>
                <MyBookings />
              </LayoutWithChat>
            </ProtectedRoute>
          } />

          {/* Admin Routes */}
          <Route path="/admin" element={
            <ProtectedRoute requiredRole="ADMIN">
              <AdminLayout />
            </ProtectedRoute>
          }>
            <Route index element={<Dashboard />} />
            <Route path="rooms" element={<Rooms />} />
            <Route path="facilities" element={<Facilities />} />
            <Route path="bookings" element={<Bookings />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;