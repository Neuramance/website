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
import { useState, useRef } from 'react';

export default function MobileNavMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    // Clear any pending close timeout
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    // Open dropdown on hover (for devices that support hover)
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    // Add delay before closing to allow moving to dropdown content
    closeTimeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 300);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button 
          size="nav" 
          variant="secondary" 
          className="gap-1 font-mono lg:hidden"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <MoreHorizontal className="h-[8px] w-[10px]" />
          Products
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="min-w-40"
        align="end"
        sideOffset={8}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
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
        <Link href="/openpaideia">
          <DropdownMenuItem className="font-mono justify-start">
            <ReaderIcon className="h-3 w-3 mr-2" />
            <span>OpenPaideia<sup className="ml-[1px] text-[8px] leading-none align-[0.1em]">4</sup></span>
          </DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}