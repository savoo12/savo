import { NextResponse } from 'next/server';

// Make this route static for static exports
export const dynamic = 'force-static';

export async function GET() {
  return NextResponse.json({
    items: [
      {
        title: 'Home',
        url: '/'
      },
      {
        title: 'About',
        url: '/about'
      },
      {
        title: 'Contact',
        url: '/contact'
      }
    ]
  });
} 