import { EnvelopeClosedIcon } from '@radix-ui/react-icons';

export default function Page() {
  return (
    <section className="relative flex h-screen w-full items-center bg-background py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col justify-start space-y-8 text-left">
          <div className="space-y-4">
            <h1 className="bg-gradient-to-r from-white to-gray-400 bg-clip-text font-mono text-sm tracking-tight text-transparent ss-disambiguation sm:text-sm sm:leading-tight xl:text-sm/none xl:leading-tight">
              CONTACT US
            </h1>
            <h1 className="bg-gradient-to-r from-white to-gray-400 bg-clip-text font-mono text-xs tracking-tight text-transparent ss-disambiguation sm:text-xs sm:leading-tight xl:text-xs/none xl:leading-tight">
              Reach out about product questions, partnerships, or anything else.
            </h1>
            <div className="flex items-center space-x-2">
              <EnvelopeClosedIcon />
              <span className="bg-gradient-to-r from-white to-gray-100 bg-clip-text font-mono text-xs tracking-tight text-transparent ss-disambiguation sm:text-xs sm:leading-tight xl:text-xs/none xl:leading-tight">
                wires@neuramance.com
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* Bottom Centered h1 */}
      <h1 className="absolute bottom-2 left-1/2 -translate-x-1/2 transform whitespace-nowrap text-center font-mono text-[10px] tracking-tight text-white ss-disambiguation sm:text-[10px] sm:leading-tight xl:text-[10px]/none xl:leading-tight">
        A million years pass on top of each other every night. What are You
        doing to make it a billion?
      </h1>
    </section>
  );
}
