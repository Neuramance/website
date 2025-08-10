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
            <h1 className="ss-disambiguation bg-gradient-to-r from-white to-gray-400 bg-clip-text font-mono tracking-tight text-transparent">
              <span className="text-sm leading-tight">Neuramance® OpenPaideia :</span>
              <br></br><span className="text-xs leading-3">Open-Source Supplementary Education & Community for Valuable Lifelong Learning & Development.<br></br><br></br>Currently in research & development.</span>
            </h1>
            
          </div>
        </div>
      </div>
      <h1
        className="ss-disambiguation absolute bottom-2 left-1/2 -translate-x-1/2 transform w-[80%] max-w-5xl px-4 text-center font-mono text-[10px] tracking-tight text-white hover:cursor-pointer"
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