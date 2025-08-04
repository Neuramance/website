'use client';

import React, { useState, useEffect } from 'react';
import { useGlitch } from 'react-powerglitch';

const GlitchWordmark = React.memo(() => {
  const companyNames = [
    { text: 'NEURAMANCE® CYBERSYSTEMS CORPORATION', cycles: 3 },
    { text: '神念赛博系统公司', cycles: 2 },
    { text: '神念サイバーシステム株式会社', cycles: 2 }
  ];

  const [currentText, setCurrentText] = useState(companyNames[0].text);
  const [cycleCount, setCycleCount] = useState(0);
  const [languageIndex, setLanguageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCycleCount(prev => {
        const newCount = prev + 1;
        const currentLanguage = companyNames[languageIndex];
        
        // Check if we've completed the required cycles for current language
        if (newCount >= currentLanguage.cycles) {
          const nextIndex = (languageIndex + 1) % companyNames.length;
          setLanguageIndex(nextIndex);
          setCurrentText(companyNames[nextIndex].text);
          return 0; // Reset cycle count for new language
        }
        
        return newCount;
      });
    }, 3000); // Every 3 seconds (matching glitch duration)

    return () => clearInterval(interval);
  }, [languageIndex]);

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
        {currentText}
      </h1>
    </div>
  );
});

GlitchWordmark.displayName = 'GlitchWordmark';

export default GlitchWordmark;
