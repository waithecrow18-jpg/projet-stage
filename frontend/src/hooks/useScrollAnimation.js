import { useRef } from 'react'
import { useInView } from 'framer-motion'

/**
 * useScrollAnimation
 * ─────────────────────────────────────────────────────────────
 * Expose des variants Framer Motion prêts à l'emploi
 * + une ref à attacher à l'élément racine à observer.
 *
 * @param {object}  opts
 * @param {boolean} opts.once    - Déclencher une seule fois (défaut : true)
 * @param {number}  opts.amount  - % visible avant déclenchement (défaut : 0.2)
 *
 * @returns {{ ref, isInView, fadeInUp, staggerContainer, slideInLeft, slideInRight }}
 *
 * @example
 * const { ref, isInView, fadeInUp, staggerContainer } = useScrollAnimation()
 * <motion.div ref={ref} variants={staggerContainer} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
 *   <motion.p variants={fadeInUp}>…</motion.p>
 * </motion.div>
 */
export function useScrollAnimation({ once = true, amount = 0.2 } = {}) {
  const ref     = useRef(null)
  const isInView = useInView(ref, { once, amount })

  // ── Variants ──────────────────────────────────────────────

  /** Apparition de bas en haut avec fondu */
  const fadeInUp = {
    hidden:  { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  }

  /** Apparition de la gauche */
  const slideInLeft = {
    hidden:  { opacity: 0, x: -60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  }

  /** Apparition de la droite */
  const slideInRight = {
    hidden:  { opacity: 0, x: 60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  }

  /** Conteneur déclenchant le stagger sur ses enfants */
  const staggerContainer = {
    hidden:  {},
    visible: {
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  }

  return {
    ref,
    isInView,
    fadeInUp,
    slideInLeft,
    slideInRight,
    staggerContainer,
  }
}

export default useScrollAnimation
