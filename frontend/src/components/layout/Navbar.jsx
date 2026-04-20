/**
 * Navbar.jsx — Barre de navigation principale
 * ─────────────────────────────────────────────
 * Sticky, glassmorphism, hauteur réduite au scroll,
 * active-link avec Framer Motion layoutId, menu mobile plein-écran.
 */

import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Leaf, Menu, X, Globe } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext.jsx'

/* ── Data ─────────────────────────────────────────────────── */
const NAV_LINKS = [
  { label: 'Accueil',        labelAr: 'الرئيسية',      href: '/' },
  { label: 'Ministère',      labelAr: 'الوزارة',        href: '/ministere' },
  { label: 'Stratégies',     labelAr: 'الاستراتيجيات', href: '/programmes' },
  { label: 'Réglementation', labelAr: 'التشريعات',     href: '/reglementation' },
  { label: 'Actualités',     labelAr: 'الأخبار',        href: '/actualites' },
  { label: 'Contact',        labelAr: 'اتصل بنا',       href: '/contact' },
]

/* ── Mobile menu variants ─────────────────────────────────── */
const menuVariants = {
  closed: { opacity: 0, x: '100%', transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
  open:   { opacity: 1, x: '0%',   transition: { duration: 0.4,  ease: [0.22, 1, 0.36, 1] } },
}

const linkVariants = {
  hidden:  { opacity: 0, x: 40 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.07, duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  }),
}

/* ── Component ───────────────────────────────────────────── */
/**
 * @component Navbar
 * @description Navigation sticky avec glassmorphism, active underline animée,
 *              toggle FR|AR et menu mobile full-screen.
 */
export default function Navbar() {
  const { pathname }                    = useLocation()
  const { language, toggleLanguage }    = useLanguage()
  const [scrolled,  setScrolled]        = useState(false)
  const [menuOpen,  setMenuOpen]        = useState(false)
  const [langRotate, setLangRotate]     = useState(false)

  /* Scroll listener */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Fermer menu au changement de route */
  useEffect(() => { setMenuOpen(false) }, [pathname])

  /* lock scroll body quand menu ouvert */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const handleLangToggle = () => {
    setLangRotate(true)
    toggleLanguage()
    setTimeout(() => setLangRotate(false), 400)
  }

  const isActive = (href) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <>
      {/* ── Main bar ── */}
      <motion.header
        animate={{
          height:     scrolled ? 64 : 80,
          background: scrolled
            ? 'rgba(15,110,86,0.95)'
            : 'rgba(15,110,86,0.08)',
        }}
        transition={{ duration: 0.3 }}
        style={{
          position:       'fixed',
          top:            0,
          left:           0,
          right:          0,
          zIndex:         50,
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom:   scrolled ? '1px solid rgba(255,255,255,0.08)' : 'none',
        }}
      >
        <div className="container-main h-full flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group" aria-label="Accueil">
            <motion.div
              whileHover={{ rotate: 15, scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: 'rgba(159,225,203,0.2)' }}
            >
              <Leaf className="w-5 h-5" style={{ color: '#9FE1CB' }} />
            </motion.div>
            <span
              className="font-display font-bold text-white text-lg leading-tight hidden sm:block"
            >
              Environnement<br />
              <span style={{ color: '#9FE1CB', fontSize: '0.7em', fontWeight: 400 }}>
                Maroc
              </span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Navigation principale">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="relative px-4 py-2 text-sm font-medium text-white/80 hover:text-white transition-colors"
                style={{ fontFamily: language === 'ar' ? 'var(--font-arabic)' : 'var(--font-body)' }}
              >
                {language === 'ar' ? link.labelAr : link.label}
                {isActive(link.href) && (
                  <motion.span
                    layoutId="underline"
                    className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full"
                    style={{ background: '#9FE1CB' }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-3">
            {/* Language toggle */}
            <motion.button
              onClick={handleLangToggle}
              animate={{ rotate: langRotate ? 180 : 0 }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-white border border-white/20 hover:bg-white/10 transition-colors"
              aria-label="Changer la langue"
              id="lang-toggle"
            >
              <Globe className="w-3.5 h-3.5" />
              {language === 'fr' ? 'AR' : 'FR'}
            </motion.button>

            {/* Hamburger — mobile only */}
            <button
              className="lg:hidden flex flex-col items-center justify-center w-9 h-9 gap-1.5"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={menuOpen}
              id="mobile-menu-btn"
            >
              <AnimatePresence mode="wait" initial={false}>
                {menuOpen ? (
                  <motion.span
                    key="x"
                    initial={{ opacity: 0, rotate: -45 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 45 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-6 h-6 text-white" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col gap-1.5"
                  >
                    <span className="block w-6 h-0.5 bg-white rounded-full" />
                    <span className="block w-5 h-0.5 bg-white rounded-full" />
                    <span className="block w-6 h-0.5 bg-white rounded-full" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.header>

      {/* ── Mobile full-screen menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 z-40 flex flex-col items-center justify-center lg:hidden"
            style={{
              background: 'rgba(15,43,36,0.98)',
              backdropFilter: 'blur(20px)',
            }}
          >
            <nav className="flex flex-col items-center gap-6 w-full px-8">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  custom={i}
                  variants={linkVariants}
                  initial="hidden"
                  animate="visible"
                  className="w-full text-center border-b border-white/10 pb-6"
                >
                  <Link
                    to={link.href}
                    className="text-2xl font-display font-semibold text-white hover:text-emerald-400 transition-colors"
                    style={{
                      color: isActive(link.href) ? '#9FE1CB' : undefined,
                      fontFamily: language === 'ar' ? 'var(--font-arabic)' : undefined,
                    }}
                  >
                    {language === 'ar' ? link.labelAr : link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
