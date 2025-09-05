/**
 * Visibility Tracker using IntersectionObserver
 */

import { LizzState } from '../core/state';
import { supportsIntersectionObserver, getElementId } from '../utils';

export class VisibilityTracker {
  private state: LizzState;
  private observer: IntersectionObserver | null = null;
  private trackedElements: Map<Element, string> = new Map();

  constructor(state: LizzState) {
    this.state = state;
  }

  init(): boolean {
    if (!supportsIntersectionObserver()) {
      this.state.warn('IntersectionObserver not supported');
      return false;
    }

    const threshold = this.state.getVisibilityThreshold();
    
    this.observer = new IntersectionObserver(
      this.handleIntersection.bind(this),
      {
        root: null, // viewport
        rootMargin: '0px',
        threshold: [0, threshold, 1], // 0%, threshold%, 100%
      }
    );

    this.state.log('VisibilityTracker initialized with threshold:', threshold);
    return true;
  }

  trackElements(elements: NodeListOf<Element>): void {
    if (!this.observer) {
      this.state.error('VisibilityTracker not initialized');
      return;
    }

    elements.forEach((element, index) => {
      const sectionId = getElementId(element, index);
      
      // Store element-to-sectionId mapping
      this.trackedElements.set(element, sectionId);
      
      // Start observing
      this.observer!.observe(element);
      
      // Initialize section metrics
      this.state.updateSectionMetrics(sectionId, {
        sectionId,
        isVisible: false,
        maxDepthPct: 0,
      });

      this.state.log('Tracking visibility for section:', sectionId);
    });
  }

  private handleIntersection(entries: IntersectionObserverEntry[]): void {
    entries.forEach(entry => {
      const sectionId = this.trackedElements.get(entry.target);
      if (!sectionId) return;

      const isVisible = entry.intersectionRatio >= this.state.getVisibilityThreshold();
      const visibilityRatio = entry.intersectionRatio;

      // Calculate scroll depth percentage for this element
      const scrollDepthPct = this.calculateScrollDepth(entry);

      // Update section metrics
      const existing = this.state.getSectionMetrics(sectionId);
      if (existing) {
        // Update visibility average (running average)
        const newVisAvg = existing.visAvg === 0 
          ? visibilityRatio 
          : (existing.visAvg + visibilityRatio) / 2;

        // Update max depth
        const newMaxDepth = Math.max(existing.maxDepthPct, scrollDepthPct);

        this.state.updateSectionMetrics(sectionId, {
          isVisible,
          visAvg: newVisAvg,
          maxDepthPct: newMaxDepth,
        });

        this.state.log(`Section ${sectionId}: visible=${isVisible}, ratio=${visibilityRatio.toFixed(2)}, depth=${scrollDepthPct}%`);
      }
    });
  }

  private calculateScrollDepth(entry: IntersectionObserverEntry): number {
    const { boundingClientRect, rootBounds } = entry;
    
    if (!rootBounds) return 0;

    // Calculate how much of the element is visible
    const elementHeight = boundingClientRect.height;
    const visibleHeight = Math.min(
      boundingClientRect.bottom,
      rootBounds.bottom
    ) - Math.max(boundingClientRect.top, rootBounds.top);

    const depthPct = Math.max(0, (visibleHeight / elementHeight) * 100);
    return Math.round(depthPct);
  }

  stop(): void {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
    this.trackedElements.clear();
    this.state.log('VisibilityTracker stopped');
  }
}