/**
 * Utility functions for Lizz SDK
 */

/**
 * Generate a UUID v4
 */
export function generateUuid(): string {
  return 'xxxx-xxxx-4xxx-yxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

/**
 * Get current timestamp in milliseconds
 */
export function now(): number {
  return Date.now();
}

/**
 * Calculate attention quality score (AQS) 0-100
 * Based on SAT, visibility average, and completion rate
 */
export function calculateAttentionScore(
  satSeconds: number,
  visibilityAvg: number,
  completionRate: number
): number {
  // Weight factors
  const satWeight = 0.4;     // Time spent is important
  const visWeight = 0.3;     // Visibility matters
  const compWeight = 0.3;    // Completion shows engagement

  // Normalize SAT (diminishing returns after 30s)
  const normalizedSat = Math.min(satSeconds / 30, 1);
  
  // Calculate weighted score
  const score = (
    normalizedSat * satWeight +
    visibilityAvg * visWeight +
    completionRate * compWeight
  ) * 100;

  return Math.round(Math.max(0, Math.min(100, score)));
}

/**
 * Debounce function calls
 */
export function debounce<T extends (...args: any[]) => void>(
  func: T, 
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Safe JSON stringify that handles circular references
 */
export function safeJsonStringify(obj: any): string {
  try {
    return JSON.stringify(obj);
  } catch (error) {
    return JSON.stringify({ error: 'Serialization failed' });
  }
}

/**
 * Check if we're in browser environment
 */
export function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof document !== 'undefined';
}

/**
 * Guard: Check if IntersectionObserver is available
 */
export function supportsIntersectionObserver(): boolean {
  return isBrowser() && 'IntersectionObserver' in window;
}

/**
 * Guard: Check if sendBeacon is available
 */
export function supportsSendBeacon(): boolean {
  return isBrowser() && 'sendBeacon' in navigator;
}

/**
 * Get element identifier for section
 */
export function getElementId(element: Element, index: number): string {
  // Try data-lizz-section first
  const dataId = element.getAttribute('data-lizz-section');
  if (dataId) return dataId;
  
  // Try id attribute
  const id = element.getAttribute('id');
  if (id) return id;
  
  // Try class (first one)
  const className = element.className.split(' ')[0];
  if (className) return `${className}-${index}`;
  
  // Fallback to tag + index
  return `${element.tagName.toLowerCase()}-${index}`;
}