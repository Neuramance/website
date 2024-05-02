import Link from 'next/link';
import { Icons } from '../icons/icons';

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background">
      <header className="fixed left-0 right-0 top-0 z-50 flex w-full justify-center px-6 pb-2 pt-6">
        <div className="flex w-full items-center justify-between">
          <Link href="/">
            <Icons.logoIcon className="h-8 w-8" />
          </Link>
        </div>
      </header>

      <div className="w-full max-w-sm space-y-6 rounded-lg p-8">
        <h1 className="mb-10 text-center text-3xl font-semibold">
          Create your Neuramance account
        </h1>
        <div className="flex flex-col space-y-4">
          <button className="border-primary-border flex items-center justify-center rounded-lg border bg-blue-500 px-5 py-3.5 text-center text-base font-medium text-white hover:bg-blue-600">
            <svg
              className="pr-3"
              height="14"
              viewBox="0 0 16 16"
              fill="#ffffff"
              role="img"
              focusable="false"
              aria-hidden="true"
            >
              <path d="M14.9933 8.27504C14.9933 7.68802 14.9456 7.25966 14.8426 6.81543H8.1394V9.46493H12.074C11.9947 10.1234 11.5663 11.115 10.6144 11.7813L10.6011 11.87L12.7205 13.5119L12.8673 13.5265C14.2158 12.2811 14.9933 10.4486 14.9933 8.27504Z"></path>
              <path d="M8.1394 15.2557C10.067 15.2557 11.6853 14.6211 12.8673 13.5264L10.6144 11.7812C10.0115 12.2016 9.20237 12.4951 8.1394 12.4951C6.25143 12.4951 4.64903 11.2497 4.07782 9.52832L3.99409 9.53543L1.79029 11.241L1.76147 11.3211C2.93551 13.6533 5.34706 15.2557 8.1394 15.2557Z"></path>
              <path d="M4.07787 9.52856C3.92715 9.08434 3.83992 8.60834 3.83992 8.11653C3.83992 7.62467 3.92715 7.14873 4.06994 6.7045L4.06595 6.60989L1.83453 4.87695L1.76152 4.91168C1.27765 5.87948 1 6.96629 1 8.11653C1 9.26677 1.27765 10.3535 1.76152 11.3213L4.07787 9.52856Z"></path>
              <path d="M8.1394 3.73713C9.48001 3.73713 10.3843 4.31622 10.9 4.80015L12.9149 2.83282C11.6774 1.68258 10.067 0.976562 8.1394 0.976562C5.34706 0.976562 2.93551 2.57896 1.76147 4.91116L4.06989 6.70398C4.64903 4.98259 6.25143 3.73713 8.1394 3.73713Z"></path>
            </svg>{' '}
            Continue with Google
          </button>
          <button className="rounded-lg border border-border bg-neutral-900 px-5 py-3.5 text-center text-base font-medium text-white hover:bg-neutral-800">
            Continue with Email
          </button>
        </div>
      </div>
    </main>
  );
}
