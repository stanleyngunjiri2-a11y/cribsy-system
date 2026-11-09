// OWNER: Member 1 - Stanley. Fallback route.
import { Link } from 'react-router-dom';
export default function NotFoundPage(){return <section className="container section"><p className="eyebrow">404</p><h1>Page not found</h1><p className="muted">The page may have moved or the address may be incorrect.</p><Link className="button button-primary" to="/">Return home</Link></section>}