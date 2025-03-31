'use client';

import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";

export default function DocumentationPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <div className="bg-white dark:bg-gray-900 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:max-w-4xl">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl text-center mb-12">
                CloudNext Documentation
              </h1>
              
              <div className="mt-10 space-y-16">
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Website Structure</h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    This website is built with Next.js and deployed to Cloudflare Pages. The main sections include:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-400">
                    <li>Homepage with hero section and service overview</li>
                    <li>Products page with EdgeDeploy details</li>
                    <li>Services section highlighting our expertise</li>
                    <li>About page with company information</li>
                    <li>Contact form for inquiries</li>
                    <li>Pricing page for service tiers</li>
                  </ul>
                </section>
                
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Managing Content</h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    To update the website content:
                  </p>
                  <ol className="list-decimal pl-6 space-y-2 text-gray-600 dark:text-gray-400">
                    <li>Edit the corresponding page in the <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">app/</code> directory</li>
                    <li>For components, edit files in <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">app/components/</code></li>
                    <li>Update images by adding them to the <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">public/images/</code> directory</li>
                    <li>Deploy changes using <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">npm run deploy:production</code></li>
                  </ol>
                </section>
                
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Key Features</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Hero Animation</h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        The homepage features an animated SVG that showcases Next.js and Cloudflare integration with 
                        animated edge network points and data flow lines.
                      </p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Mobile Responsive</h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        All pages are designed to work on mobile, tablet, and desktop devices with 
                        optimized layouts for each screen size.
                      </p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">SEO Optimized</h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Built-in SEO features include metadata, OpenGraph and Twitter cards for 
                        better social sharing, and schema markup.
                      </p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Analytics</h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Google Analytics integration allows tracking of page views, user interactions, 
                        and conversion events. Replace the G-MEASUREMENT-ID with your actual ID.
                      </p>
                    </div>
                  </div>
                </section>
                
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Deployment</h2>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    The website is deployed on Cloudflare Pages. The deployment process includes:
                  </p>
                  <ol className="list-decimal pl-6 space-y-2 text-gray-600 dark:text-gray-400">
                    <li>Building the Next.js application</li>
                    <li>Exporting static pages</li>
                    <li>Uploading to Cloudflare Pages</li>
                    <li>Publishing to the main branch URL</li>
                  </ol>
                  <p className="text-gray-600 dark:text-gray-400 mt-4">
                    GitHub Actions are configured to automatically deploy changes when pushed to the main branch.
                  </p>
                </section>
              </div>
              
              <div className="mt-16 flex justify-center">
                <Link
                  href="/"
                  className="rounded-md bg-purple-600 px-5 py-3 text-base font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
                >
                  Return to Homepage
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 