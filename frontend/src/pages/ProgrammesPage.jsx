import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'
import { Leaf, Wind, TreePine, Recycle, ChevronDown, CheckCircle } from 'lucide-react'

// Utilisation des données statiques pour le front-end avant liaison à l'API complète
const PROGRAMMES = [
  {
    id: 1,
    nom: 'Stratégie Nationale de Développement Durable (SNDD)',
    desc: 'Cadre intégré pour le développement durable à horizon 2030, articulant les dimensions économique, sociale et environnementale. Conçue pour assurer la transition du Maroc vers une économie verte et inclusive.',
    icone: Leaf,
    couleur: '#0F6E56',
    bg: 'rgba(15,110,86,0.08)',
    statut: 'Actif',
    annee: 'Depuis 2017',
    slug: 'sndd'
  },
  {
    id: 2,
    nom: 'Lutte contre le Réchauffement Climatique',
    desc: 'Réduction des émissions GES de 45,5% d\'ici 2030 et adaptation aux impacts climatiques à travers une transition énergétique ambitieuse. Ce programme inclut le déploiement massif des énergies renouvelables.',
    icone: Wind,
    couleur: '#185FA5',
    bg: 'rgba(24,95,165,0.08)',
    statut: 'En cours',
    annee: 'Depuis 2021',
    slug: 'climat'
  },
  {
    id: 3,
    nom: 'Conservation de la Biodiversité',
    desc: 'Protection et restauration des écosystèmes terrestres et marins du Maroc, préservation des espèces endémiques. Multiplication des aires protégées et des parcs nationaux.',
    icone: TreePine,
    couleur: '#1D9E75',
    bg: 'rgba(29,158,117,0.08)',
    statut: 'Actif',
    annee: 'Depuis 2016',
    slug: 'biodiversite'
  },
  {
    id: 4,
    nom: 'Programme National Gestion des Déchets (PNDM)',
    desc: 'Modernisation de la gestion des déchets ménagers à l\'échelle nationale et développement de l\'économie circulaire avec des filières de tri et valorisation innovantes.',
    icone: Recycle,
    couleur: '#BA7517',
    bg: 'rgba(186,117,23,0.08)',
    statut: 'En cours',
    annee: 'Depuis 2008',
    slug: 'pndm'
  }
]

function ProgrammeCard({ prog }) {
  const [expanded, setExpanded] = useState(false)
  const Icon = prog.icone

  return (
    <div className="relative pl-12 pb-14 last:pb-0">
      {/* Ligne Timeline verticale */}
      <div className="absolute top-0 left-5 bottom-0 w-0.5 bg-gray-200" />
      {/* Point de la Timeline */}
      <div 
        className="absolute top-0 left-3 w-4 h-4 rounded-full border-4 border-white shadow-sm z-10" 
        style={{ backgroundColor: prog.couleur }} 
      />

      <motion.div
        layout
        className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="p-6 flex items-start gap-4">
          <div className="p-3 rounded-xl flex-shrink-0" style={{ backgroundColor: prog.bg }}>
            <Icon className="w-6 h-6" style={{ color: prog.couleur }} />
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1" style={{ color: prog.couleur, backgroundColor: prog.bg }}>
                <CheckCircle className="w-3.5 h-3.5" /> {prog.statut}
              </span>
              <span className="text-xs text-textSecondary font-medium">{prog.annee}</span>
            </div>
            <h3 className="font-display font-bold text-lg lg:text-xl text-dark pr-8">{prog.nom}</h3>
          </div>
          
          {/* Bouton Expand */}
          <motion.div animate={{ rotate: expanded ? 180 : 0 }} className="p-2 bg-gray-50 rounded-full mt-2">
            <ChevronDown className="w-5 h-5 text-gray-500" />
          </motion.div>
        </div>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="px-6 pb-6 pt-0 border-t border-gray-50 mt-2">
                <p className="text-textSecondary leading-relaxed text-sm pt-4">
                  {prog.desc}
                </p>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <a href={`/programmes/${prog.slug}`} className="text-sm font-semibold hover:underline" style={{ color: prog.couleur }}>
                    Découvrir ce programme en détail →
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

export default function ProgrammesPage() {
  return (
    <>
      <Helmet>
        <title>Stratégies & Programmes | Ministère de l'Environnement</title>
      </Helmet>

      <section className="pt-40 pb-20 bg-surface/50 text-center">
        <div className="container-main">
          <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide">
            Action Gouvernementale
          </span>
          <h1 className="font-display text-4xl lg:text-5xl font-extrabold text-dark mt-6 mb-6">
            Nos stratégies à long terme
          </h1>
          <p className="max-w-2xl mx-auto text-textSecondary text-lg font-body">
            Le Maroc a placé la protection de l'environnement au centre de ses politiques publiques à travers des programmes structurants.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white min-h-[500px]">
        <div className="container-main max-w-3xl">
           <div className="relative">
              {PROGRAMMES.map(prog => (
                 <ProgrammeCard key={prog.id} prog={prog} />
              ))}
           </div>
        </div>
      </section>
    </>
  )
}
