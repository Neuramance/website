'use client';

import { useGlobalAudio } from '@/lib/contexts/AudioContext';
import { useEffect, useState } from 'react';

export function AudioEnabler() {
  const { playTrack, error, isPlaying, currentTrack } = useGlobalAudio();
  const [showOverlay, setShowOverlay] = useState(false);
  const [hasAttemptedAutoplay, setHasAttemptedAutoplay] = useState(false);

  useEffect(() => {
    // Attempt autoplay after a short delay
    if (!hasAttemptedAutoplay) {
      const timer = setTimeout(() => {
        setHasAttemptedAutoplay(true);
        playTrack('/audio/red.mp3', 'red-background', 'Background Music');
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [hasAttemptedAutoplay, playTrack]);

  useEffect(() => {
    // Show overlay if autoplay is blocked
    if (error && error.includes('Autoplay blocked')) {
      setShowOverlay(true);
    } else if (isPlaying && currentTrack) {
      setShowOverlay(false);
    }
  }, [error, isPlaying, currentTrack]);

  const handleEnableAudio = () => {
    setShowOverlay(false);
    playTrack('/audio/red.mp3', 'red-background', 'Background Music');
  };

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
        <h2 className="mb-2 text-lg font-semibold text-white">Enable Audio</h2>
        <p className="mb-4 text-sm text-gray-300">
          Click to enable background audio for the full experience.
        </p>
        <button
          onClick={handleEnableAudio}
          className="rounded-md bg-white px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-gray-200"
        >
          Enable Audio
        </button>
      </div>
    </div>
  );
}