/**
 * Footer.jsx — Pied de page du portail Environnement Maroc
 * ─────────────────────────────────────────────────────────
 * 3 colonnes : branding + liens ministère + liens programmes
 * Fond sombre, liens réseaux sociaux, adresse officielle.
 */

import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Leaf, Facebook, Twitter, Youtube, Linkedin, MapPin, Phone, Mail } from 'lucide-react'

/* ── Data ─────────────────────────────────────────────────── */
const LINKS_MINISTERE = [
  { label: 'Présentation',  href: '/ministere' },
  { label: 'Organigramme',  href: '/ministere#organigramme' },
  { label: 'Missions',      href: '/ministere#missions' },
  { label: 'Le Ministre',   href: '/ministere#ministre' },
]

const LINKS_PROGRAMMES = [
  { label: 'SNDD 2030',             href: '/programmes/sndd' },
  { label: 'Biodiversité',          href: '/programmes/biodiversite' },
  { label: 'Changement Climatique', href: '/programmes/climat' },
  { label: 'PNDM',                  href: '/programmes/pndm' },
]

const SOCIAL = [
  { icon: Facebook,  href: 'https://facebook.com', label: 'Facebook' },
  { icon: Twitter,   href: 'https://twitter.com',  label: 'Twitter/X' },
  { icon: Youtube,   href: 'https://youtube.com',  label: 'YouTube' },
  { icon: Linkedin,  href: 'https://linkedin.com', label: 'LinkedIn' },
]

/* ── Sub-components ───────────────────────────────────────── */
function FooterHeading({ children }) {
  return (
    <h3
      className="font-display font-bold text-white text-base mb-5 pb-3 relative"
      style={{ fontFamily: 'var(--font-display)' }}
    >
      {children}
      <span
        className="absolute bottom-0 left-0 w-8 h-0.5 rounded-full"
        style={{ background: '#1D9E75' }}
      />
    </h3>
  )
}

function FooterLink({ href, children }) {
  const isExternal = href.startsWith('http')
  const Tag = isExternal ? 'a' : Link
  const extra = isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {}
  return (
    <Tag
      to={!isExternal ? href : undefined}
      href={isExternal ? href : undefined}
      className="block text-sm py-1 transition-colors hover:translate-x-1"
      style={{
        color: 'rgba(255,255,255,0.55)',
        transition: 'color 200ms, transform 200ms',
        fontFamily: 'var(--font-body)',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.color = '#9FE1CB' }}
      onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.55)' }}
      {...extra}
    >
      {children}
    </Tag>
  )
}

/* ── Component ───────────────────────────────────────────── */
/**
 * @component Footer
 * @description Pied de page 3 colonnes avec branding, liens et coordonnées.
 */
export default function Footer() {
  return (
    <footer
      style={{ background: '#1C2B28', borderTop: '1px solid rgba(255,255,255,0.06)' }}
    >
      <div className="container-main py-16">
        {/* ── Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-14">

          {/* Col 1 — Branding */}
          <div>
            <Link to="/" className="flex items-center gap-3 mb-5">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(29,158,117,0.2)' }}
              >
                <Leaf className="w-5 h-5" style={{ color: '#9FE1CB' }} />
              </div>
              <div>
                <p className="font-display font-bold text-white text-base leading-tight">
                  Département de l'Environnement
                </p>
                <p className="text-xs" style={{ color: '#9FE1CB' }}>Maroc</p>
              </div>
            </Link>

            <p
              className="text-sm leading-relaxed mb-7"
              style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-body)' }}
            >
              Le Département de l'Environnement pilote les politiques
              nationales pour la protection de l'environnement et le
              développement durable au Maroc.
            </p>

            {/* Social icons */}
            <div className="flex gap-3">
              {SOCIAL.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ scale: 1.15, y: -2 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                  className="w-9 h-9 rounded-lg flex items-center justify-center"
                  style={{
                    background: 'rgba(255,255,255,0.07)',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  <Icon className="w-4 h-4" style={{ color: 'rgba(255,255,255,0.65)' }} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Col 2 — Liens Ministère */}
          <div>
            <FooterHeading>Le Ministère</FooterHeading>
            <ul className="space-y-0.5">
              {LINKS_MINISTERE.map((l) => (
                <li key={l.href}>
                  <FooterLink href={l.href}>{l.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Liens Programmes */}
          <div>
            <FooterHeading>Nos Programmes</FooterHeading>
            <ul className="space-y-0.5 mb-8">
              {LINKS_PROGRAMMES.map((l) => (
                <li key={l.href}>
                  <FooterLink href={l.href}>{l.label}</FooterLink>
                </li>
              ))}
            </ul>

            {/* Coordonnées */}
            <div className="space-y-3 mt-6">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#1D9E75' }} />
                <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>
                  N°9, Avenue Al Araar, Hay Riad<br />Rabat, Maroc
                </p>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 flex-shrink-0" style={{ color: '#1D9E75' }} />
                <a
                  href="tel:+212537688400"
                  className="text-xs hover:text-white transition-colors"
                  style={{ color: 'rgba(255,255,255,0.45)' }}
                >
                  +212 5 37 68 84 00
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 flex-shrink-0" style={{ color: '#1D9E75' }} />
                <a
                  href="mailto:contact@environnement.gov.ma"
                  className="text-xs hover:text-white transition-colors"
                  style={{ color: 'rgba(255,255,255,0.45)' }}
                >
                  contact@environnement.gov.ma
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div
          className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs"
          style={{
            borderTop: '1px solid rgba(255,255,255,0.08)',
            color: 'rgba(255,255,255,0.35)',
            fontFamily: 'var(--font-body)',
          }}
        >
          <p>
            © 2025 Département de l'Environnement — Maroc. Tous droits réservés.
          </p>
          <div className="flex gap-4">
            <a href="/mentions-legales" className="hover:text-white transition-colors">
              Mentions légales
            </a>
            <a href="/politique-confidentialite" className="hover:text-white transition-colors">
              Confidentialité
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
