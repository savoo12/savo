interface Env {
  // Define your environment variables here
}

export const onRequest = async (context: {
  request: Request;
  env: Env;
  params: Record<string, string>;
  waitUntil: (promise: Promise<any>) => void;
}): Promise<Response> => {
  // CORS headers for API requests
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  // Handle OPTIONS request for CORS preflight
  if (context.request.method === 'OPTIONS') {
    return new Response(null, { headers });
  }

  // Return API response
  return new Response(
    JSON.stringify({
      message: 'Hello from Cloudflare Function!',
      timestamp: new Date().toISOString(),
      environment: 'Cloudflare Pages',
      runtime: 'edge',
    }),
    { headers }
  );
}; 