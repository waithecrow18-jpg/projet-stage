import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'

/**
 * Button.jsx — Bouton générique avec variations et animation Framer Motion.
 * 
 * @param {object} props
 * @param {'primary'|'secondary'|'outline'|'ghost'} [props.variant='primary']
 * @param {'sm'|'md'|'lg'} [props.size='md']
 * @param {React.ElementType} [props.icon] - Composant icône 
 * @param {boolean} [props.loading] - Affiche un spinner
 */
export default function Button({
  variant = 'primary',
  size = 'md',
  icon: Icon,
  loading = false,
  disabled = false,
  onClick,
  children,
  className = '',
  ...props
}) {
  // Styles de taille
  const sizeClasses = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
  }[size]

  // Styles de variation
  const variantClasses = {
    primary:
      'bg-primary text-white border border-primary hover:bg-primaryMid',
    secondary:
      'bg-accentBlue text-white border border-accentBlue hover:opacity-90',
    outline:
      'border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-white',
    ghost:
      'bg-transparent text-primary hover:bg-primary/10 border border-transparent',
  }[variant]

  const baseClasses =
    'inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed'

  return (
    <motion.button
      whileHover={!disabled && !loading ? { scale: 1.03 } : {}}
      whileTap={!disabled && !loading ? { scale: 0.97 } : {}}
      className={`${baseClasses} ${sizeClasses} ${variantClasses} ${className}`}
      onClick={onClick}
      disabled={disabled || loading}
      style={{ fontFamily: 'var(--font-body)' }}
      {...props}
    >
      {loading ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : (
        Icon && <Icon className="w-5 h-5" />
      )}
      {children}
    </motion.button>
  )
}
