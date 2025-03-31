# deploy.ps1
# A simple PowerShell script to deploy your Next.js app to Cloudflare Pages

param (
    [Parameter(Mandatory=$false)]
    [switch]$Production = $false
)

# First, build the application
Write-Host "Building your Next.js application..." -ForegroundColor Cyan
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "Build failed. Exiting." -ForegroundColor Red
    exit 1
}

Write-Host "Build successful!" -ForegroundColor Green

# Determine if deploying to production or preview
if ($Production) {
    Write-Host "Deploying to PRODUCTION (main branch)..." -ForegroundColor Yellow
    $deployCommand = "npx wrangler pages deploy out '--project-name=savo' '--branch=main'"
} else {
    Write-Host "Deploying to PREVIEW environment..." -ForegroundColor Magenta
    $deployCommand = "npx wrangler pages deploy out '--project-name=savo'"
}

# Execute the deployment
Write-Host "Executing: $deployCommand" -ForegroundColor Cyan
Invoke-Expression $deployCommand

if ($LASTEXITCODE -ne 0) {
    Write-Host "Deployment failed. See errors above." -ForegroundColor Red
    exit 1
}

Write-Host "Deployment successful!" -ForegroundColor Green
if ($Production) {
    Write-Host "Your site is available at: https://main.savo.pages.dev" -ForegroundColor Cyan
} else {
    Write-Host "Check the Cloudflare dashboard for your preview URL" -ForegroundColor Cyan
} 