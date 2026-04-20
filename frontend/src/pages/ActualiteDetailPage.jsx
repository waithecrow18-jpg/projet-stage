import { Helmet } from 'react-helmet-async'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Calendar, Tag, ArrowLeft, Share2 } from 'lucide-react'
import { useApi } from '../hooks/useApi.js'
import LoadingSpinner from '../components/ui/LoadingSpinner.jsx'
import ErrorMessage from '../components/ui/ErrorMessage.jsx'
import Button from '../components/ui/Button.jsx'
import TiltCard from '../components/ui/TiltCard.jsx'

export default function ActualiteDetailPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  
  // Requête API pour récupérer les détails
  // On suppose que l'API renvoie { data: article, related: [...] }
  const { data, loading, error } = useApi(`/actualites/${slug}`)
  
  const article = data?.data || data || null
  const related = data?.related || []

  // Mock visuel au besoin
  const fallbackImage = 'https://images.unsplash.com/photo-1473448928818-208e3ebc03e1?auto=format&fit=crop&q=80'

  if (loading) return <LoadingSpinner fullScreen />
  if (error) return <div className="py-40"><ErrorMessage message={error} /></div>
  if (!article) return <div className="py-40 text-center font-display text-2xl">Article introuvable.</div>

  return (
    <>
      <Helmet>
        <title>{article.title || article.titre} | Actualités</title>
        <meta name="description" content={article.excerpt || article.extrait} />
      </Helmet>

      {/* ── Hero Arrière-plan ── */}
      <section className="relative h-[60vh] min-h-[450px] flex items-end pb-16">
        <div className="absolute inset-0 bg-dark">
          <img
            src={article.image || fallbackImage}
            alt={article.title || article.titre}
            className="w-full h-full object-cover opacity-40 mix-blend-overlay"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-transparent" />
        
        <div className="container-main relative z-10 w-full">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate('/actualites')}
            className="flex items-center gap-2 text-white/70 hover:text-white mb-6 text-sm font-semibold transition-colors"
          >
            <ArrowLeft className="w-5 h-5" /> Retour aux actualités
          </motion.button>
          
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <span className="inline-block px-3 py-1 bg-primary text-white text-xs font-bold rounded-full mb-4">
               {article.category || article.categorie}
            </span>
            <h1 className="font-display text-4xl lg:text-6xl font-extrabold text-white leading-tight max-w-4xl">
              {article.title || article.titre}
            </h1>
          </motion.div>
        </div>
      </section>

      {/* ── Main Content ── */}
      <section className="py-16 bg-surface">
        <div className="container-main">
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Colonne gauche (Contenu) */}
            <div className="lg:w-2/3">
              <div 
                 className="prose prose-lg prose-emerald max-w-none bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100"
                 dangerouslySetInnerHTML={{ __html: article.content || '<p>Contenu non défini pour cet article.</p>' }}
              />
            </div>

            {/* Colonne droite (Sidebar) */}
            <div className="lg:w-1/3">
              <div className="sticky top-28 bg-white p-6 rounded-3xl shadow-sm border border-gray-100 mb-8">
                <h3 className="font-display font-bold text-lg mb-4 border-b pb-4">À propos</h3>
                <div className="space-y-4 font-body text-sm text-textSecondary">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-primary" />
                    <span>Publié le {article.date || article.created_at}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Tag className="w-5 h-5 text-primary" />
                    <span>{article.category || article.categorie}</span>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t">
                  <Button variant="outline" className="w-full flex justify-center !font-bold" icon={Share2}>
                    Partager l'article
                  </Button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Articles liés (optionnel) ── */}
      {related.length > 0 && (
         <section className="py-16 bg-white border-t border-gray-100">
            <div className="container-main">
               <h2 className="font-display font-bold text-3xl mb-8">Articles similaires</h2>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 {related.map(rel => (
                    <TiltCard key={rel.id} intensity={5} className="group cursor-pointer p-4 border border-gray-100">
                       <a href={`/actualites/${rel.slug}`} className="flex flex-col h-full space-y-3">
                         <div className="h-32 rounded-xl overflow-hidden bg-gray-100">
                            {rel.image && <img src={rel.image} className="w-full h-full object-cover" />}
                         </div>
                         <h4 className="font-display font-bold group-hover:text-primary transition-colors line-clamp-2">{rel.title}</h4>
                         <p className="text-xs text-textSecondary">{rel.date}</p>
                       </a>
                    </TiltCard>
                 ))}
               </div>
            </div>
         </section>
      )}
    </>
  )
}
