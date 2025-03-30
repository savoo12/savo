'use client';

import { useState, useEffect } from 'react';

interface ApiResponse {
  message: string;
  timestamp: string;
  environment: string;
}

export default function ApiExample() {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/hello');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="mt-8 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg w-full max-w-2xl">
      <h2 className="text-2xl font-bold mb-4">API Example</h2>
      {loading && <p>Loading API data...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      {data && (
        <div className="space-y-2">
          <p><strong>Message:</strong> {data.message}</p>
          <p><strong>Timestamp:</strong> {data.timestamp}</p>
          <p><strong>Environment:</strong> {data.environment}</p>
        </div>
      )}
    </div>
  );
} 