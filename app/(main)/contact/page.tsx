import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { EnvelopeClosedIcon } from '@radix-ui/react-icons';

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="pointer-events-none absolute inset-0 overflow-hidden"></div>

      <Card className="z-0 w-[420px]">
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
    </div>
  );
}
