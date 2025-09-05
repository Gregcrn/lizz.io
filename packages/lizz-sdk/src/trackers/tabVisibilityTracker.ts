/**
 * Tab Visibility Tracker using Page Visibility API
 */

import { LizzState } from '../core/state';
import { isBrowser } from '../utils';

export class TabVisibilityTracker {
  private state: LizzState;
  private handleVisibilityChange: () => void;

  constructor(state: LizzState) {
    this.state = state;
    this.handleVisibilityChange = this.onVisibilityChange.bind(this);
  }

  init(): boolean {
    if (!isBrowser()) {
      this.state.warn('TabVisibilityTracker requires browser environment');
      return false;
    }

    // Check if Page Visibility API is supported
    if (typeof document.visibilityState === 'undefined') {
      this.state.warn('Page Visibility API not supported');
      return false;
    }

    document.addEventListener('visibilitychange', this.handleVisibilityChange);
    
    // Set initial state
    this.updateVisibilityState();
    
    this.state.log('TabVisibilityTracker initialized');
    return true;
  }

  private onVisibilityChange(): void {
    this.updateVisibilityState();
  }

  private updateVisibilityState(): void {
    const isVisible = document.visibilityState === 'visible';
    
    this.state.setTabVisible(isVisible);
    
    if (isVisible) {
      this.state.log('Tab became visible');
      // Update last activity when tab becomes visible
      this.state.updateLastActivity();
    } else {
      this.state.log('Tab became hidden');
    }
  }

  stop(): void {
    if (isBrowser()) {
      document.removeEventListener('visibilitychange', this.handleVisibilityChange);
    }
    this.state.log('TabVisibilityTracker stopped');
  }
}