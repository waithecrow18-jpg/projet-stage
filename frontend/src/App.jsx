import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { Suspense, lazy } from 'react'

import { LanguageProvider } from './context/LanguageContext.jsx'
import Navbar from './components/layout/Navbar.jsx'
import Footer from './components/layout/Footer.jsx'

/* ── Imports context and routing ── */
import { AuthProvider, ProtectedRoute } from './context/AuthContext.jsx'

/* ── Lazy-loaded public pages ──────────────────────────── */
const HomePage            = lazy(() => import('./pages/HomePage.jsx'))
const ActualitesPage      = lazy(() => import('./pages/ActualitesPage.jsx'))
const ActualiteDetailPage = lazy(() => import('./pages/ActualiteDetailPage.jsx'))
const ProgrammesPage      = lazy(() => import('./pages/ProgrammesPage.jsx'))
const ProgrammeDetailPage = lazy(() => import('./pages/ProgrammeDetailPage.jsx'))
const PublicationsPage    = lazy(() => import('./pages/PublicationsPage.jsx'))
const ContactPage         = lazy(() => import('./pages/ContactPage.jsx'))
const MinisterePage       = lazy(() => import('./pages/MinisterePage.jsx'))

/* ── Lazy-loaded admin pages ───────────────────────────── */
const AdminLoginPage      = lazy(() => import('./pages/admin/AdminLoginPage.jsx'))
const AdminDashboard      = lazy(() => import('./pages/admin/AdminDashboard.jsx'))
const AdminActualites     = lazy(() => import('./pages/admin/AdminActualites.jsx'))
const AdminActualiteForm  = lazy(() => import('./pages/admin/AdminActualiteForm.jsx'))
const AdminProgrammes     = lazy(() => import('./pages/admin/AdminProgrammes.jsx'))
const AdminPublications   = lazy(() => import('./pages/admin/AdminPublications.jsx'))
const AdminStatistiques   = lazy(() => import('./pages/admin/AdminStatistiques.jsx'))

/* ── Page loader ────────────────────────────────────────── */
function PageLoader() {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: '#1C2B28' }}
    >
      <div className="flex flex-col items-center gap-4">
        <div
          className="w-10 h-10 rounded-full border-4 animate-spin"
          style={{ borderColor: 'rgba(29,158,117,0.2)', borderTopColor: '#1D9E75' }}
        />
        <span className="text-xs tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-body)' }}>
          Chargement…
        </span>
      </div>
    </div>
  )
}

/* ── Layout wrapper (Navbar + main + Footer) ─────────────── */
function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  )
}

/* ── App root ────────────────────────────────────────────── */
export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <AuthProvider>
          <LanguageProvider>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<Layout><HomePage /></Layout>} />
                <Route path="/actualites"        element={<Layout><ActualitesPage /></Layout>} />
                <Route path="/actualites/:slug"  element={<Layout><ActualiteDetailPage /></Layout>} />
                <Route path="/programmes"        element={<Layout><ProgrammesPage /></Layout>} />
                <Route path="/programmes/:slug"  element={<Layout><ProgrammeDetailPage /></Layout>} />
                <Route path="/publications"      element={<Layout><PublicationsPage /></Layout>} />
                <Route path="/contact"           element={<Layout><ContactPage /></Layout>} />
                <Route path="/ministere"         element={<Layout><MinisterePage /></Layout>} />

                {/* Admin Auth Route */}
                <Route path="/admin/login" element={<AdminLoginPage />} />

                {/* Admin Protected Routes */}
                <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
                <Route path="/admin/actualites" element={<ProtectedRoute><AdminActualites /></ProtectedRoute>} />
                <Route path="/admin/actualites/create" element={<ProtectedRoute><AdminActualiteForm /></ProtectedRoute>} />
                <Route path="/admin/actualites/edit/:id" element={<ProtectedRoute><AdminActualiteForm /></ProtectedRoute>} />
                <Route path="/admin/programmes" element={<ProtectedRoute><AdminProgrammes /></ProtectedRoute>} />
                <Route path="/admin/publications" element={<ProtectedRoute><AdminPublications /></ProtectedRoute>} />
                <Route path="/admin/statistiques" element={<ProtectedRoute><AdminStatistiques /></ProtectedRoute>} />

                {/* Redirect old admin base to dashboard */}
                <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
                
                {/* 404 fallback */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
          </LanguageProvider>
        </AuthProvider>
      </BrowserRouter>
    </HelmetProvider>
  )
}
