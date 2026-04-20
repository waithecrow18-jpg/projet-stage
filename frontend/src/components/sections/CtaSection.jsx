/**
 * CtaSection.jsx — Appel à l'action final
 * ─────────────────────────────────────────
 * Gradient diagonal vert→bleu, titre impactant, citation officielle, 2 CTAs.
 */

import { motion } from 'framer-motion'
import { AlertTriangle, BookOpen } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useScrollAnimation } from '../../hooks/useScrollAnimation.js'

/* ── Component ───────────────────────────────────────────── */
/**
 * @component CtaSection
 * @description Section CTA avec fond dégradé et 2 boutons d'action.
 */
export default function CtaSection() {
  const { ref, isInView, fadeInUp, staggerContainer } = useScrollAnimation({ amount: 0.3 })

  return (
    <section
      className="py-28 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0F6E56 0%, #1a7a63 40%, #185FA5 100%)',
      }}
      aria-label="Appel à l'action"
    >
      {/* Decorative circles */}
      <div
        aria-hidden
        className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-10"
        style={{ background: 'radial-gradient(circle, #9FE1CB, transparent)' }}
      />
      <div
        aria-hidden
        className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full opacity-10"
        style={{ background: 'radial-gradient(circle, #60A5FA, transparent)' }}
      />

      <div className="container-main relative z-10">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="max-w-3xl mx-auto text-center"
        >
          {/* Badge */}
          <motion.div variants={fadeInUp} className="mb-6">
            <span
              className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase"
              style={{
                background: 'rgba(255,255,255,0.15)',
                color: '#FFFFFF',
                fontFamily: 'var(--font-body)',
                border: '1px solid rgba(255,255,255,0.25)',
              }}
            >
              Agissons ensemble
            </span>
          </motion.div>

          {/* Title */}
          <motion.h2
            variants={fadeInUp}
            className="font-display font-extrabold text-white mb-6"
            style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)', lineHeight: 1.2 }}
          >
            Agissons ensemble pour l'environnement du Maroc
          </motion.h2>

          {/* Citation */}
          <motion.blockquote
            variants={fadeInUp}
            className="mb-12 text-base italic leading-relaxed"
            style={{
              color: 'rgba(255,255,255,0.75)',
              fontFamily: 'var(--font-body)',
              fontWeight: 300,
              borderLeft: '3px solid rgba(255,255,255,0.3)',
              paddingLeft: '1.25rem',
              textAlign: 'left',
              maxWidth: 560,
              margin: '0 auto 3rem',
            }}
          >
            "L'environnement est un patrimoine commun de la Nation et de l'Humanité ; son
            utilisation doit s'inscrire dans une perspective de développement durable."
            <footer
              className="mt-3 text-xs not-italic"
              style={{ color: 'rgba(255,255,255,0.5)' }}
            >
              — Charte Nationale de l'Environnement et du Développement Durable, Art. 1
            </footer>
          </motion.blockquote>

          {/* Buttons */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/contact" // Corrigé pour pointer vers la page de formulaire fonctionnelle
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl font-semibold text-sm transition-all"
                style={{
                  background: '#FFFFFF',
                  color: '#0F6E56',
                  fontFamily: 'var(--font-body)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                }}
                id="cta-signaler-pollution"
              >
                <AlertTriangle className="w-4 h-4" />
                Signaler une pollution
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/publications" // Corrigé pour pointer vers la liste des documents
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl font-semibold text-sm transition-all"
                style={{
                  background: 'rgba(255,255,255,0.12)',
                  color: '#FFFFFF',
                  border: '1.5px solid rgba(255,255,255,0.35)',
                  fontFamily: 'var(--font-body)',
                }}
                id="cta-reglementation"
              >
                <BookOpen className="w-4 h-4" />
                Consulter la réglementation
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
