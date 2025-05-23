export class BaseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ToolExecutionError extends BaseError {
  constructor(toolName: string, message: string) {
    super(`Error executing tool '${toolName}': ${message}`);
  }
}

export class WorkflowError extends BaseError {
  public details?: any;
  
  constructor(message: string, details?: any) {
    super(message);
    this.details = details;
  }
}

export class AuthenticationError extends BaseError {
  constructor(message = 'GitHub authentication failed. Please check your token.') {
    super(message);
  }
}

export class ValidationError extends BaseError {
  constructor(message: string) {
    super(`Validation error: ${message}`);
  }
}