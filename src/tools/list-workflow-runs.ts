import { Octokit } from '@octokit/rest';
import { ToolHandler } from '../common/types.js';
import { WorkflowError } from '../common/errors.js';

const handleListWorkflowRuns: ToolHandler = async (args, octokit: Octokit) => {
  const { 
    owner, 
    repo, 
    workflowId, 
    actor, 
    branch, 
    event, 
    status, 
    created, 
    excludePullRequests, 
    checkSuiteId, 
    page, 
    perPage 
  } = args;
  
  try {
    const params: any = {
      owner,
      repo,
      page,
      per_page: perPage
    };

    if (actor) params.actor = actor;
    if (branch) params.branch = branch;
    if (event) params.event = event;
    if (status) params.status = status;
    if (created) params.created = created;
    if (excludePullRequests !== undefined) params.exclude_pull_requests = excludePullRequests;
    if (checkSuiteId) params.check_suite_id = checkSuiteId;

    let response;
    if (workflowId) {
      response = await octokit.rest.actions.listWorkflowRuns({
        ...params,
        workflow_id: workflowId
      });
    } else {
      response = await octokit.rest.actions.listWorkflowRunsForRepo(params);
    }

    return {
      total_count: response.data.total_count,
      workflow_runs: response.data.workflow_runs.map(run => ({
        id: run.id,
        name: run.name,
        head_branch: run.head_branch,
        head_sha: run.head_sha,
        status: run.status,
        conclusion: run.conclusion,
        workflow_id: run.workflow_id,
        created_at: run.created_at,
        updated_at: run.updated_at,
        run_number: run.run_number,
        event: run.event,
        actor: run.actor,
        html_url: run.html_url
      }))
    };
  } catch (error: any) {
    throw new WorkflowError(`Failed to list workflow runs: ${error.message}`, error.response?.data);
  }
};

export default handleListWorkflowRuns;