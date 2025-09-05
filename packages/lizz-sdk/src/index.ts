/**
 * Lizz SDK - Attention-first analytics
 * Privacy-first, cookieless attention tracking
 */

import { LizzState } from './core/state';
import { VisibilityTracker } from './trackers/visibilityTracker';
import { ActivityTracker } from './trackers/activityTracker';
import { TabVisibilityTracker } from './trackers/tabVisibilityTracker';
import { Transport } from './transport';
import { Scheduler } from './scheduler';
import { LizzConfig, TrackPageOptions, SectionSnapshot } from './types';
import { isBrowser, now } from './utils';

// Re-export types for public API
export type { LizzConfig, TrackPageOptions, SectionSnapshot };

export class Lizz {
  private state: LizzState;
  private visibilityTracker: VisibilityTracker;
  private activityTracker: ActivityTracker;
  private tabVisibilityTracker: TabVisibilityTracker;
  private transport: Transport;
  private scheduler: Scheduler;

  constructor(config: LizzConfig) {
    // Validate config
    if (!config.siteId) {
      throw new Error('Lizz SDK: siteId is required');
    }

    if (!isBrowser()) {
      throw new Error('Lizz SDK: Browser environment required');
    }

    // Initialize core state
    this.state = new LizzState(config);

    // Initialize modules
    this.visibilityTracker = new VisibilityTracker(this.state);
    this.activityTracker = new ActivityTracker(this.state);
    this.tabVisibilityTracker = new TabVisibilityTracker(this.state);
    this.transport = new Transport(this.state);
    this.scheduler = new Scheduler(this.state, this.transport);

    this.state.log('Lizz SDK created', config);
  }

  /**
   * Initialize all trackers (call once)
   */
  private async init(): Promise<boolean> {
    if (this.state.isInitialized()) {
      this.state.warn('Already initialized');
      return true;
    }

    // Initialize all trackers
    const visibilityOk = this.visibilityTracker.init();
    const activityOk = this.activityTracker.init();
    const tabVisibilityOk = this.tabVisibilityTracker.init();
    const schedulerOk = this.scheduler.init();

    if (!visibilityOk || !activityOk || !schedulerOk) {
      this.state.error('Failed to initialize some trackers');
      return false;
    }

    // Test connection (optional)
    if (this.state.isDebugMode()) {
      await this.transport.testConnection();
    }

    this.state.setInitialized(true);
    this.state.log('Lizz SDK initialized successfully');
    return true;
  }

  /**
   * Start tracking a page with specified sections
   */
  async trackPage(options: TrackPageOptions = {}): Promise<boolean> {
    // Initialize if not already done
    if (!this.state.isInitialized()) {
      const initOk = await this.init();
      if (!initOk) return false;
    }

    // Set page ID
    const pageId = options.pageId || window.location.pathname;
    this.state.setPageId(pageId);

    // Find sections to track
    const sectionsSelector = options.sectionsSelector || '[data-lizz-section]';
    const elements = document.querySelectorAll(sectionsSelector);

    if (elements.length === 0) {
      this.state.warn(`No elements found for selector: ${sectionsSelector}`);
      return false;
    }

    // Start tracking sections
    this.visibilityTracker.trackElements(elements);

    // Mark as tracking
    this.state.setTracking(true);
    this.state.log(`Started tracking ${elements.length} sections on page: ${pageId}`);

    return true;
  }

  /**
   * Stop all tracking
   */
  stop(): void {
    if (!this.state.isTracking()) {
      return;
    }

    // Stop all trackers
    this.visibilityTracker.stop();
    this.activityTracker.stop();
    this.tabVisibilityTracker.stop();
    this.scheduler.stop();

    // Clear state
    this.state.setTracking(false);
    this.state.clearAllSections();

    this.state.log('Lizz SDK stopped');
  }

  /**
   * Force immediate snapshot
   */
  async flush(): Promise<boolean> {
    if (!this.state.isTracking()) {
      this.state.warn('Not currently tracking');
      return false;
    }

    return await this.scheduler.flush();
  }

  /**
   * Get current attention data (for debugging)
   */
  getAttentionData(): SectionSnapshot[] {
    const sections: SectionSnapshot[] = [];
    const allMetrics = this.state.getAllSectionMetrics();

    allMetrics.forEach(metrics => {
      if (metrics.satMs > 0) {
        sections.push({
          section_id: metrics.sectionId,
          sat_seconds: Math.round(metrics.satMs / 1000 * 100) / 100,
          completion_rate: metrics.maxDepthPct / 100,
          attention_score: 0, // Will be calculated on server
          visibility_avg: Math.round(metrics.visAvg * 100) / 100,
        });
      }
    });

    return sections;
  }

  /**
   * Check if SDK is currently tracking
   */
  isTracking(): boolean {
    return this.state.isTracking();
  }

  /**
   * Get configuration
   */
  getConfig(): LizzConfig {
    return this.state.getConfig();
  }
}

/**
 * Global initialization function
 */
export function initLizz(config: LizzConfig): Lizz {
  return new Lizz(config);
}

// Default export
export default Lizz;
