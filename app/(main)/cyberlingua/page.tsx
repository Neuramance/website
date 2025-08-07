'use client';

import { useGlobalAudio } from '@/lib/contexts/AudioContext';
import { logWarning } from '@/lib/utils/logger';

export default function Page() {
  const { playOverlayTrack } = useGlobalAudio();

  const handleCyberLinguaClick = () => {
    try {
      playOverlayTrack('/audio/cyberlingua-sound.mp3', 'cyberlingua-sound', 'CyberLingua Sound');
    } catch (error) {
      logWarning('CyberLingua audio file not found. Please add cyberlingua-sound.mp3 to /public/audio/', 'CyberLinguaPage');
    }
  };

  return (
    <section className="relative flex h-screen w-full items-center bg-background py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col justify-start space-y-8 text-left">
          <div className="space-y-6">
            <h1 className="ss-disambiguation bg-gradient-to-r from-white to-gray-400 bg-clip-text font-mono text-xs tracking-tight text-transparent sm:text-xs sm:leading-tight xl:text-xs/none xl:leading-tight">
              Neuramance CyberLingua™ : <br></br>Realtime Cross-Language Communication & Translation for True Global Communication.
            </h1>
            <div
              className="-mt-[75px] flex h-[200px] w-[600px] items-start justify-start hover:cursor-pointer"
              onClick={handleCyberLinguaClick}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleCyberLinguaClick()}
              aria-label="Play CyberLingua sound"
            >
              <div className="mt-[75px] flex items-center space-x-2">
                <span className="ss-disambiguation bg-gradient-to-r from-white to-gray-100 bg-clip-text font-mono text-xs tracking-tight text-transparent sm:text-xs sm:leading-tight xl:text-xs/none xl:leading-tight">
                  Currently in research & development.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h1
        className="ss-disambiguation absolute bottom-2 left-1/2 -translate-x-1/2 transform w-[80%] max-w-5xl px-4 text-center font-mono text-[10px] tracking-tight text-white hover:cursor-pointer"
        onClick={handleCyberLinguaClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && handleCyberLinguaClick()}
        aria-label="Play CyberLingua audio"
      >
        The limits of your language are the limits of your world.
      </h1>
    </section>
  );
}