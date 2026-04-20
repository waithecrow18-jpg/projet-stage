import { AlertCircle } from 'lucide-react'
import Button from './Button.jsx'

/**
 * ErrorMessage.jsx — Bloc affichant une erreur de façon lisible avec bouton de relance.
 *
 * @param {object} props
 * @param {string} [props.title] - Titre de l'erreur
 * @param {string} props.message - Détails de l'erreur
 * @param {function} [props.onRetry] - Fonction déclenchée au clic sur "Réessayer"
 */
export default function ErrorMessage({ title = 'Une erreur est survenue', message, onRetry }) {
  return (
    <div className="w-full max-w-lg mx-auto bg-red-50 border border-red-200 rounded-xl p-6 flex flex-col items-center text-center">
      <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4">
        <AlertCircle className="w-6 h-6" />
      </div>
      
      <h3 className="font-display font-bold text-red-900 mb-2">
        {title}
      </h3>
      
      <p className="text-red-700 text-sm mb-6" style={{ fontFamily: 'var(--font-body)' }}>
        {message || "Impossible de charger ces données pour le moment. Veuillez vérifier votre connexion."}
      </p>

      {onRetry && (
        <Button variant="outline" size="sm" onClick={onRetry} className="!border-red-600 !text-red-600 hover:!bg-red-600">
          Réessayer
        </Button>
      )}
    </div>
  )
}
