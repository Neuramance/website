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
import { useState, useEffect, useRef } from 'react';

export default function MobileNavMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [supportsHover, setSupportsHover] = useState(false);
  const [isHoverTriggered, setIsHoverTriggered] = useState(false);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Detect if device supports hover
    const mediaQuery = window.matchMedia('(hover: hover)');
    setSupportsHover(mediaQuery.matches);
  }, []);

  useEffect(() => {
    // Cleanup timeout on unmount
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  const handleOpenChange = (open: boolean) => {
    // Allow click interactions on non-hover devices or when not hover-triggered
    if (!supportsHover || !isHoverTriggered) {
      setIsOpen(open);
    }
  };

  const handleMouseEnter = () => {
    if (supportsHover) {
      // Clear any pending close timeout
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
        closeTimeoutRef.current = null;
      }
      
      setIsHoverTriggered(true);
      setIsOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (supportsHover && isHoverTriggered) {
      // Add delay before closing to prevent flickering
      closeTimeoutRef.current = setTimeout(() => {
        setIsHoverTriggered(false);
        setIsOpen(false);
      }, 300);
    }
  };

  const handleContentMouseEnter = () => {
    if (supportsHover) {
      // Clear close timeout when entering content area
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
        closeTimeoutRef.current = null;
      }
    }
  };

  const handleContentMouseLeave = () => {
    if (supportsHover && isHoverTriggered) {
      // Close when leaving content area
      closeTimeoutRef.current = setTimeout(() => {
        setIsHoverTriggered(false);
        setIsOpen(false);
      }, 300);
    }
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={handleOpenChange}>
      <DropdownMenuTrigger asChild>
        <Button 
          ref={buttonRef}
          size="nav" 
          variant="secondary" 
          className="gap-1 font-mono lg:hidden cursor-pointer"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <MoreHorizontal className="h-[8px] w-[10px]" />
          Products
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        ref={contentRef}
        className="min-w-40"
        align="end"
        sideOffset={8}
        onMouseEnter={handleContentMouseEnter}
        onMouseLeave={handleContentMouseLeave}
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