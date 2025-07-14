/**
 * Browser detection utilities for handling platform-specific audio autoplay policies
 */

export interface BrowserInfo {
  isSafari: boolean;
  isMobileSafari: boolean;
  isDesktopSafari: boolean;
  isChrome: boolean;
  isFirefox: boolean;
  supportsAutoplay: boolean;
}

/**
 * Detects browser type and autoplay capabilities
 */
export function detectBrowser(): BrowserInfo {
  if (typeof window === 'undefined') {
    // Server-side rendering fallback
    return {
      isSafari: false,
      isMobileSafari: false,
      isDesktopSafari: false,
      isChrome: false,
      isFirefox: false,
      supportsAutoplay: false,
    };
  }

  const userAgent = window.navigator.userAgent;
  const vendor = window.navigator.vendor;

  // Safari detection
  const isSafari = /^((?!chrome|android).)*safari/i.test(userAgent) && 
                   /apple/i.test(vendor);
  
  // Mobile Safari detection (iPhone, iPad, iPod)
  const isMobileSafari = isSafari && 
                        (/iPhone|iPad|iPod/i.test(userAgent) || 
                         (navigator.maxTouchPoints > 1 && /MacIntel/.test(navigator.platform)));
  
  // Desktop Safari detection
  const isDesktopSafari = isSafari && !isMobileSafari;
  
  // Chrome detection
  const isChrome = /chrome/i.test(userAgent) && /google inc/i.test(vendor);
  
  // Firefox detection
  const isFirefox = /firefox/i.test(userAgent);

  // Autoplay support estimation
  // Chrome generally supports autoplay with user interaction
  // Desktop Safari requires user settings or user interaction
  // Mobile Safari is very restrictive
  const supportsAutoplay = isChrome || (!isMobileSafari && !isDesktopSafari);

  return {
    isSafari,
    isMobileSafari,
    isDesktopSafari,
    isChrome,
    isFirefox,
    supportsAutoplay,
  };
}

// Extend Window interface for type safety
declare global {
  interface Window {
    __audioUserGestureDetected?: boolean;
    webkitAudioContext?: typeof AudioContext;
  }
}

/**
 * Checks if a user gesture has occurred recently
 */
export function hasRecentUserGesture(): boolean {
  // This will be set by event listeners in the AudioContext
  return window.__audioUserGestureDetected || false;
}

/**
 * Marks that a user gesture has occurred
 */
export function markUserGesture(): void {
  window.__audioUserGestureDetected = true;
}

/**
 * Checks if AudioContext is supported and not suspended
 */
export function canPlayAudio(): Promise<boolean> {
  return new Promise((resolve) => {
    if (!window.AudioContext && !window.webkitAudioContext) {
      resolve(false);
      return;
    }

    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      const testContext = new AudioContextClass();
      
      if (testContext.state === 'suspended') {
        // Try to resume - if it works, we have permission
        testContext.resume().then(() => {
          testContext.close();
          resolve(true);
        }).catch(() => {
          testContext.close();
          resolve(false);
        });
      } else {
        testContext.close();
        resolve(true);
      }
    } catch {
      resolve(false);
    }
  });
}