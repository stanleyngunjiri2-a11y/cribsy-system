import { Routes, Route } from 'react-router-dom'

function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50">
      <h1 className="text-4xl font-semibold text-slate-900">
        Cribsy
      </h1>
    </main>
  )
}

function NotFoundPage() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <h1 className="text-2xl font-semibold">404 - Page not found</h1>
    </main>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
