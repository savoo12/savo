// Types are automatically provided by the Cloudflare Pages environment
// We need to declare the KVNamespace interface for TypeScript

// Define KVNamespace interface for TypeScript
interface KVNamespace {
  get(key: string, options?: any): Promise<string | null>;
  put(key: string, value: string | ReadableStream | ArrayBuffer, options?: any): Promise<void>;
  delete(key: string): Promise<void>;
  list(options?: any): Promise<{ keys: { name: string }[] }>;
}

interface SignupData {
  email: string;
  company?: string;
  timestamp: number;
  source: string;
}

// Define context type for Pages Functions
type Context = {
  request: Request;
  env: {
    WAITLIST_SIGNUPS?: KVNamespace;
  };
  params: Record<string, string>;
};

export const onRequest = async (context: Context) => {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  // Handle preflight request
  if (context.request.method === 'OPTIONS') {
    return new Response(null, { headers });
  }

  // Only allow POST requests
  if (context.request.method !== 'POST') {
    return new Response(
      JSON.stringify({ success: false, error: 'Method not allowed' }),
      { status: 405, headers }
    );
  }

  try {
    // Parse request body
    let data;
    try {
      data = await context.request.json();
    } catch (e) {
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid JSON' }),
        { status: 400, headers }
      );
    }

    // Validate email
    const { email, company } = data;
    if (!email) {
      return new Response(
        JSON.stringify({ success: false, error: 'Email is required' }),
        { status: 400, headers }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid email format' }),
        { status: 400, headers }
      );
    }

    // Get referrer info for analytics
    const referer = context.request.headers.get('Referer') || 'direct';
    
    // Prepare data for storage
    const signupData: SignupData = {
      email,
      company: company || '',
      timestamp: Date.now(),
      source: referer
    };

    console.log('Waitlist signup received:', JSON.stringify(signupData));
    
    // Store in KV if KV namespace is available
    if (context.env.WAITLIST_SIGNUPS) {
      // Use email as key (with timestamp to avoid duplicates)
      const key = `signup:${email}:${Date.now()}`;
      await context.env.WAITLIST_SIGNUPS.put(key, JSON.stringify(signupData));
      console.log('Waitlist signup stored in KV with key:', key);
    } else {
      console.warn('WAITLIST_SIGNUPS KV namespace not available, data not stored');
    }
    
    // Return success response
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Thank you for joining our waitlist! We\'ll be in touch soon.' 
      }),
      { status: 200, headers }
    );
  } catch (error) {
    // Log the error
    console.error('Waitlist signup error:', error);
    
    // Return error response
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: 'Server error, please try again later' 
      }),
      { status: 500, headers }
    );
  }
}; 