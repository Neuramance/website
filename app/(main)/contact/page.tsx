'use client';

import { useGlobalAudio } from '@/lib/contexts/AudioContext';
import { EnvelopeClosedIcon } from '@radix-ui/react-icons';

export default function Page() {
  const { playOverlayTrack } = useGlobalAudio();

  const handleQuoteClick = () => {
    try {
      playOverlayTrack('/audio/dune2-intro.mp3', 'dune2-quote', 'Dune 2 Quote');
    } catch (error) {
      console.warn(
        'Dune 2 audio file not found. Please add dune2-intro.mp3 to /public/audio/',
      );
    }
  };

  const handleEmailClick = () => {
    try {
      playOverlayTrack('/audio/got-mail.mp3', 'got-mail', 'Got Mail Sound');
    } catch (error) {
      console.warn(
        'Got mail audio file not found. Please add got-mail.mp3 to /public/audio/',
      );
    }
  };
  return (
    <section className="relative flex h-screen w-full items-center bg-background py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col justify-start space-y-8 text-left">
          <div className="space-y-6">
            <h1 className="ss-disambiguation bg-gradient-to-r from-white to-gray-400 bg-clip-text font-mono text-xs tracking-tight text-transparent sm:text-xs sm:leading-tight xl:text-xs/none xl:leading-tight">
              CONTACT US : <br></br>Reach out about questions, partnerships, or
              anything else.<br></br>No time wasting, please.
            </h1>
            <div 
              className="w-[300px] h-[200px] flex items-start justify-start hover:cursor-pointer -mt-[75px]"
              onClick={handleEmailClick}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleEmailClick()}
              aria-label="Play got mail sound"
            >
              <div className="flex items-center space-x-2 mt-[75px]">
                <EnvelopeClosedIcon className="h-3 w-3" />
                <span className="ss-disambiguation bg-gradient-to-r from-white to-gray-100 bg-clip-text font-mono text-xs tracking-tight text-transparent sm:text-xs sm:leading-tight xl:text-xs/none xl:leading-tight">
                  wires@neuramance.com
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Bottom Centered h1 */}
      <h1
        className="ss-disambiguation absolute bottom-2 left-1/2 -translate-x-1/2 transform whitespace-nowrap text-center font-mono text-[10px] tracking-tight text-white hover:cursor-pointer sm:text-[10px] sm:leading-tight xl:text-[10px]/none xl:leading-tight"
        onClick={handleQuoteClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && handleQuoteClick()}
        aria-label="Play Dune 2 audio quote"
      >
        A million years pass on top of each other every night. It's always 3am
        online. What are you doing to make it a billion?
      </h1>
    </section>
  );
}
