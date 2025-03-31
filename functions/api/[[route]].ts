interface Env {
  // Define your environment variables here
}

interface PagesContext {
  request: Request;
  env: Env;
  params: Record<string, string>;
  waitUntil: (promise: Promise<any>) => void;
}

type PagesFunction = (context: PagesContext) => Promise<Response>;

export const onRequest: PagesFunction = async (context) => {
  const { request } = context;
  const url = new URL(request.url);
  const path = url.pathname.replace('/api/', '');

  // Handle different API routes
  if (path === 'hello') {
    return new Response(
      JSON.stringify({
        message: 'Hello from Cloudflare Function!',
        timestamp: new Date().toISOString(),
        environment: 'Cloudflare Pages Function',
      }),
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      }
    );
  }

  // Default response for unhandled routes
  return new Response(
    JSON.stringify({ error: 'API route not found' }),
    {
      status: 404,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
}; 