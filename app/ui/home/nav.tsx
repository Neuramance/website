'use client';

import { Icons } from '@/app/icons/icons';
import { cn } from '@/app/lib/utils';
import { Badge } from '@/app/ui/badge';
import { Button } from '@/app/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/app/ui/navigation-menu';
import { ArrowTopRightIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import * as React from 'react';
import { useGlitch } from 'react-powerglitch';
import Wordmark from '../wordmark';

export default function HomepageNav() {
  const glitch = useGlitch({
    timing: {
      duration: 8000,
    },
  });
  return (
    <header className="fixed left-0 right-0 top-0 z-50 flex w-full justify-center border-b-[0.5px] bg-background px-8 pb-2 pt-2">
      <div className="flex w-full max-w-[1400px] items-center justify-between">
        <Link href="/">
          <Wordmark ref={glitch.ref} />
        </Link>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <Badge variant="outline" className="mr-2">
                  Coming soon
                </Badge>
                Command Center{' '}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[550px] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <a
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-secondary p-6 no-underline outline-none focus:shadow-md"
                        href="/"
                      >
                        <Icons.logo className="h-6 w-6" />
                        <div className="mb-2 mt-4 text-lg font-medium">
                          Command Center
                        </div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          Deploy & manage AI agents that work on their own &
                          together. Analyze & visualize productivity, workflows,
                          and results.
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <ListItem href="/" title="Deploy Agents">
                    Task AI agents to self assemble in order to complete tasks
                    you choose.
                  </ListItem>
                  <ListItem href="/" title="Analyze Workflow">
                    Visualize agentic collaboration and review work output in
                    realtime.
                  </ListItem>
                  <ListItem href="/" title="Query Workforce">
                    Ask your AI agents questions about their work and yields.
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/chat" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Chat <ArrowTopRightIcon className="ml-1 h-3 w-3" />
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <Button size="nav" variant="outline">
          Sign in
        </Button>
      </div>
    </header>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-border hover:text-accent-foreground',
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';
