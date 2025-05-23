import { Octokit } from '@octokit/rest';
import { ToolHandler } from '../common/types.js';
import { WorkflowError } from '../common/errors.js';

const handleGetWorkflowRun: ToolHandler = async (args, octokit: Octokit) => {
  const { owner, repo, runId } = args;
  
  try {
    const response = await octokit.rest.actions.getWorkflowRun({
      owner,
      repo,
      run_id: runId
    });

    return response.data;
  } catch (error: any) {
    throw new WorkflowError(`Failed to get workflow run: ${error.message}`, error.response?.data);
  }
};

export default handleGetWorkflowRun;