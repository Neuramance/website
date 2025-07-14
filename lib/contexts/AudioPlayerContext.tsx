'use client';

import React, { createContext, useContext, useRef, useMemo } from 'react';
import { AudioTrack } from '@/lib/types/components';

interface AudioPlayerContextType {
  audioRef: React.MutableRefObject<HTMLAudioElement | null>;
  overlayAudioRef: React.MutableRefObject<HTMLAudioElement | null>;
  playTrack: (src: string, id?: string, title?: string) => void;
  playOverlayTrack: (src: string, id?: string, title?: string) => void;
  play: (track?: AudioTrack) => void;
  pause: () => void;
  stop: () => void;
  resume: () => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  seek: (time: number) => void;
}

const AudioPlayerContext = createContext<AudioPlayerContextType | undefined>(undefined);

export function AudioPlayerProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const overlayAudioRef = useRef<HTMLAudioElement | null>(null);

  const contextValue = useMemo(() => ({
    audioRef,
    overlayAudioRef,
    playTrack: () => {}, // Placeholder - will be implemented when integrating
    playOverlayTrack: () => {},
    play: () => {},
    pause: () => {},
    stop: () => {},
    resume: () => {},
    setVolume: () => {},
    toggleMute: () => {},
    seek: () => {},
  }), []);

  return (
    <AudioPlayerContext.Provider value={contextValue}>
      {children}
    </AudioPlayerContext.Provider>
  );
}

export function useAudioPlayer() {
  const context = useContext(AudioPlayerContext);
  if (context === undefined) {
    throw new Error('useAudioPlayer must be used within an AudioPlayerProvider');
  }
  return context;
}