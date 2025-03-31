# EdgeDeploy API

EdgeDeploy is a deployment platform for Next.js applications built on Cloudflare Workers. It provides a complete solution for deploying, managing, and monitoring your Next.js applications on Cloudflare's global network.

## Features

- **RESTful API**: Integrate with your existing CI/CD workflows
- **Project Management**: Create and manage deployment projects
- **Deployment Tracking**: Monitor build and deployment status
- **Queue-based Processing**: Reliable asynchronous deployment processing
- **KV Storage**: Persistent storage for project and deployment data
- **Scalable Architecture**: Runs entirely on Cloudflare's edge network

## API Endpoints

### Projects

- `GET /api/projects`: List all projects
- `GET /api/projects/:id`: Get project details
- `POST /api/projects`: Create a new project
- `PUT /api/projects/:id`: Update a project

### Deployments

- `GET /api/deployments/:id`: Get deployment details
- `GET /api/projects/:id/deployments`: List all deployments for a project
- `POST /api/projects/:id/deploy`: Trigger a new deployment

## Development

### Prerequisites

- Node.js 18+
- Wrangler CLI (`npm install -g wrangler`)
- Cloudflare account with Workers access

### Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Create KV namespaces:
   ```
   wrangler kv:namespace create "EDGEDEPLOY_PROJECTS"
   wrangler kv:namespace create "EDGEDEPLOY_DEPLOYMENTS"
   wrangler kv:namespace create "EDGEDEPLOY_USERS"
   ```
4. Create a queue:
   ```
   wrangler queues create "deployment-queue"
   wrangler queues create "deployment-queue-dlq"
   ```
5. Update `wrangler.jsonc` with your KV namespace IDs
6. Deploy the worker: `wrangler deploy`

## Example Usage

### Create a Project

```bash
curl -X POST https://edgedeploy-api.your-subdomain.workers.dev/api/projects \
  -H "Content-Type: application/json" \
  -d '{
    "name": "My Next.js App",
    "framework": "nextjs",
    "repositoryUrl": "https://github.com/username/repo",
    "buildCommand": "npm run build",
    "outputDirectory": "out"
  }'
```

### Trigger a Deployment

```bash
curl -X POST https://edgedeploy-api.your-subdomain.workers.dev/api/projects/:projectId/deploy \
  -H "Content-Type: application/json" \
  -d '{
    "branch": "main",
    "commit": {
      "hash": "abcdef123456",
      "message": "Update readme",
      "author": "developer@example.com"
    }
  }'
```

## Client SDK

We also provide a TypeScript client SDK for easy integration:

```typescript
import { EdgeDeployClient } from 'edgedeploy-sdk';

// Initialize the client
const client = new EdgeDeployClient(
  'https://edgedeploy-api.your-subdomain.workers.dev',
  'YOUR_API_KEY'
);

// Create a new project
const project = await client.createProject({
  name: 'My Next.js App',
  framework: 'nextjs',
  repositoryUrl: 'https://github.com/username/repo',
  buildCommand: 'npm run build',
  outputDirectory: 'out'
});

// Trigger a deployment
const deployment = await client.deploy(project.id, {
  branch: 'main',
  commit: {
    hash: 'abcdef123456',
    message: 'Update readme',
    author: 'developer@example.com'
  }
});
```

## Architecture

EdgeDeploy uses a combination of Cloudflare Workers, KV storage, and Cloudflare Queues to create a scalable deployment platform:

1. The API worker handles HTTP requests and manages projects and deployments
2. KV namespaces store project configurations and deployment status
 