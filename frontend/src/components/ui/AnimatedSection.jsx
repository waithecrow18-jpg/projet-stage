import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

/**
 * AnimatedSection.jsx — Wrapper déclenchant des animations au scroll (fadeInUp + stagger).
 *
 * @param {object} props
 * @param {number} [props.delay=0] - Décalage avant le début de l'animation
 */
export default function AnimatedSection({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.15 })

  const variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: delay,
        ease: [0.22, 1, 0.36, 1],
        when: 'beforeChildren',
        staggerChildren: 0.15,
      },
    },
  }

  return (
    <motion.section
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className={className}
    >
      {children}
    </motion.section>
  )
}
