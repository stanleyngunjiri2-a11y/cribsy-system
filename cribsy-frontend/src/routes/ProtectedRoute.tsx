// OWNER: Member 1 - Stanley. Frontend-only route placeholder; NOT real authorization.
import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
export default function ProtectedRoute({ children }: { children: ReactNode; role?: 'tenant'|'landlord'|'admin' }) {
  // TODO Week 2: read authenticated session and role from the backend. Never rely on this for security.
  const frontendDemoAuthenticated = false;
  return frontendDemoAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
}