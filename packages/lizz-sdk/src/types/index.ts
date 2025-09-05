/**
 * Types & Interfaces for Lizz SDK
 */

export interface LizzConfig {
  siteId: string;
  debug?: boolean;
  snapshotIntervalMs?: number;     // Default: 10000ms (10s)
  activityWindowMs?: number;       // Default: 1000ms (1s)
  visibilityThreshold?: number;    // Default: 0.5 (50%)
  endpoint?: string;
}

export interface TrackPageOptions {
  pageId?: string;
  sectionsSelector?: string;       // Default: '[data-lizz-section]'
}

export interface SectionMetrics {
  sectionId: string;
  satMs: number;                   // Section Active Time in milliseconds
  lastSeen: number;                // Last timestamp when seen
  visAvg: number;                  // Average visibility ratio (0-1)  
  maxDepthPct: number;             // Maximum scroll depth percentage (0-100)
  isVisible: boolean;              // Current visibility state
}

export interface SnapshotPayload {
  sdk_version: string;
  site_id: string;
  page_id: string;
  timestamp: number;
  session_id: string;
  sections: SectionSnapshot[];
}

export interface SectionSnapshot {
  section_id: string;
  sat_seconds: number;             // Section Active Time in seconds
  completion_rate: number;         // 0-1 (maxDepthPct / 100)
  attention_score: number;         // Calculated AQS 0-100
  visibility_avg: number;          // Average visibility during session
}

export interface InternalState {
  isInitialized: boolean;
  isTracking: boolean;
  sessionId: string;
  pageId: string;
  sectionsMetrics: Map<string, SectionMetrics>;
  lastActivityTime: number;
  tabVisible: boolean;
}