import { Octokit } from '@octokit/rest';
import { ToolHandler } from '../common/types.js';
import { WorkflowError } from '../common/errors.js';

const handleGetWorkflowUsage: ToolHandler = async (args, octokit: Octokit) => {
  const { owner, repo, workflowId } = args;
  
  try {
    const response = await octokit.rest.actions.getWorkflowUsage({
      owner,
      repo,
      workflow_id: workflowId
    });

    return response.data;
  } catch (error: any) {
    throw new WorkflowError(`Failed to get workflow usage: ${error.message}`, error.response?.data);
  }
};

export default handleGetWorkflowUsage;