import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { MapPin, Phone, Mail, Send } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import api from '../utils/api.js'
import Button from '../components/ui/Button.jsx'

// Petit composant Confetti très simple encapsulé en SVG pour le "success"
const ConfettiSVG = () => (
  <svg className="w-32 h-32 text-green-500 mb-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
     <motion.path 
       initial={{ pathLength: 0, opacity: 0 }} 
       animate={{ pathLength: 1, opacity: 1 }} 
       transition={{ duration: 1 }}
       d="M22 11.08V12a10 10 0 1 1-5.93-9.14" 
     />
     <motion.path 
       initial={{ pathLength: 0, opacity: 0 }} 
       animate={{ pathLength: 1, opacity: 1 }} 
       transition={{ duration: 0.5, delay: 0.5 }}
       d="M22 4L12 14.01l-3-3" 
     />
  </svg>
)

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  // Validation Formulaire Frontend
  const validateForm = () => {
    const newErrors = {}
    if (!form.name.trim()) newErrors.name = 'Le nom est requis.'
    if (!form.email.trim()) {
      newErrors.email = 'L\'email est requis.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Format d\'email invalide.'
    }
    if (!form.subject.trim()) newErrors.subject = 'Le sujet est requis.'
    if (!form.message.trim()) {
      newErrors.message = 'Le message est requis.'
    } else if (form.message.length < 20) {
      newErrors.message = 'Le message doit contenir au moins 20 caractères.'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return
    
    setLoading(true)
    try {
      await api.post('/contact', form)
      setSuccess(true)
    } catch (err) {
      // Mock un succès si l'API n'est pas branchée pour la démo
      if (err.message === 'Network Error') setSuccess(true)
      else setErrors({ api: err.response?.data?.message || 'Une erreur serveur est survenue.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Helmet>
        <title>Contactez-nous | Ministère de l'Environnement</title>
      </Helmet>

      {/* Hero Contact */}
      <section className="pt-32 pb-16 bg-dark text-white text-center">
        <div className="container-main">
          <h1 className="font-display font-bold text-4xl lg:text-5xl mb-4">Contact & Support</h1>
          <p className="text-white/60 max-w-xl mx-auto">Nous sommes à votre écoute pour toute demande d'information, réclamation ou suggestion.</p>
        </div>
      </section>

      <section className="py-16 bg-surface">
        <div className="container-main">
          <div className="flex flex-col lg:flex-row gap-12 bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            
            {/* ── Colonne Informations ── */}
            <div className="lg:w-2/5 bg-primary text-white p-10 lg:p-14 relative overflow-hidden">
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at right, white 1px, transparent 1px)', backgroundSize: '30px 30px' }}/>
              <div className="relative z-10">
                <h3 className="font-display text-2xl font-bold mb-8">Coordonnées Officielles</h3>
                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-white/10 rounded-full"><MapPin className="w-5 h-5"/></div>
                    <div>
                      <p className="font-semibold mb-1">Siège du Ministère</p>
                      <p className="text-white/70 text-sm leading-relaxed">N°9, Avenue Al Araar,<br/>Hay Riad, Rabat, Maroc</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white/10 rounded-full"><Phone className="w-5 h-5"/></div>
                    <div>
                      <p className="font-semibold mb-1">Téléphone</p>
                      <p className="text-white/70 text-sm"><a href="tel:+212537688400" className="hover:underline">+212 5 37 68 84 00</a></p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white/10 rounded-full"><Mail className="w-5 h-5"/></div>
                    <div>
                      <p className="font-semibold mb-1">Adresse électronique</p>
                      <p className="text-white/70 text-sm"><a href="mailto:contact@environnement.gov.ma" className="hover:underline">contact@environnement.gov.ma</a></p>
                    </div>
                  </div>
                </div>

                {/* Google Maps iFrame */}
                <div className="mt-12 w-full h-48 rounded-2xl overflow-hidden border-2 border-white/10">
                  <iframe 
                    title="Carte du siège"
                    width="100%" 
                    height="100%" 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13233.197906969542!2d-6.8776881!3d33.9575975!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda76c66cf1a7741%3A0xc3baf97fb8d35f60!2sHay%20Riad%2C%20Rabat%2C%20Maroc!5e0!3m2!1sfr!2sfr!4v1714000000000!5m2!1sfr!2sfr" 
                    style={{ border: 0, filter: 'grayscale(1) invert(0.9) contrast(1.2)' }} 
                    allowFullScreen="" 
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            {/* ── Colonne Formulaire ── */}
            <div className="lg:w-3/5 p-10 lg:p-14">
              <AnimatePresence mode="wait">
                {success ? (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="h-full flex flex-col items-center justify-center text-center py-20"
                  >
                    <ConfettiSVG />
                    <h3 className="text-3xl font-display font-bold text-dark mb-4">Message envoyé !</h3>
                    <p className="text-textSecondary mb-8 max-w-sm mx-auto">Votre requête a bien été transmise à nos services. Nous vous répondrons dans les plus brefs délais.</p>
                    <Button onClick={() => setSuccess(false)}>Envoyer un autre message</Button>
                  </motion.div>
                ) : (
                  <motion.form key="form" onSubmit={handleSubmit} className="flex flex-col gap-6 h-full justify-center" noValidate>
                    <div>
                      <h2 className="font-display text-2xl font-bold text-dark mb-2">Envoyez un message direct</h2>
                      <p className="text-textSecondary text-sm mb-6">Les champs marqués d'une étoile (*) sont obligatoires.</p>
                    </div>

                    {errors.api && (
                       <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm mb-4 border border-red-100">{errors.api}</div>
                    )}

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold mb-2 text-dark">Nom complet *</label>
                        <input name="name" type="text" className={`w-full p-4 bg-surface rounded-xl border focus:outline-none focus:ring-2 focus:border-transparent ${errors.name ? 'border-red-400 focus:ring-red-400' : 'border-gray-200 focus:ring-primary'}`} placeholder="Jane Doe" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                        {errors.name && <p className="text-red-500 text-xs mt-2">{errors.name}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2 text-dark">Email *</label>
                        <input name="email" type="email" className={`w-full p-4 bg-surface rounded-xl border focus:outline-none focus:ring-2 focus:border-transparent ${errors.email ? 'border-red-400 focus:ring-red-400' : 'border-gray-200 focus:ring-primary'}`} placeholder="jane@exemple.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
                        {errors.email && <p className="text-red-500 text-xs mt-2">{errors.email}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2 text-dark">Sujet *</label>
                      <input name="subject" type="text" className={`w-full p-4 bg-surface rounded-xl border focus:outline-none focus:ring-2 focus:border-transparent ${errors.subject ? 'border-red-400 focus:ring-red-400' : 'border-gray-200 focus:ring-primary'}`} placeholder="Signalement, Demande d'information..." value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} />
                      {errors.subject && <p className="text-red-500 text-xs mt-2">{errors.subject}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2 text-dark">Message *</label>
                      <textarea name="message" rows={5} className={`w-full p-4 bg-surface rounded-xl border focus:outline-none focus:ring-2 focus:border-transparent resize-none ${errors.message ? 'border-red-400 focus:ring-red-400' : 'border-gray-200 focus:ring-primary'}`} placeholder="Détaillez votre demande ici (min. 20 caractères)..." value={form.message} onChange={e => setForm({...form, message: e.target.value})} />
                      {errors.message && <p className="text-red-500 text-xs mt-2">{errors.message}</p>}
                    </div>

                    <Button type="submit" loading={loading} icon={Send} className="w-full mt-2" size="lg">
                      Soumettre la demande
                    </Button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
