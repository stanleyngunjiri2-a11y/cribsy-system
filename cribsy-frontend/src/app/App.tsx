// OWNER: Member 1 - Stanley. Root application shell.
import AppRoutes from '../routes/AppRoutes';
import Navbar from '../components/shared/Navbar';
import Footer from '../components/shared/Footer';
export default function App() { return <><Navbar /><main className="min-h-[70vh]"><AppRoutes /></main><Footer /></>; }