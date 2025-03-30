import { NextResponse } from 'next/server';

// Make this route static for static exports
export const dynamic = 'force-static';

export async function GET() {
  return NextResponse.json({
    message: 'Hello from the API!',
    timestamp: new Date().toISOString(),
    environment: 'Cloudflare Pages',
  });
} 