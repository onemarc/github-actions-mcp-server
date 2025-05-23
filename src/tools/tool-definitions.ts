import { Tool } from '../common/types.js';

export const tools: Tool[] = [
  {
    name: "create_workflow",
    description: "Create a new GitHub Actions workflow file",
    inputSchema: {
      type: "object",
      properties: {
        owner: { type: "string", description: "Repository owner" },
        repo: { type: "string", description: "Repository name" },
        path: { type: "string", description: "Path for the workflow file (e.g., '.github/workflows/ci.yml')" },
        name: { type: "string", description: "Workflow name - should be descriptive and related to the workflow's purpose" },
        on: { type: "object", description: "Trigger events (e.g., {push: {branches: ['main']}, pull_request: {}})" },
        jobs: { type: "object", description: "Jobs configuration" },
        branch: { type: "string", description: "Branch to create the workflow on", default: "main" },
        commitMessage: { type: "string", description: "Commit message", default: "Add GitHub Actions workflow" }
      },
      required: ["owner", "repo", "path", "name", "on", "jobs"]
    }
  },
  {
    name: "list_workflows",
    description: "List workflows in a GitHub repository",
    inputSchema: {
      type: "object",
      properties: {
        owner: { type: "string", description: "Repository owner" },
        repo: { type: "string", description: "Repository name" },
        page: { type: "number", description: "Page number for pagination" },
        perPage: { type: "number", description: "Results per page (max 100)" }
      },
      required: ["owner", "repo"]
    }
  },
  {
    name: "get_workflow",
    description: "Get details of a specific workflow",
    inputSchema: {
      type: "object",
      properties: {
        owner: { type: "string", description: "Repository owner" },
        repo: { type: "string", description: "Repository name" },
        workflowId: { 
          oneOf: [
            { type: "string" },
            { type: "number" }
          ],
          description: "The ID of the workflow or filename"
        }
      },
      required: ["owner", "repo", "workflowId"]
    }
  },
  {
    name: "get_workflow_usage",
    description: "Get usage statistics of a workflow",
    inputSchema: {
      type: "object",
      properties: {
        owner: { type: "string", description: "Repository owner" },
        repo: { type: "string", description: "Repository name" },
        workflowId: { 
          oneOf: [
            { type: "string" },
            { type: "number" }
          ],
          description: "The ID of the workflow or filename"
        }
      },
      required: ["owner", "repo", "workflowId"]
    }
  },
  {
    name: "list_workflow_runs",
    description: "List all workflow runs for a repository or specific workflow",
    inputSchema: {
      type: "object",
      properties: {
        owner: { type: "string", description: "Repository owner" },
        repo: { type: "string", description: "Repository name" },
        workflowId: { 
          oneOf: [
            { type: "string" },
            { type: "number" }
          ],
          description: "The ID of the workflow or filename"
        },
        actor: { type: "string", description: "Filter by user who triggered the workflow" },
        branch: { type: "string", description: "Filter by branch" },
        event: { type: "string", description: "Filter by event type" },
        status: { 
          type: "string", 
          enum: ["completed", "action_required", "cancelled", "failure", "neutral", "skipped", "stale", "success", "timed_out", "in_progress", "queued", "requested", "waiting"],
          description: "Filter by status"
        },
        created: { type: "string", description: "Filter by creation date (YYYY-MM-DD)" },
        excludePullRequests: { type: "boolean", description: "Exclude PR-triggered runs" },
        checkSuiteId: { type: "number", description: "Filter by check suite ID" },
        page: { type: "number", description: "Page number for pagination" },
        perPage: { type: "number", description: "Results per page (max 100)" }
      },
      required: ["owner", "repo"]
    }
  },
  {
    name: "get_workflow_run",
    description: "Get details of a specific workflow run",
    inputSchema: {
      type: "object",
      properties: {
        owner: { type: "string", description: "Repository owner" },
        repo: { type: "string", description: "Repository name" },
        runId: { type: "number", description: "The ID of the workflow run" }
      },
      required: ["owner", "repo", "runId"]
    }
  },
  {
    name: "get_workflow_run_jobs",
    description: "Get jobs for a specific workflow run",
    inputSchema: {
      type: "object",
      properties: {
        owner: { type: "string", description: "Repository owner" },
        repo: { type: "string", description: "Repository name" },
        runId: { type: "number", description: "The ID of the workflow run" },
        filter: { 
          type: "string", 
          enum: ["latest", "all"],
          description: "Filter jobs by completion status"
        },
        page: { type: "number", description: "Page number for pagination" },
        perPage: { type: "number", description: "Results per page (max 100)" }
      },
      required: ["owner", "repo", "runId"]
    }
  },
  {
    name: "trigger_workflow",
    description: "Trigger a workflow run",
    inputSchema: {
      type: "object",
      properties: {
        owner: { type: "string", description: "Repository owner" },
        repo: { type: "string", description: "Repository name" },
        workflowId: { 
          oneOf: [
            { type: "string" },
            { type: "number" }
          ],
          description: "The ID of the workflow, filename, or display name as defined in the workflow file's 'name:' field"
        },
        ref: { type: "string", description: "The reference to run the workflow on (branch, tag, or SHA)" },
        inputs: { type: "object", description: "Input parameters for the workflow" }
      },
      required: ["owner", "repo", "workflowId", "ref"]
    }
  },
  {
    name: "cancel_workflow_run",
    description: "Cancel a workflow run",
    inputSchema: {
      type: "object",
      properties: {
        owner: { type: "string", description: "Repository owner" },
        repo: { type: "string", description: "Repository name" },
        runId: { type: "number", description: "The ID of the workflow run" }
      },
      required: ["owner", "repo", "runId"]
    }
  },
  {
    name: "rerun_workflow",
    description: "Re-run a workflow run",
    inputSchema: {
      type: "object",
      properties: {
        owner: { type: "string", description: "Repository owner" },
        repo: { type: "string", description: "Repository name" },
        runId: { type: "number", description: "The ID of the workflow run" }
      },
      required: ["owner", "repo", "runId"]
    }
  }
];