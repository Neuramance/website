'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useGlobalAudio } from '@/lib/contexts/AudioContext';

export const AudioEnabler = React.memo(() => {
  const {
    playTrack,
    error,
    isPlaying,
    currentTrack,
    browserInfo,
    hasUserInteracted,
  } = useGlobalAudio();
  const [showOverlay, setShowOverlay] = useState(false);
  const [hasAttemptedAutoplay, setHasAttemptedAutoplay] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    // Attempt autoplay after a short delay, but only if likely to succeed
    if (!hasAttemptedAutoplay) {
      const timer = setTimeout(() => {
        setHasAttemptedAutoplay(true);

        // For desktop Safari, wait for user interaction before attempting autoplay
        if (browserInfo.isDesktopSafari && !hasUserInteracted) {
          setShowOverlay(true);
          return;
        }

        // For mobile Safari, always show overlay first
        if (browserInfo.isMobileSafari) {
          setShowOverlay(true);
          return;
        }

        // For other browsers, attempt autoplay
        playTrack(
          '/audio/stasis.mp3',
          'malum-stasis-background',
          'Background Music',
        );
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [hasAttemptedAutoplay, playTrack, browserInfo, hasUserInteracted]);

  useEffect(() => {
    // Show overlay if autoplay is blocked
    if (
      error &&
      (error.includes('Autoplay blocked') ||
        error.includes('Safari autoplay blocked') ||
        error.includes('Mobile Safari requires'))
    ) {
      setShowOverlay(true);
    } else if (isPlaying && currentTrack) {
      setShowOverlay(false);
    }
  }, [error, isPlaying, currentTrack]);

  const handleEnableAudio = useCallback(() => {
    setShowOverlay(false);
    setRetryCount((prev) => prev + 1);

    // For Safari, add a small delay to ensure user gesture is properly processed
    if (browserInfo.isSafari) {
      setTimeout(() => {
        playTrack(
          '/audio/stasis.mp3',
          'malum-stasis-background',
          'Background Music',
        );
      }, 100);
    } else {
      playTrack(
        '/audio/stasis.mp3',
        'malum-stasis-background',
        'Background Music',
      );
    }
  }, [browserInfo.isSafari, playTrack]);

  // Auto-retry logic for Safari if audio still fails after user interaction
  useEffect(() => {
    if (
      hasUserInteracted &&
      retryCount > 0 &&
      retryCount < 3 &&
      error &&
      browserInfo.isSafari &&
      !isPlaying
    ) {
      const retryTimer = setTimeout(() => {
        playTrack(
          '/audio/stasis.mp3',
          'malum-stasis-background',
          'Background Music',
        );
        setRetryCount((prev) => prev + 1);
      }, 1000);

      return () => clearTimeout(retryTimer);
    }
  }, [
    hasUserInteracted,
    retryCount,
    error,
    browserInfo.isSafari,
    isPlaying,
    playTrack,
  ]);

  if (!showOverlay) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="mx-4 max-w-md rounded-lg bg-background p-6 text-center shadow-xl">
        <div className="mb-4">
          <svg
            className="mx-auto h-12 w-12 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.5c-.69 0-1.25-.56-1.25-1.25V9.75c0-.69.56-1.25 1.25-1.25H6.75z"
            />
          </svg>
        </div>
        <h2 className="mb-2 text-lg font-semibold text-white">
          {browserInfo.isDesktopSafari
            ? 'Safari Audio Setup'
            : browserInfo.isMobileSafari
              ? 'Mobile Audio Setup'
              : 'Enable Audio'}
        </h2>
        <p className="mb-4 text-sm text-gray-300">
          {browserInfo.isDesktopSafari
            ? 'Safari requires permission to play audio. Click below to enable background music, or check Safari > Settings > Websites > Auto-Play.'
            : browserInfo.isMobileSafari
              ? 'Tap below to enable background audio. Mobile Safari requires user interaction for audio playback.'
              : 'Click to enable background audio for the full experience.'}
        </p>
        <button
          onClick={handleEnableAudio}
          className="rounded-md bg-white px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-gray-200"
        >
          {browserInfo.isMobileSafari ? 'Tap to Enable' : 'Enable Audio'}
        </button>
      </div>
    </div>
  );
});

AudioEnabler.displayName = 'AudioEnabler';
