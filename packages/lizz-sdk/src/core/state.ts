/**
 * Core state management for Lizz SDK
 */

import { InternalState, LizzConfig, SectionMetrics } from '../types';
import { generateUuid, now } from '../utils';

export class LizzState {
  private state: InternalState;
  private config: LizzConfig;

  constructor(config: LizzConfig) {
    this.config = config;
    this.state = {
      isInitialized: false,
      isTracking: false,
      sessionId: generateUuid(),
      pageId: '',
      sectionsMetrics: new Map(),
      lastActivityTime: now(),
      tabVisible: true,
    };
  }

  // Config getters
  getConfig(): LizzConfig {
    return { ...this.config };
  }

  getSiteId(): string {
    return this.config.siteId;
  }

  isDebugMode(): boolean {
    return this.config.debug === true;
  }

  getSnapshotInterval(): number {
    return this.config.snapshotIntervalMs || 10000; // 10s default
  }

  getActivityWindow(): number {
    return this.config.activityWindowMs || 1000; // 1s default
  }

  getVisibilityThreshold(): number {
    return this.config.visibilityThreshold || 0.5; // 50% default
  }

  // State getters
  isInitialized(): boolean {
    return this.state.isInitialized;
  }

  isTracking(): boolean {
    return this.state.isTracking;
  }

  getSessionId(): string {
    return this.state.sessionId;
  }

  getPageId(): string {
    return this.state.pageId;
  }

  getLastActivityTime(): number {
    return this.state.lastActivityTime;
  }

  isTabVisible(): boolean {
    return this.state.tabVisible;
  }

  // State setters
  setInitialized(initialized: boolean): void {
    this.state.isInitialized = initialized;
  }

  setTracking(tracking: boolean): void {
    this.state.isTracking = tracking;
  }

  setPageId(pageId: string): void {
    this.state.pageId = pageId;
  }

  updateLastActivity(): void {
    this.state.lastActivityTime = now();
  }

  setTabVisible(visible: boolean): void {
    this.state.tabVisible = visible;
  }

  // Sections management
  getSectionMetrics(sectionId: string): SectionMetrics | undefined {
    return this.state.sectionsMetrics.get(sectionId);
  }

  getAllSectionMetrics(): SectionMetrics[] {
    return Array.from(this.state.sectionsMetrics.values());
  }

  updateSectionMetrics(sectionId: string, update: Partial<SectionMetrics>): void {
    const existing = this.state.sectionsMetrics.get(sectionId);
    
    if (existing) {
      this.state.sectionsMetrics.set(sectionId, { ...existing, ...update });
    } else {
      // Create new section metrics
      this.state.sectionsMetrics.set(sectionId, {
        sectionId,
        satMs: 0,
        lastSeen: now(),
        visAvg: 0,
        maxDepthPct: 0,
        isVisible: false,
        ...update,
      });
    }
  }

  removeSectionMetrics(sectionId: string): void {
    this.state.sectionsMetrics.delete(sectionId);
  }

  clearAllSections(): void {
    this.state.sectionsMetrics.clear();
  }

  // Debug logging
  log(...args: any[]): void {
    if (this.isDebugMode()) {
      console.log('🎯 Lizz SDK:', ...args);
    }
  }

  warn(...args: any[]): void {
    if (this.isDebugMode()) {
      console.warn('🎯 Lizz SDK:', ...args);
    }
  }

  error(...args: any[]): void {
    if (this.isDebugMode()) {
      console.error('🎯 Lizz SDK:', ...args);
    }
  }
}