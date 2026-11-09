// OWNER: Member 1 - Stanley. Central route registration.
import { Routes, Route } from 'react-router-dom';
import HomePage from '../features/home/HomePage';
import PropertiesPage from '../features/properties/PropertiesPage';
import PropertyDetailsPage from '../features/properties/PropertyDetailsPage';
import LoginPage from '../features/auth/LoginPage';
import RegisterPage from '../features/auth/RegisterPage';
import ForgotPasswordPage from '../features/auth/ForgotPasswordPage';
import ResetPasswordPage from '../features/auth/ResetPasswordPage';
import TwoStepVerificationPage from '../features/auth/TwoStepVerificationPage';
import LandlordDashboardPage from '../features/landlord/LandlordDashboardPage';
import LandlordPropertiesPage from '../features/landlord/LandlordPropertiesPage';
import LandlordTenantsPage from '../features/landlord/LandlordTenantsPage';
import TenantDashboardPage from '../features/tenant/TenantDashboardPage';
import RentHistoryPage from '../features/tenant/RentHistoryPage';
import TenantProfilePage from '../features/tenant/TenantProfilePage';
import MaintenancePage from '../features/maintenance/MaintenancePage';
import MaintenanceRequestsPage from '../features/maintenance/MaintenanceRequestsPage';
import AdminDashboardPage from '../features/admin/AdminDashboardPage';
import AdminUsersPage from '../features/admin/AdminUsersPage';
import NotFoundPage from '../components/shared/NotFoundPage';
import ProtectedRoute from './ProtectedRoute';
export default function AppRoutes() { return <Routes>
<Route path="/" element={<HomePage/>}/><Route path="/properties" element={<PropertiesPage/>}/><Route path="/properties/:id" element={<PropertyDetailsPage/>}/>
<Route path="/login" element={<LoginPage/>}/><Route path="/register" element={<RegisterPage/>}/><Route path="/forgot-password" element={<ForgotPasswordPage/>}/><Route path="/reset-password" element={<ResetPasswordPage/>}/><Route path="/verify" element={<TwoStepVerificationPage/>}/>
<Route path="/landlord" element={<ProtectedRoute role="landlord"><LandlordDashboardPage/></ProtectedRoute>}/><Route path="/landlord/properties" element={<ProtectedRoute role="landlord"><LandlordPropertiesPage/></ProtectedRoute>}/><Route path="/landlord/tenants" element={<ProtectedRoute role="landlord"><LandlordTenantsPage/></ProtectedRoute>}/>
<Route path="/tenant" element={<ProtectedRoute role="tenant"><TenantDashboardPage/></ProtectedRoute>}/><Route path="/tenant/rent-history" element={<ProtectedRoute role="tenant"><RentHistoryPage/></ProtectedRoute>}/><Route path="/tenant/profile" element={<ProtectedRoute role="tenant"><TenantProfilePage/></ProtectedRoute>}/>
<Route path="/maintenance" element={<ProtectedRoute><MaintenancePage/></ProtectedRoute>}/><Route path="/maintenance/requests" element={<ProtectedRoute><MaintenanceRequestsPage/></ProtectedRoute>}/><Route path="/admin" element={<ProtectedRoute role="admin"><AdminDashboardPage/></ProtectedRoute>}/><Route path="/admin/users" element={<ProtectedRoute role="admin"><AdminUsersPage/></ProtectedRoute>}/><Route path="*" element={<NotFoundPage/>}/></Routes>; }