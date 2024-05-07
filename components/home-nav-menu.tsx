'use client';

import { Badge } from '@/components/ui/badge';
import { Icons } from '@/components/ui/icons';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import { ArrowTopRightIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import * as React from 'react';

export default function HomeNavMenu() {
  return (
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
                  <Link
                    className="flex h-full w-full select-none flex-col justify-end rounded-md border bg-secondary p-6 no-underline outline-none hover:bg-background focus:shadow-md"
                    href="/"
                  >
                    <Icons.lines className="h-6 w-6" />
                    <div className="mb-2 mt-4 text-lg font-medium">
                      Command Center
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Deploy & manage AI agents that work on their own &
                      together. Analyze & visualize productivity, workflows, and
                      results.
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <Link href="/" legacyBehavior passHref>
                <ListItem title="Deploy Agents">
                  Task AI agents to self assemble in order to complete tasks you
                  choose.
                </ListItem>
              </Link>
              <Link href="/" legacyBehavior passHref>
                <ListItem href="/" title="Analyze Workflow">
                  Visualize agentic collaboration and review work output in
                  realtime.
                </ListItem>
              </Link>
              <Link href="/" legacyBehavior passHref>
                <ListItem href="/" title="Query Workforce">
                  Ask your AI agents questions about their work and yields.
                </ListItem>
              </Link>
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
        <NavigationMenuItem>
          <Link href="/contact" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Contact
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
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
