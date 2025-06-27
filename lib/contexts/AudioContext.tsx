'use client';

import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

interface AudioTrack {
  id: string;
  src: string;
  title?: string;
}

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
  });

  // Initialize audio elements
  useEffect(() => {
    const audio = new Audio();
    const overlayAudio = new Audio();
    audioRef.current = audio;
    overlayAudioRef.current = overlayAudio;

    const handleLoadStart = () => {
      setAudioState(prev => ({ ...prev, isLoading: true, error: null }));
    };

    const handleCanPlay = () => {
      setAudioState(prev => ({ ...prev, isLoading: false }));
    };

    const handleError = () => {
      setAudioState(prev => ({
        ...prev,
        error: 'Failed to load audio file',
        isLoading: false,
        isPlaying: false,
      }));
    };

    const handleLoadedMetadata = () => {
      setAudioState(prev => ({ ...prev, duration: audio.duration }));
    };

    const handleTimeUpdate = () => {
      setAudioState(prev => ({ ...prev, currentTime: audio.currentTime }));
    };

    const handleEnded = () => {
      setAudioState(prev => ({ ...prev, isPlaying: false, currentTime: 0 }));
    };

    const handleVolumeChange = () => {
      setAudioState(prev => ({
        ...prev,
        volume: audio.volume,
        isMuted: audio.muted,
      }));
    };

    // Overlay audio ended - resume background
    const handleOverlayEnded = () => {
      setAudioState(prev => {
        if (prev.isPausedForOverlay && prev.backgroundTrack) {
          audio.play()
            .then(() => {
              setAudioState(current => ({ 
                ...current, 
                currentTrack: current.backgroundTrack,
                isPlaying: true,
                isPausedForOverlay: false 
              }));
            })
            .catch(console.error);
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

    return () => {
      audio.removeEventListener('loadstart', handleLoadStart);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('volumechange', handleVolumeChange);
      
      overlayAudio.removeEventListener('ended', handleOverlayEnded);
      
      audio.pause();
      overlayAudio.pause();
    };
  }, []);

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
          audioRef.current.play()
            .then(() => {
              setAudioState(prev => ({ ...prev, isPlaying: true }));
            })
            .catch((err) => {
              console.error('Error resuming audio:', err);
              if (err.name === 'NotAllowedError') {
                setAudioState(prev => ({ ...prev, error: 'Autoplay blocked by browser. Click anywhere to enable audio.' }));
              } else {
                setAudioState(prev => ({ ...prev, error: 'Failed to resume audio' }));
              }
            });
          return;
        }
      }

      // Load new track
      setAudioState(prev => ({ 
        ...prev, 
        currentTrack: track,
        backgroundTrack: track // Store as background track for red.mp3
      }));
      audioRef.current.src = src;
      audioRef.current.load();

      audioRef.current.play()
        .then(() => {
          setAudioState(prev => ({ ...prev, isPlaying: true }));
        })
        .catch((err) => {
          console.error('Error playing audio:', err);
          if (err.name === 'NotAllowedError') {
            setAudioState(prev => ({ ...prev, error: 'Autoplay blocked by browser. Click anywhere to enable audio.' }));
          } else {
            setAudioState(prev => ({ ...prev, error: 'Failed to play audio' }));
          }
        });
    }
  };

  const playOverlayTrack = (src: string, id?: string, title?: string) => {
    if (overlayAudioRef.current && audioRef.current) {
      // Pause background music if playing
      if (audioState.isPlaying && audioState.currentTrack) {
        audioRef.current.pause();
        setAudioState(prev => ({ 
          ...prev, 
          isPlaying: false,
          isPausedForOverlay: true 
        }));
      }

      // Play overlay audio
      overlayAudioRef.current.src = src;
      overlayAudioRef.current.load();
      overlayAudioRef.current.play()
        .catch((err) => {
          console.error('Error playing overlay audio:', err);
          // If overlay fails, resume background
          if (audioState.isPausedForOverlay && audioRef.current) {
            audioRef.current.play()
              .then(() => {
                setAudioState(prev => ({ 
                  ...prev, 
                  isPlaying: true,
                  isPausedForOverlay: false 
                }));
              })
              .catch(console.error);
          }
        });
    }
  };

  const play = (track?: AudioTrack) => {
    if (track) {
      playTrack(track.src, track.id, track.title);
    } else if (audioRef.current) {
      audioRef.current.play()
        .then(() => {
          setAudioState(prev => ({ ...prev, isPlaying: true }));
        })
        .catch((err) => {
          console.error('Error playing audio:', err);
          setAudioState(prev => ({ ...prev, error: 'Failed to play audio' }));
        });
    }
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setAudioState(prev => ({ ...prev, isPlaying: false }));
    }
  };

  const stop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setAudioState(prev => ({ ...prev, isPlaying: false, currentTime: 0 }));
    }
  };

  const resume = () => {
    if (audioRef.current && !audioState.isPlaying) {
      audioRef.current.play()
        .then(() => {
          setAudioState(prev => ({ ...prev, isPlaying: true }));
        })
        .catch((err) => {
          console.error('Error resuming audio:', err);
          setAudioState(prev => ({ ...prev, error: 'Failed to resume audio' }));
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
      audioRef.current.currentTime = Math.max(0, Math.min(audioState.duration, time));
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