# CloudNext Project Setup

This document outlines the setup and configuration for the CloudNext website, including the EdgeDeploy API.

## Website Components

### Next.js Frontend

The main CloudNext website is built using Next.js.

#### Local Development

1. Install dependencies:
   ```
   npm install
   ```

2. Run the development server:
   ```
   npm run dev
   ```

3. Build for production:
   ```
   npm run build
   ```

### EdgeDeploy API

The EdgeDeploy API is a deployment platform for Next.js applications built on Cloudflare Workers. It provides a fully functional RESTful API for deploying, managing, and monitoring Next.js applications.

#### Local Development

1. Navigate to the functions directory:
   ```
   cd functions/edgedeploy
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Run the development server:
   ```
   npm run dev
   ```

## Cloudflare Setup

### Cloudflare Pages

1. Create a new Cloudflare Pages project
2. Connect your GitHub repository
3. Configure build settings:
   - Build command: `npm run build`
   - Build output directory: `out`
4. Add environment variables if needed

### Cloudflare Workers and KV Namespaces

For the EdgeDeploy API, you need to set up the following resources in your Cloudflare account:

1. KV Namespaces:
   ```
   wrangler kv:namespace create "EDGEDEPLOY_PROJECTS"
   wrangler kv:namespace create "EDGEDEPLOY_DEPLOYMENTS"
   wrangler kv:namespace create "EDGEDEPLOY_USERS"
   ```

2. Queues:
   ```
   wrangler queues create "deployment-queue"
   wrangler queues create "deployment-queue-dlq"
   ```

3. Deploy the EdgeDeploy Worker:
   ```
   cd functions/edgedeploy
   wrangler deploy
   ```

## Repository Structure

```
├── app/                  # Next.js application code
│   ├── components/       # Reusable UI components
│   ├── products/         # Product pages
│   ├── features/         # Features pages
│   └── ...
├── functions/            # Cloudflare Functions
│   └── edgedeploy/       # EdgeDeploy API
│       ├── index.ts      # Main API code
│       ├── queue-worker.ts # Deployment queue worker
│       └── client-sdk.ts # Client SDK
├── public/               # Static assets
├── next.config.js        # Next.js configuration
├── wrangler.jsonc        # Cloudflare Pages configuration
└── package.json          # Project dependencies
```

## Deployment Workflow

### Website

The website is automatically deployed to Cloudflare Pages when changes are pushed to the main branch.

1. Push changes to the GitHub repository:
   ```
   git add .
   git commit -m "Your commit message"
   git push
   ```

2. Cloudflare Pages will automatically build and deploy the changes.

### EdgeDeploy API

The EdgeDeploy API is deployed manually using Wrangler:

1. Navigate to the functions directory:
   ```
   cd functions/edgedeploy
   ```

2. Deploy the worker:
   ```
   wrangler deploy
   ```

## EdgeDeploy API Documentation

The EdgeDeploy API provides the following endpoints:

### Projects

- `GET /api/projects`: List all projects
- `GET /api/projects/:id`: Get project details
- `POST /api/projects`: Create a new project
- `PUT /api/projects/:id`: Update a project

### Deployments

- `GET /api/deployments/:id`: Get deployment details
- `GET /api/projects/:id/deployments`: List all deployments for a project
- `POST /api/projects/:id/deploy`: Trigger a new deployment

For detailed API documentation, refer to the Swagger UI available at `/docs` on the deployed API worker.

## Technical Decisions

- **Next.js**: Used for its static site generation capabilities, which work well with Cloudflare Pages.
- **Cloudflare Workers**: Used for the EdgeDeploy API due to its global distribution and low latency.
- **KV Storage**: Used to store project and deployment data.
- **Queues**: Used for asynchronous processing of deployment jobs.

## Future Improvements

- Add authentication to the EdgeDeploy API
- Implement user management and team collaboration features
- Add support for more frameworks beyond Next.js
- Implement real-time deployment status updates via WebSockets

## Current Implementation

The current implementation includes:

1. **Static Website**: Next.js static site deployed to Cloudflare Pages
2. **Google Analytics**: Integrated for tracking user interactions
3. **Waitlist Form**: Collects email and company information
4. **GitHub Actions**: CI/CD pipeline for automated deployments
5. **Simple Function**: Handles waitlist signups (logs data but doesn't store it yet)

## Future Implementation: Setting Up Cloudflare KV Namespaces

For permanent storage of waitlist signups, you'll need to create a KV namespace:

1. Log in to your Cloudflare dashboard
2. Navigate to "Workers & Pages"
3. Go to "KV" section
4. Click "Create namespace"
5. Name it `waitlist-signups` or something similar
6. Copy the ID of the created namespace

Next, update the `wrangler.jsonc` file with your KV namespace ID:

```jsonc
{
  "name": "savo",
  "compatibility_date": "2025-03-07",
  "compatibility_flags": ["nodejs_compat"],
  "pages_build_output_dir": "out",
  "kv_namespaces": [
    {
      "binding": "WAITLIST_SIGNUPS",
      "id": "YOUR_KV_NAMESPACE_ID",
      "preview_id": "YOUR_PREVIEW_KV_NAMESPACE_ID" // Optional: create a separate namespace for preview
    }
  ]
}
```

You'll also need to update the `functions/waitlist-signup.ts` file to use the KV namespace for storage:

```typescript
// In onRequest function, add this code where appropriate:
if (context.env.WAITLIST_SIGNUPS) {
  // Use email as key (with timestamp to avoid duplicates)
  const key = `signup:${email}:${Date.now()}`;
  await context.env.WAITLIST_SIGNUPS.put(key, JSON.stringify(signupData));
  console.log('Waitlist signup stored in KV with key:', key);
} else {
  console.warn('WAITLIST_SIGNUPS KV namespace not available, data not stored');
}
```

## Setting Up GitHub Actions

To enable automatic deployments via GitHub Actions, you need to add secrets to your GitHub repository:

1. Go to your GitHub repository
2. Navigate to "Settings" > "Secrets and variables" > "Actions"
3. Click "New repository secret"
4. Add the following secrets:
   - `CLOUDFLARE_API_TOKEN`: Your Cloudflare API token with Pages deployment permissions
   - `CLOUDFLARE_ACCOUNT_ID`: Your Cloudflare account ID

### Creating a Cloudflare API Token

1. Log in to your Cloudflare dashboard
2. Go to "My Profile" > "API Tokens"
3. Click "Create Token"
4. Select "Edit Cloudflare Workers" template or create a custom token with:
   - Account > Worker Scripts > Edit permission
   - Account > Workers Routes > Edit permission
   - Account > Pages > Edit permission
5. Set the Account Resources as needed
6. Complete the creation process and copy your token

## Manual Deployment

If you prefer to deploy manually, you can use the following commands:

```bash
# For preview deployment
npm run deploy:preview

# For production deployment
npm run deploy:production
```

## Google Analytics Setup

Remember to replace the placeholder Google Analytics ID in `app/layout.tsx` with your actual Google Analytics ID:

```typescript
// Replace G-PLACEHOLDER with your actual Google Analytics ID
gtag('config', 'G-PLACEHOLDER');
```

## Alternative Approach for Waitlist Signups

If you prefer not to use Cloudflare KV for waitlist storage, consider these alternatives:

1. **Email Service Integration**:
   - Use a service like SendGrid, Mailchimp, or ConvertKit to handle waitlist signups
   - Update the form submission handler to call their API

2. **Third-Party Form Services**:
   - Embed a Typeform, Google Form, or similar service
   - Let them handle data collection and storage

3. **Webhook Integration**:
   - Send form data to a service like Zapier or Make.com
   - Set up automated workflows to process the data

## Current Deployment

The site is currently deployed at:
- https://main.savo.pages.dev 