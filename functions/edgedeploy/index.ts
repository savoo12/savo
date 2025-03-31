import { OpenAPIRouter } from '@cloudflare/itty-router-openapi';
import type { Request, KVNamespace } from '@cloudflare/workers-types';

interface Env {
  EDGEDEPLOY_PROJECTS: KVNamespace;
  EDGEDEPLOY_DEPLOYMENTS: KVNamespace;
  EDGEDEPLOY_USERS: KVNamespace;
  DEPLOYMENT_QUEUE: Queue<DeploymentMessage>;
}

export interface DeploymentConfig {
  id: string;
  name: string;
  created: number;
  updated: number;
  buildCommand: string;
  rootDirectory: string;
  outputDirectory: string;
  framework: 'nextjs' | 'react' | 'vue' | 'svelte' | 'astro' | 'other';
  environmentVariables: Record<string, string>;
  branches: Array<{
    name: string;
    url: string;
    isProduction: boolean;
  }>;
  repositoryUrl?: string;
}

export interface DeploymentStatus {
  id: string;
  projectId: string;
  status: 'building' | 'deploying' | 'success' | 'failed';
  startTime: number;
  endTime?: number;
  branch: string;
  commit?: {
    hash: string;
    message: string;
    author: string;
  };
  logs: string[];
  deploymentUrl?: string;
  error?: string;
}

export interface DeploymentMessage {
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

// Create OpenAPI router
const router = OpenAPIRouter({
  schema: {
    info: {
      title: 'EdgeDeploy API',
      version: '1.0.0',
    },
  },
  docs_url: '/docs',
});

// Define routes
router.get('/', () => {
  return new Response(JSON.stringify({
    name: 'EdgeDeploy API',
    version: '1.0.0',
    status: 'operational'
  }), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
});

// Get project info
router.get('/api/projects/:id', async ({ params }: { params: { id: string } }, env: Env) => {
  const { id } = params;
  
  try {
    const project = await env.EDGEDEPLOY_PROJECTS.get(id);
    
    if (!project) {
      return new Response(JSON.stringify({ error: 'Project not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    return new Response(project, {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
});

// List all projects
router.get('/api/projects', async (request: Request, env: Env) => {
  try {
    // List keys with a limit of 100 projects
    const projectsList = await env.EDGEDEPLOY_PROJECTS.list({ limit: 100 });
    
    // Fetch all project details
    const projects = await Promise.all(
      projectsList.keys.map(async (key: { name: string }) => {
        const projectData = await env.EDGEDEPLOY_PROJECTS.get(key.name);
        return projectData ? JSON.parse(projectData) : null;
      })
    );
    
    // Filter out null values
    const validProjects = projects.filter((project: unknown) => project !== null);
    
    return new Response(JSON.stringify(validProjects), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
});

// Create new project
router.post('/api/projects', async (request: Request, env: Env) => {
  try {
    const data = await request.json();
    
    // Validate required fields
    if (!data.name || !data.framework) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    const projectId = crypto.randomUUID();
    const now = Date.now();
    
    // Create project config
    const projectConfig: DeploymentConfig = {
      id: projectId,
      name: data.name,
      created: now,
      updated: now,
      buildCommand: data.buildCommand || 'npm run build',
      rootDirectory: data.rootDirectory || '',
      outputDirectory: data.outputDirectory || 'out',
      framework: data.framework,
      environmentVariables: data.environmentVariables || {},
      repositoryUrl: data.repositoryUrl || '',
      branches: data.branches || [
        {
          name: 'main',
          url: `https://${projectId}.edgedeploy.pages.dev`,
          isProduction: true
        }
      ]
    };
    
    // Store in KV
    await env.EDGEDEPLOY_PROJECTS.put(projectId, JSON.stringify(projectConfig));
    
    return new Response(JSON.stringify(projectConfig), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
});

// Update project
router.put('/api/projects/:id', async ({ params, request }: { params: { id: string }, request: Request }, env: Env) => {
  const { id } = params;
  
  try {
    const existingProjectJSON = await env.EDGEDEPLOY_PROJECTS.get(id);
    
    if (!existingProjectJSON) {
      return new Response(JSON.stringify({ error: 'Project not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    const existingProject = JSON.parse(existingProjectJSON);
    const updates = await request.json();
    
    // Update project
    const updatedProject = {
      ...existingProject,
      ...updates,
      updated: Date.now()
    };
    
    // Store updated config
    await env.EDGEDEPLOY_PROJECTS.put(id, JSON.stringify(updatedProject));
    
    return new Response(JSON.stringify(updatedProject), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
});

// Get deployment info
router.get('/api/deployments/:id', async ({ params }: { params: { id: string } }, env: Env) => {
  const { id } = params;
  
  try {
    const deployment = await env.EDGEDEPLOY_DEPLOYMENTS.get(id);
    
    if (!deployment) {
      return new Response(JSON.stringify({ error: 'Deployment not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    return new Response(deployment, {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
});

// List deployments for a project
router.get('/api/projects/:id/deployments', async ({ params }: { params: { id: string } }, env: Env) => {
  const { id } = params;
  
  try {
    // List deployment keys with project ID prefix
    const deploymentsList = await env.EDGEDEPLOY_DEPLOYMENTS.list({ prefix: `${id}:` });
    
    // Fetch all deployment details
    const deployments = await Promise.all(
      deploymentsList.keys.map(async (key: { name: string }) => {
        const deploymentData = await env.EDGEDEPLOY_DEPLOYMENTS.get(key.name);
        return deploymentData ? JSON.parse(deploymentData) : null;
      })
    );
    
    // Filter out null values and sort by start time (newest first)
    const validDeployments = deployments
      .filter((deployment: unknown) => deployment !== null)
      .sort((a: DeploymentStatus, b: DeploymentStatus) => b.startTime - a.startTime);
    
    return new Response(JSON.stringify(validDeployments), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
});

// Trigger new deployment
router.post('/api/projects/:id/deploy', async ({ params, request }: { params: { id: string }, request: Request }, env: Env) => {
  const { id } = params;
  
  try {
    const projectJSON = await env.EDGEDEPLOY_PROJECTS.get(id);
    
    if (!projectJSON) {
      return new Response(JSON.stringify({ error: 'Project not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    const project = JSON.parse(projectJSON) as DeploymentConfig;
    const data = await request.json();
    
    if (!project.repositoryUrl) {
      return new Response(JSON.stringify({ error: 'Repository URL not configured for this project' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Create deployment record
    const deploymentId = crypto.randomUUID();
    const now = Date.now();
    const branch = data.branch || 'main';
    
    const deploymentStatus: DeploymentStatus = {
      id: deploymentId,
      projectId: id,
      status: 'building',
      startTime: now,
      branch,
      commit: data.commit,
      logs: ['Deployment initiated - queuing build job'],
    };
    
    // Store deployment status
    await env.EDGEDEPLOY_DEPLOYMENTS.put(`${id}:${deploymentId}`, JSON.stringify(deploymentStatus));
    
    // Queue the deployment
    await env.DEPLOYMENT_QUEUE.send({
      deploymentId,
      projectId: id,
      repositoryUrl: project.repositoryUrl,
      branch,
      commit: data.commit,
    });
    
    return new Response(JSON.stringify(deploymentStatus), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
});

// 404 for everything else
router.all('*', () => new Response('Not Found', { status: 404 }));

export default {
  fetch: router.handle,
}; 