import { Octokit } from '@octokit/rest';
import { ToolHandler } from '../common/types.js';
import { WorkflowError } from '../common/errors.js';

const handleGetWorkflowRunJobs: ToolHandler = async (args, octokit: Octokit) => {
  const { owner, repo, runId, filter, page, perPage } = args;
  
  try {
    const response = await octokit.rest.actions.listJobsForWorkflowRun({
      owner,
      repo,
      run_id: runId,
      filter,
      page,
      per_page: perPage
    });

    return {
      total_count: response.data.total_count,
      jobs: response.data.jobs.map(job => ({
        id: job.id,
        name: job.name,
        status: job.status,
        conclusion: job.conclusion,
        created_at: job.created_at,
        started_at: job.started_at,
        completed_at: job.completed_at,
        url: job.url,
        html_url: job.html_url,
        runner_id: job.runner_id,
        runner_name: job.runner_name,
        runner_group_id: job.runner_group_id,
        runner_group_name: job.runner_group_name,
        steps: job.steps?.map(step => ({
          name: step.name,
          status: step.status,
          conclusion: step.conclusion,
          number: step.number,
          started_at: step.started_at,
          completed_at: step.completed_at
        }))
      }))
    };
  } catch (error: any) {
    throw new WorkflowError(`Failed to get workflow run jobs: ${error.message}`, error.response?.data);
  }
};

export default handleGetWorkflowRunJobs;