/**
 * HeroSection.jsx — Section héro avec globe 3D React Three Fiber
 * ───────────────────────────────────────────────────────────────
 * Layout 2 colonnes desktop (texte 45% | canvas3D 55%)
 * Layout 1 colonne mobile (texte dessus, canvas 40vh dessous)
 */

import { Suspense, useRef, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

// Three.js / R3F
import { Canvas, useFrame } from '@react-three/fiber'
import { Sphere, Torus, OrbitControls, Environment, Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

/* ── Particle cloud ───────────────────────────────────────── */
function ParticleCloud() {
  const ref = useRef()

  // 300 points aléatoires dans un shell sphérique rayon 4–8
  const positions = useMemo(() => {
    const arr = new Float32Array(300 * 3)
    for (let i = 0; i < 300; i++) {
      const r     = 4 + Math.random() * 4
      const theta = Math.random() * Math.PI * 2
      const phi   = Math.acos(2 * Math.random() - 1)
      arr[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      arr[i * 3 + 2] = r * Math.cos(phi)
    }
    return arr
  }, [])

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.05
  })

  return (
    <Points ref={ref} positions={positions} stride={3}>
      <PointMaterial
        color="#9FE1CB"
        size={0.015}
        sizeAttenuation
        transparent
        opacity={0.7}
        depthWrite={false}
      />
    </Points>
  )
}

/* ── Globe scene ──────────────────────────────────────────── */
function GlobeScene() {
  const globeRef  = useRef()
  const ring1Ref  = useRef()
  const ring2Ref  = useRef()

  useFrame((_, delta) => {
    if (globeRef.current)  globeRef.current.rotation.y  += delta * 0.12
    if (ring1Ref.current)  ring1Ref.current.rotation.z  += delta * 0.08
    if (ring2Ref.current)  ring2Ref.current.rotation.z  -= delta * 0.06
  })

  return (
    <>
      {/* Lumières */}
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]}   intensity={1.2} color="#9FE1CB" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#185FA5" />

      {/* Globe */}
      <mesh ref={globeRef}>
        <Sphere args={[1.8, 64, 64]}>
          <meshStandardMaterial
            color="#1D9E75"
            roughness={0.4}
            metalness={0.2}
          />
        </Sphere>
      </mesh>

      {/* Anneau 1 */}
      <mesh ref={ring1Ref} rotation={[1.2, 0, 0.3]}>
        <Torus args={[2.4, 0.04, 8, 100]}>
          <meshBasicMaterial color="#9FE1CB" transparent opacity={0.5} />
        </Torus>
      </mesh>

      {/* Anneau 2 */}
      <mesh ref={ring2Ref} rotation={[-0.8, 0.5, 0]}>
        <Torus args={[2.8, 0.02, 8, 100]}>
          <meshBasicMaterial color="#185FA5" transparent opacity={0.3} />
        </Torus>
      </mesh>

      {/* Nuage de particules */}
      <ParticleCloud />

      {/* Contrôles */}
      <OrbitControls
        autoRotate
        autoRotateSpeed={0.5}
        enableZoom={false}
        enablePan={false}
      />

      {/* Environnement lumière */}
      <Environment preset="city" />
    </>
  )
}

/* ── WebGL Fallback ───────────────────────────────────────── */
function GlobeFallback() {
  return (
    <motion.div
      className="w-full h-full flex items-center justify-center"
      style={{
        background: 'radial-gradient(circle at center, #1D9E75 0%, #0F6E56 45%, #1C2B28 100%)',
        borderRadius: '50%',
        maxWidth: 400,
        maxHeight: 400,
        margin: 'auto',
      }}
      animate={{ opacity: [0.7, 1, 0.7] }}
      transition={{ duration: 3, repeat: Infinity }}
    />
  )
}

/* ── Text side variants ───────────────────────────────────── */
const containerVariants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
}

const itemVariants = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

/* ── Translations ────────────────────────────────────────── */
const dict = {
  fr: {
    badge: "Département de l'Environnement",
    title1: "Protéger l'Environnement,",
    title2: "Construire l'Avenir",
    desc: "Le Département de l'Environnement du Maroc œuvre pour la protection des écosystèmes, la lutte contre les changements climatiques et la promotion d'un développement durablement vert.",
    btn1: "Découvrir nos programmes",
    btn2: "Actualités récentes",
    scroll: "Défiler"
  },
  ar: {
    badge: "قطاع البيئة",
    title1: "حماية البيئة،",
    title2: "بناء المستقبل",
    desc: "يعمل قطاع البيئة في المغرب على حماية النظم البيئية، ومكافحة التغيرات المناخية، وتعزيز التنمية الخضراء والمستدامة.",
    btn1: "اكتشف برامجنا",
    btn2: "أحدث الأخبار",
    scroll: "التمرير للأسفل"
  }
}

import { useLanguage } from '../../context/LanguageContext.jsx'

/* ── Component ───────────────────────────────────────────── */
/**
 * @component HeroSection
 * @description Section héro pleine hauteur avec globe 3D interactif et CTAs.
 */
export default function HeroSection() {
  const { language } = useLanguage()
  const t = dict[language]

  return (
    <section
      className="relative flex items-center overflow-hidden"
      style={{
        minHeight: '100vh',
        background: '#1C2B28',
        paddingTop: 80, // compense la navbar
      }}
    >
      {/* Ambient gradients */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 60% 50% at 75% 50%, rgba(29,158,117,0.12) 0%, transparent 70%),
            radial-gradient(ellipse 40% 60% at 20% 60%, rgba(24,95,165,0.08) 0%, transparent 60%)
          `,
        }}
      />

      <div className="container-main w-full py-16 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-0">

          {/* ── LEFT : Text ── */}
          <motion.div
            className="w-full lg:w-[45%] text-center lg:text-left"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Badge */}
            <motion.div variants={itemVariants} className="mb-6">
              <span
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase"
                style={{
                  background: 'rgba(29,158,117,0.15)',
                  border: '1px solid rgba(29,158,117,0.3)',
                  color: '#9FE1CB',
                  fontFamily: 'var(--font-body)',
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{ background: '#1D9E75' }}
                />
                {t.badge}
              </span>
            </motion.div>

            {/* H1 */}
            <motion.h1
              variants={itemVariants}
              className="font-display font-extrabold leading-tight mb-6"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.75rem)', color: '#FFFFFF' }}
            >
              {t.title1}{' '}
              <br />
              <span style={{ color: '#1D9E75' }}>{t.title2}</span>
            </motion.h1>

            {/* Sous-titre */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg leading-relaxed mb-10 max-w-lg mx-auto lg:mx-0"
              style={{
                color: 'rgba(255,255,255,0.6)',
                fontFamily: 'var(--font-body)',
                fontWeight: 300,
              }}
            >
              {t.desc}
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="/programmes"
                  id="hero-cta-programmes"
                  className="inline-flex items-center justify-center px-7 py-3.5 rounded-xl text-sm font-semibold text-white transition-all"
                  style={{
                    background: 'linear-gradient(135deg, #0F6E56, #1D9E75)',
                    boxShadow: '0 4px 20px rgba(15,110,86,0.4)',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  {t.btn1}
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="/actualites"
                  id="hero-cta-actualites"
                  className="inline-flex items-center justify-center px-7 py-3.5 rounded-xl text-sm font-semibold transition-all"
                  style={{
                    border: '1.5px solid rgba(255,255,255,0.35)',
                    color: '#FFFFFF',
                    fontFamily: 'var(--font-body)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#FFFFFF'
                    e.currentTarget.style.color = '#0F6E56'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent'
                    e.currentTarget.style.color = '#FFFFFF'
                  }}
                >
                  {t.btn2}
                </Link>
              </motion.div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
              variants={itemVariants}
              className="mt-16 flex items-center gap-2 justify-center lg:justify-start"
              style={{ color: 'rgba(255,255,255,0.35)' }}
            >
              <span className="text-xs tracking-widest uppercase" style={{ fontFamily: 'var(--font-body)' }}>
                {t.scroll}
              </span>
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              >
                <ChevronDown className="w-4 h-4" />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* ── RIGHT : 3D Canvas ── */}
          <motion.div
            className="w-full lg:w-[55%] flex-shrink-0"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ height: 'clamp(280px, 40vh, 560px)' }}
          >
            <Suspense fallback={<GlobeFallback />}>
              <Canvas
                camera={{ position: [0, 0, 4], fov: 45 }}
                style={{ width: '100%', height: '100%' }}
                gl={{ antialias: true, alpha: true }}
                aria-label="Globe 3D interactif représentant la Terre"
              >
                <GlobeScene />
              </Canvas>
            </Suspense>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
