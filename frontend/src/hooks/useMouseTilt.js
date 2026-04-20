import { useRef, useCallback } from 'react'

/**
 * useMouseTilt
 * ─────────────────────────────────────────────────────────────
 * Fournit un effet de tilt 3D piloté par la position de la souris.
 *
 * @param {object}  opts
 * @param {number}  opts.maxTilt      - Angle max en degrés        (défaut : 10)
 * @param {number}  opts.perspective  - Distance de perspective px  (défaut : 1000)
 * @param {number}  opts.scale        - Scale au survol             (défaut : 1.02)
 *
 * @returns {{ ref: React.RefObject, onMouseMove: function, onMouseLeave: function }}
 *
 * @example
 * const { ref, onMouseMove, onMouseLeave } = useMouseTilt({ maxTilt: 8 })
 * <div ref={ref} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}>…</div>
 */
export function useMouseTilt({ maxTilt = 10, perspective = 1000, scale = 1.02 } = {}) {
  const ref = useRef(null)

  const onMouseMove = useCallback(
    (e) => {
      const el = ref.current
      if (!el) return

      const rect   = el.getBoundingClientRect()
      const x      = e.clientX - rect.left   // position X dans l'élément
      const y      = e.clientY - rect.top    // position Y dans l'élément
      const halfW  = rect.width  / 2
      const halfH  = rect.height / 2

      const rotateY =  ((x - halfW) / halfW) * maxTilt
      const rotateX = -((y - halfH) / halfH) * maxTilt

      // Ombre dynamique selon la direction du tilt
      const shadowX = (rotateY / maxTilt) * 12
      const shadowY = (-rotateX / maxTilt) * 12

      el.style.transition = 'none'
      el.style.transform  = `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`
      el.style.boxShadow  = `${shadowX}px ${shadowY}px 24px rgba(15,110,86,0.25)`
    },
    [maxTilt, perspective, scale],
  )

  const onMouseLeave = useCallback(() => {
    const el = ref.current
    if (!el) return
    el.style.transition = 'transform 300ms ease-out, box-shadow 300ms ease-out'
    el.style.transform  = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)'
    el.style.boxShadow  = ''
  }, [])

  return { ref, onMouseMove, onMouseLeave }
}

export default useMouseTilt
