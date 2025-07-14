'use client';

import React, { createContext, useContext, useState, useMemo } from 'react';
import { AudioTrack, BrowserInfo } from '@/lib/types/components';

interface AudioStateContextType {
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
  setCurrentTrack: (track: AudioTrack | null) => void;
  setBackgroundTrack: (track: AudioTrack | null) => void;
  setIsPlaying: (playing: boolean) => void;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setDuration: (duration: number) => void;
  setCurrentTime: (time: number) => void;
  setVolume: (volume: number) => void;
  setIsMuted: (muted: boolean) => void;
  setIsPausedForOverlay: (paused: boolean) => void;
  setHasUserInteracted: (interacted: boolean) => void;
}

const AudioStateContext = createContext<AudioStateContextType | undefined>(undefined);

export function AudioStateProvider({ 
  children, 
  browserInfo 
}: { 
  children: React.ReactNode;
  browserInfo: BrowserInfo;
}) {
  const [currentTrack, setCurrentTrack] = useState<AudioTrack | null>(null);
  const [backgroundTrack, setBackgroundTrack] = useState<AudioTrack | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isPausedForOverlay, setIsPausedForOverlay] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);

  const contextValue = useMemo(() => ({
    currentTrack,
    backgroundTrack,
    isPlaying,
    isLoading,
    error,
    duration,
    currentTime,
    volume,
    isMuted,
    isPausedForOverlay,
    hasUserInteracted,
    browserInfo,
    setCurrentTrack,
    setBackgroundTrack,
    setIsPlaying,
    setIsLoading,
    setError,
    setDuration,
    setCurrentTime,
    setVolume,
    setIsMuted,
    setIsPausedForOverlay,
    setHasUserInteracted,
  }), [
    currentTrack,
    backgroundTrack,
    isPlaying,
    isLoading,
    error,
    duration,
    currentTime,
    volume,
    isMuted,
    isPausedForOverlay,
    hasUserInteracted,
    browserInfo,
  ]);

  return (
    <AudioStateContext.Provider value={contextValue}>
      {children}
    </AudioStateContext.Provider>
  );
}

export function useAudioState() {
  const context = useContext(AudioStateContext);
  if (context === undefined) {
    throw new Error('useAudioState must be used within an AudioStateProvider');
  }
  return context;
}