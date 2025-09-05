# 🚀 Lizz.io - Commands Reference

Guide des commandes pour le monorepo Lizz (pnpm workspaces).

## 📋 Structure du projet

```
lizz-io/
├─ apps/
│  ├─ website/          # Site vitrine + blog (Next.js)
│  └─ dashboard/        # SaaS app (à venir)
├─ packages/
│  └─ lizz-sdk/         # SDK open-source (TypeScript)
```

## 🎯 Commandes principales

### Développement rapide
```bash
pnpm dev                # Lance le website (port 3000)
pnpm dev:website        # Même chose, explicite
```

### Build & Production  
```bash
pnpm build              # Build website seulement
pnpm build:all          # Build tous les packages (website + SDK)
pnpm start              # Start website en prod
```

### Maintenance
```bash
pnpm lint               # Lint tous les projets
pnpm clean              # Nettoie tous les dist/
pnpm install            # Install toutes les dépendances
```

## 🔧 Commandes par workspace

### Website (apps/website)
```bash
pnpm --filter=website dev           # Dev website
pnpm --filter=website build         # Build website
pnpm --filter=website lint          # Lint website
pnpm --filter=website start         # Start prod website
```

### SDK (packages/lizz-sdk)
```bash
pnpm --filter=lizz-sdk dev          # Watch build SDK
pnpm --filter=lizz-sdk build        # Build SDK (génère dist/)
pnpm --filter=lizz-sdk lint         # Lint SDK
pnpm --filter=lizz-sdk test         # Tests SDK (à implémenter)
pnpm --filter=lizz-sdk clean        # Clean dist/
```

### Dashboard (apps/dashboard - futur)
```bash
pnpm --filter=dashboard dev         # Dev dashboard (port 3002)
pnpm --filter=dashboard build       # Build dashboard
```

## 📦 Gestion des dépendances

### Installer des packages
```bash
# Dans un workspace spécifique
pnpm add react --filter=website              # Website
pnpm add -D jest --filter=lizz-sdk           # SDK (dev dep)
pnpm add prisma --filter=dashboard           # Dashboard

# À la racine (partagé)
pnpm add typescript -w                       # Workspace root
pnpm add -D prettier -w                      # Dev global
```

### Infos sur les dépendances
```bash
pnpm -r list                        # Liste tous les packages
pnpm why react                       # Pourquoi react est installé
pnpm outdated                        # Packages outdated
```

## 🧪 Test & Développement SDK

### Tester le SDK localement
```bash
cd packages/lizz-sdk
pnpm build                          # Génère dist/
pnpm pack                           # Crée lizz-sdk-0.1.0.tgz
# Puis dans un autre projet : npm install /path/to/lizz-sdk-0.1.0.tgz
```

### Publier le SDK (futur)
```bash
cd packages/lizz-sdk
pnpm version patch                   # Bump version
pnpm build                          # Build final
pnpm publish                        # Publish to npm
```

## 🌐 Développement multi-apps

### Lancer plusieurs apps
```bash
# Terminal 1
pnpm --filter=website dev           # Website sur :3000

# Terminal 2 
pnpm --filter=dashboard dev         # Dashboard sur :3002

# Terminal 3
pnpm --filter=lizz-sdk dev          # SDK en watch mode
```

### Commandes parallèles
```bash
pnpm -r build                       # Build tous les packages
pnpm -r lint                        # Lint tous les packages
pnpm -r clean                       # Clean tous les packages
```

## 🎯 Workflows courants

### Développement website (quotidien)
```bash
pnpm dev                            # C'est tout ! 🚀
```

### Développement SDK
```bash
pnpm --filter=lizz-sdk dev          # Watch build
# Éditer packages/lizz-sdk/src/index.ts
# → Auto-rebuild dans dist/
```

### Build complet avant commit
```bash
pnpm build:all                      # Build everything
pnpm lint                           # Check code quality
git add . && git commit -m "..."    # Commit
```

### Reset complet
```bash
pnpm clean                          # Clean tous les dist/
rm -rf node_modules */node_modules   # Clean node_modules
pnpm install                        # Reinstall fresh
```

## 📝 Notes importantes

- **Port website**: 3000 (défaut)
- **Port dashboard**: 3002 (configuré)
- **SDK build**: Génère ESM + CJS + TypeScript types
- **Monorepo**: Dépendances partagées optimisées par pnpm
- **Hot reload**: Fonctionne dans tous les workspaces

## 🚀 Quick Start

```bash
# Cloner et setup
git clone <repo>
cd lizz-io
pnpm install

# Développer
pnpm dev                            # Website ready!
```

---

*Généré pour Lizz.io - Attention-first analytics 🎯*