import { Octokit } from '@octokit/rest';
import { ToolHandler, WorkflowJob } from '../common/types.js';
import { WorkflowError } from '../common/errors.js';

const handleCreateWorkflow: ToolHandler = async (args, octokit: Octokit) => {
  const { owner, repo, path, name, on: triggerEvents, jobs, branch = "main", commitMessage = "Add GitHub Actions workflow" } = args;
  
  // Create workflow YAML content
  let modifiedTriggerEvents = { ...triggerEvents };
  if (!modifiedTriggerEvents) {
    modifiedTriggerEvents = {};
  }
  
  // Add workflow_dispatch if not already present
  if (!modifiedTriggerEvents.workflow_dispatch) {
    modifiedTriggerEvents.workflow_dispatch = {};
  }
  
  const formattedTriggerEvents = JSON.stringify(modifiedTriggerEvents, null, 2).replace(/"/g, '');
  
  const yamlContent = `name: ${name}

on: ${formattedTriggerEvents}

jobs:
${Object.entries(jobs || {}).map(([jobName, jobConfig]: [string, any]) => {
  return `  ${jobName}:
    runs-on: ${jobConfig['runs-on'] || 'ubuntu-latest'}
${jobConfig.steps ? '    steps:' : ''}
${jobConfig.steps ? jobConfig.steps.map((step: any, index: number) => {
  let stepYaml = `      - name: ${step.name || `Step ${index + 1}`}`;
  if (step.uses) stepYaml += `\n        uses: ${step.uses}`;
  if (step.run) stepYaml += `\n        run: ${step.run}`;
  if (step.with) stepYaml += `\n        with:\n${Object.entries(step.with || {}).map(([key, value]) => `          ${key}: ${value}`).join('\n')}`;
  if (step.env) stepYaml += `\n        env:\n${Object.entries(step.env || {}).map(([key, value]) => `          ${key}: ${value}`).join('\n')}`;
  return stepYaml;
}).join('\n') : ''}`;
}).join('\n\n')}`;

  try {
    const response = await octokit.rest.repos.createOrUpdateFileContents({
      owner,
      repo,
      path,
      message: commitMessage,
      content: Buffer.from(yamlContent).toString('base64'),
      branch
    });

    return {
      success: true,
      message: "Workflow created successfully",
      data: {
        path,
        sha: response.data.content?.sha,
        url: response.data.content?.html_url
      }
    };
  } catch (error: any) {
    throw new WorkflowError(`Failed to create workflow: ${error.message}`, error.response?.data);
  }
};

export default handleCreateWorkflow;