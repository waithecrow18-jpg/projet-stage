import { Helmet } from 'react-helmet-async'
import { ShieldCheck, Lightbulb, Zap, TreePine } from 'lucide-react'
import SectionHeader from '../components/ui/SectionHeader.jsx'
import AnimatedSection from '../components/ui/AnimatedSection.jsx'

export default function MinisterePage() {
  const values = [
    { icon: ShieldCheck, title: 'Intégrité', desc: 'Transparence et honnêteté dans toutes nos actions publiques.' },
    { icon: Lightbulb, title: 'Innovation', desc: 'Recherche permanente de solutions résilientes et modernes.' },
    { icon: Zap, title: 'Efficacité', desc: 'Des résultats tangibles qui impactent positivement les citoyens.' },
    { icon: TreePine, title: 'Durabilité', desc: 'Garantir les droits des générations futures sur les ressources.' },
  ]

  return (
    <>
      <Helmet>
        <title>Le Ministère | Portail Officiel</title>
      </Helmet>

      {/* ── Hero Arrière-plan ── */}
      <section className="relative pt-40 pb-24 flex items-center bg-dark overflow-hidden">
        <div className="absolute inset-0 opacity-20">
           <img 
             src="https://images.unsplash.com/photo-1518002171953-a080ee817e1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
             alt="Forêt Atlas" 
             className="w-full h-full object-cover mix-blend-luminosity" 
           />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-dark to-dark/80" />
        
        <div className="container-main relative z-10 text-center">
          <span className="inline-block border border-white/20 px-4 py-1.5 rounded-full text-xs font-bold text-white uppercase tracking-widest mb-6 bg-white/5 backdrop-blur-sm">Institutionnel</span>
          <h1 className="font-display text-5xl md:text-7xl font-extrabold text-white mb-6">Le Ministère</h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto font-light">Structure, missions et cadre juridique de l'action pour le développement durable au Maroc.</p>
        </div>
      </section>

      {/* ── Mission & Vision ── */}
      <section className="py-24 bg-surface relative z-20 -mt-8 rounded-t-[3rem]">
        <div className="container-main">
          <div className="grid md:grid-cols-2 gap-8">
            <AnimatedSection className="bg-white p-10 lg:p-14 rounded-3xl shadow-sm border border-gray-100">
              <SectionHeader title="Notre Mission" align="left" badge="Mandat" />
              <p className="text-textSecondary leading-relaxed text-lg">
                Le Ministère a pour mission principale d'élaborer et de mettre en œuvre la politique 
                gouvernementale dans les domaines de l'environnement et du développement durable. 
                Il veille à la coordination transversale avec l'ensemble des départements ministériels, 
                acteurs institutionnels et la société civile pour préserver les écosystèmes.
              </p>
            </AnimatedSection>
            
            <AnimatedSection className="bg-gradient-to-br from-primary to-primaryMid text-white p-10 lg:p-14 rounded-3xl shadow-lg shadow-primary/20">
              <div className="mb-6"><span className="bg-white/20 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Aspiration</span></div>
              <h2 className="font-display font-bold text-4xl mb-6">Notre Vision</h2>
              <div className="w-12 h-1 bg-white/40 mb-8 rounded-full" />
              <p className="text-white/90 leading-relaxed text-lg font-light">
                Nous aspirons à positionner le Maroc comme modèle régional de résilience écologique et climatique. Un développement harmonieux, inclusif et durable, plaçant le citoyen au cœur de toutes nos actions stratégiques visant à conjuguer croissance économique et viabilité environnementale.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── Nos Valeurs ── */}
      <section className="py-20 bg-white">
        <div className="container-main">
          <SectionHeader title="Nos Valeurs" align="center" subtitle="Les principes qui guident notre action publique au quotidien." />
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {values.map((val, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                 <div className="p-8 text-center rounded-3xl bg-surface border border-gray-50 h-full hover:shadow-lg transition-all group hover:-translate-y-1">
                   <div className="w-16 h-16 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary transition-all duration-300">
                      <val.icon className="w-8 h-8 text-primary group-hover:text-white transition-colors" />
                   </div>
                   <h3 className="font-display font-bold text-xl text-dark mb-3">{val.title}</h3>
                   <p className="text-sm text-textSecondary leading-relaxed">{val.desc}</p>
                 </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
