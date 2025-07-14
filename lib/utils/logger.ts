/**
 * Production-safe logging utility
 * Conditionally logs based on environment and provides structured logging
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogContext {
  component?: string;
  action?: string;
  metadata?: Record<string, unknown>;
}

class Logger {
  private isDev = process.env.NODE_ENV === 'development';
  private isDebug = process.env.DEBUG === '1' || this.isDev;

  private formatMessage(level: LogLevel, message: string, context?: LogContext): string {
    const timestamp = new Date().toISOString();
    const prefix = context?.component ? `[${context.component}]` : '';
    const action = context?.action ? ` ${context.action}:` : '';
    return `${timestamp} ${level.toUpperCase()} ${prefix}${action} ${message}`;
  }

  debug(message: string, context?: LogContext): void {
    if (this.isDebug) {
      console.debug(this.formatMessage('debug', message, context), context?.metadata);
    }
  }

  info(message: string, context?: LogContext): void {
    if (this.isDev) {
      console.info(this.formatMessage('info', message, context), context?.metadata);
    }
  }

  warn(message: string, context?: LogContext): void {
    if (this.isDev) {
      console.warn(this.formatMessage('warn', message, context), context?.metadata);
    }
  }

  error(message: string, error?: Error | unknown, context?: LogContext): void {
    const errorInfo = error instanceof Error ? { name: error.name, message: error.message, stack: error.stack } : error;
    
    if (this.isDev) {
      console.error(this.formatMessage('error', message, context), errorInfo, context?.metadata);
    } else {
      // In production, we might want to send to a logging service
      // For now, we'll silently handle errors or send to analytics
      this.sendToLoggingService(message, errorInfo, context);
    }
  }

  private sendToLoggingService(message: string, error?: unknown, context?: LogContext): void {
    // In a real app, you'd send to services like:
    // - Sentry
    // - LogRocket
    // - DataDog
    // - Custom analytics endpoint
    
    // For now, we'll just store locally or ignore
    if (typeof window !== 'undefined' && 'localStorage' in window) {
      try {
        const logEntry = {
          timestamp: new Date().toISOString(),
          message,
          error,
          context,
        };
        const existingLogs = JSON.parse(localStorage.getItem('app_errors') || '[]');
        existingLogs.push(logEntry);
        // Keep only last 10 errors
        localStorage.setItem('app_errors', JSON.stringify(existingLogs.slice(-10)));
      } catch {
        // Ignore localStorage errors
      }
    }
  }
}

export const logger = new Logger();

// Convenience functions for common patterns
export const logError = (message: string, error?: Error | unknown, component?: string) => {
  logger.error(message, error, { component });
};

export const logWarning = (message: string, component?: string) => {
  logger.warn(message, { component });
};

export const logInfo = (message: string, component?: string) => {
  logger.info(message, { component });
};

export const logDebug = (message: string, component?: string) => {
  logger.debug(message, { component });
};