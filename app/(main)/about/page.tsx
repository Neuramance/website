'use client';

import { useGlobalAudio } from '@/lib/contexts/AudioContext';
import { logWarning } from '@/lib/utils/logger';
import { EnvelopeClosedIcon } from '@radix-ui/react-icons';
import { Terminal, Twitter } from 'lucide-react';

export default function Page() {
  const { playOverlayTrack } = useGlobalAudio();

  const handleQuoteClick = () => {
    try {
      playOverlayTrack('/audio/about-quote.mp3', 'about-quote', 'About Quote');
    } catch (error) {
      logWarning(
        'About quote audio file not found. Please add about-quote.mp3 to /public/audio/',
        'AboutPage',
      );
    }
  };

  const handleInfoClick = () => {
    try {
      playOverlayTrack('/audio/info-sound.mp3', 'info-sound', 'Info Sound');
    } catch (error) {
      logWarning(
        'Info sound audio file not found. Please add info-sound.mp3 to /public/audio/',
        'AboutPage',
      );
    }
  };

  const handleEmailClick = () => {
    try {
      playOverlayTrack('/audio/got-mail.mp3', 'got-mail', 'Got Mail Sound');
    } catch (error) {
      logWarning(
        'Got mail audio file not found. Please add got-mail.mp3 to /public/audio/',
        'AboutPage',
      );
    }
  };
  return (
    <section className="relative flex min-h-screen w-full items-center bg-background pb-12 pt-20 md:py-24 md:pt-0 lg:py-32 xl:py-48">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col justify-start space-y-8 text-left">
          <div className="space-y-6">
            <h1 className="ss-disambiguation break-words bg-gradient-to-r from-white to-gray-400 bg-clip-text font-mono tracking-tight text-transparent">
              <span className="text-sm leading-tight">Neuramance® :</span>
              <br></br>
              <br></br>
              <span className="block text-xs leading-relaxed md:leading-normal">
                Many problems in the world have been solved. <br></br>The
                baseline quality of life that humanity has achieved, through
                hard work & pain, is now fantastic.
                <br></br>
                <br></br>Much of the vectorspace comprising the remaining
                highest ROI (investment = effort, return = human elucidation)
                <br></br>things that one could work on is now in the realm of
                refining experiences that people often overlook.
                <br></br>
                <br></br>
                <span className="block pl-8">
                  {'>'} This trend is visible in many ways.<br></br>
                  <span className="block pl-4">
                    One example in which it is clearly demonstrated is in the
                    relativly recent wave of successful new elegantly crafted
                    CPG brands.
                  </span>
                </span>
                <br></br>Herein lies an opportunity for designers, craftsman,
                curators, & the like to reimagine forgotton monotonies of
                everyday life, pernicious papercuts of the soul carelessly
                devoid of any beauty or taste that millions of people sleepwalk
                into experiencing constantly, & unexpectedly gift them a bit of
                happiness, elucidation, & enrichment, no matter how small.
                <br></br>
                <br></br>Those who truly care about user experiences & product
                design know what I&apos;m talking about, & can relate to the
                compelling inclination to try & help improve things.
                <br></br>
                <br></br>Neuramance® is an attempt, specializing in the digital
                world, at reinvigorating beauty & delight back into common human
                experiences.
                <br></br>We design our own softwre products, & also consult &
                work with others pursuing digital excellence.
              </span>
            </h1>
            <div
              className="flex h-auto w-full max-w-full items-start justify-start hover:cursor-pointer md:-mt-[75px] md:h-[200px] md:w-[600px]"
              onClick={handleInfoClick}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleInfoClick()}
              aria-label="Play info sound"
            >
              <div className="mt-5 flex flex-col items-start md:mt-[105px]">
                <div className="flex items-center space-x-2">
                  <Terminal className="h-3 w-3" />
                  <span className="ss-disambiguation bg-gradient-to-r from-white to-gray-100 bg-clip-text font-mono text-xs tracking-tight text-transparent sm:text-xs sm:leading-tight xl:text-xs/none xl:leading-tight">
                    Software from the future,
                  </span>
                </div>
                <div className="mt-1 flex items-center space-x-2">
                  <div className="h-3 w-3" />
                  <span className="ss-disambiguation bg-gradient-to-r from-white to-gray-100 bg-clip-text font-mono text-xs tracking-tight text-transparent sm:text-xs sm:leading-tight xl:text-xs/none xl:leading-tight">
                    Austin, Neuramance® founder
                  </span>
                </div>
              </div>
            </div>
            {/* Contact Section */}
            <div className="mt-4 md:mt-8">
              <p className="ss-disambiguation mt-2 break-words bg-gradient-to-r from-white to-gray-400 bg-clip-text font-mono text-xs leading-3 tracking-tight text-transparent">
                Reach out about questions, partnerships, or anything else.
              </p>
              <div
                className="mt-4 flex items-center space-x-2 transition-opacity hover:cursor-pointer hover:opacity-80"
                onClick={handleEmailClick}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && handleEmailClick()}
                aria-label="Play got mail sound"
              >
                <EnvelopeClosedIcon className="h-3 w-3 flex-shrink-0" />
                <span className="ss-disambiguation break-all bg-gradient-to-r from-white to-gray-100 bg-clip-text font-mono text-xs tracking-tight text-transparent sm:text-xs sm:leading-tight xl:text-xs/none xl:leading-tight">
                  austin@neuramance.com
                </span>
              </div>
              <a
                href="https://x.com/Neuramance"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 flex items-center space-x-2 transition-opacity hover:opacity-80"
                aria-label="Visit Neuramance X/Twitter"
              >
                <Twitter className="h-3 w-3 flex-shrink-0" />
                <span className="ss-disambiguation bg-gradient-to-r from-white to-gray-100 bg-clip-text font-mono text-xs tracking-tight text-transparent sm:text-xs sm:leading-tight xl:text-xs/none xl:leading-tight">
                  X/Twitter
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* Bottom Centered h1 */}
      <h1
        className="ss-disambiguation absolute bottom-2 left-1/2 w-[80%] max-w-5xl -translate-x-1/2 transform px-4 text-center font-mono text-[10px] tracking-tight text-white hover:cursor-pointer"
        onClick={handleQuoteClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && handleQuoteClick()}
        aria-label="Play about audio quote"
      >
        We are what we repeatedly do. Excellence, then, is not an act, but a
        habit.
      </h1>
    </section>
  );
}
