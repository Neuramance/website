'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import { detectBrowser, markUserGesture, type BrowserInfo } from '@/lib/utils/browser-detection';
import { logError } from '@/lib/utils/logger';
import { AudioTrack } from '@/lib/types/components';

interface AudioState {
  currentTrack: AudioTrack | null;
  backgroundTrack: AudioTrack | null;
  isPlaying: boolean;
  isLoading: boolean;
  error: string | null;
  duration: number;
  currentTime: number;
  volume: number;
  isMuted: boolean;
  isPausedForOverlay: boolean;
  hasUserInteracted: boolean;
  browserInfo: BrowserInfo;
}

interface AudioContextType extends AudioState {
  play: (track?: AudioTrack) => void;
  pause: () => void;
  stop: () => void;
  resume: () => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  seek: (time: number) => void;
  playTrack: (src: string, id?: string, title?: string) => void;
  playOverlayTrack: (src: string, id?: string, title?: string) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const overlayAudioRef = useRef<HTMLAudioElement | null>(null);
  const browserInfo = detectBrowser();
  const [audioState, setAudioState] = useState<AudioState>({
    currentTrack: null,
    backgroundTrack: null,
    isPlaying: false,
    isLoading: false,
    error: null,
    duration: 0,
    currentTime: 0,
    volume: 1,
    isMuted: false,
    isPausedForOverlay: false,
    hasUserInteracted: false,
    browserInfo,
  });

  // Initialize audio elements
  useEffect(() => {
    const audio = new Audio();
    const overlayAudio = new Audio();
    
    // Optimized preload strategy for large files
    if (browserInfo.isSafari) {
      // Safari: preload metadata only for large files, auto for small ones
      audio.preload = 'metadata'; // Changed from 'auto' for better performance
      overlayAudio.preload = 'auto'; // Keep auto for small overlay files
    } else {
      // Other browsers: use metadata preload for main audio, auto for overlays
      audio.preload = 'metadata';
      overlayAudio.preload = 'auto';
    }
    
    // Enable streaming for large audio files with optimized buffering
    audio.crossOrigin = 'anonymous';
    
    // Optimize audio buffer for better memory usage
    try {
      // Set smaller buffer for overlay audio to reduce memory usage
      if ('buffered' in overlayAudio && 'mozAudioBufferTime' in overlayAudio) {
        (overlayAudio as any).mozAudioBufferTime = 0.1; // 100ms buffer for Firefox
      }
      if ('webkitAudioDecodedByteCount' in audio) {
        // Optimize WebKit audio decoding for large files
        audio.setAttribute('x-webkit-airplay', 'allow');
      }
    } catch (e) {
      // Ignore if browser doesn't support these optimizations
    }
    
    audioRef.current = audio;
    overlayAudioRef.current = overlayAudio;

    const handleLoadStart = () => {
      setAudioState((prev) => ({ ...prev, isLoading: true, error: null }));
    };

    const handleCanPlay = () => {
      setAudioState((prev) => ({ ...prev, isLoading: false }));
    };

    const handleError = () => {
      setAudioState((prev) => ({
        ...prev,
        error: 'Failed to load audio file',
        isLoading: false,
        isPlaying: false,
      }));
    };

    const handleLoadedMetadata = () => {
      setAudioState((prev) => ({ ...prev, duration: audio.duration }));
    };

    const handleTimeUpdate = () => {
      setAudioState((prev) => ({ ...prev, currentTime: audio.currentTime }));
    };

    const handleEnded = () => {
      setAudioState((prev) => ({ ...prev, isPlaying: false, currentTime: 0 }));
    };

    const handleVolumeChange = () => {
      setAudioState((prev) => ({
        ...prev,
        volume: audio.volume,
        isMuted: audio.muted,
      }));
    };

    // Overlay audio ended - resume background
    const handleOverlayEnded = () => {
      setAudioState((prev) => {
        if (prev.isPausedForOverlay && prev.backgroundTrack) {
          audio
            .play()
            .then(() => {
              setAudioState((current) => ({
                ...current,
                currentTrack: current.backgroundTrack,
                isPlaying: true,
                isPausedForOverlay: false,
              }));
            })
            .catch((err) => logError('Failed to resume background audio after overlay', err, 'AudioContext'));
        }
        return prev;
      });
    };

    audio.addEventListener('loadstart', handleLoadStart);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('error', handleError);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('volumechange', handleVolumeChange);

    overlayAudio.addEventListener('ended', handleOverlayEnded);

    // User gesture detection for Safari autoplay
    const handleUserGesture = () => {
      setAudioState((prev) => ({ ...prev, hasUserInteracted: true }));
      markUserGesture();
    };

    // Listen for user interactions that enable autoplay
    const gestureEvents = ['click', 'touchend', 'keydown', 'mouseup', 'pointerup'];
    gestureEvents.forEach(event => {
      document.addEventListener(event, handleUserGesture, { once: true, passive: true });
    });

    return () => {
      audio.removeEventListener('loadstart', handleLoadStart);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('volumechange', handleVolumeChange);

      overlayAudio.removeEventListener('ended', handleOverlayEnded);

      // Remove gesture event listeners
      gestureEvents.forEach(event => {
        document.removeEventListener(event, handleUserGesture);
      });

      // Clean up audio resources to prevent memory leaks
      audio.pause();
      overlayAudio.pause();
      
      // Clear audio sources to free memory
      try {
        audio.src = '';
        overlayAudio.src = '';
        audio.load();
        overlayAudio.load();
      } catch (e) {
        // Ignore cleanup errors
      }
    };
  }, [browserInfo.isSafari]);

  const playTrack = (src: string, id?: string, title?: string) => {
    const track: AudioTrack = {
      id: id || src,
      src,
      title,
    };

    if (audioRef.current) {
      // If same track is already loaded, don't reload
      if (audioState.currentTrack?.src === src) {
        if (audioState.isPlaying) {
          return; // Already playing
        } else {
          // Resume current track
          audioRef.current
            .play()
            .then(() => {
              setAudioState((prev) => ({ ...prev, isPlaying: true }));
            })
            .catch((err) => {
              logError('Error resuming audio', err, 'AudioContext');
              if (err.name === 'NotAllowedError') {
                const errorMessage = browserInfo.isDesktopSafari 
                  ? 'Safari autoplay blocked. Click anywhere to enable audio or check Safari > Settings > Websites > Auto-Play.'
                  : browserInfo.isMobileSafari
                  ? 'Mobile Safari requires interaction. Tap anywhere to enable audio.'
                  : 'Autoplay blocked by browser. Click anywhere to enable audio.';
                
                setAudioState((prev) => ({
                  ...prev,
                  error: errorMessage,
                }));
              } else {
                setAudioState((prev) => ({
                  ...prev,
                  error: 'Failed to resume audio',
                }));
              }
            });
          return;
        }
      }

      // Load new track
      setAudioState((prev) => ({
        ...prev,
        currentTrack: track,
        backgroundTrack: track, // Store as background track for red.mp3
      }));
      audioRef.current.src = src;
      audioRef.current.load();

      audioRef.current
        .play()
        .then(() => {
          setAudioState((prev) => ({ ...prev, isPlaying: true }));
        })
        .catch((err) => {
          logError('Error playing audio', err, 'AudioContext');
          if (err.name === 'NotAllowedError') {
            const errorMessage = browserInfo.isDesktopSafari 
              ? 'Safari autoplay blocked. Click anywhere to enable audio or check Safari > Settings > Websites > Auto-Play.'
              : browserInfo.isMobileSafari
              ? 'Mobile Safari requires interaction. Tap anywhere to enable audio.'
              : 'Autoplay blocked by browser. Click anywhere to enable audio.';
            
            setAudioState((prev) => ({
              ...prev,
              error: errorMessage,
            }));
          } else {
            setAudioState((prev) => ({
              ...prev,
              error: 'Failed to play audio',
            }));
          }
        });
    }
  };

  const playOverlayTrack = (src: string, id?: string, title?: string) => {
    if (overlayAudioRef.current && audioRef.current) {
      // Pause background music if playing
      if (audioState.isPlaying && audioState.currentTrack) {
        audioRef.current.pause();
        setAudioState((prev) => ({
          ...prev,
          isPlaying: false,
          isPausedForOverlay: true,
        }));
      }

      // Play overlay audio
      overlayAudioRef.current.src = src;
      overlayAudioRef.current.load();
      overlayAudioRef.current.play().catch((err) => {
        logError('Error playing overlay audio', err, 'AudioContext');
        // If overlay fails, resume background
        if (audioState.isPausedForOverlay && audioRef.current) {
          audioRef.current
            .play()
            .then(() => {
              setAudioState((prev) => ({
                ...prev,
                isPlaying: true,
                isPausedForOverlay: false,
              }));
            })
            .catch((err) => logError('Failed to resume background audio after overlay', err, 'AudioContext'));
        }
      });
    }
  };

  const play = (track?: AudioTrack) => {
    if (track) {
      playTrack(track.src, track.id, track.title);
    } else if (audioRef.current) {
      audioRef.current
        .play()
        .then(() => {
          setAudioState((prev) => ({ ...prev, isPlaying: true }));
        })
        .catch((err) => {
          logError('Error playing audio', err, 'AudioContext');
          setAudioState((prev) => ({ ...prev, error: 'Failed to play audio' }));
        });
    }
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setAudioState((prev) => ({ ...prev, isPlaying: false }));
    }
  };

  const stop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setAudioState((prev) => ({ ...prev, isPlaying: false, currentTime: 0 }));
    }
  };

  const resume = () => {
    if (audioRef.current && !audioState.isPlaying) {
      audioRef.current
        .play()
        .then(() => {
          setAudioState((prev) => ({ ...prev, isPlaying: true }));
        })
        .catch((err) => {
          logError('Error resuming audio', err, 'AudioContext');
          setAudioState((prev) => ({
            ...prev,
            error: 'Failed to resume audio',
          }));
        });
    }
  };

  const setVolume = (volume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = Math.max(0, Math.min(1, volume));
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
    }
  };

  const seek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(
        0,
        Math.min(audioState.duration, time),
      );
    }
  };

  const contextValue: AudioContextType = {
    ...audioState,
    play,
    pause,
    stop,
    resume,
    setVolume,
    toggleMute,
    seek,
    playTrack,
    playOverlayTrack,
  };

  return (
    <AudioContext.Provider value={contextValue}>
      {children}
    </AudioContext.Provider>
  );
}

export function useGlobalAudio() {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error('useGlobalAudio must be used within an AudioProvider');
  }
  return context;
}
