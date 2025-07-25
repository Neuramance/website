'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from './ui/button';
import { MoreHorizontal } from 'lucide-react';
import { DashboardIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

export default function MobileNavMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="nav" variant="secondary" className="gap-1 font-mono md:hidden">
          <MoreHorizontal className="h-[8px] w-[10px]" />
          Menu
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-40 mr-[6px] mt-2">
        <Link href="/deepstrategy">
          <DropdownMenuItem className="font-mono">
            <DashboardIcon className="h-3 w-3" />
            <span>DeepStrategy<sup className="ml-[1px] text-[8px] leading-none align-[0.1em]">1</sup></span>
          </DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}