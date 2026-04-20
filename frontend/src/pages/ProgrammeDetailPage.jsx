import { Helmet } from 'react-helmet-async'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Target, Globe, FileCheck } from 'lucide-react'
import Button from '../components/ui/Button.jsx'

export default function ProgrammeDetailPage() {
  const { slug } = useParams()
  const navigate = useNavigate()

  // Vue Detail factice sans utiliser l'API, car le but est la structure visuelle 
  // (Le composant useApi peut être branché au besoin `useApi('/programmes/'+slug)`)
  
  return (
    <>
      <Helmet>
        <title>Détails du Programme | Ministère</title>
      </Helmet>
      
      <section className="pt-40 pb-20 bg-surface border-b border-gray-100">
        <div className="container-main max-w-4xl">
          <button 
            onClick={() => navigate('/programmes')}
            className="flex items-center gap-2 text-primary hover:text-primaryMid font-semibold text-sm mb-8"
          >
            <ArrowLeft className="w-4 h-4" /> Retour aux programmes
          </button>

          <span className="bg-blue-100 text-blue-700 font-bold px-3 py-1 text-xs rounded-full uppercase">
            En Exécution
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-extrabold text-dark mt-4 mb-6">
            Détails de l'axe : {slug.replace('-', ' ')}
          </h1>
          <p className="text-xl text-textSecondary font-light leading-relaxed">
            Ce programme constitue un pilier majeur de l'approche marocaine en matière de développement territorial et de préservation environnementale.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white min-h-[400px]">
        <div className="container-main max-w-4xl grid md:grid-cols-3 gap-10">
          <div className="md:col-span-2 prose prose-lg prose-emerald">
            <h2>Contexte et Objectifs</h2>
            <p>Face aux défis mondiaux, le Maroc s'engage avec une vision claire. Les axes principaux tournent autour de la résilience, l'économie circulaire, et la préservation de la biodiversité.</p>
            <ul>
              <li>Amélioration du cadre de vie des citoyens.</li>
              <li>Soutien technique et financier aux collectivités locales.</li>
              <li>Création d'emplois verts et valorisation des filières écologiques.</li>
            </ul>
            <p>Le financement est assuré conjointement par le fonds national pour l'environnement (FNE) et nos partenaires internationaux (Banque Mondiale, UE, etc).</p>
          </div>
          
          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
               <h3 className="font-bold font-display text-lg mb-4 flex items-center gap-2"><Target className="w-5 h-5 text-primary"/> Indicateurs clés</h3>
               <ul className="space-y-3 text-sm text-textSecondary">
                 <li className="flex justify-between border-b pb-2"><span>Taux réalisation</span><strong className="text-dark">65%</strong></li>
                 <li className="flex justify-between border-b pb-2"><span>Bénéficiaires</span><strong className="text-dark">2.4 Millions</strong></li>
                 <li className="flex justify-between"><span>Budget engagé</span><strong className="text-dark">800M MAD</strong></li>
               </ul>
            </div>
            
            <Button 
               className="w-full justify-center" 
               icon={FileCheck}
               onClick={() => {
                 const blob = new Blob(["Bilan du programme " + slug + "\n\nCeci est un document generé pour la demonstration de la maquette."], { type: "text/plain" });
                 const url = URL.createObjectURL(blob);
                 const a = document.createElement('a');
                 a.href = url;
                 a.download = `bilan-${slug}.txt`; // On utilise un .txt factice pour l'exemple
                 a.click();
                 URL.revokeObjectURL(url);
               }}
            >
               Télécharger Bilan (PDF)
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}

