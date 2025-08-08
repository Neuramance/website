'use client';

import { useGlobalAudio } from '@/lib/contexts/AudioContext';
import { logWarning } from '@/lib/utils/logger';
import { EnvelopeClosedIcon } from '@radix-ui/react-icons';
import { Terminal } from 'lucide-react';

export default function Page() {
  const { playOverlayTrack } = useGlobalAudio();

  const handleQuoteClick = () => {
    try {
      playOverlayTrack('/audio/about-quote.mp3', 'about-quote', 'About Quote');
    } catch (error) {
      logWarning('About quote audio file not found. Please add about-quote.mp3 to /public/audio/', 'AboutPage');
    }
  };

  const handleInfoClick = () => {
    try {
      playOverlayTrack('/audio/info-sound.mp3', 'info-sound', 'Info Sound');
    } catch (error) {
      logWarning('Info sound audio file not found. Please add info-sound.mp3 to /public/audio/', 'AboutPage');
    }
  };

  const handleEmailClick = () => {
    try {
      playOverlayTrack('/audio/got-mail.mp3', 'got-mail', 'Got Mail Sound');
    } catch (error) {
      logWarning('Got mail audio file not found. Please add got-mail.mp3 to /public/audio/', 'AboutPage');
    }
  };
  return (
    <section className="relative flex h-screen w-full items-center bg-background py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col justify-start space-y-8 text-left">
          <div className="space-y-6">
            <h1 className="ss-disambiguation bg-gradient-to-r from-white to-gray-400 bg-clip-text font-mono tracking-tight text-transparent">
              <span className="text-sm leading-tight">About Neuramance® :</span>
              <br></br><br></br><span className="text-xs leading-3">Technology is moving extremely fast.
              <br></br>Many things are on the precipice of being greatly disrupted.
              <br></br>We help you stay competitive by giving you tools to stay at the leading edge.</span>
              <br></br><br></br><span className="text-xs leading-3">Our team utilizes our state-of-the-art skills & taste to build software for enhanced cognition, happiness, & business outcomes.
              <br></br><br></br>The future will be exciting for all, but difficult to navigate.
              <br></br>We want to thrive in this new environment, and we want to help you do so as well, if you so choose.
              <br></br><br></br>Will you lean in, or will you fall behind?</span>
            </h1>
            <div
              className="-mt-[75px] flex h-[200px] w-[600px] items-start justify-start hover:cursor-pointer"
              onClick={handleInfoClick}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleInfoClick()}
              aria-label="Play info sound"
            >
              <div className="mt-[120px] flex flex-col items-start">
                <div className="flex items-center space-x-2">
                  <Terminal className="h-3 w-3" />
                  <span className="ss-disambiguation bg-gradient-to-r from-white to-gray-100 bg-clip-text font-mono text-xs tracking-tight text-transparent sm:text-xs sm:leading-tight xl:text-xs/none xl:leading-tight">
                    In pursuit of enabling eudaimonia, for those who wish to strive for it.
                  </span>
                </div>
                <div className="flex items-center space-x-2 mt-1">
                  <div className="h-3 w-3" />
                  <span className="ss-disambiguation bg-gradient-to-r from-white to-gray-100 bg-clip-text font-mono text-xs tracking-tight text-transparent sm:text-xs sm:leading-tight xl:text-xs/none xl:leading-tight">
                    <br></br>- Austin, Neuramance® founder
                  </span>
                </div>
              </div>
            </div>
            {/* Contact Section */}
            <div className="mt-24">
              <h2 className="ss-disambiguation bg-gradient-to-r from-white to-gray-400 bg-clip-text font-mono text-xs tracking-tight text-transparent leading-3">
                Contact :
              </h2>
              <p className="mt-2 ss-disambiguation bg-gradient-to-r from-white to-gray-400 bg-clip-text font-mono text-xs tracking-tight text-transparent leading-3">
                Reach out about questions, partnerships, or anything else.
              </p>
              <div
                className="mt-4 flex items-center space-x-2 hover:cursor-pointer"
                onClick={handleEmailClick}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && handleEmailClick()}
                aria-label="Play got mail sound"
              >
                <EnvelopeClosedIcon className="h-3 w-3" />
                <span className="ss-disambiguation bg-gradient-to-r from-white to-gray-100 bg-clip-text font-mono text-xs tracking-tight text-transparent sm:text-xs sm:leading-tight xl:text-xs/none xl:leading-tight">
                  austin@neuramance.com
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Bottom Centered h1 */}
      <h1
        className="ss-disambiguation absolute bottom-2 left-1/2 -translate-x-1/2 transform w-[80%] max-w-5xl px-4 text-center font-mono text-[10px] tracking-tight text-white hover:cursor-pointer"
        onClick={handleQuoteClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && handleQuoteClick()}
        aria-label="Play about audio quote"
      >
        We are what we repeatedly do. Excellence, then, is not an act, but a habit.
      </h1>
    </section>
  );
}