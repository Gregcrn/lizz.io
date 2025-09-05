# 🎯 Lizz.io - Attention-First Analytics Platform

> See where attention lives

Lizz is an open-source attention analytics platform that measures where users actually focus their attention, not just where they click. Built with privacy-first principles, Lizz provides real-time insights into user engagement without cookies or personal data collection.

## 🚀 Live Demo

**👉 [Try the Live Demo](http://localhost:3000/demo)** - Experience attention tracking in real-time!

Our interactive playground shows you exactly how Lizz works:
- 3 instrumented sections (Hero, Features, Pricing)
- Real-time metrics panel showing SAT, SCR, and AQS
- Visual indicators showing which sections are being tracked
- Live updates as you scroll and interact

## 📊 What Lizz Tracks

- **SAT (Section Active Time)**: How long users actively focus on each section
- **SCR (Section Completion Rate)**: How much of your content users actually view  
- **AQS (Attention Quality Score)**: 0-100 quality score for each section
- **Visibility Average**: Average visibility ratio during active time

## 🏗️ Architecture

This project is structured as a pnpm monorepo with multiple packages:

```
lizz.io/
├── apps/
│   └── website/          # Next.js marketing site + demo
├── packages/
│   └── lizz-sdk/         # Core attention tracking SDK
└── pnpm-workspace.yaml   # Monorepo configuration
```

### 🎯 SDK Features

The `lizz-sdk` package provides:

- **Modular Architecture**: 6 core modules (core, trackers, scheduler, transport, utils, types)
- **Privacy-First**: No cookies, no PII, GDPR compliant
- **Framework Agnostic**: Works with React, Vue, Angular, or vanilla JS
- **TypeScript Support**: Full type definitions included
- **Production Ready**: ESM/CJS builds, tree-shakeable

### 🌐 Website Features

The marketing website includes:

- **Landing Page**: Complete SaaS landing with pricing, features, testimonials
- **Interactive Demo**: Live playground showing attention tracking in action
- **Blog System**: MDX-based blog with syntax highlighting
- **Modern Stack**: Next.js 15, Tailwind CSS v4, shadcn/ui components

## 🛠️ Development

### Prerequisites

- Node.js 18+
- pnpm 8+

### Quick Start

```bash
# Clone the repository
git clone https://github.com/lizz-io/lizz.io.git
cd lizz.io

# Install dependencies
pnpm install

# Build the SDK
pnpm --filter lizz-sdk build

# Start the development server
pnpm --filter website dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the landing page, or [http://localhost:3000/demo](http://localhost:3000/demo) for the live demo.

### Project Commands

```bash
# Development
pnpm dev              # Start all development servers
pnpm --filter website dev    # Start website only
pnpm --filter lizz-sdk dev   # Start SDK in watch mode

# Building
pnpm build            # Build all packages
pnpm --filter lizz-sdk build  # Build SDK only
pnpm --filter website build   # Build website only

# Linting
pnpm lint             # Lint all packages
pnpm --filter website lint    # Lint website only
```

## 📦 SDK Usage

### Installation

```bash
npm install lizz-sdk
# or
yarn add lizz-sdk
# or
pnpm add lizz-sdk
```

### Basic Usage

```javascript
import { initLizz } from 'lizz-sdk';

// Initialize Lizz
const lizz = initLizz({
  siteId: 'your-site-id',
  debug: true // for development
});

// Add data-lizz-section attributes to your HTML
// <section data-lizz-section="hero">Hero content</section>
// <section data-lizz-section="pricing">Pricing content</section>

// Start tracking the current page
await lizz.trackPage();

// Get current attention data
const metrics = lizz.getAttentionData();
console.log(metrics);
// [
//   {
//     section_id: "hero",
//     sat_seconds: 12.34,
//     completion_rate: 0.85,
//     attention_score: 78,
//     visibility_avg: 0.92
//   }
// ]
```

### Framework Integration

#### React

```jsx
import { useEffect } from 'react';
import { initLizz } from 'lizz-sdk';

function App() {
  useEffect(() => {
    const lizz = initLizz({ siteId: 'your-site-id' });
    lizz.trackPage();
    
    return () => lizz.stop();
  }, []);

  return (
    <div>
      <section data-lizz-section="hero">Hero</section>
      <section data-lizz-section="pricing">Pricing</section>
    </div>
  );
}
```

#### Next.js

```javascript
// pages/_app.js
import { initLizz } from 'lizz-sdk';

let lizz;

function MyApp({ Component, pageProps, router }) {
  useEffect(() => {
    lizz = initLizz({ siteId: 'your-site-id' });
  }, []);

  useEffect(() => {
    const handleRouteChange = async () => {
      await lizz.flush(); // Send data before navigation
      await lizz.trackPage({ pageId: router.asPath });
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => router.events.off('routeChangeComplete', handleRouteChange);
  }, [router]);

  return <Component {...pageProps} />;
}
```

## 🔮 Roadmap

### ✅ Completed
- [x] Professional SDK with modular architecture
- [x] TypeScript support and type definitions
- [x] Landing page with complete branding
- [x] Interactive demo playground
- [x] Real-time metrics visualization
- [x] Privacy-first tracking implementation

### 🚧 In Progress
- [ ] Lizz Cloud Backend (Node.js + Postgres)
- [ ] SaaS Dashboard for analytics visualization
- [ ] Reference collector for self-hosting

### 📋 Planned
- [ ] Advanced analytics and insights
- [ ] A/B testing integration
- [ ] Heatmap visualizations
- [ ] Export and API access
- [ ] White-label solutions

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## 📄 License

MIT © [Lizz.io](https://lizz.io)

## 🙋‍♂️ Support

- [GitHub Issues](https://github.com/lizz-io/lizz.io/issues)
- [Documentation](https://docs.lizz.io)
- Email: hello@lizz.io
- Twitter: [@lizzio](https://twitter.com/lizzio)

---

**Made with ❤️ by the Lizz team**
