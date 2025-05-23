import { Octokit } from '@octokit/rest';

export interface Tool {
  name: string;
  description: string;
  inputSchema: {
    type: string;
    properties: Record<string, any>;
    required: string[];
  };
}

export interface ToolHandler {
  (args: any, octokit: Octokit): Promise<any>;
}

export interface WorkflowStep {
  name?: string;
  uses?: string;
  run?: string;
  with?: Record<string, any>;
  env?: Record<string, any>;
}

export interface WorkflowJob {
  'runs-on': string;
  steps?: WorkflowStep[];
  [key: string]: any;
}