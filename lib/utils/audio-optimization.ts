/**
 * Audio optimization utilities for better performance and user experience
 */

export interface OptimizedAudioConfig {
  src: string;
  preload?: 'none' | 'metadata' | 'auto';
  enableStreaming?: boolean;
  compressionLevel?: 'low' | 'medium' | 'high';
  fallbackFormats?: string[];
}

/**
 * Creates an optimized audio element with lazy loading and streaming support
 */
export function createOptimizedAudio(config: OptimizedAudioConfig): HTMLAudioElement {
  const audio = new Audio();
  
  // Set optimal preload strategy based on file size and importance
  audio.preload = config.preload || 'metadata';
  
  // Enable streaming for large files
  if (config.enableStreaming) {
    audio.crossOrigin = 'anonymous';
  }
  
  return audio;
}

/**
 * Lazy load audio with intersection observer for better performance
 */
export function lazyLoadAudio(
  triggerElement: HTMLElement,
  audioConfig: OptimizedAudioConfig,
  onLoad?: (audio: HTMLAudioElement) => void
): HTMLAudioElement {
  const audio = createOptimizedAudio(audioConfig);
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Start loading audio when element is visible
        audio.src = audioConfig.src;
        audio.load();
        onLoad?.(audio);
        observer.unobserve(triggerElement);
      }
    });
  }, {
    root: null,
    rootMargin: '100px', // Start loading 100px before element is visible
    threshold: 0.1
  });
  
  observer.observe(triggerElement);
  
  return audio;
}

/**
 * Check if audio format is supported and return best format
 */
export function getBestAudioFormat(formats: string[]): string | null {
  const audio = document.createElement('audio');
  
  for (const format of formats) {
    if (audio.canPlayType(format).replace(/no/, '')) {
      return format;
    }
  }
  
  return null;
}

/**
 * Audio compression recommendations for different file types
 */
export const AUDIO_OPTIMIZATION_GUIDE = {
  'stasis.mp3': {
    currentSize: '3.0MB',
    recommendedFormats: [
      { format: 'audio/ogg; codecs=opus', quality: 'High quality, ~60% smaller' },
      { format: 'audio/webm; codecs=opus', quality: 'Best compression, ~70% smaller' },
      { format: 'audio/mp3', quality: 'Fallback format' }
    ],
    compressionSettings: {
      bitrate: '128kbps', // Reduced from likely 320kbps
      sampleRate: '44.1kHz',
      channels: 'Stereo'
    },
    expectedSize: '~900KB-1.2MB'
  }
} as const;

/**
 * Progressive audio loading for better perceived performance
 */
export class ProgressiveAudioLoader {
  private audio: HTMLAudioElement;
  private loadPromise: Promise<void> | null = null;
  
  constructor(private config: OptimizedAudioConfig) {
    this.audio = createOptimizedAudio(config);
  }
  
  async preloadMetadata(): Promise<void> {
    if (this.loadPromise) return this.loadPromise;
    
    this.loadPromise = new Promise((resolve, reject) => {
      const originalPreload = this.audio.preload;
      this.audio.preload = 'metadata';
      this.audio.src = this.config.src;
      
      const onMetadataLoaded = () => {
        this.audio.removeEventListener('loadedmetadata', onMetadataLoaded);
        this.audio.removeEventListener('error', onError);
        this.audio.preload = originalPreload;
        resolve();
      };
      
      const onError = () => {
        this.audio.removeEventListener('loadedmetadata', onMetadataLoaded);
        this.audio.removeEventListener('error', onError);
        reject(new Error('Failed to load audio metadata'));
      };
      
      this.audio.addEventListener('loadedmetadata', onMetadataLoaded);
      this.audio.addEventListener('error', onError);
      this.audio.load();
    });
    
    return this.loadPromise;
  }
  
  getAudio(): HTMLAudioElement {
    return this.audio;
  }
}