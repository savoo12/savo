'use client';

import { useEffect, useState } from 'react';

interface ApiResponse {
  message: string;
  timestamp: string;
  environment: string;
  runtime?: string;
}

export default function ApiExample() {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/hello');
        
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        
        const result = await response.json();
        setData(result);
      } catch (err) {
        console.error('Error fetching API:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="rounded-lg bg-gray-50 dark:bg-gray-800 p-6 shadow-md w-full max-w-lg">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">API Response</h3>
      
      {loading && (
        <div className="text-center py-4">
          <div className="animate-pulse h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2.5"></div>
          <div className="animate-pulse h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2.5"></div>
          <div className="animate-pulse h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
        </div>
      )}
      
      {error && (
        <div className="text-red-500 dark:text-red-400 py-2">
          Error: {error}
        </div>
      )}
      
      {data && !loading && (
        <div className="text-sm font-mono">
          <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded overflow-x-auto">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
} 