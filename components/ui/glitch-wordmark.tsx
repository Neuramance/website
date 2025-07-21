'use client';

import React from 'react';
import { useGlitch } from 'react-powerglitch';

const GlitchWordmark = React.memo(() => {
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
    <div 
      ref={glitch.ref} 
      className="text-white"
      style={{
        contain: 'layout style',
        overflow: 'hidden',
        willChange: 'transform'
      }}
    >
      <h1 className="ss-disambiguation bg-gradient-to-r from-white to-gray-400 bg-clip-text font-mono text-sm tracking-tight text-transparent sm:text-sm sm:leading-tight xl:text-sm/none xl:leading-tight">
        NEURAMANCE® CYBERSYSTEMS CORP.
      </h1>
    </div>
  );
});

GlitchWordmark.displayName = 'GlitchWordmark';

export default GlitchWordmark;
