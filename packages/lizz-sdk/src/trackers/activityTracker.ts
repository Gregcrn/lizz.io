/**
 * Activity Tracker for user interactions
 */

import { LizzState } from '../core/state';
import { debounce, isBrowser } from '../utils';

export class ActivityTracker {
  private state: LizzState;
  private isActive = false;
  private activityCheckInterval: ReturnType<typeof setInterval> | null = null;
  private debouncedActivity: () => void;

  constructor(state: LizzState) {
    this.state = state;
    this.debouncedActivity = debounce(this.onActivity.bind(this), 100);
  }

  init(): boolean {
    if (!isBrowser()) {
      this.state.warn('ActivityTracker requires browser environment');
      return false;
    }

    this.addEventListeners();
    this.startActivityCheck();

    this.state.log('ActivityTracker initialized');
    return true;
  }

  private addEventListeners(): void {
    // Mouse events
    document.addEventListener('mousemove', this.debouncedActivity, { passive: true });
    document.addEventListener('mousedown', this.debouncedActivity, { passive: true });
    document.addEventListener('click', this.debouncedActivity, { passive: true });
    
    // Scroll events
    document.addEventListener('scroll', this.debouncedActivity, { passive: true });
    window.addEventListener('scroll', this.debouncedActivity, { passive: true });
    
    // Keyboard events
    document.addEventListener('keydown', this.debouncedActivity, { passive: true });
    
    // Touch events (mobile)
    document.addEventListener('touchstart', this.debouncedActivity, { passive: true });
    document.addEventListener('touchmove', this.debouncedActivity, { passive: true });
    
    // Focus events
    window.addEventListener('focus', this.debouncedActivity, { passive: true });
    window.addEventListener('blur', this.onBlur.bind(this), { passive: true });
  }

  private removeEventListeners(): void {
    document.removeEventListener('mousemove', this.debouncedActivity);
    document.removeEventListener('mousedown', this.debouncedActivity);
    document.removeEventListener('click', this.debouncedActivity);
    document.removeEventListener('scroll', this.debouncedActivity);
    window.removeEventListener('scroll', this.debouncedActivity);
    document.removeEventListener('keydown', this.debouncedActivity);
    document.removeEventListener('touchstart', this.debouncedActivity);
    document.removeEventListener('touchmove', this.debouncedActivity);
    window.removeEventListener('focus', this.debouncedActivity);
    window.removeEventListener('blur', this.onBlur.bind(this));
  }

  private onActivity(): void {
    this.isActive = true;
    this.state.updateLastActivity();
    this.state.log('User activity detected');
  }

  private onBlur(): void {
    this.isActive = false;
    this.state.log('Window lost focus - activity stopped');
  }

  private startActivityCheck(): void {
    const checkInterval = this.state.getActivityWindow();
    
    this.activityCheckInterval = setInterval(() => {
      this.checkActivityWindow();
    }, checkInterval);
  }

  private checkActivityWindow(): void {
    const now = Date.now();
    const lastActivity = this.state.getLastActivityTime();
    const windowMs = this.state.getActivityWindow();
    const isInActivityWindow = (now - lastActivity) <= windowMs;
    const tabVisible = this.state.isTabVisible();

    // Only count time if user is active AND tab is visible
    const shouldCountTime = isInActivityWindow && tabVisible && this.isActive;

    if (shouldCountTime) {
      this.updateSectionActiveTimes(windowMs);
    }

    // Reset activity flag
    this.isActive = false;
  }

  private updateSectionActiveTimes(intervalMs: number): void {
    const sections = this.state.getAllSectionMetrics();
    
    sections.forEach(section => {
      if (section.isVisible) {
        // Add active time to visible sections
        this.state.updateSectionMetrics(section.sectionId, {
          satMs: section.satMs + intervalMs,
          lastSeen: Date.now(),
        });

        this.state.log(`Added ${intervalMs}ms to section ${section.sectionId} (total: ${section.satMs + intervalMs}ms)`);
      }
    });
  }

  isUserActive(): boolean {
    return this.isActive;
  }

  stop(): void {
    this.removeEventListeners();
    
    if (this.activityCheckInterval) {
      clearInterval(this.activityCheckInterval);
      this.activityCheckInterval = null;
    }

    this.state.log('ActivityTracker stopped');
  }
}