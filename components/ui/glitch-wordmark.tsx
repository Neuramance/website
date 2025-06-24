'use client';

import { useGlitch } from 'react-powerglitch';

export default function GlitchWordmark() {
  const glitch = useGlitch({
    timing: {
      duration: 3000, // Animation lasts 3 seconds
      iterations: Infinity, // Repeat forever
    },
    glitchTimeSpan: {
      /**
       * Start time of the glitch in percent, between 0 and 1.
       */
      start: 0.88,
      /**
       * End time of the glitch in percent, between 0 and 1.
       */
      end: 1.0,
    },
  });
  return (
    <div ref={glitch.ref} className="text-white">
      <h1 className="bg-gradient-to-r from-white to-gray-400 bg-clip-text font-mono text-base tracking-tight text-transparent ss-disambiguation sm:text-base sm:leading-tight xl:text-base/none xl:leading-tight">
        NEURAMANCE® CYBERNETICS
      </h1>
    </div>
  );
}
