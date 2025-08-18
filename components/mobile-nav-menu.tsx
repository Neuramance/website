'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from './ui/button';
import { MoreHorizontal } from 'lucide-react';
import { DashboardIcon, TokensIcon, ReaderIcon, TransformIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { useState } from 'react';

export default function MobileNavMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div 
      onMouseLeave={() => setOpen(false)}
      className="[@media(hover:hover)]:block"
    >
      <DropdownMenu open={open} onOpenChange={setOpen} modal={false}>
        <DropdownMenuTrigger asChild>
          <div className="relative">
            <Button 
              size="nav" 
              variant="secondary" 
              className="gap-1 font-mono lg:hidden"
              onMouseEnter={() => setOpen(true)}
            >
              <MoreHorizontal className="h-[8px] w-[10px]" />
              Products
            </Button>
            {/* Invisible hover bridge */}
            <div 
              className="absolute left-0 right-0 top-full h-3 [@media(hover:hover)]:block" 
              aria-hidden="true"
            />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          className="min-w-40"
          align="start"
          sideOffset={8}
        >
        <Link href="/deepstrategy">
          <DropdownMenuItem className="font-mono justify-start">
            <DashboardIcon className="h-3 w-3 mr-2" />
            <span>DeepStrategy<sup className="ml-[1px] text-[8px] leading-none align-[0.1em]">1</sup></span>
          </DropdownMenuItem>
        </Link>
        <Link href="/hypercognition">
          <DropdownMenuItem className="font-mono justify-start">
            <TokensIcon className="h-3 w-3 mr-2" />
            <span>HyperCognition<sup className="ml-[1px] text-[8px] leading-none align-[0.1em]">2</sup></span>
          </DropdownMenuItem>
        </Link>
        <Link href="/cyberlingua">
          <DropdownMenuItem className="font-mono justify-start">
            <TransformIcon className="h-3 w-3 mr-2" />
            <span>CyberLingua<sup className="ml-[1px] text-[8px] leading-none align-[0.1em]">3</sup></span>
          </DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
    </div>
  );
}