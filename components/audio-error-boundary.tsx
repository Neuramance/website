'use client';

import React from 'react';
import { ErrorBoundary } from './error-boundary';
import { logError } from '@/lib/utils/logger';

interface AudioErrorBoundaryProps {
  children: React.ReactNode;
}

const AudioErrorFallback = () => (
  <div className="flex min-h-[100px] flex-col items-center justify-center rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-center">
    <div className="mb-2">
      <svg
        className="mx-auto h-8 w-8 text-yellow-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M6.343 6.343L7.75 7.75m0 8.5l-1.407 1.407M12 12h.01M8 12a4 4 0 118 0 4 4 0 01-8 0z"
        />
      </svg>
    </div>
    <h4 className="mb-1 text-sm font-medium text-yellow-900">Audio Error</h4>
    <p className="text-xs text-yellow-700">
      Audio playback encountered an issue, but the app continues to work normally.
    </p>
  </div>
);

export function AudioErrorBoundary({ children }: AudioErrorBoundaryProps) {
  return (
    <ErrorBoundary
      fallback={<AudioErrorFallback />}
      onError={(error) => {
        logError('Audio component error', error, 'AudioErrorBoundary');
      }}
    >
      {children}
    </ErrorBoundary>
  );
}