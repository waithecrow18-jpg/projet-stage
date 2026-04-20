/**
 * PartenairesSection.jsx — Défilement infini des partenaires
 * ───────────────────────────────────────────────────────────
 * Logos stylisés en texte, défilement horizontal Framer Motion,
 * pause au hover.
 */

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useScrollAnimation } from '../../hooks/useScrollAnimation.js'

/* ── Data ─────────────────────────────────────────────────── */
const PARTENAIRES = [
  { nom: 'PNUE',          couleur: '#0F6E56', accent: '#1D9E75' },
  { nom: 'GEF',           couleur: '#185FA5', accent: '#4A90D9' },
  { nom: 'Banque Mondiale', couleur: '#1D4ED8', accent: '#60A5FA' },
  { nom: 'Union Européenne', couleur: '#003399', accent: '#4169E1' },
  { nom: 'GIZ',           couleur: '#0F6E56', accent: '#1D9E75' },
  { nom: 'AFD',           couleur: '#BE185D', accent: '#EC4899' },
  { nom: 'BERD',          couleur: '#1E3A5F', accent: '#3B82F6' },
  { nom: 'OCDE',          couleur: '#374151', accent: '#6B7280' },
]

// Dupliqué pour un défilement sans couture
const LOOP = [...PARTENAIRES, ...PARTENAIRES]

/* ── Partner badge ───────────────────────────────────────── */
function PartnerBadge({ partner }) {
  return (
    <div
      className="flex-shrink-0 flex items-center justify-center px-8 py-4 rounded-2xl mx-3 cursor-default"
      style={{
        background: `rgba(${hexToRgb(partner.couleur)}, 0.06)`,
        border: `1px solid rgba(${hexToRgb(partner.couleur)}, 0.15)`,
        minWidth: 140,
      }}
    >
      <span
        className="font-display font-bold text-base tracking-wide whitespace-nowrap"
        style={{ color: partner.couleur }}
      >
        {partner.nom}
      </span>
    </div>
  )
}

/** Convertit #RRGGBB → 'R, G, B' pour RGBA */
function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `${r}, ${g}, ${b}`
}

/* ── Component ───────────────────────────────────────────── */
/**
 * @component PartenairesSection
 * @description Carrousel infini horizontal de partenaires avec pause au hover.
 */
export default function PartenairesSection() {
  const [paused, setPaused]                        = useState(false)
  const { ref, isInView, fadeInUp, staggerContainer } = useScrollAnimation()

  return (
    <section
      className="py-24 overflow-hidden"
      style={{ background: '#F7FAF9' }}
      aria-label="Nos partenaires internationaux"
    >
      <div className="container-main mb-12">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="text-center"
        >
          <motion.span
            variants={fadeInUp}
            className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4"
            style={{
              background: 'rgba(15,110,86,0.08)',
              color: 'var(--color-primary)',
              fontFamily: 'var(--font-body)',
            }}
          >
            Coopération internationale
          </motion.span>
          <motion.h2 variants={fadeInUp} className="section-title">
            Nos Partenaires Internationaux
          </motion.h2>
          <motion.div variants={fadeInUp} className="divider-primary mx-auto" />
          <motion.p variants={fadeInUp} className="section-subtitle max-w-lg mx-auto">
            Le Maroc collabore avec les principales organisations internationales
            en matière d'environnement et de développement durable.
          </motion.p>
        </motion.div>
      </div>

      {/* ── Marquee ── */}
      <div
        className="relative"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        aria-label="Défilement des partenaires"
      >
        {/* Fade gradients */}
        <div
          aria-hidden
          className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, #F7FAF9, transparent)' }}
        />
        <div
          aria-hidden
          className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, #F7FAF9, transparent)' }}
        />

        {/* Animated track */}
        <motion.div
          className="flex"
          animate={paused ? {} : { x: ['0%', '-50%'] }}
          transition={{
            duration: 25,
            ease: 'linear',
            repeat: Infinity,
            repeatType: 'loop',
          }}
          style={{ width: 'max-content' }}
        >
          {LOOP.map((partner, i) => (
            <PartnerBadge key={`${partner.nom}-${i}`} partner={partner} />
          ))}
        </motion.div>
      </div>

      {/* Stats line */}
      <div className="container-main mt-12">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center text-sm"
          style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}
        >
          + de <strong style={{ color: 'var(--color-primary)' }}>30</strong> accords de coopération actifs
          — représentant plus de{' '}
          <strong style={{ color: 'var(--color-primary)' }}>4 milliards MAD</strong> de financements verts mobilisés
        </motion.p>
      </div>
    </section>
  )
}
