/**
 * HomePage.jsx — Page d'accueil du portail Environnement Maroc
 * ─────────────────────────────────────────────────────────────
 * Orchestre toutes les sections dans l'ordre défini par la DA.
 */

import { Helmet } from 'react-helmet-async'

import HeroSection        from '../components/sections/HeroSection.jsx'
import StatsCounter       from '../components/sections/StatsCounter.jsx'
import ActualitesSection  from '../components/sections/ActualitesSection.jsx'
import ProgrammesSection  from '../components/sections/ProgrammesSection.jsx'
import DataVizSection     from '../components/sections/DataVizSection.jsx'
import PublicationsSection from '../components/sections/PublicationsSection.jsx'
import PartenairesSection from '../components/sections/PartenairesSection.jsx'
import CtaSection         from '../components/sections/CtaSection.jsx'

/**
 * @component HomePage
 * @description Page d'accueil principale — composition de toutes les sections.
 */
export default function HomePage() {
  return (
    <>
      {/* ── SEO ── */}
      <Helmet>
        <title>Département de l'Environnement — Portail Officiel | Maroc</title>
        <meta
          name="description"
          content="Le Département de l'Environnement du Maroc œuvre pour la protection de la nature, la lutte contre le changement climatique et le développement durable. Découvrez nos programmes, actualités et publications officielles."
        />
        <meta property="og:title" content="Département de l'Environnement — Portail Officiel | Maroc" />
        <meta property="og:description" content="Portail officiel du Département de l'Environnement du Royaume du Maroc." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://www.environnement.gov.ma/" />
      </Helmet>

      <main id="main-content">
        {/* 1 — Globe 3D + CTAs */}
        <HeroSection />

        {/* 2 — 4 statistiques clés */}
        <StatsCounter />

        {/* 3 — Dernières actualités avec TiltCard */}
        <ActualitesSection />

        {/* 4 — Programmes stratégiques */}
        <ProgrammesSection />

        {/* 5 — Visualisation de données SVG animées */}
        <DataVizSection />

        {/* 6 — Publications officielles */}
        <PublicationsSection />

        {/* 7 — Partenaires défilement infini */}
        <PartenairesSection />

        {/* 8 — CTA final */}
        <CtaSection />
      </main>
    </>
  )
}
