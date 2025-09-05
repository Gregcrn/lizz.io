/**
 * Scheduler for periodic snapshots and unload handling
 */

import { LizzState } from '../core/state';
import { Transport } from '../transport';
import { SnapshotPayload, SectionSnapshot } from '../types';
import { calculateAttentionScore, isBrowser } from '../utils';

export class Scheduler {
  private state: LizzState;
  private transport: Transport;
  private snapshotInterval: ReturnType<typeof setInterval> | null = null;
  private unloadHandler: () => void;

  constructor(state: LizzState, transport: Transport) {
    this.state = state;
    this.transport = transport;
    this.unloadHandler = this.onUnload.bind(this);
  }

  init(): boolean {
    if (!isBrowser()) {
      this.state.warn('Scheduler requires browser environment');
      return false;
    }

    this.startPeriodicSnapshots();
    this.addUnloadHandlers();

    this.state.log('Scheduler initialized');
    return true;
  }

  private startPeriodicSnapshots(): void {
    const intervalMs = this.state.getSnapshotInterval();
    
    this.snapshotInterval = setInterval(() => {
      this.takeSnapshot();
    }, intervalMs);

    this.state.log(`Periodic snapshots every ${intervalMs}ms`);
  }

  private addUnloadHandlers(): void {
    // Multiple events to catch different unload scenarios
    window.addEventListener('beforeunload', this.unloadHandler);
    window.addEventListener('unload', this.unloadHandler);
    window.addEventListener('pagehide', this.unloadHandler);
    
    // Visibility change to hidden (mobile Safari)
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        this.onUnload();
      }
    });
  }

  private removeUnloadHandlers(): void {
    window.removeEventListener('beforeunload', this.unloadHandler);
    window.removeEventListener('unload', this.unloadHandler);
    window.removeEventListener('pagehide', this.unloadHandler);
  }

  /**
   * Take a snapshot and send it to the backend
   */
  async takeSnapshot(): Promise<boolean> {
    if (!this.state.isTracking()) {
      return false;
    }

    const payload = this.buildSnapshotPayload();
    
    if (payload.sections.length === 0) {
      this.state.log('No sections to snapshot');
      return false;
    }

    this.state.log('Taking snapshot with', payload.sections.length, 'sections');
    
    const success = await this.transport.sendSnapshot(payload);
    
    if (success) {
      this.state.log('Snapshot sent successfully');
    }
    
    return success;
  }

  /**
   * Handle page unload - send final snapshot using beacon
   */
  private onUnload(): void {
    if (!this.state.isTracking()) {
      return;
    }

    const payload = this.buildSnapshotPayload();
    
    if (payload.sections.length === 0) {
      return;
    }

    this.state.log('Page unloading - sending final snapshot');
    this.transport.sendBeacon(payload);
  }

  /**
   * Build snapshot payload from current state
   */
  private buildSnapshotPayload(): SnapshotPayload {
    const sections: SectionSnapshot[] = [];
    const allMetrics = this.state.getAllSectionMetrics();

    allMetrics.forEach(metrics => {
      // Only include sections with some attention data
      if (metrics.satMs > 0) {
        const satSeconds = Math.round(metrics.satMs / 1000 * 100) / 100; // 2 decimals
        const completionRate = metrics.maxDepthPct / 100;
        const attentionScore = calculateAttentionScore(
          satSeconds,
          metrics.visAvg,
          completionRate
        );

        sections.push({
          section_id: metrics.sectionId,
          sat_seconds: satSeconds,
          completion_rate: completionRate,
          attention_score: attentionScore,
          visibility_avg: Math.round(metrics.visAvg * 100) / 100, // 2 decimals
        });
      }
    });

    return {
      sdk_version: '1.0.0',
      site_id: this.state.getSiteId(),
      page_id: this.state.getPageId(),
      timestamp: Date.now(),
      session_id: this.state.getSessionId(),
      sections,
    };
  }

  /**
   * Force immediate snapshot
   */
  async flush(): Promise<boolean> {
    this.state.log('Forcing immediate snapshot');
    return await this.takeSnapshot();
  }

  stop(): void {
    if (this.snapshotInterval) {
      clearInterval(this.snapshotInterval);
      this.snapshotInterval = null;
    }

    this.removeUnloadHandlers();
    this.state.log('Scheduler stopped');
  }
}