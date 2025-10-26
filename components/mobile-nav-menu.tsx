'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from './ui/button';
import { MoreHorizontal } from 'lucide-react';
import { DashboardIcon, ReaderIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { useState } from 'react';

export default function MobileNavMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div
      onMouseLeave={() => setOpen(false)}
      className="md:hidden"
    >
      <DropdownMenu open={open} onOpenChange={setOpen} modal={false}>
        <DropdownMenuTrigger asChild>
          <div className="relative">
            <Button 
              size="nav" 
              variant="secondary" 
              className="gap-1 font-mono px-1.5 sm:px-2 sm:pr-2.5"
              onMouseEnter={() => setOpen(true)}
            >
              <MoreHorizontal className="h-[8px] w-[10px] shrink-0" />
              <span className="hidden min-[400px]:inline">Products</span>
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
      </DropdownMenuContent>
    </DropdownMenu>
    </div>
  );
}