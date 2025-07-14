/**
 * Common component type definitions
 */

import { SVGProps } from 'react';

// SVG Icon component props
export interface IconProps extends SVGProps<SVGSVGElement> {
  className?: string;
  size?: number | string;
}

// Audio track interface
export interface AudioTrack {
  id: string;
  src: string;
  title?: string;
}

// User profile data
export interface UserProfile {
  id: string;
  full_name?: string;
  avatar_url?: string;
  email?: string;
  created_at?: string;
  updated_at?: string;
}

// Form validation interfaces
export interface FormFieldError {
  message: string;
  type: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, FormFieldError>;
}

// Audio context state
export interface AudioContextState {
  currentTrack: AudioTrack | null;
  backgroundTrack: AudioTrack | null;
  isPlaying: boolean;
  isLoading: boolean;
  error: string | null;
  duration: number;
  currentTime: number;
  volume: number;
  isMuted: boolean;
  isPausedForOverlay: boolean;
  hasUserInteracted: boolean;
}

// Browser detection result
export interface BrowserInfo {
  isSafari: boolean;
  isDesktopSafari: boolean;
  isMobileSafari: boolean;
  isChrome: boolean;
  isFirefox: boolean;
  version?: string;
}

// Common component base props
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
  id?: string;
  'data-testid'?: string;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
}

// Loading state interface
export interface LoadingState {
  isLoading: boolean;
  error?: string | null;
  message?: string;
}

// API response wrapper
export interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  success: boolean;
  message?: string;
}

// Common modal/dialog props
export interface ModalProps extends BaseComponentProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}