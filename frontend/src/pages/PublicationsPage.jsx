import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { FileText, Download, Filter } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useApi } from '../hooks/useApi.js'
import LoadingSpinner from '../components/ui/LoadingSpinner.jsx'
import ErrorMessage from '../components/ui/ErrorMessage.jsx'
import Button from '../components/ui/Button.jsx'

export default function PublicationsPage() {
  const [activeType, setActiveType] = useState('Tous')
  const { data, loading, error, params, setParams } = useApi('/publications', { page: 1 })
  
  const publications = data?.data || data || []
  const TYPES = ['Tous', 'Rapport annuel', 'Document officiel', 'Rapport technique', 'Guide pratique']

  const handleFilter = (type) => {
    setActiveType(type)
    setParams({ page: 1, type: type === 'Tous' ? '' : type })
  }

  return (
    <>
      <Helmet>
        <title>Publications & Rapports | Ministère de l'Environnement</title>
      </Helmet>

      {/* Header compact */}
      <section className="pt-32 pb-12 bg-surface text-center">
        <div className="container-main max-w-3xl">
          <h1 className="font-display font-extrabold text-4xl text-dark mb-4">Publications Officielles</h1>
          <p className="text-textSecondary font-body">Parcourez, lisez et téléchargez les stratégies, bilans, cadres légaux et rapports techniques de l'action environnementale.</p>
        </div>
      </section>

      <section className="py-12 bg-white min-h-[60vh]">
        <div className="container-main flex flex-col md:flex-row gap-10 items-start">
          
          {/* Sidebar Filtres */}
          <div className="w-full md:w-64 flex-shrink-0 bg-surface/50 p-6 rounded-2xl border border-gray-100">
             <div className="flex items-center gap-2 font-display font-bold text-dark mb-6">
                <Filter className="w-5 h-5 text-primary" /> Filtrer
             </div>
             <div className="flex flex-col gap-2">
               {TYPES.map(type => (
                 <button
                   key={type}
                   onClick={() => handleFilter(type)}
                   className={`text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${activeType === type ? 'bg-primary text-white shadow-sm' : 'text-textSecondary hover:bg-white hover:text-dark'}`}
                 >
                   {type}
                 </button>
               ))}
             </div>
          </div>

          {/* Core Content */}
          <div className="flex-1 w-full">
            {error ? (
              <ErrorMessage message={error} />
            ) : loading ? (
              <div className="py-20"><LoadingSpinner text="Recherche des publications..." /></div>
            ) : (
              <div className="grid gap-4 lg:grid-cols-2">
                 <AnimatePresence>
                   {publications.length === 0 ? (
                      <p className="py-10 text-textSecondary">Aucun document ne correspond à ce filtre.</p>
                   ) : publications.map((pub, i) => (
                      <motion.div
                         layout
                         initial={{ opacity: 0, y: 10 }}
                         animate={{ opacity: 1, y: 0 }}
                         exit={{ opacity: 0, scale: 0.95 }}
                         transition={{ delay: i * 0.05 }}
                         key={pub.id}
                         className="flex items-start gap-4 p-5 rounded-2xl border border-gray-100 hover:shadow-md hover:border-emerald-100 transition-all group bg-white"
                      >
                         <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center flex-shrink-0">
                           <FileText className="w-6 h-6 text-red-500" />
                         </div>
                         <div className="flex-1 min-w-0">
                           <span className="text-[10px] uppercase font-bold tracking-wider text-red-500 bg-red-50 px-2 py-0.5 rounded-md inline-block mb-2">
                             {pub.type} • {pub.date || pub.annee}
                           </span>
                           <h3 className="font-display font-bold text-dark text-sm mb-3 leading-snug line-clamp-2">
                             {pub.title}
                           </h3>
                           <Button variant="outline" size="sm" icon={Download} className="w-full sm:w-auto text-xs py-1.5 hover:shadow-sm">
                             Télécharger PDF
                           </Button>
                         </div>
                      </motion.div>
                   ))}
                 </AnimatePresence>
              </div>
            )}
          </div>

        </div>
      </section>
    </>
  )
}
