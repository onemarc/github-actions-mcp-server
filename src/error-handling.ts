import { ValidationError, BaseError, WorkflowError } from './common/errors.js';

// Sets up global error handlers
export function setupErrorHandlers() {
  // Handle uncaught exceptions
  process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
  });

  // Handle unhandled promise rejections
  process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Promise Rejection:', reason);
  });

  // Handle SIGTERM
  process.on('SIGTERM', async () => {
    console.log('Received SIGTERM, shutting down gracefully');
    process.exit(0);
  });

  // Handle SIGINT (Ctrl+C)
  process.on('SIGINT', async () => {
    console.log('Received SIGINT, shutting down gracefully');
    process.exit(0);
  });
}

/**
 * Handles errors from tool execution
 * @param error The error that occurred
 * @param toolName The name of the tool that failed
 * @returns Formatted error response
 */
export function handleToolError(error: any, toolName: string): any {
  if (error instanceof ValidationError) {
    return {
      error: {
        type: 'validation_error',
        message: error.message
      }
    };
  } else if (error instanceof WorkflowError) {
    return {
      error: {
        type: 'workflow_error',
        message: error.message,
        details: error.details
      }
    };
  } else if (error instanceof BaseError) {
    return {
      error: {
        type: 'error',
        message: error.message
      }
    };
  } else {
    console.error(`Error executing ${toolName}:`, error);
    return {
      error: {
        type: 'unexpected_error',
        message: `An unexpected error occurred while executing ${toolName}: ${error.message || 'Unknown error'}`
      }
    };
  }
}