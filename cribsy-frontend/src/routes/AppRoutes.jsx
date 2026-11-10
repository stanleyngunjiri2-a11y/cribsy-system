// OWNER: Member 1 - every route is registered here. Ask the owner to add or change routes.
import { Routes, Route } from 'react-router-dom'
import PublicLayout from '../layouts/PublicLayout'
import LandlordLayout from '../features/landlord/LandlordLayout'
import TenantLayout from '../features/tenant/TenantLayout'
import AdminLayout from '../features/admin/AdminLayout'
import NotFoundPage from '../components/shared/NotFoundPage'
import HomePage from '../features/home/HomePage'
import PropertiesPage from '../features/properties/PropertiesPage'
import PropertyDetailsPage from '../features/properties/PropertyDetailsPage'
import LoginPage from '../features/auth/LoginPage'
import RegisterPage from '../features/auth/RegisterPage'
import ForgotPasswordPage from '../features/auth/ForgotPasswordPage'
import ResetPasswordPage from '../features/auth/ResetPasswordPage'
import TwoStepVerificationPage from '../features/auth/TwoStepVerificationPage'
import LandlordDashboardPage from '../features/landlord/LandlordDashboardPage'
import MyPropertiesPage from '../features/landlord/MyPropertiesPage'
import AddPropertyPage from '../features/landlord/AddPropertyPage'
import EditPropertyPage from '../features/landlord/EditPropertyPage'
import LandlordTenantsPage from '../features/landlord/LandlordTenantsPage'
import TenantDashboardPage from '../features/tenant/TenantDashboardPage'
import RentHistoryPage from '../features/tenant/RentHistoryPage'
import PaymentDetailsPage from '../features/tenant/PaymentDetailsPage'
import TenantProfilePage from '../features/tenant/TenantProfilePage'
import TenantMaintenancePage from '../features/maintenance/TenantMaintenancePage'
import NewMaintenanceRequestPage from '../features/maintenance/NewMaintenanceRequestPage'
import LandlordMaintenancePage from '../features/maintenance/LandlordMaintenancePage'
import AdminDashboardPage from '../features/admin/AdminDashboardPage'
import AdminUsersPage from '../features/admin/AdminUsersPage'
import AdminPropertiesPage from '../features/admin/AdminPropertiesPage'

function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/properties" element={<PropertiesPage />} />
        <Route path="/properties/:id" element={<PropertyDetailsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/verify" element={<TwoStepVerificationPage />} />
      </Route>

      <Route path="/landlord" element={<LandlordLayout />}>
        <Route index element={<LandlordDashboardPage />} />
        <Route path="properties" element={<MyPropertiesPage />} />
        <Route path="properties/new" element={<AddPropertyPage />} />
        <Route path="properties/:id/edit" element={<EditPropertyPage />} />
        <Route path="tenants" element={<LandlordTenantsPage />} />
        <Route path="maintenance" element={<LandlordMaintenancePage />} />
      </Route>

      <Route path="/tenant" element={<TenantLayout />}>
        <Route index element={<TenantDashboardPage />} />
        <Route path="rent-history" element={<RentHistoryPage />} />
        <Route path="rent-history/:id" element={<PaymentDetailsPage />} />
        <Route path="profile" element={<TenantProfilePage />} />
        <Route path="maintenance" element={<TenantMaintenancePage />} />
        <Route path="maintenance/new" element={<NewMaintenanceRequestPage />} />
      </Route>

      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboardPage />} />
        <Route path="users" element={<AdminUsersPage />} />
        <Route path="properties" element={<AdminPropertiesPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default AppRoutes
