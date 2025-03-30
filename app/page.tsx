import Image from "next/image";
import ApiExample from "./components/ApiExample";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-4xl font-bold">Welcome to My Next.js Site</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">Powered by Cloudflare Pages</p>
        </div>
        
        <ol className="list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2 tracking-[-.01em]">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-[family-name:var(--font-geist-mono)] font-semibold">
              app/page.tsx
            </code>
          </li>
          <li className="tracking-[-.01em]">
            Your site is deployed on Cloudflare's global network!
          </li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            href="https://developers.cloudflare.com/pages"
            target="_blank"
            rel="noopener noreferrer"
          >
            Cloudflare Pages Docs
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Next.js Docs
          </a>
        </div>
        
        <div className="mt-8 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg w-full max-w-2xl">
          <h2 className="text-2xl font-bold mb-4">Features of This Setup</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Next.js App Router</li>
            <li>Static Site Generation (SSG)</li>
            <li>Tailwind CSS for styling</li>
            <li>TypeScript support</li>
            <li>Deployed on Cloudflare's global edge network</li>
            <li>Super-fast page loads</li>
          </ul>
        </div>
        
        <ApiExample />
      </main>
      
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn Next.js
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://developers.cloudflare.com/pages/framework-guides/deploy-a-nextjs-site/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Cloudflare + Next.js
        </a>
      </footer>
    </div>
  );
}
