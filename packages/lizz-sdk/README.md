# 🎯 Lizz SDK

Attention-first analytics. Privacy-first tracking. Open-source at its core.

## Installation

```bash
npm install lizz-sdk
# or
yarn add lizz-sdk
# or
pnpm add lizz-sdk
```

## Quick Start

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

// That's it! Data will be sent automatically every 10 seconds
```

## Features

- 🎯 **Attention-First**: Track real user attention with SAT, SCR, and AQS metrics
- 🛡️ **Privacy-First**: No cookies, no personal data, GDPR compliant
- 📊 **Smart Tracking**: 
  - **IntersectionObserver** for visibility detection
  - **Activity tracking** (mouse, scroll, keyboard, touch)
  - **Tab visibility** awareness
  - **Automatic batching** and background sending
- ⚡ **Performance Optimized**: 
  - Minimal DOM impact
  - sendBeacon for reliable data delivery
  - Automatic cleanup on page unload
- 🔧 **Developer Friendly**: TypeScript support, comprehensive logging, simple API

## Configuration

```javascript
const lizz = initLizz({
  siteId: 'your-site-id',              // Required
  endpoint: 'https://api.lizz.io/v1/attention', // Optional
  debug: true,                         // Optional - show console logs
  snapshotIntervalMs: 10000,          // Optional - send data every 10s
  activityWindowMs: 1000,             // Optional - activity detection window
  visibilityThreshold: 0.5            // Optional - 50% visible = "seen"
});
```

## Core API

### `lizz.trackPage(options?)`

Start tracking attention on the current page.

```javascript
// Track with default settings
await lizz.trackPage();

// Custom options
await lizz.trackPage({
  pageId: 'homepage',                    // Custom page identifier
  sectionsSelector: '.track-attention'   // Custom CSS selector
});
```

### `lizz.stop()`

Stop all tracking and cleanup resources.

```javascript
lizz.stop();
```

### `lizz.flush()`

Force immediate data send (useful for SPA navigation).

```javascript
await lizz.flush();
```

### `lizz.getAttentionData()`

Get current attention data (for debugging).

```javascript
const data = lizz.getAttentionData();
console.log(data);
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

## HTML Integration

Mark sections for tracking with `data-lizz-section`:

```html
<section data-lizz-section="hero">
  <h1>Welcome to our product</h1>
  <p>This section will be tracked for attention.</p>
</section>

<div data-lizz-section="features">
  <h2>Features</h2>
  <p>This content too!</p>
</div>

<!-- Or use custom selectors -->
<div class="track-attention" id="pricing">
  <h2>Pricing</h2>
</div>
```

## Data Schema

The SDK collects these metrics per section:

```typescript
interface SectionSnapshot {
  section_id: string;          // Element identifier
  sat_seconds: number;         // Section Active Time
  completion_rate: number;     // 0-1 (scroll depth)
  attention_score: number;     // 0-100 quality score
  visibility_avg: number;      // Average visibility ratio
}
```

## Framework Integration

### React

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

### Next.js

```jsx
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

## Architecture

The SDK uses a modular architecture:

- **Core**: State management and lifecycle
- **Trackers**: Visibility, activity, and tab visibility detection  
- **Scheduler**: Automatic data batching and sending
- **Transport**: HTTP delivery with sendBeacon fallback
- **Utils**: Helper functions and attention score calculation

## Privacy & Compliance

- ✅ **No cookies** - Uses sessionStorage only for session ID
- ✅ **No PII** - Only collects anonymous attention metrics
- ✅ **GDPR compliant** - No personal data processing
- ✅ **Respect DNT** - Honors Do Not Track headers
- ✅ **Transparent** - Open source for full audit

## Browser Support

- ✅ Chrome 51+
- ✅ Firefox 55+  
- ✅ Safari 12.1+
- ✅ Edge 79+

Requires: `IntersectionObserver`, `fetch`, Page Visibility API

## License

MIT © [Lizz.io](https://lizz.io)