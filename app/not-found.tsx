import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl mb-8">Page Not Found</h2>
      <p className="mb-8 text-gray-600 dark:text-gray-400">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="rounded-full border border-solid border-transparent bg-foreground text-background px-6 py-3 font-medium transition-colors hover:bg-gray-800"
      >
        Go Back Home
      </Link>
    </div>
  );
} 