/**
 * DataVizSection.jsx — Visualisation de données environnementales
 * ──────────────────────────────────────────────────────────────────
 * 3 graphiques SVG animés : 2 cercles de progression + 1 barre horizontale.
 * Animation déclenchée à l'entrée dans le viewport (Framer Motion).
 */

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

/* ── Circular progress ────────────────────────────────────── */
/**
 * @param {object} props
 * @param {number}  props.value      - Valeur actuelle (0–100)
 * @param {number}  props.size       - Diamètre SVG px
 * @param {number}  props.stroke     - Épaisseur du trait
 * @param {string}  props.color      - Couleur du trait
 * @param {string}  props.label      - Label affiché au centre
 * @param {string}  props.sublabel   - Sous-label sous la valeur
 * @param {boolean} props.isInView   - Déclenchement animation
 */
function CircularProgress({ value, size = 180, stroke = 12, color, label, sublabel, isInView }) {
  const radius     = (size - stroke) / 2
  const circumf    = 2 * Math.PI * radius
  const offset     = circumf * (1 - value / 100)

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
          {/* Track */}
          <circle
            cx={size / 2} cy={size / 2} r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth={stroke}
          />
          {/* Progress */}
          <motion.circle
            cx={size / 2} cy={size / 2} r={radius}
            fill="none"
            stroke={color}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumf}
            initial={{ strokeDashoffset: circumf }}
            animate={{ strokeDashoffset: isInView ? offset : circumf }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          />
        </svg>
        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="font-display font-extrabold text-white"
            style={{ fontSize: size / 5 }}
          >
            {value}%
          </span>
          <span
            className="text-xs text-center px-4 mt-1"
            style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-body)' }}
          >
            {label}
          </span>
        </div>
      </div>
      <p
        className="text-sm font-medium text-white text-center"
        style={{ fontFamily: 'var(--font-body)' }}
      >
        {sublabel}
      </p>
    </div>
  )
}

/* ── Horizontal bar ───────────────────────────────────────── */
function HorizontalBar({ value, max, color, label, unit, sublabel, isInView }) {
  const pct = Math.min((value / max) * 100, 100)

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        className="w-full max-w-sm flex flex-col items-center gap-3"
      >
        {/* Values */}
        <div className="flex justify-between w-full">
          <span
            className="font-display font-extrabold text-white"
            style={{ fontSize: '2rem' }}
          >
            {value.toLocaleString('fr-FR')}{unit}
          </span>
          <span className="text-sm self-end pb-1" style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-body)' }}>
            {/* objective */}
            Obj. {max.toLocaleString('fr-FR')}{unit}
          </span>
        </div>

        {/* Track */}
        <div
          className="w-full rounded-full overflow-hidden"
          style={{ height: 14, background: 'rgba(255,255,255,0.08)' }}
        >
          <motion.div
            className="h-full rounded-full"
            style={{ background: `linear-gradient(90deg, ${color}, ${color}CC)` }}
            initial={{ width: '0%' }}
            animate={{ width: isInView ? `${pct}%` : '0%' }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
          />
        </div>

        {/* Labels */}
        <div className="flex justify-between w-full">
          <span className="text-xs" style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'var(--font-body)' }}>0</span>
          <span
            className="text-xs font-semibold"
            style={{ color, fontFamily: 'var(--font-body)' }}
          >
            {Math.round(pct)}% atteint
          </span>
        </div>
      </div>
      <p
        className="text-sm font-medium text-white text-center"
        style={{ fontFamily: 'var(--font-body)' }}
      >
        {label}
      </p>
      <p className="text-xs text-center" style={{ color: 'rgba(255,255,255,0.45)', fontFamily: 'var(--font-body)' }}>
        {sublabel}
      </p>
    </div>
  )
}

/* ── Component ───────────────────────────────────────────── */
/**
 * @component DataVizSection
 * @description Section fond sombre avec 3 graphiques SVG animés au scroll.
 */
export default function DataVizSection() {
  const ref     = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.25 })

  return (
    <section
      ref={ref}
      className="py-24 relative overflow-hidden"
      style={{ background: '#1C2B28' }}
      aria-label="L'environnement en chiffres"
    >
      {/* Background decoration */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 50% 70% at 50% 100%, rgba(15,110,86,0.12) 0%, transparent 70%)`,
        }}
      />

      <div className="container-main relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span
            className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4"
            style={{
              background: 'rgba(29,158,117,0.15)',
              color: '#9FE1CB',
              fontFamily: 'var(--font-body)',
            }}
          >
            Données & Indicateurs
          </span>
          <h2
            className="font-display font-bold text-white mb-4"
            style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)' }}
          >
            L'Environnement en Chiffres
          </h2>
          <p className="text-sm max-w-lg mx-auto" style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-body)' }}>
            Indicateurs clés de performance environnementale du Maroc — données 2024
          </p>
        </motion.div>

        {/* Charts grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">

          {/* 1 — ENR */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <CircularProgress
              value={52}
              color="#1D9E75"
              label="ENR"
              sublabel="Taux d'énergies renouvelables — Objectif 2030"
              isInView={isInView}
            />
          </motion.div>

          {/* 2 — Couverture forestière (barre) */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <HorizontalBar
              value={9.6}
              max={12}
              unit=" M ha"
              color="#185FA5"
              label="Couverture forestière"
              sublabel="9,6 millions d'hectares actuels / objectif 12M ha"
              isInView={isInView}
            />
          </motion.div>

          {/* 3 — Sites Ramsar */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <CircularProgress
              value={80}
              color="#BA7517"
              label="Ramsar"
              sublabel="Sites Ramsar protégés (24 / objectif 30)"
              isInView={isInView}
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
