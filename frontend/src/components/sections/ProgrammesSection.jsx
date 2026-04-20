/**
 * ProgrammesSection.jsx — Programmes stratégiques du Département
 * ───────────────────────────────────────────────────────────────
 * 4 programmes horizontaux avec icône colorée, badge statut et hover animation.
 */

import { motion } from 'framer-motion'
import { Leaf, Wind, TreePine, Recycle, ArrowRight, CheckCircle, Clock } from 'lucide-react'
import { useScrollAnimation } from '../../hooks/useScrollAnimation.js'

/* ── Data ─────────────────────────────────────────────────── */
const PROGRAMMES = [
  {
    nom:    'Stratégie Nationale de Développement Durable (SNDD)',
    desc:   'Cadre intégré pour le développement durable à horizon 2030, articulant les dimensions économique, sociale et environnementale.',
    icone:  Leaf,
    couleur:'#0F6E56',
    bg:     'rgba(15,110,86,0.08)',
    statut: 'Actif',
    annee:  2017,
    slug:   'sndd',
  },
  {
    nom:    'Plan National de Lutte contre le Réchauffement Climatique',
    desc:   'Réduction des émissions GES et adaptation aux impacts climatiques à travers une transition énergétique ambitieuse.',
    icone:  Wind,
    couleur:'#185FA5',
    bg:     'rgba(24,95,165,0.08)',
    statut: 'En cours',
    annee:  2021,
    slug:   'plan-climat',
  },
  {
    nom:    'Stratégie Nationale pour la Conservation de la Biodiversité',
    desc:   'Protection et restauration des écosystèmes terrestres et marins du Maroc, préservation des espèces endémiques.',
    icone:  TreePine,
    couleur:'#1D9E75',
    bg:     'rgba(29,158,117,0.08)',
    statut: 'Actif',
    annee:  2016,
    slug:   'biodiversite',
  },
  {
    nom:    'Programme National de Gestion des Déchets (PNDM)',
    desc:   'Modernisation de la gestion des déchets ménagers à l\'échelle nationale et développement de l\'économie circulaire.',
    icone:  Recycle,
    couleur:'#BA7517',
    bg:     'rgba(186,117,23,0.08)',
    statut: 'En cours',
    annee:  2008,
    slug:   'pndm',
  },
]

/* ── Card ─────────────────────────────────────────────────── */
function ProgrammeCard({ prog, delay }) {
  const Icon = prog.icone
  const isActif = prog.statut === 'Actif'

  return (
    <motion.a
      href={`/programmes/${prog.slug}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      className="flex items-start gap-5 p-7 rounded-2xl bg-white group cursor-pointer block"
      style={{
        boxShadow: '0 2px 12px rgba(15,110,86,0.06)',
        transition: 'box-shadow 300ms',
        textDecoration: 'none',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 12px 32px rgba(15,110,86,0.18)`
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 2px 12px rgba(15,110,86,0.06)'
      }}
    >
      {/* Icon */}
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
        style={{ background: prog.bg }}
      >
        <Icon className="w-7 h-7" style={{ color: prog.couleur }} strokeWidth={1.5} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* Badges */}
        <div className="flex items-center gap-2 flex-wrap mb-2">
          <span
            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium"
            style={{
              background: isActif ? 'rgba(15,110,86,0.1)' : 'rgba(186,117,23,0.1)',
              color: isActif ? '#0F6E56' : '#BA7517',
              fontFamily: 'var(--font-body)',
            }}
          >
            {isActif ? <CheckCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
            {prog.statut}
          </span>
          <span
            className="inline-block px-2.5 py-0.5 rounded-full text-xs"
            style={{ color: 'var(--color-text-secondary)', background: '#F0FAF6', fontFamily: 'var(--font-body)' }}
          >
            Depuis {prog.annee}
          </span>
        </div>

        {/* Name */}
        <h3
          className="font-display font-bold mb-2 leading-snug text-base group-hover:underline"
          style={{ color: 'var(--color-dark)', textDecorationColor: prog.couleur }}
        >
          {prog.nom}
        </h3>

        {/* Description */}
        <p
          className="text-sm leading-relaxed"
          style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}
        >
          {prog.desc}
        </p>
      </div>

      {/* Arrow */}
      <ArrowRight
        className="w-5 h-5 flex-shrink-0 mt-1 transition-transform duration-200 group-hover:translate-x-1"
        style={{ color: prog.couleur }}
      />
    </motion.a>
  )
}

/* ── Component ───────────────────────────────────────────── */
/**
 * @component ProgrammesSection
 * @description Grille 4 programmes stratégiques avec cards horizontales animées.
 */
export default function ProgrammesSection() {
  const { ref, isInView, fadeInUp, staggerContainer } = useScrollAnimation()

  return (
    <section
      className="py-24"
      style={{ background: '#F0FAF6' }}
      aria-label="Programmes stratégiques"
    >
      <div className="container-main">

        {/* Header */}
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14"
        >
          <div>
            <motion.span
              variants={fadeInUp}
              className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4"
              style={{
                background: 'rgba(15,110,86,0.12)',
                color: 'var(--color-primary)',
                fontFamily: 'var(--font-body)',
              }}
            >
              Stratégies & Programmes
            </motion.span>
            <motion.h2 variants={fadeInUp} className="section-title">
              Nos actions prioritaires
            </motion.h2>
            <motion.div variants={fadeInUp} className="divider-primary" />
            <motion.p
              variants={fadeInUp}
              className="section-subtitle max-w-xl"
            >
              Des programmes structurants pour protéger l'environnement
              et garantir un avenir durable pour le Maroc.
            </motion.p>
          </div>
          <motion.a
            variants={fadeInUp}
            href="/programmes"
            className="inline-flex items-center gap-2 text-sm font-semibold flex-shrink-0"
            style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-body)' }}
          >
            Tous les programmes
            <ArrowRight className="w-4 h-4" />
          </motion.a>
        </motion.div>

        {/* Cards */}
        <div className="grid gap-5 md:grid-cols-2">
          {PROGRAMMES.map((prog, i) => (
            <ProgrammeCard key={prog.slug} prog={prog} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  )
}
