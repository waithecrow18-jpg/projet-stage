import { motion, AnimatePresence } from 'framer-motion'
import { Globe } from 'lucide-react'
import { useLanguage } from '../../context/LanguageContext.jsx'

/**
 * LanguageSwitcher.jsx — Permet de changer la langue du site avec Context (FR/AR).
 */
export default function LanguageSwitcher({ className = '' }) {
  const { language, toggleLanguage } = useLanguage()

  // On peut s'assurer de mettre à jour le document à l'appui.
  // Cependant, le LanguageContext gère déjà document.dir et document.lang via useEffect.
  
  return (
    <motion.button
      onClick={toggleLanguage}
      whileTap={{ scale: 0.9 }}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/20 hover:bg-white/10 text-white text-xs font-semibold overflow-hidden ${className}`}
      aria-label="Changer la langue"
    >
      <Globe className="w-4 h-4" />
      
      <div className="relative w-4 h-4 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.span
            key={language}
            initial={{ y: 20, opacity: 0, rotateX: -90 }}
            animate={{ y: 0, opacity: 1, rotateX: 0 }}
            exit={{ y: -20, opacity: 0, rotateX: 90 }}
            transition={{ duration: 0.3 }}
            className="absolute"
          >
            {language === 'fr' ? 'FR' : 'AR'}
          </motion.span>
        </AnimatePresence>
      </div>
    </motion.button>
  )
}
