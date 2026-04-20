import { useMouseTilt } from '../../hooks/useMouseTilt.js'

/**
 * TiltCard.jsx — Wrapper générique appliquant l'effet 3D au survol.
 *
 * @param {object} props
 * @param {React.ReactNode} props.children
 * @param {number} [props.intensity=10] - Angle maximum de rotation en degrés
 * @param {string} [props.className]
 */
export default function TiltCard({ children, intensity = 10, className = '' }) {
  const { ref, onMouseMove, onMouseLeave } = useMouseTilt({
    maxTilt: intensity,
    scale: 1.02,
    perspective: 1000,
  })

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={`relative rounded-2xl overflow-hidden bg-white ${className}`}
      style={{
        boxShadow: '0 2px 12px rgba(15,110,86,0.07)',
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  )
}
