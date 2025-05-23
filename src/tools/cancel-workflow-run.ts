import { Octokit } from '@octokit/rest';
import { ToolHandler } from '../common/types.js';
import { WorkflowError } from '../common/errors.js';

const handleCancelWorkflowRun: ToolHandler = async (args, octokit: Octokit) => {
  const { owner, repo, runId } = args;
  
  try {
    const response = await octokit.rest.actions.cancelWorkflowRun({
      owner,
      repo,
      run_id: runId
    });

    return {
      success: true,
      message: "Workflow run cancelled successfully",
      status: response.status
    };
  } catch (error: any) {
    throw new WorkflowError(`Failed to cancel workflow run: ${error.message}`, error.response?.data);
  }
};

export default handleCancelWorkflowRun;