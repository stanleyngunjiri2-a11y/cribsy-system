import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ allowedRoles }) {
  const { user, loading, isAuthenticated } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    const roleRoutes = {
      tenant: '/tenant',
      landlord: '/landlord',
      admin: '/admin',
      superadmin: '/admin',
    };

    return <Navigate to={roleRoutes[user?.role] || '/login'} replace />;
  }

  return <Outlet />;
}
