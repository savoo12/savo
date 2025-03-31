@echo off
rem deploy.bat - Deploy Next.js to Cloudflare Pages

echo Building your Next.js application...
call npm run build

if %ERRORLEVEL% neq 0 (
    echo Build failed. Exiting.
    exit /b 1
)

echo Build successful!

if "%1"=="production" (
    echo Deploying to PRODUCTION (main branch)...
    call npx wrangler pages deploy out --project-name=savo --branch=main
) else (
    echo Deploying to PREVIEW environment...
    call npx wrangler pages deploy out --project-name=savo
)

if %ERRORLEVEL% neq 0 (
    echo Deployment failed. See errors above.
    exit /b 1
)

echo Deployment successful!
if "%1"=="production" (
    echo Your site is available at: https://main.savo.pages.dev
) else (
    echo Check the Cloudflare dashboard for your preview URL
) 