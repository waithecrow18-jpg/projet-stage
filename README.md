# Portail Ministère — Full-Stack Project

Stack : **React 18 + Vite 5 + Tailwind 3** (frontend) · **Laravel 11 + Sanctum** (backend)

---

## Documents du projet

- [Voir le PDF](cahier%20de%20charge.pdf)
- [Rapport de stage PDF](rapport-de-stage.pdf)
- [Rapport de stage Markdown](rapport-de-stage.md)

---

## 📁 Structure

```
environement stage/
├── frontend/                   ← React + Vite
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── package.json
│   ├── .env.example
│   └── src/
│       ├── main.jsx
│       ├── App.jsx             ← Router + Providers
│       ├── index.css           ← Design tokens + Tailwind
│       ├── assets/
│       ├── components/
│       │   ├── ui/             ← Boutons, badges, inputs…
│       │   ├── sections/       ← Hero, Stats, News…
│       │   └── layout/         ← Navbar, Footer…
│       ├── context/
│       │   └── LanguageContext.jsx
│       ├── hooks/
│       │   ├── useScrollAnimation.js
│       │   ├── useMouseTilt.js
│       │   └── useApi.js
│       ├── pages/
│       │   ├── HomePage.jsx
│       │   ├── ActualitesPage.jsx
│       │   ├── ProgrammesPage.jsx
│       │   ├── PublicationsPage.jsx
│       │   ├── ContactPage.jsx
│       │   └── MinisterePage.jsx
│       └── utils/
│           └── api.js          ← Axios instance
└── backend/                    ← Laravel 11
    ├── .env.example
    ├── config/
    │   └── cors.php
    └── routes/
        └── api.php
```

---

## 🚀 Démarrage rapide

### Frontend

```bash
cd frontend
cp .env.example .env          # configurer VITE_API_URL
npm install
npm run dev                   # → http://localhost:5173
```

### Backend (Laravel)

```bash
cd backend
cp .env.example .env
composer install
php artisan key:generate
php artisan migrate
php artisan install:api       # installe Sanctum + routes API
php artisan serve             # → http://localhost:8000
```

---

## 🎨 Palette de couleurs

| Token | Valeur | Usage |
|-------|--------|-------|
| `--color-primary` | `#0F6E56` | Vert principal |
| `--color-primary-mid` | `#1D9E75` | Vert moyen |
| `--color-accent-blue` | `#185FA5` | Accent bleu |
| `--color-accent-amber` | `#BA7517` | Accent ambré |
| `--color-dark` | `#1C2B28` | Fond sombre |
| `--color-text-secondary` | `#5A6A65` | Texte secondaire |

---

## 📄 Pages & Routes

| Route | Composant | Description |
|-------|-----------|-------------|
| `/` | `HomePage` | Accueil avec hero + stats |
| `/actualites` | `ActualitesPage` | Liste des actualités |
| `/actualites/:slug` | `ActualitesPage` | Détail actualité |
| `/programmes` | `ProgrammesPage` | Liste programmes |
| `/programmes/:slug` | `ProgrammesPage` | Détail programme |
| `/publications` | `PublicationsPage` | Documents téléchargeables |
| `/contact` | `ContactPage` | Formulaire de contact |
| `/ministere` | `MinisterePage` | Présentation institutionnelle |
| `/admin/*` | Protégé | Dashboard admin (Sanctum) |

---

## 🔌 API Endpoints (Laravel v1)

```
POST  /api/v1/auth/login
POST  /api/v1/auth/register
POST  /api/v1/auth/logout        [auth:sanctum]
GET   /api/v1/auth/me            [auth:sanctum]

GET   /api/v1/actualites
GET   /api/v1/actualites/{slug}
GET   /api/v1/programmes
GET   /api/v1/programmes/{slug}
GET   /api/v1/publications
GET   /api/v1/publications/{id}
POST  /api/v1/contact

# Admin (auth:sanctum)
POST/PUT/DELETE  /api/v1/admin/actualites/{id}
POST/PUT/DELETE  /api/v1/admin/programmes/{id}
POST/PUT/DELETE  /api/v1/admin/publications/{id}
POST             /api/v1/admin/upload
GET              /api/v1/admin/dashboard
```

---

## 🧩 Hooks personnalisés

| Hook | Description |
|------|-------------|
| `useScrollAnimation` | Anime un élément à l'entrée dans le viewport (IntersectionObserver) |
| `useMouseTilt` | Effet de tilt 3D + reflet au survol de la souris |
| `useApi` | Gestion générique loading/data/error + annulation AbortController |
| `useApiList` | Liste paginée depuis une ressource API |
| `useApiOne` | Un seul élément par slug/id |

---

## 🌐 Internationalisation

- **Contexte** : `LanguageContext` → `language` (fr|ar), `isRTL`, `setLanguage`, `toggleLanguage`
- **RTL** : `document.dir = 'rtl'` automatique + `font-family: Cairo`
- **Persistance** : `localStorage('app_lang')`
- **i18next** installé pour une localisation plus fine (configurer `src/i18n.js`)
