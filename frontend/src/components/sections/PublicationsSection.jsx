/**
 * PublicationsSection.jsx — Documents officiels téléchargeables
 * ──────────────────────────────────────────────────────────────
 * 4 publications mockées avec hover scale + shadow.
 */

import { motion } from 'framer-motion'
import { FileText, Download, Calendar } from 'lucide-react'
import { useScrollAnimation } from '../../hooks/useScrollAnimation.js'

/* ── Data ─────────────────────────────────────────────────── */
const PUBLICATIONS = [
  {
    id: 1,
    titre:  '4ème Rapport sur l\'État de l\'Environnement du Maroc',
    annee:  '2023',
    type:   'Rapport annuel',
    pages:  '248 pages',
    slug:   'etat-environnement-2023',
    color:  '#E53E3E',
  },
  {
    id: 2,
    titre:  'Contribution Déterminée au Niveau National (CDN)',
    annee:  '2022',
    type:   'Document officiel',
    pages:  '96 pages',
    slug:   'cdn-2022',
    color:  '#E53E3E',
  },
  {
    id: 3,
    titre:  'Rapport de Surveillance des Eaux de Baignade',
    annee:  '2024',
    type:   'Rapport technique',
    pages:  '74 pages',
    slug:   'eaux-baignade-2024',
    color:  '#E53E3E',
  },
  {
    id: 4,
    titre:  'Guide des Bonnes Pratiques Environnementales',
    annee:  '2024',
    type:   'Guide pratique',
    pages:  '52 pages',
    slug:   'guide-bpe',
    color:  '#E53E3E',
  },
]

/* ── Card ─────────────────────────────────────────────────── */
function PublicationCard({ pub, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.02, y: -2 }}
      className="bg-white rounded-2xl p-6 flex items-start gap-5 cursor-pointer"
      style={{
        boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
        transition: 'box-shadow 300ms',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 8px 28px rgba(15,110,86,0.14)' }}
      onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)' }}
    >
      {/* PDF Icon */}
      <div
        className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: 'rgba(229,62,62,0.08)' }}
      >
        <FileText className="w-7 h-7" style={{ color: pub.color }} strokeWidth={1.5} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap mb-1.5">
          <span
            className="text-xs font-medium px-2 py-0.5 rounded-full"
            style={{ background: '#FFF5F5', color: pub.color, fontFamily: 'var(--font-body)' }}
          >
            {pub.type}
          </span>
          <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--color-text-secondary)' }}>
            <Calendar className="w-3 h-3" />{pub.annee}
          </span>
          <span className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
            • {pub.pages}
          </span>
        </div>
        <h3
          className="font-display font-semibold text-sm sm:text-base leading-snug mb-3"
          style={{ color: 'var(--color-dark)' }}
        >
          {pub.titre}
        </h3>
        <a
          href={`/publications/${pub.slug}`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all"
          style={{
            background: 'rgba(15,110,86,0.08)',
            color: 'var(--color-primary)',
            fontFamily: 'var(--font-body)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'var(--color-primary)'
            e.currentTarget.style.color = '#fff'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(15,110,86,0.08)'
            e.currentTarget.style.color = 'var(--color-primary)'
          }}
          download
          aria-label={`Télécharger : ${pub.titre}`}
        >
          <Download className="w-3.5 h-3.5" />
          Télécharger
        </a>
      </div>
    </motion.div>
  )
}

/* ── Component ───────────────────────────────────────────── */
/**
 * @component PublicationsSection
 * @description 4 publications officielles avec cards hover animées et boutons télécharger.
 */
export default function PublicationsSection() {
  const { ref, isInView, fadeInUp, staggerContainer } = useScrollAnimation()

  return (
    <section className="py-24 bg-white" aria-label="Publications officielles">
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
                background: '#FFF5F5',
                color: '#E53E3E',
                fontFamily: 'var(--font-body)',
              }}
            >
              Documents officiels
            </motion.span>
            <motion.h2 variants={fadeInUp} className="section-title">
              Publications & Rapports
            </motion.h2>
            <motion.div variants={fadeInUp} className="divider-primary" />
            <motion.p variants={fadeInUp} className="section-subtitle max-w-xl">
              Accédez à nos rapports, études et documents officiels
              sur l'état de l'environnement au Maroc.
            </motion.p>
          </div>
          <motion.a
            variants={fadeInUp}
            href="/publications"
            className="inline-flex items-center gap-2 text-sm font-semibold flex-shrink-0"
            style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-body)' }}
          >
            Toutes les publications →
          </motion.a>
        </motion.div>

        {/* Grid */}
        <div className="grid gap-4 sm:grid-cols-2">
          {PUBLICATIONS.map((pub, i) => (
            <PublicationCard key={pub.id} pub={pub} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  )
}
