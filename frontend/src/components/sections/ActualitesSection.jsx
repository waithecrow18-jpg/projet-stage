/**
 * ActualitesSection.jsx — Dernières actualités avec effet TiltCard
 * ─────────────────────────────────────────────────────────────────
 * 3 articles depuis l'API, grille responsive, hover tilt 3D via useMouseTilt.
 */

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Calendar, Tag } from 'lucide-react'
import { useScrollAnimation } from '../../hooks/useScrollAnimation.js'
import { useMouseTilt } from '../../hooks/useMouseTilt.js'
import api from '../../utils/api.js'

/* ── Gradient placeholder pour les images manquantes ── */
const CARD_GRADIENTS = [
  'linear-gradient(135deg, #0F6E56 0%, #1D9E75 100%)',
  'linear-gradient(135deg, #185FA5 0%, #1D9E75 100%)',
  'linear-gradient(135deg, #BA7517 0%, #0F6E56 100%)',
]

/* ── TiltCard sub-component ───────────────────────────────── */
function TiltCard({ article, gradient, delay }) {
  const { ref, onMouseMove, onMouseLeave } = useMouseTilt({ maxTilt: 8, scale: 1.02 })

  // Use image if exists, handle full API URL logic if need be
  // Assuming 'image' is relative like '/storage/xxxx.jpg' or full URL.
  const imageUrl = article.image 
    ? (article.image.startsWith('http') ? article.image : `http://localhost:8000${article.image}`)
    : null;

  return (
    <motion.article
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-2xl overflow-hidden bg-white flex flex-col"
      style={{
        boxShadow: '0 2px 12px rgba(15,110,86,0.07)',
        willChange: 'transform',
      }}
    >
      {/* Image / Placeholder */}
      <div
        className="w-full flex-shrink-0 relative overflow-hidden"
        style={{ height: 200, background: gradient }}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={article.titre_fr}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center opacity-20">
            <svg viewBox="0 0 100 100" className="w-24 h-24 fill-white">
              <path d="M50 10 C20 20 10 50 20 70 C30 90 70 90 80 70 C90 50 80 20 50 10Z" />
              <circle cx="35" cy="45" r="6" />
              <circle cx="65" cy="45" r="6" />
              <path d="M35 65 Q50 78 65 65" strokeWidth="3" stroke="white" fill="none" />
            </svg>
          </div>
        )}

        {/* Category badge */}
        <span
          className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold"
          style={{
            background: 'rgba(255,255,255,0.15)',
            color: '#FFFFFF',
            backdropFilter: 'blur(8px)',
            fontFamily: 'var(--font-body)',
          }}
        >
          {article.categorie}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6">
        {/* Date */}
        <p
          className="flex items-center gap-1.5 text-xs mb-3"
          style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-body)' }}
        >
          <Calendar className="w-3.5 h-3.5" />
          {new Date(article.date_publication).toLocaleDateString()}
        </p>

        {/* Title */}
        <h3
          className="font-display font-semibold mb-3 leading-snug"
          style={{ fontSize: '1.05rem', color: 'var(--color-dark)' }}
        >
          {article.titre_fr}
        </h3>

        {/* Excerpt */}
        <p
          className="text-sm leading-relaxed flex-1 mb-5"
          style={{
            color: 'var(--color-text-secondary)',
            fontFamily: 'var(--font-body)',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {article.extrait_fr}
        </p>

        {/* Lire la suite */}
        <a
          href={`/actualites/${article.slug}`}
          className="inline-flex items-center gap-1.5 text-sm font-semibold group/link"
          style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-body)' }}
        >
          Lire la suite
          <ArrowRight
            className="w-4 h-4 transition-transform duration-200 group-hover/link:translate-x-1"
          />
        </a>
      </div>
    </motion.article>
  )
}

/* ── Component ───────────────────────────────────────────── */
/**
 * @component ActualitesSection
 * @description Grille 3 articles avec TiltCard, badge catégorie et stagger animation.
 */
export default function ActualitesSection() {
  const { ref, isInView, fadeInUp, staggerContainer } = useScrollAnimation()
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const { data } = await api.get('/actualites', { params: { per_page: 3 } })
        // If data.data exists (pagination), grab only first 3 items.
        const items = data.data ? data.data : data
        setArticles(items.slice(0, 3))
      } catch (e) {
        console.error("Failed to load news", e)
      } finally {
        setLoading(false)
      }
    }
    fetchArticles()
  }, [])

  return (
    <section className="py-24 bg-white" aria-label="Dernières actualités">
      <div className="container-main">

        {/* ── Section header ── */}
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
                background: 'rgba(15,110,86,0.08)',
                color: 'var(--color-primary)',
                fontFamily: 'var(--font-body)',
              }}
            >
              Actualités
            </motion.span>
            <motion.h2 variants={fadeInUp} className="section-title">
              Dernières nouvelles
            </motion.h2>
            <motion.div variants={fadeInUp} className="divider-primary" />
          </div>
          <motion.a
            variants={fadeInUp}
            href="/actualites"
            className="inline-flex items-center gap-2 text-sm font-semibold flex-shrink-0"
            style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-body)' }}
          >
            Toutes les actualités
            <ArrowRight className="w-4 h-4" />
          </motion.a>
        </motion.div>

        {/* ── Cards grid ── */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {loading ? (
             <div className="col-span-1 sm:col-span-2 lg:col-span-3 py-12 text-center text-gray-400">
               Chargement des actualités...
             </div>
          ) : articles.length > 0 ? (
            articles.map((article, i) => (
              <TiltCard
                key={article.id}
                article={article}
                gradient={CARD_GRADIENTS[i % 3]}
                delay={i * 0.1}
              />
            ))
          ) : (
             <div className="col-span-1 sm:col-span-2 lg:col-span-3 py-12 text-center text-gray-400">
               Aucune actualité disponible pour le moment.
             </div>
          )}
        </div>
      </div>
    </section>
  )
}
