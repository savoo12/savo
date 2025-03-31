import type { KVNamespace } from '@cloudflare/workers-types';
import { DeploymentStatus } from './index';

interface Env {
  EDGEDEPLOY_DEPLOYMENTS: KVNamespace;
  EDGEDEPLOY_PROJECTS: KVNamespace;
  DEPLOYMENT_QUEUE: Queue;
}

interface DeploymentMessage {
  deploymentId: string;
  projectId: string;
  repositoryUrl: string;
  branch: string;
  commit?: {
    hash: string;
    message: string;
    author: string;
  };
}

export default {
  async fetch(request: Request, env: Env) {
    return new Response("This worker handles background deployment tasks and doesn't serve HTTP requests directly.");
  },
  
  async queue(batch: MessageBatch<DeploymentMessage>, env: Env) {
    for (const message of batch.messages) {
      try {
        const { deploymentId, projectId, repositoryUrl, branch, commit } = message.body;
        
        // Update deployment status to 'deploying'
        await updateDeploymentStatus(
          env, 
          projectId,
          deploymentId, 
          'deploying',
          ['Starting deployment process...']
        );
        
        // Simulate the deployment process with logs
        await simulateDeployment(env, projectId, deploymentId);
        
        // In a real implementation, this is where you would:
        // 1. Clone the repository
        // 2. Install dependencies
        // 3. Run the build command
        // 4. Upload the build artifacts to Cloudflare Pages
        // 5. Configure the deployment
        
        // Mark the deployment as successful
        await updateDeploymentStatus(
          env,
          projectId,
          deploymentId,
          'success',
          ['Deployment completed successfully'],
          {
            deploymentUrl: `https://${branch}--${projectId}.edgedeploy.pages.dev`
          }
        );
      } catch (error) {
        console.error(`Error processing deployment: ${error}`);
        
        // Mark the deployment as failed
        await updateDeploymentStatus(
          env,
          message.body.projectId,
          message.body.deploymentId,
          'failed',
          [`Deployment failed: ${error}`],
          { error: error instanceof Error ? error.message : String(error) }
        );
      }
    }
  }
};

async function updateDeploymentStatus(
  env: Env, 
  projectId: string, 
  deploymentId: string, 
  status: 'building' | 'deploying' | 'success' | 'failed',
  newLogs: string[] = [],
  additionalProps: Partial<DeploymentStatus> = {}
): Promise<void> {
  // Get the current deployment status
  const key = `${projectId}:${deploymentId}`;
  const existingDataJson = await env.EDGEDEPLOY_DEPLOYMENTS.get(key);
  
  if (!existingDataJson) {
    throw new Error(`Deployment ${deploymentId} not found`);
  }
  
  const existingData = JSON.parse(existingDataJson) as DeploymentStatus;
  
  // Update the status
  const updatedData: DeploymentStatus = {
    ...existingData,
    status,
    logs: [...existingData.logs, ...newLogs],
    ...(status === 'success' || status === 'failed' ? { endTime: Date.now() } : {}),
    ...additionalProps
  };
  
  // Save the updated status
  await env.EDGEDEPLOY_DEPLOYMENTS.put(key, JSON.stringify(updatedData));
}

async function simulateDeployment(env: Env, projectId: string, deploymentId: string): Promise<void> {
  // Simulate cloning
  await updateDeploymentStatus(
    env, projectId, deploymentId, 'deploying', 
    ['Cloning repository...']
  );
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Simulate installing dependencies
  await updateDeploymentStatus(
    env, projectId, deploymentId, 'deploying', 
    ['Installing dependencies...', 'Running npm install...']
  );
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  // Simulate building
  await updateDeploymentStatus(
    env, projectId, deploymentId, 'deploying', 
    ['Building project...', 'Running build command...']
  );
  await new Promise(resolve => setTimeout(resolve, 5000));
  
  // Simulate uploading
  await updateDeploymentStatus(
    env, projectId, deploymentId, 'deploying', 
    ['Uploading build artifacts to Cloudflare Pages...']
  );
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  // Simulate configuring deployment
  await updateDeploymentStatus(
    env, projectId, deploymentId, 'deploying', 
    ['Configuring deployment...']
  );
  await new Promise(resolve => setTimeout(resolve, 1000));
} 