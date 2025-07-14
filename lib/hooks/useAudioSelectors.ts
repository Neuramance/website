/**
 * Specific audio state selectors to prevent unnecessary re-renders
 * Components can subscribe only to the state they actually need
 */

import { useAudioState } from '@/lib/contexts/AudioStateContext';
import { useMemo } from 'react';

// Playback state selector
export function useAudioPlayback() {
  const { isPlaying, currentTrack, setIsPlaying } = useAudioState();
  
  return useMemo(() => ({
    isPlaying,
    currentTrack,
    setIsPlaying,
  }), [isPlaying, currentTrack, setIsPlaying]);
}

// Loading state selector
export function useAudioLoading() {
  const { isLoading, setIsLoading } = useAudioState();
  
  return useMemo(() => ({
    isLoading,
    setIsLoading,
  }), [isLoading, setIsLoading]);
}

// Error state selector
export function useAudioError() {
  const { error, setError } = useAudioState();
  
  return useMemo(() => ({
    error,
    setError,
  }), [error, setError]);
}

// Progress state selector
export function useAudioProgress() {
  const { duration, currentTime, setDuration, setCurrentTime } = useAudioState();
  
  return useMemo(() => ({
    duration,
    currentTime,
    progress: duration > 0 ? (currentTime / duration) * 100 : 0,
    setDuration,
    setCurrentTime,
  }), [duration, currentTime, setDuration, setCurrentTime]);
}

// Volume state selector
export function useAudioVolume() {
  const { volume, isMuted, setVolume, setIsMuted } = useAudioState();
  
  return useMemo(() => ({
    volume,
    isMuted,
    setVolume,
    setIsMuted,
  }), [volume, isMuted, setVolume, setIsMuted]);
}

// Browser info selector
export function useAudioBrowserInfo() {
  const { browserInfo, hasUserInteracted, setHasUserInteracted } = useAudioState();
  
  return useMemo(() => ({
    browserInfo,
    hasUserInteracted,
    setHasUserInteracted,
  }), [browserInfo, hasUserInteracted, setHasUserInteracted]);
}

// Track management selector
export function useAudioTracks() {
  const { 
    currentTrack, 
    backgroundTrack, 
    isPausedForOverlay,
    setCurrentTrack, 
    setBackgroundTrack,
    setIsPausedForOverlay
  } = useAudioState();
  
  return useMemo(() => ({
    currentTrack,
    backgroundTrack,
    isPausedForOverlay,
    setCurrentTrack,
    setBackgroundTrack,
    setIsPausedForOverlay,
  }), [
    currentTrack, 
    backgroundTrack, 
    isPausedForOverlay,
    setCurrentTrack, 
    setBackgroundTrack,
    setIsPausedForOverlay
  ]);
}

// Combined selector for components that need multiple state pieces
export function useAudioControls() {
  const playback = useAudioPlayback();
  const loading = useAudioLoading();
  const error = useAudioError();
  
  return useMemo(() => ({
    ...playback,
    ...loading,
    ...error,
  }), [playback, loading, error]);
}