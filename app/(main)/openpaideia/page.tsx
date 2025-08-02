'use client';

import { useGlobalAudio } from '@/lib/contexts/AudioContext';
import { logWarning } from '@/lib/utils/logger';

export default function Page() {
  const { playOverlayTrack } = useGlobalAudio();

  const handleOpenPaideiaClick = () => {
    try {
      playOverlayTrack('/audio/openpaideia-sound.mp3', 'openpaideia-sound', 'OpenPaideia Sound');
    } catch (error) {
      logWarning('OpenPaideia audio file not found. Please add openpaideia-sound.mp3 to /public/audio/', 'OpenPaideiaPage');
    }
  };

  return (
    <section className="relative flex h-screen w-full items-center bg-background py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col justify-start space-y-8 text-left">
          <div className="space-y-6">
            <h1 className="ss-disambiguation bg-gradient-to-r from-white to-gray-400 bg-clip-text font-mono text-xs tracking-tight text-transparent sm:text-xs sm:leading-tight xl:text-xs/none xl:leading-tight">
              Neuramance OpenPaideia™ : <br></br>Open-Source Supplementary Education & Community for Valuable Lifelong Learning & Development.
            </h1>
            <div
              className="-mt-[75px] flex h-[200px] w-[600px] items-start justify-start hover:cursor-pointer"
              onClick={handleOpenPaideiaClick}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleOpenPaideiaClick()}
              aria-label="Play openpaideia sound"
            >
              <div className="mt-[75px] flex items-center space-x-2">
                <span className="ss-disambiguation bg-gradient-to-r from-white to-gray-100 bg-clip-text font-mono text-xs tracking-tight text-transparent sm:text-xs sm:leading-tight xl:text-xs/none xl:leading-tight">
                  Currently in planning.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h1
        className="ss-disambiguation absolute bottom-2 left-1/2 -translate-x-1/2 transform px-4 text-center font-mono text-[10px] tracking-tight text-white hover:cursor-pointer sm:text-[10px] sm:leading-tight md:text-[11px] xl:text-[10px]/none xl:leading-tight"
        onClick={handleOpenPaideiaClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && handleOpenPaideiaClick()}
        aria-label="Play openpaideia audio"
      >
        Humanity&apos;s greatest library isn&apos;t a collection of books, but a community of minds.
      </h1>
    </section>
  );
}