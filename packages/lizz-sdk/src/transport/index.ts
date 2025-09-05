/**
 * Transport layer for sending data to Lizz backend
 */

import { LizzState } from '../core/state';
import { SnapshotPayload } from '../types';
import { supportsSendBeacon, safeJsonStringify } from '../utils';

export class Transport {
  private state: LizzState;
  private endpoint: string;

  constructor(state: LizzState) {
    this.state = state;
    this.endpoint = state.getConfig().endpoint || 'https://api.lizz.io/v1/attention';
  }

  /**
   * Send snapshot data (normal operation)
   */
  async sendSnapshot(payload: SnapshotPayload): Promise<boolean> {
    // Demo mode - skip actual network requests
    if (this.endpoint.startsWith('demo://')) {
      this.state.log('Demo mode: skipping actual network request', payload);
      return true;
    }

    try {
      const response = await fetch(this.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Lizz-Site-ID': this.state.getSiteId(),
        },
        body: safeJsonStringify(payload),
      });

      const success = response.ok;
      
      if (success) {
        this.state.log('Snapshot sent successfully');
      } else {
        this.state.error('Failed to send snapshot:', response.status, response.statusText);
      }

      return success;
    } catch (error) {
      this.state.error('Network error sending snapshot:', error);
      return false;
    }
  }

  /**
   * Send data on page unload using sendBeacon (fallback to fetch)
   */
  sendBeacon(payload: SnapshotPayload): boolean {
    // Demo mode - skip actual network requests
    if (this.endpoint.startsWith('demo://')) {
      this.state.log('Demo mode: skipping beacon request', payload);
      return true;
    }

    const data = safeJsonStringify(payload);

    if (supportsSendBeacon()) {
      try {
        const success = navigator.sendBeacon(this.endpoint, data);
        
        if (success) {
          this.state.log('Beacon sent successfully');
        } else {
          this.state.warn('Beacon failed, trying fetch fallback');
          return this.sendBeaconFallback(data);
        }
        
        return success;
      } catch (error) {
        this.state.error('sendBeacon error:', error);
        return this.sendBeaconFallback(data);
      }
    } else {
      return this.sendBeaconFallback(data);
    }
  }

  /**
   * Fallback for sendBeacon using fetch with keepalive
   */
  private sendBeaconFallback(data: string): boolean {
    try {
      fetch(this.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Lizz-Site-ID': this.state.getSiteId(),
        },
        body: data,
        keepalive: true, // Important for unload scenarios
      }).catch(error => {
        this.state.error('Beacon fallback error:', error);
      });

      this.state.log('Beacon fallback sent');
      return true;
    } catch (error) {
      this.state.error('Beacon fallback failed:', error);
      return false;
    }
  }

  /**
   * Test endpoint connectivity
   */
  async testConnection(): Promise<boolean> {
    // Demo mode - skip connection test
    if (this.endpoint.startsWith('demo://')) {
      this.state.log('Demo mode: connection test skipped');
      return true;
    }

    try {
      const response = await fetch(this.endpoint.replace('/attention', '/health'), {
        method: 'GET',
        headers: {
          'X-Lizz-Site-ID': this.state.getSiteId(),
        },
      });

      const success = response.ok;
      this.state.log('Connection test:', success ? 'OK' : 'Failed');
      return success;
    } catch (error) {
      this.state.error('Connection test failed:', error);
      return false;
    }
  }
}