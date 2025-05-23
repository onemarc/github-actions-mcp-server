import { Octokit } from '@octokit/rest';
import { ToolHandler } from '../common/types.js';
import { WorkflowError } from '../common/errors.js';

const handleTriggerWorkflow: ToolHandler = async (args, octokit: Octokit) => {
  const { owner, repo, workflowId, ref, inputs } = args;
  
  try {
    let workflow_id = workflowId;
    
    if (typeof workflowId === 'string' && (workflowId.includes(' ') || /^[A-Z]/.test(workflowId))) {
      const workflows = await octokit.rest.actions.listRepoWorkflows({
        owner,
        repo
      });
      
      // Find the workflow by name
      const matchedWorkflow = workflows.data.workflows.find(w => 
        w.name.toLowerCase() === workflowId.toLowerCase() || 
        w.name === workflowId
      );
      
      if (matchedWorkflow) {
        workflow_id = matchedWorkflow.id;
      } else {
        throw new WorkflowError(`Workflow with name "${workflowId}" not found. Make sure the name matches exactly as defined in the workflow file.`);
      }
    }
    
    const response = await octokit.rest.actions.createWorkflowDispatch({
      owner,
      repo,
      workflow_id,
      ref,
      inputs
    });

    return {
      success: true,
      message: "Workflow triggered successfully",
      status: response.status
    };
  } catch (error: any) {
    throw new WorkflowError(`Failed to trigger workflow: ${error.message}`, error.response?.data);
  }
};

export default handleTriggerWorkflow;