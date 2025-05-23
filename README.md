<p class="center">
    <img
        src="assets/gh-mcp-server-banner.png"
        alt="GitHub Actions MCP Server Banner"
    />
</p>

# GitHub Actions MCP Server

A Model Context Protocol (MCP) server that provides comprehensive GitHub Actions management capabilities. This server allows you to create, manage, monitor, and interact with GitHub Actions workflows through a standardized interface.

## Content
- [Features](#features)
- [Installation](#installation)
- [Setup](#setup)
- [Usage](#usage)
- [Tools](#tools)
- [Configuration File Integration](#configuration-file-integration)
- [Error Handling](#error-handling)
- [Troubleshooting](#troubleshooting)
- [Common Use Cases](#common-use-cases)
- [Example Workflows](#example-workflows)
- [Contributing](#contributing)
- [License](#license)

## Features

### Workflow Management
- **Create Workflow**: Create new GitHub Actions workflow files
- **List Workflows**: Get all workflows in a repository
- **Get Workflow**: Retrieve detailed information about a specific workflow
- **Get Workflow Usage**: View usage statistics and billing information

### Workflow Runs
- **List Workflow Runs**: List all workflow runs with filtering options
- **Get Workflow Run**: Get detailed information about a specific run
- **Get Workflow Run Jobs**: View jobs and steps for a workflow run
- **Trigger Workflow**: Manually trigger a workflow dispatch event
- **Cancel Workflow Run**: Cancel a running workflow
- **Rerun Workflow**: Re-execute a failed or completed workflow

## Installation

1. Clone or download the server files
2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the TypeScript code:
   ```bash
   npm run build
   ```

## Setup

### Prerequisites
- Node.js 18+
- GitHub Personal Access Token with appropriate permissions

### GitHub Token Setup
1. Generate a GitHub Personal Access Token:
   - Go to GitHub Settings → Developer settings → Personal access tokens → Fine-grained tokens
   ```bash
   https://github.com/settings/personal-access-tokens
   ```
   - Create a token with these scopes:
     - `repo` (full repository access)
     - `workflow` (update GitHub Action workflows)
     - `contents:read` (read access to see GitHub Action workflows)
     - `contents:write` (write access GitHub Action workflows)
     - `actions:read` (read access to GitHub Actions)
     - `actions:write` (write access to GitHub Actions)

2. Set the environment variable:
   ```bash
   export GITHUB_TOKEN=your_token_here
   ```
   
    #### OR
   
2. Navigate to your project directory and run the setup script:
    ```bash
    cd github-actions-mcp
    chmod +x setup.sh
    ./setup.sh
    ```

### Required Permissions
Your GitHub token needs the following permissions for the target repositories:
- **Read**: List workflows, get workflow details, view runs and jobs
- **Write**: Create/update workflow files, trigger workflows
- **Actions**: Cancel and rerun workflows

## Usage

### Running the Server
```bash
npm start
```
#### or for development
```bash
npm run dev
```

### Tools

#### create_workflow
Create a new GitHub Actions workflow file in a repository.

**Required inputs:**
- `owner`: Repository owner (username/organization)
- `repo`: Repository name
- `path`: Workflow file path (e.g., '.github/workflows/ci.yml')
- `name`: Workflow name - should be descriptive and related to the workflow's purpose
- `on`: Trigger events configuration
- `jobs`: Jobs configuration

**Optional inputs:**
- `branch`: Target branch (default: 'main')
- `commitMessage`: Commit message (default: 'Add GitHub Actions workflow')

**Example:**
```json
{
  "owner": "myorg",
  "repo": "myrepo",
  "path": ".github/workflows/ci.yml",
  "name": "CI Pipeline",
  "on": {
    "push": {
      "branches": ["main"]
    },
    "pull_request": {}
  },
  "jobs": {
    "test": {
      "runs-on": "ubuntu-latest",
      "steps": [
        {
          "name": "Checkout code",
          "uses": "actions/checkout@v4"
        },
        {
          "name": "Setup Node.js",
          "uses": "actions/setup-node@v4",
          "with": {
            "node-version": "18"
          }
        },
        {
          "name": "Install dependencies",
          "run": "npm install"
        },
        {
          "name": "Run tests",
          "run": "npm test"
        }
      ]
    }
  }
}
```

#### list_workflows
List all workflows in a repository.

**Required inputs:**
- `owner`: Repository owner
- `repo`: Repository name

**Optional inputs:**
- `page`: Page number for pagination
- `perPage`: Results per page (max 100)

#### get_workflow
Get detailed information about a specific workflow.

**Required inputs:**
- `owner`: Repository owner
- `repo`: Repository name
- `workflowId`: Workflow ID or filename

#### get_workflow_usage
Get usage statistics for a workflow (billing information).

**Required inputs:**
- `owner`: Repository owner
- `repo`: Repository name
- `workflowId`: Workflow ID or filename

#### list_workflow_runs
List workflow runs with extensive filtering options.

**Required inputs:**
- `owner`: Repository owner
- `repo`: Repository name

**Optional inputs:**
- `workflowId`: Filter by specific workflow
- `actor`: Filter by user who triggered the run
- `branch`: Filter by branch
- `event`: Filter by trigger event
- `status`: Filter by run status
- `created`: Filter by creation date (YYYY-MM-DD)
- `excludePullRequests`: Exclude PR-triggered runs
- `checkSuiteId`: Filter by check suite ID
- `page`: Page number
- `perPage`: Results per page

#### get_workflow_run
Get detailed information about a specific workflow run.

**Required inputs:**
- `owner`: Repository owner
- `repo`: Repository name
- `runId`: Workflow run ID

#### get_workflow_run_jobs
Get jobs and steps for a specific workflow run.

**Required inputs:**
- `owner`: Repository owner
- `repo`: Repository name
- `runId`: Workflow run ID

**Optional inputs:**
- `filter`: Filter jobs ('latest' or 'all')
- `page`: Page number
- `perPage`: Results per page

#### trigger_workflow
Manually trigger a workflow using workflow_dispatch.

**Required inputs:**
- `owner`: Repository owner
- `repo`: Repository name
- `workflowId`: Workflow ID or filename
- `ref`: Branch, tag, or commit SHA to run on

**Optional inputs:**
- `inputs`: Input parameters for the workflow

#### cancel_workflow_run
Cancel a running workflow.

**Required inputs:**
- `owner`: Repository owner
- `repo`: Repository name
- `runId`: Workflow run ID

#### rerun_workflow
Re-run a completed workflow.

**Required inputs:**
- `owner`: Repository owner
- `repo`: Repository name
- `runId`: Workflow run ID

## Configuration File Integration

You can also use this server with MCP configuration files. Add to your MCP settings:

```json
{
  "mcp": {
    "inputs": [
      {
        "type": "promptString",
        "id": "github-token",
        "description": "GitHub personal access token",
        "password": true
      }
    ],
    "servers": {
      "GitHub Actions": {
        "command": "node",
        "args": ["/path/to/github-actions-mcp-server/dist/index.js"],
        "env": {
          "GITHUB_TOKEN": "${input:github-token}"
        }
      }
    }
  }
}
```

## Error Handling

The server provides comprehensive error handling:

- **Authentication errors**: Invalid or expired GitHub tokens
- **Permission errors**: Insufficient repository access
- **Rate limiting**: GitHub API rate limit exceeded
- **Validation errors**: Invalid input parameters
- **Network errors**: Connection issues with GitHub API

## Troubleshooting

### Common Issues

**Token Authentication Fails**
- Verify your GitHub token is valid and not expired
- Check that the token has the required scopes
- Ensure the `GITHUB_TOKEN` environment variable is set

**Permission Denied**
- Verify your token has access to the target repository
- For organization repositories, check if additional permissions are needed
- Ensure your token has the `workflow` scope for creating/modifying workflows

**Rate Limiting**
- GitHub API has rate limits (5000 requests/hour for authenticated requests)
- Implement retry logic with exponential backoff if needed
- Consider using multiple tokens for high-volume operations

**Workflow Creation Fails**
- Check that the workflow path starts with `.github/workflows/`
- Ensure the YAML syntax is valid
- Verify the target branch exists

### Debug Mode

For debugging, you can run the server with additional logging:

```bash
DEBUG=* npm start
```

## Common Use Cases

### 1. Monitoring Workflow Health
```bash
# List recent workflow runs to check status
list_workflow_runs --owner myorg --repo myapp --status completed --per_page 10

# Get details of a failed run
get_workflow_run --owner myorg --repo myapp --run_id 12345

# View job details to identify failure points
get_workflow_run_jobs --owner myorg --repo myapp --run_id 12345
```

### 2. Managing Deployments
```bash
# Trigger a deployment workflow
trigger_workflow --owner myorg --repo myapp --workflow_id deploy.yml --ref main --inputs '{"environment": "production"}'

# Monitor the deployment
list_workflow_runs --owner myorg --repo myapp --workflow_id deploy.yml --status in_progress

# Cancel if needed
cancel_workflow_run --owner myorg --repo myapp --run_id 67890
```

### 3. Workflow Maintenance
```bash
# List all workflows to review
list_workflows --owner myorg --repo myapp

# Check workflow usage for billing
get_workflow_usage --owner myorg --repo myapp --workflow_id ci.yml

# Get workflow details for optimization
get_workflow --owner myorg --repo myapp --workflow_id ci.yml
```

## Contributing

We welcome contributions to the GitHub Actions MCP Server! Whether you're fixing bugs, improving documentation, adding new features, or providing feedback, your help is appreciated.

## License
MIT License