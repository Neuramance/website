import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/app/ui/card';
import HomepageHeader from '@/app/ui/home/nav';
import { EnvelopeClosedIcon } from '@radix-ui/react-icons';

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <HomepageHeader />
      <div className="pointer-events-none absolute inset-0 overflow-hidden bg-[url('/stars-bg.png')] bg-[length:1090px] bg-center"></div>

      <Card className="z-0 w-[400px] border-[0.5px]">
        <CardHeader>
          <CardTitle>Contact us.</CardTitle>
          <CardDescription>
            Reach out about product questions or business opportunities.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 font-mono">
            <EnvelopeClosedIcon />
            austin@neuramance.com
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
