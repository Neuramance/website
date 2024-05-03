import HomepageNav from '@/app/ui/home/nav';

export default function ErrorPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-1 overflow-hidden bg-background">
      <HomepageNav />

      <p className="mb-4 text-xl font-medium">Oops, something went wrong. 😭</p>
      <p className="text-muted-foreground">
        Please try whatever you were doing again.
      </p>
      <p className="text-muted-foreground">
        If you continue to see this error, please reach out to us.
      </p>
    </main>
  );
}
