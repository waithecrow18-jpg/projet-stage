import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, Calendar, ChevronLeft, ChevronRight } from 'lucide-react'
import { useApi } from '../hooks/useApi.js'
import TiltCard from '../components/ui/TiltCard.jsx'
import Button from '../components/ui/Button.jsx'
import ErrorMessage from '../components/ui/ErrorMessage.jsx'

const CATEGORIES = ['Tous', 'News', 'Événements', 'Communiqués']

/** Skeleton Loading Component */
function NewsSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm animate-pulse flex flex-col h-full border border-gray-100">
      <div className="h-48 bg-gray-200" />
      <div className="p-6 flex-1 flex flex-col gap-3">
        <div className="h-4 bg-gray-200 rounded w-1/4 mb-2" />
        <div className="h-6 bg-gray-200 rounded w-full" />
        <div className="h-6 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-full mt-4" />
        <div className="h-4 bg-gray-200 rounded w-5/6" />
      </div>
    </div>
  )
}

export default function ActualitesPage() {
  const [activeCat, setActiveCat] = useState('Tous')
  
  // Utilisation du Hook useApi avec pagination et filtre
  const { data, loading, error, params, setParams } = useApi('/actualites', {
    page: 1,
    categorie: 'Tous',
  })

  // Gestion du retour d'une structure non paginée (mock initial) vers une structure paginée (Laravel)
  const articles = data?.data || data || [] 
  const totalPages = data?.last_page || 1
  const currentPage = params.page

  const handleCategoryChange = (cat) => {
    setActiveCat(cat)
    setParams({ page: 1, categorie: cat }) // Reset page à 1
  }

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setParams({ ...params, page: newPage })
      window.scrollTo({ top: 400, behavior: 'smooth' })
    }
  }

  return (
    <>
      <Helmet>
        <title>Actualités & Communiqués | Ministère de l'Environnement</title>
      </Helmet>

      {/* ── Hero Section (Fond Vert SVG) ── */}
      <section className="pt-40 pb-20 text-center relative bg-primary">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at center, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="container-main relative z-10 text-white">
          <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">Actualités & Communiqués</h1>
          <p className="max-w-2xl mx-auto text-white/80 font-body text-lg">Retrouvez les dernières annonces, événements et efforts du Ministère en matière de développement durable.</p>
        </div>
      </section>

      <section className="py-16 bg-surface min-h-[500px]">
        <div className="container-main">

          {/* ── Filtres ── */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {CATEGORIES.map((cat) => {
              const isActive = activeCat === cat
              return (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`relative px-5 py-2 rounded-full font-semibold text-sm transition-colors ${
                    isActive ? 'text-white' : 'text-primary bg-primary/10 hover:bg-primary/20'
                  }`}
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="cat-active"
                      className="absolute inset-0 bg-primary rounded-full -z-10"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  {cat}
                </button>
              )
            })}
          </div>

          {/* ── Content ── */}
          {error ? (
            <ErrorMessage title="Impossible de charger les actualités" message={error} />
          ) : (
            <>
              {/* Grille */}
              <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-16">
                <AnimatePresence mode="popLayout">
                  {loading
                    ? Array.from({ length: 6 }).map((_, i) => <NewsSkeleton key={`skel-${i}`} />)
                    : articles.map((article, i) => (
                        <motion.div
                          key={article.id || article.slug}
                          layout
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ duration: 0.3, delay: i * 0.05 }}
                          className="h-full"
                        >
                          <TiltCard intensity={8} className="h-full flex flex-col group block cursor-pointer">
                            <div className="h-48 relative overflow-hidden bg-primaryMid/10">
                               <img
                                  src={article.image ? (article.image.startsWith('http') ? article.image : `http://localhost:8000${article.image}`) : 'https://images.unsplash.com/photo-1473448928818-208e3ebc03e1?auto=format&fit=crop&q=80'}
                                  alt={article.title || article.titre}
                                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                               />
                               <span className="absolute top-4 left-4 bg-white/20 backdrop-blur-md text-white px-3 py-1 text-xs font-semibold rounded-full">
                                  {article.category || article.categorie}
                               </span>
                            </div>
                            <div className="p-6 flex-1 flex flex-col">
                               <p className="flex items-center gap-1.5 text-xs text-textSecondary mb-3">
                                  <Calendar className="w-3.5 h-3.5" /> {article.date || article.created_at}
                               </p>
                               <h3 className="font-display font-semibold text-lg text-dark mb-3 line-clamp-2">
                                  {article.title || article.titre}
                               </h3>
                               <p className="text-textSecondary text-sm line-clamp-3 mb-4 flex-1">
                                  {article.excerpt || article.extrait}
                               </p>
                               <a href={`/actualites/${article.slug}`} className="text-primary font-semibold text-sm flex items-center gap-1 mt-auto hover:gap-2 transition-all">
                                  Lire la suite <ArrowRight className="w-4 h-4" />
                               </a>
                            </div>
                          </TiltCard>
                        </motion.div>
                      ))}
                </AnimatePresence>
              </div>

              {/* Pagination */}
              {!loading && articles.length === 0 && (
                <div className="text-center text-textSecondary py-10">Aucune actualité trouvée dans cette catégorie.</div>
              )}
              
              {!loading && totalPages > 1 && (
                <div className="flex justify-center items-center gap-4">
                  <Button
                    variant="outline"
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                    icon={ChevronLeft}
                  >
                    Précédent
                  </Button>
                  <span className="text-sm font-semibold text-dark font-body">
                    Page {currentPage} sur {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                  >
                     Suivant
                     <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  )
}
