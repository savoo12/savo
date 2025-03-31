# CloudNext Agency Setup Guide

This guide will help you set up the CloudNext agency website with proper Cloudflare integrations and GitHub Actions for CI/CD.

## Setting Up Cloudflare KV Namespaces

For the waitlist signup functionality, you'll need to create a KV namespace:

1. Log in to your Cloudflare dashboard
2. Navigate to "Workers & Pages"
3. Go to "KV" section
4. Click "Create namespace"
5. Name it `waitlist-signups` or something similar
6. Copy the ID of the created namespace

Next, update the `wrangler.jsonc` file with your KV namespace ID:

```jsonc
"kv_namespaces": [
  {
    "binding": "WAITLIST_SIGNUPS",
    "id": "YOUR_KV_NAMESPACE_ID",
    "preview_id": "YOUR_PREVIEW_KV_NAMESPACE_ID" // Optional: create a separate namespace for preview
  }
]
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

## Testing Waitlist Form Functionality

To test the waitlist form:

1. Deploy the site
2. Fill out the form on the Products page
3. Check Cloudflare logs to see the form submission
4. Verify data is stored in the KV namespace using Cloudflare Dashboard

You can view stored data in the KV namespace through the Cloudflare dashboard:
1. Go to "Workers & Pages" > "KV"
2. Select your namespace
3. Browse the key-value pairs to see submitted data

## Troubleshooting

If you encounter deployment issues:

1. Check if your wrangler.jsonc has correct configuration
2. Ensure your API token has the necessary permissions
3. Verify that GitHub Actions secrets are properly set
4. Look at GitHub Actions logs for detailed error messages 