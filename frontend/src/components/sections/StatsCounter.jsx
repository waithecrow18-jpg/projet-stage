/**
 * StatsCounter.jsx — Section statistiques avec CountUp
 * ─────────────────────────────────────────────────────
 * 4 cartes sur fond vert primaire avec animation scrollSpy.
 */

import { motion } from 'framer-motion'
import CountUp from 'react-countup'
import { Shield, Waves, Zap, TreePine } from 'lucide-react'
import { useScrollAnimation } from '../../hooks/useScrollAnimation.js'

/* ── Data ─────────────────────────────────────────────────── */
const STATS = [
  { icon: Shield,   value: 154,  suffix: '',     label: 'Aires Protégées',    desc: 'Réserves naturelles et parcs nationaux' },
  { icon: Waves,    value: 3500, suffix: ' km',  label: 'Côtes Surveillées',  desc: 'Littoral atlantique et méditerranéen' },
  { icon: Zap,      value: 52,   suffix: ' %',   label: 'ENR Objectif 2030',  desc: 'Énergies renouvelables dans le mix' },
  { icon: TreePine, value: 24,   suffix: '',     label: 'Sites Ramsar',       desc: 'Zones humides d\'importance internationale' },
]

/* ── Component ───────────────────────────────────────────── */
/**
 * @component StatsCounter
 * @description Section 4 statistiques avec CountUp activé au scroll et animations stagger.
 */
export default function StatsCounter() {
  const { ref, isInView, staggerContainer, fadeInUp } = useScrollAnimation({ amount: 0.3 })

  return (
    <section
      ref={ref}
      style={{ background: 'var(--color-primary)', padding: '5rem 0' }}
      aria-label="Statistiques environnementales"
    >
      <div className="container-main">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-2 lg:grid-cols-4 gap-0 divide-y-2 lg:divide-y-0 lg:divide-x-2"
          style={{ '--tw-divide-opacity': 0.2, borderColor: 'rgba(255,255,255,0.2)' }}
        >
          {STATS.map((stat, i) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                variants={fadeInUp}
                className="flex flex-col items-center text-center px-6 py-8 lg:py-4"
                style={{
                  borderColor: 'rgba(255,255,255,0.15)',
                  borderRightWidth: i < STATS.length - 1 ? '1px' : 0,
                  borderRightStyle: 'solid',
                }}
              >
                {/* Icon */}
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                  style={{ background: 'rgba(255,255,255,0.12)' }}
                >
                  <Icon className="w-7 h-7 text-white" strokeWidth={1.5} />
                </div>

                {/* Value */}
                <div
                  className="font-display font-extrabold text-white mb-1"
                  style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1 }}
                >
                  {isInView ? (
                    <CountUp
                      end={stat.value}
                      suffix={stat.suffix}
                      duration={2.5}
                      useEasing
                      enableScrollSpy={false}
                      start={0}
                    />
                  ) : (
                    <span>0{stat.suffix}</span>
                  )}
                </div>

                {/* Label */}
                <p
                  className="font-semibold text-white mb-1 text-sm sm:text-base"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {stat.label}
                </p>

                {/* Description */}
                <p
                  className="text-xs text-center"
                  style={{ color: 'rgba(255,255,255,0.55)', fontFamily: 'var(--font-body)' }}
                >
                  {stat.desc}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
