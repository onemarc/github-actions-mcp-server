import { Octokit } from '@octokit/rest';
import { ToolHandler } from '../common/types.js';
import { WorkflowError } from '../common/errors.js';

const handleRerunWorkflow: ToolHandler = async (args, octokit: Octokit) => {
  const { owner, repo, runId } = args;
    try {
    const response = await octokit.rest.actions.reRunWorkflow({
      owner,
      repo,
      run_id: runId
    });

    return {
      success: true,
      message: "Workflow run restarted successfully",
      status: response.status
    };
  } catch (error: any) {
    throw new WorkflowError(`Failed to rerun workflow: ${error.message}`, error.response?.data);
  }
};

export default handleRerunWorkflow;