# Attentio Development Flow 🚀

**Product Page Attention Analytics for Shopify**

> "Discover what your visitors actually see on your product pages — not just where they click."

## 🎯 Vision & Strategy

### Strategic Pivot: Shopify-First Approach
- **Phase 1**: Shopify App for e-commerce attention tracking (current focus)
- **Phase 2**: Self-hosted open source dashboard
- **Phase 3**: Cloud SaaS for general web analytics

### Core Value Proposition
**Auto-scale via Theme App Extension** → One install, metrics everywhere, zero friction for merchants.

### Key Metrics (The Stars)
- 🔹 **Images SAT**: Temps moyen passé sur les images produit
- 🔹 **Description Completion**: % de visiteurs qui lisent la description jusqu'au bout  
- 🔹 **ATC Attention**: Attention réelle portée au bouton Add-to-Cart (mobile-first)

## 🏗️ Technical Architecture

### Monorepo Structure
```
lizz.io/
├── apps/
│   ├── website/          # Marketing site + demo
│   ├── shopify-app/      # Attentio Shopify App (Phase 1)
│   └── dashboard/        # Self-hosted dashboard (Phase 2)
├── packages/
│   └── lizz-sdk/         # Core attention tracking SDK
└── pnpm-workspace.yaml
```

### Core SDK Reusability
- **Existing SDK** (`packages/lizz-sdk/`) provides all attention tracking logic
- **ShopifyTracker** class adapts SDK for e-commerce specific metrics
- **Theme App Extension** automatically injects SDK on all product pages

## 🛠️ Implementation Plan (7 Days)

### J1 — Scaffold + Theme Extension
- [ ] Shopify Partners account setup
- [ ] Development store with sample products
- [ ] Shopify CLI app initialization
- [ ] Theme App Extension scaffold
- [ ] Auto-inject lizz.js on `product.liquid`
- [ ] Auto-detect product ID via `window.meta?.product?.id`

### J2 — SDK Integration + Observers
- [ ] Implement universal selectors with robust fallbacks:
  - **Images**: `.product-gallery, .product__media, .media-gallery`
  - **Description**: `.product__description, .product-description, [data-product-description]`
  - **ATC Button**: `#AddToCart, [name="add"], [data-testid="add-to-cart"]`
- [ ] SAT measurement for product images (≥50% visible)
- [ ] Description completion tracking (90%+ scrolled)
- [ ] ATC attention measurement (mobile-first)
- [ ] Snapshot system (10s intervals + sendBeacon on exit)

### J3 — API + Database
- [ ] `/api/metrics` endpoint for data ingestion
- [ ] Database schema:
  - `product_snapshots`: (store_id, product_id, timestamp, sections_json)
  - `product_attention_daily`: aggregated metrics
- [ ] Real-time aggregation queries
- [ ] Data validation and error handling

### J4 — Admin Dashboard
- [ ] Shopify Admin App Extension
- [ ] Products list with 4 KPIs:
  - AQS Score (0-100)
  - Images SAT (seconds)
  - Description Completion (%)
  - ATC Attention (mobile %)
- [ ] Product detail view with 7-day timeseries
- [ ] Period filtering (7/30 days)

### J5 — Debug Tools + Robustness
- [ ] Debug overlay toggle (show tracked sections)
- [ ] Selector fallback system with logging
- [ ] Performance optimization (single IntersectionObserver)
- [ ] Advanced config for custom selectors (optional)
- [ ] Error logging and analytics

### J6 — Multi-Theme Testing
- [ ] Test on Shopify Dawn theme
- [ ] Test on premium theme (e.g., Impulse, Debut)
- [ ] Mobile responsiveness validation
- [ ] Performance benchmarking
- [ ] Cross-browser compatibility

### J7 — Polish + Documentation
- [ ] UX polish and loading states
- [ ] "Install → Results in 5 min" onboarding
- [ ] App Store listing preparation
- [ ] Video demo creation
- [ ] Support documentation

## 📊 Metrics Definitions (V1)

### Images SAT (seconds)
**Definition**: Cumulative time when product gallery is ≥50% visible with user active
**Calculation**: Sum of observation intervals where visibility ≥ 0.5 AND user not idle
**Use Case**: "Customers spend 8.2s looking at your product photos on average"

### Description Completion (%)
**Definition**: Percentage of sessions that scrolled to view ≥90% of product description
**Calculation**: (sessions_with_90%_desc_visibility / total_sessions) * 100
**Use Case**: "Only 45% of visitors read your full product description"

### ATC Attention (mobile-first)
**Definition**: Cumulative visible time + percentage who saw button >1s
**Metrics**: 
- Time visible (seconds)
- First-seen percentage
- Mobile vs desktop breakdown
**Use Case**: "74% of mobile visitors see your buy button, but only for 2.1s average"

### AQS Product Score (0-100)
**Formula**: `0.4 * norm(images_SAT) + 0.3 * desc_completion + 0.3 * atc_seen%`
**Purpose**: Single score for product page attention quality
**Use Case**: "Product X has 76/100 attention score — optimize description visibility"

## 💰 Business Model

### Pricing Strategy (V1)
- **Free**: 3 products tracked
- **Starter ($9/month)**: 50 products tracked
- **Growth ($19/month)**: 500 products tracked

### App Store Strategy
1. **Launch**: Manual installs, gather feedback
2. **Optimize**: >10 installs, clean UX
3. **"Built for Shopify"**: Official certification target
4. **Scale**: App Store featuring, growth marketing

## 🔧 Development Environment

### Prerequisites
- **Node.js 18+** with pnpm
- **Shopify Partners Account**
- **Shopify CLI** (`npm install -g @shopify/cli@latest`)
- **Development Store** with sample products

### Quick Start Commands
```bash
# Install dependencies
pnpm install

# Start Shopify app development
pnpm --filter=shopify-app dev

# Start website (marketing + demo)
pnpm --filter=website dev

# Build SDK package
pnpm --filter=lizz-sdk build
```

### Project Setup for New Machine
1. Clone repository
2. `pnpm install`
3. Set up Shopify Partners account
4. Create development store
5. `shopify app init` in `apps/shopify-app/`
6. Link to development store
7. Start development with `pnpm --filter=shopify-app dev`

## 🚀 Launch Checklist

### Pre-Launch Validation
- [ ] Works on Dawn theme (default Shopify)
- [ ] Works on 1+ premium theme
- [ ] Mobile performance <3s load time
- [ ] Debug tools functional
- [ ] Zero-config installation
- [ ] Metrics accuracy validated

### App Store Submission
- [ ] App listing copy (hook + features)
- [ ] Screenshots (before/after metrics)
- [ ] Demo video (install → insights)
- [ ] Privacy policy + terms
- [ ] Support documentation
- [ ] Pricing tiers configured

### Success Metrics (30 days)
- **10+ installs** from organic discovery
- **>80% activation** (merchants see first data)
- **<24h support** response time
- **4.5+ stars** average rating
- **Built for Shopify** application ready

## 📝 Notes & Context

### Why Shopify-First?
- **Faster validation**: Specific use case, clear value prop
- **Revenue potential**: $9-19/month recurring vs one-time sales
- **Ecosystem leverage**: App Store distribution, Shopify marketing
- **Technical simplicity**: Theme extensions handle auto-injection

### Technical Advantages
- **SDK reusability**: Core attention logic already proven
- **Auto-scale**: One install covers unlimited products
- **Universal selectors**: Works across 99% of Shopify themes
- **Mobile-first**: Critical for e-commerce conversion

### Competitive Differentiation
- **Google Analytics/Hotjar**: Shows clicks, not attention
- **Attentio**: Shows what visitors actually see and focus on
- **Unique insight**: "Your buy button is invisible on mobile" type revelations

---

**Ready to ship Attentio and dominate Shopify attention analytics! 🔥**