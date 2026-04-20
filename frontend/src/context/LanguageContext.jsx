import { createContext, useContext, useState, useEffect, useCallback } from 'react'

/* -------------------------------------------------------
   Context definition
------------------------------------------------------- */
const LanguageContext = createContext(null)

/* -------------------------------------------------------
   Supported languages
------------------------------------------------------- */
const SUPPORTED_LANGS = /** @type {const} */ (['fr', 'ar'])
const DEFAULT_LANG    = 'fr'

/* -------------------------------------------------------
   Provider
------------------------------------------------------- */
export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    // Persist language across sessions
    const saved = localStorage.getItem('app_lang')
    return SUPPORTED_LANGS.includes(saved) ? saved : DEFAULT_LANG
  })

  const isRTL = language === 'ar'

  /** Update <html> attributes and persist to localStorage */
  useEffect(() => {
    document.documentElement.lang = language
    document.documentElement.dir  = isRTL ? 'rtl' : 'ltr'
    localStorage.setItem('app_lang', language)
  }, [language, isRTL])

  /** Stable setter — validates input before updating */
  const setLanguage = useCallback((lang) => {
    if (SUPPORTED_LANGS.includes(lang)) {
      setLanguageState(lang)
    } else {
      console.warn(`[LanguageContext] Unsupported language: "${lang}". Supported: ${SUPPORTED_LANGS.join(', ')}`)
    }
  }, [])

  /** Toggle between fr and ar */
  const toggleLanguage = useCallback(() => {
    setLanguageState(prev => (prev === 'fr' ? 'ar' : 'fr'))
  }, [])

  const value = {
    language,
    setLanguage,
    toggleLanguage,
    isRTL,
    supportedLangs: SUPPORTED_LANGS,
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

/* -------------------------------------------------------
   Hook
------------------------------------------------------- */
export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) {
    throw new Error('useLanguage must be used inside <LanguageProvider>')
  }
  return ctx
}

export default LanguageContext
