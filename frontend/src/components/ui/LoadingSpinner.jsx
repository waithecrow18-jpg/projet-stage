import { Loader2 } from 'lucide-react'

/**
 * LoadingSpinner.jsx — Indicateur de chargement centré.
 */
export default function LoadingSpinner({ text = 'Chargement en cours...', fullScreen = false }) {
  const wrapperClass = fullScreen
    ? 'fixed inset-0 z-50 flex flex-col items-center justify-center bg-surfaceDark/80 backdrop-blur-sm'
    : 'flex flex-col items-center justify-center p-12 w-full'

  return (
    <div className={wrapperClass}>
      <Loader2 className="w-10 h-10 animate-spin text-primary mb-4" />
      {text && (
        <span
          className="text-sm font-medium animate-pulse"
          style={{ color: fullScreen ? 'white' : 'var(--color-text-secondary)' }}
        >
          {text}
        </span>
      )}
    </div>
  )
}
