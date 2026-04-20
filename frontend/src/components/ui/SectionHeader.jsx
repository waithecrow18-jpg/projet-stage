import { motion } from 'framer-motion'
import Badge from './Badge.jsx'

/**
 * SectionHeader.jsx — En-tête de section standard avec badge, titre, sous-titre et barre décorative.
 *
 * @param {object} props
 * @param {string} [props.badge] - Texte du petit badge optionnel
 * @param {string} props.title - Titre principal
 * @param {string} [props.subtitle] - Paragraphe descriptif
 * @param {'left'|'center'} [props.align='left'] - Alignement du contenu
 */
export default function SectionHeader({ badge, title, subtitle, align = 'left' }) {
  const alignmentClasses = align === 'center' ? 'items-center text-center mx-auto' : 'items-start text-left'
  
  return (
    <div className={`flex flex-col mb-12 ${alignmentClasses}`}>
      {/* Badge optionnel */}
      {badge && (
        <Badge 
          label={badge} 
          color="green" 
          className="mb-4 tracking-wider uppercase bg-primary/10 text-primary" 
        />
      )}

      {/* Titre avec font Display */}
      <h2
        className="font-display font-bold text-dark mb-4 leading-tight"
        style={{ fontSize: '2.5rem' }}
      >
        {title}
      </h2>

      {/* Soulignement décoratif animé */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
        style={{ originX: align === 'center' ? 0.5 : 0 }}
        className="h-1 bg-primary rounded-full mb-6 w-16"
      />

      {/* Sous-titre */}
      {subtitle && (
        <p
          className="text-textSecondary"
          style={{ fontFamily: 'var(--font-body)', fontWeight: 300, maxWidth: '600px' }}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
