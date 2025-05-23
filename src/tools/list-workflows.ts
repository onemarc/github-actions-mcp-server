import { Octokit } from '@octokit/rest';
import { ToolHandler } from '../common/types.js';
import { WorkflowError } from '../common/errors.js';

const handleListWorkflows: ToolHandler = async (args, octokit: Octokit) => {
  const { owner, repo, page, perPage } = args;
  
  try {
    const response = await octokit.rest.actions.listRepoWorkflows({
      owner,
      repo,
      page,
      per_page: perPage
    });

    return {
      total_count: response.data.total_count,
      workflows: response.data.workflows.map(workflow => ({
        id: workflow.id,
        name: workflow.name,
        path: workflow.path,
        state: workflow.state,
        created_at: workflow.created_at,
        updated_at: workflow.updated_at,
        url: workflow.url,
        html_url: workflow.html_url,
        badge_url: workflow.badge_url
      }))
    };
  } catch (error: any) {
    throw new WorkflowError(`Failed to list workflows: ${error.message}`, error.response?.data);
  }
};

export default handleListWorkflows;