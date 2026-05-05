# ⚡ Inexora — Le réseau qui pense.

<div align="center">

![Inexora Banner](https://via.placeholder.com/800x200/04030a/8b5cf6?text=⚡+INEXORA)

**MVP v0.1.0** · Réseau social nouvelle génération · Dark Mode · Futuriste

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/inexora)

</div>

---

## ✦ Aperçu

Inexora est un réseau social MVP ultra-moderne, conçu pour les créateurs, penseurs et innovateurs du futur. Interface cyber-organique avec animations fluides, gestion complète du fil d'actualité, profils utilisateurs et système de messagerie.

### Fonctionnalités

| Feature | Statut |
|---|---|
| 🏠 Fil d'actualité avec likes/commentaires/partages | ✅ Fonctionnel |
| ✏️ Compositeur de publications | ✅ Fonctionnel |
| 👤 Page profil avec grille/liste | ✅ Fonctionnel |
| 🧭 Sidebar de navigation avec badges | ✅ Fonctionnel |
| 🔔 Centre de notifications | ✅ Fonctionnel |
| 💬 Messagerie avec conversations | ✅ Fonctionnel |
| 🔍 Page d'exploration avec filtres | ✅ Fonctionnel |
| 📱 Navigation mobile responsive | ✅ Fonctionnel |
| 🎨 Animations Framer Motion | ✅ Fonctionnel |

---

## 🚀 Stack Technique

- **Framework** : [Next.js 14](https://nextjs.org/) (App Router)
- **Stylage** : [Tailwind CSS](https://tailwindcss.com/) avec thème sombre personnalisé
- **Animations** : [Framer Motion](https://www.framer.com/motion/)
- **Icônes** : [Lucide React](https://lucide.dev/)
- **Typo** : Syne (display) + DM Sans (body) + JetBrains Mono
- **Données** : JSON mocké (aucune base de données requise)
- **TypeScript** : Typage complet

---

## 🛠️ Installation locale

### Prérequis
- Node.js **18+**
- npm ou yarn

### Étapes

```bash
# 1. Cloner le repo
git clone https://github.com/YOUR_USERNAME/inexora.git
cd inexora

# 2. Installer les dépendances
npm install

# 3. Lancer en développement
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000) dans votre navigateur.

---

## ☁️ Déploiement gratuit

### Option 1 : Vercel (Recommandé — le plus simple)

Vercel est la plateforme officielle de Next.js, **100% gratuite** pour les projets personnels.

**Méthode A — 1 clic :**
> Cliquez sur le bouton "Deploy with Vercel" en haut de ce README.

**Méthode B — Via CLI :**
```bash
# Installer Vercel CLI
npm install -g vercel

# Se connecter (créer un compte gratuit sur vercel.com)
vercel login

# Déployer depuis le dossier du projet
vercel

# Pour le déploiement en production
vercel --prod
```

**Méthode C — Via l'interface web :**
1. Créez un compte sur [vercel.com](https://vercel.com) (gratuit)
2. Cliquez sur **"Add New Project"**
3. Importez votre repo GitHub
4. Vercel détecte Next.js automatiquement
5. Cliquez **"Deploy"** — votre site est en ligne en ~2 minutes 🎉

> ✅ **Vercel offre** : HTTPS automatique, CDN mondial, déploiements automatiques sur chaque `git push`, domaine `.vercel.app` gratuit.

---

### Option 2 : GitHub Pages (via export statique)

> ⚠️ Note : Certaines fonctionnalités Next.js (Server Components, API Routes) ne sont pas disponibles en export statique. Pour ce MVP, l'export statique fonctionne parfaitement car tout est côté client.

**Étape 1 — Modifier `next.config.js` :**
```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: '/inexora', // Remplacer par le nom de votre repo
  images: {
    unoptimized: true, // Requis pour export statique
  },
}
module.exports = nextConfig
```

**Étape 2 — Ajouter le script de déploiement dans `package.json` :**
```json
"scripts": {
  "deploy": "next build && touch out/.nojekyll"
}
```

**Étape 3 — Configurer GitHub Actions (`.github/workflows/deploy.yml`) :**
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm install
      - run: npm run build
      - uses: JamesIves/github-pages-deploy-action@v4
        with:
          folder: out
```

**Étape 4 — Activer GitHub Pages :**
1. Settings → Pages → Source : **GitHub Actions**
2. Pusher sur `main` pour déclencher le déploiement

> Votre site sera disponible sur `https://YOUR_USERNAME.github.io/inexora`

---

### Option 3 : Netlify (alternative gratuite)

```bash
# Installer Netlify CLI
npm install -g netlify-cli

# Build
npm run build

# Déployer
netlify deploy --prod --dir=.next
```

---

## 📁 Structure du projet

```
inexora/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Layout racine + métadonnées
│   │   ├── page.tsx            # Page principale + gestion des routes
│   │   └── globals.css         # Styles globaux + variables CSS
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Sidebar.tsx          # Navigation principale (desktop)
│   │   │   ├── MobileNav.tsx        # Navigation mobile (bottom bar)
│   │   │   ├── RightPanel.tsx       # Panneau droite (trending, suggestions)
│   │   │   ├── NotificationsPage.tsx
│   │   │   ├── MessagesPage.tsx
│   │   │   └── ExplorePage.tsx
│   │   ├── feed/
│   │   │   ├── Feed.tsx             # Fil d'actualité principal
│   │   │   ├── PostCard.tsx         # Carte de publication interactive
│   │   │   └── PostComposer.tsx     # Zone de création de post
│   │   └── profile/
│   │       └── ProfilePage.tsx      # Page profil complète
│   └── data/
│       └── mock.ts             # Données simulées (users, posts, etc.)
├── tailwind.config.js          # Thème personnalisé
├── next.config.js
├── vercel.json                 # Config déploiement Vercel
└── package.json
```

---

## 🎨 Guide du thème

Le thème Inexora utilise une palette **cyber-organique** :

| Variable | Couleur | Usage |
|---|---|---|
| `void` | `#04030a` | Fond principal |
| `surface` | `#0c0b15` | Fond des composants |
| `panel` | `#110f1f` | Panneaux, cartes |
| `violet-glow` | `#7c3aed` | Accent principal |
| `cyan-glow` | `#06b6d4` | Accent secondaire |
| `text-primary` | `#f0eeff` | Texte principal |

Pour personnaliser, modifiez `tailwind.config.js` → `theme.extend.colors`.

---

## 🗺️ Roadmap MVP+

- [ ] Authentification (NextAuth.js)
- [ ] Base de données (Supabase / PlanetScale)
- [ ] Upload d'images (Cloudinary)
- [ ] Recherche full-text
- [ ] Notifications en temps réel (WebSockets)
- [ ] Stories / Moments
- [ ] Mode clair (Light Mode toggle)
- [ ] PWA (Progressive Web App)

---

## 📄 Licence

MIT © 2025 Inexora

---

<div align="center">
  <p><strong>Inexora</strong> — Le réseau qui pense.</p>
  <p>⚡ Construit avec Next.js, Tailwind CSS & Framer Motion</p>
</div>
