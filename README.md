# Next.js on Cloudflare Pages

This is a [Next.js](https://nextjs.org/) project optimized for deployment to [Cloudflare Pages](https://pages.cloudflare.com/).

## Features

- Static Site Generation (SSG) with Next.js
- API routes powered by Cloudflare Functions
- Global CDN deployment via Cloudflare Pages
- Edge functions for dynamic content

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Cloudflare Pages Development

To test your application with Cloudflare Pages locally, first build your application:

```bash
npm run build
```

Then run the Cloudflare Pages development server:

```bash
npm run pages:dev
```

This will serve your static site with Cloudflare Pages, including Functions.

## Deployment

### Using npm scripts (Recommended)

The simplest way to deploy is using the provided npm scripts. These scripts avoid PowerShell issues with the `--` operator.

For a preview deployment:
```bash
npm run deploy:preview
```

For production deployment:
```bash
npm run deploy:production
```

### Using PowerShell Script

For PowerShell users, we've included a PowerShell script that handles deployments without the `--` operator issues:

For a preview deployment:
```powershell
.\deploy.ps1
```

For a production deployment:
```powershell
.\deploy.ps1 -Production
```

### Using Batch File

For CMD users, we've included a batch file:

For a preview deployment:
```
deploy.bat
```

For a production deployment:
```
deploy.bat production
```

### Manual Deployment via Wrangler

Alternatively, you can deploy directly from the command line using Wrangler. In PowerShell, be sure to quote the arguments:

```powershell
npx wrangler pages deploy out '--project-name=savo' '--branch=main'
```

In CMD or bash:
```
npx wrangler pages deploy out --project-name=savo --branch=main
```

## API Routes

API routes are handled by Cloudflare Functions. These are defined in the `functions/` directory:

- `functions/api/[[route]].ts` - Dynamic API routes handler
- `functions/api-hello.ts` - Dedicated function for the `/api/hello` endpoint

## Environment Variables

Environment variables can be set in the Cloudflare Dashboard or using Wrangler. For local development, you can create a `.dev.vars` file:

```
API_KEY=your_api_key_here
```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)
- [Cloudflare Functions Documentation](https://developers.cloudflare.com/pages/platform/functions/)
