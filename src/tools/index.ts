import { ToolHandler } from '../common/types.js';
import { tools } from './tool-definitions.js';
import handleCreateWorkflow from './create-workflow.js';
import handleListWorkflows from './list-workflows.js';
import handleGetWorkflow from './get-workflow.js';
import handleGetWorkflowUsage from './get-workflow-usage.js';
import handleListWorkflowRuns from './list-workflow-runs.js';
import handleGetWorkflowRun from './get-workflow-run.js';
import handleGetWorkflowRunJobs from './get-workflow-run-jobs.js';
import handleTriggerWorkflow from './trigger-workflow.js';
import handleCancelWorkflowRun from './cancel-workflow-run.js';
import handleRerunWorkflow from './rerun-workflow.js';

export const toolHandlers: Record<string, ToolHandler> = {
  create_workflow: handleCreateWorkflow,
  list_workflows: handleListWorkflows,
  get_workflow: handleGetWorkflow,
  get_workflow_usage: handleGetWorkflowUsage,
  list_workflow_runs: handleListWorkflowRuns,
  get_workflow_run: handleGetWorkflowRun,
  get_workflow_run_jobs: handleGetWorkflowRunJobs,
  trigger_workflow: handleTriggerWorkflow,
  cancel_workflow_run: handleCancelWorkflowRun,
  rerun_workflow: handleRerunWorkflow,
};

export { tools };