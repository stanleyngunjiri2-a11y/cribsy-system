import { Routes, Route, Navigate, Link } from 'react-router-dom'

import HomePage from './features/home/HomePage'

import LoginPage from './features/auth/LoginPage'
import RegisterPage from './features/auth/RegisterPage'
import ForgotPasswordPage from './features/auth/ForgotPasswordPage'
import ResetPasswordPage from './features/auth/ResetPasswordPage'
import TwoStepVerificationPage from './features/auth/TwoStepVerificationPage'

import TenantLayout from './features/tenant/tenantLayout'
import TenantDashboardPage from './features/tenant/tenantDashboardPage'
import TenantApplicationsPage from './features/tenant/TenantApplicationsPage'
import RentHistoryPage from './features/tenant/rentHistoryPage'
import PaymentDetailsPage from './features/tenant/paymentDetailsPage'
import TenantProfilePage from './features/tenant/tenantProfilePage'
import TenantMaintenancePage from './features/tenant/tenantMaintenancePage'

import PropertiesPage from './features/properties/PropertiesPage'
import PropertyDetailsPage from './features/properties/PropertyDetailsPage'

import LandlordLayout from './features/landlord/LandlordLayout'
import LandlordDashboardPage from './features/landlord/LandlordDashboardPage'
import MyPropertiesPage from './features/landlord/MyPropertiesPage'
import AddPropertyPage from './features/landlord/AddPropertyPage'
import EditPropertyPage from './features/landlord/EditPropertyPage'
import LandlordTenantsPage from './features/landlord/LandlordTenantsPage'
import LandlordApplicationsPage from './features/landlord/LandlordApplicationsPage'
import PropertyUnitsPage from './features/landlord/PropertyUnitsPage'
import LandlordMaintenancePage from './features/maintenance/LandlordMaintenancePage'

import AdminLayout from './features/admin/AdminLayout'
import AdminDashboardPage from './features/admin/AdminDashboardPage'
import AdminUsersPage from './features/admin/AdminUsersPage'
import AdminPropertiesPage from './features/admin/AdminPropertiesPage'

import NewMaintenanceRequestPage from './features/maintenance/NewMaintenanceRequestPage'
import ProtectedRoute from './routes/ProtectedRoute'

function NotFoundPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-page px-5 text-center">
      <p className="text-sm font-bold uppercase tracking-widest text-brand-800">404 ERROR</p>
      <h1 className="mt-4 text-4xl font-bold text-ink">Page not found</h1>
      <p className="mt-3 text-sm text-muted">The page you are looking for does not exist.</p>
      <Link to="/" className="btn btn-primary mt-7">Return home</Link>
    </main>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route path="/properties" element={<PropertiesPage />} />
      <Route path="/properties/:id" element={<PropertyDetailsPage />} />

      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="/verify" element={<TwoStepVerificationPage />} />

      <Route element={<ProtectedRoute allowedRoles={['landlord']} />}>
        <Route path="/landlord" element={<LandlordLayout />}>
          <Route index element={<LandlordDashboardPage />} />
          <Route path="properties" element={<MyPropertiesPage />} />
          <Route path="properties/new" element={<AddPropertyPage />} />
          <Route path="properties/:id/edit" element={<EditPropertyPage />} />
          <Route path="tenants" element={<LandlordTenantsPage />} />
          <Route path="applications" element={<LandlordApplicationsPage />} />
          <Route path="properties/:id/units" element={<PropertyUnitsPage />} />
          <Route path="maintenance" element={<LandlordMaintenancePage />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute allowedRoles={['tenant']} />}>
        <Route path="/tenant" element={<TenantLayout />}>
          <Route index element={<TenantDashboardPage />} />
          <Route path="applications" element={<TenantApplicationsPage />} />
          <Route path="rent-history" element={<RentHistoryPage />} />
          <Route path="rent-history/:id" element={<PaymentDetailsPage />} />
          <Route path="maintenance" element={<TenantMaintenancePage />} />
          <Route path="maintenance/new" element={<NewMaintenanceRequestPage />} />
          <Route path="profile" element={<TenantProfilePage />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute allowedRoles={['admin', 'superadmin']} />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboardPage />} />
          <Route path="users" element={<AdminUsersPage />} />
          <Route path="properties" element={<AdminPropertiesPage />} />
        </Route>
      </Route>

      <Route path="/dashboard" element={<Navigate to="/tenant" replace />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
