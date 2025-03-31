'use client';

import { useState, FormEvent } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";
import Image from "next/image";
import CTASection from "../components/CTASection";

export default function ProductsPage() {
  const [formState, setFormState] = useState({
    email: '',
    company: '',
    submitting: false,
    submitted: false,
    error: null as string | null,
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validate email
    if (!formState.email) {
      setFormState({ ...formState, error: 'Email is required' });
      return;
    }

    // Update state to submitting
    setFormState({ ...formState, submitting: true, error: null });
    
    try {
      // Make the actual API call to our Functions API
      const response = await fetch('/waitlist-signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formState.email,
          company: formState.company,
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }
      
      // Success state
      setFormState({
        email: '',
        company: '',
        submitting: false,
        submitted: true,
        error: null,
      });
      
    } catch (error) {
      console.error('Waitlist signup error:', error);
      setFormState({
        ...formState,
        submitting: false,
        error: error instanceof Error ? error.message : 'An unexpected error occurred',
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-white dark:bg-gray-900 pt-16 pb-24 sm:pb-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
                EdgeDeploy
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
                Deploy, monitor, and optimize your Next.js applications on Cloudflare's global network with zero configuration.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link
                  href="/pricing"
                  className="rounded-md bg-purple-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
                >
                  View Pricing
                </Link>
                <Link href="#features" className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">
                  Learn more <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
            <div className="mt-16 flow-root sm:mt-24">
              <div className="relative -m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                <div className="relative rounded-md shadow-2xl ring-1 ring-gray-900/10">
                  <div className="bg-gray-100 dark:bg-gray-800 h-[350px] w-full rounded-md flex items-center justify-center">
                    <p className="text-gray-500 dark:text-gray-400 text-center px-6">
                      [Dashboard Preview Image]<br />
                      <span className="text-sm">EdgeDeploy management dashboard</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div id="features" className="bg-gray-50 dark:bg-gray-800 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h2 className="text-base font-semibold leading-7 text-purple-600 dark:text-purple-400">Simplified Deployment</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                Everything you need to deploy Next.js at the edge
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
                EdgeDeploy handles the complex configuration so you can focus on building great Next.js applications.
              </p>
            </div>
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
              <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                <div className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-white">
                    <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-purple-600">
                      <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    One-Click Deployment
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-400">
                    <p className="flex-auto">
                      Connect your Git repository and deploy your Next.js application with a single click. We handle the configuration automatically.
                    </p>
                  </dd>
                </div>
                <div className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-white">
                    <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-purple-600">
                      <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    Optimized Performance
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-400">
                    <p className="flex-auto">
                      Automatic optimizations for assets, edge caching, and image delivery. Your site will be faster without any additional work.
                    </p>
                  </dd>
                </div>
                <div className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-white">
                    <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-purple-600">
                      <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    Detailed Analytics
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-400">
                    <p className="flex-auto">
                      Monitor your application's performance, traffic, and errors in real-time. Get insights to optimize your Next.js application.
                    </p>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-white dark:bg-gray-900 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h2 className="text-base font-semibold leading-7 text-purple-600 dark:text-purple-400">How It Works</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                Simple, powerful, and fast
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
                EdgeDeploy takes the complexity out of deploying Next.js applications to the edge.
              </p>
            </div>
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
              <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
                <div className="relative flex flex-col items-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-600 text-white">
                    1
                  </div>
                  <h3 className="mt-6 text-lg font-semibold text-gray-900 dark:text-white">Connect your repository</h3>
                  <p className="mt-2 text-base text-gray-600 dark:text-gray-400 text-center">
                    Link your GitHub or GitLab repository with a few clicks.
                  </p>
                </div>
                <div className="relative flex flex-col items-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-600 text-white">
                    2
                  </div>
                  <h3 className="mt-6 text-lg font-semibold text-gray-900 dark:text-white">Configure your project</h3>
                  <p className="mt-2 text-base text-gray-600 dark:text-gray-400 text-center">
                    Select your project settings and deployment options.
                  </p>
                </div>
                <div className="relative flex flex-col items-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-600 text-white">
                    3
                  </div>
                  <h3 className="mt-6 text-lg font-semibold text-gray-900 dark:text-white">Deploy and monitor</h3>
                  <p className="mt-2 text-base text-gray-600 dark:text-gray-400 text-center">
                    Your app is deployed globally and you can monitor performance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Early Access Signup */}
        <div id="waitlist" className="bg-gray-50 dark:bg-gray-800 py-16 sm:py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                Join the EdgeDeploy Waitlist
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
                Be the first to try EdgeDeploy when we launch. Early access members will receive special benefits.
              </p>
            </div>

            {formState.submitted ? (
              <div className="mx-auto mt-10 max-w-md rounded-md bg-green-50 dark:bg-green-900/30 p-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-medium text-green-800 dark:text-green-300">Thank you for joining!</h3>
                    <p className="mt-2 text-base text-green-700 dark:text-green-400">
                      You've been added to our waitlist. We'll keep you updated on EdgeDeploy's progress and let you know when early access is available.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <form className="mx-auto mt-10 max-w-md" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-2.5">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        autoComplete="email"
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6 dark:bg-gray-700 dark:text-white dark:ring-gray-600"
                        placeholder="you@example.com"
                        required
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="company" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                      Company
                    </label>
                    <div className="mt-2.5">
                      <input
                        type="text"
                        name="company"
                        id="company"
                        autoComplete="organization"
                        value={formState.company}
                        onChange={(e) => setFormState({ ...formState, company: e.target.value })}
                        className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6 dark:bg-gray-700 dark:text-white dark:ring-gray-600"
                        placeholder="Your company"
                      />
                    </div>
                  </div>
                </div>

                {formState.error && (
                  <div className="mt-6 rounded-md bg-red-50 dark:bg-red-900/30 p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-red-800 dark:text-red-300">There was an error</h3>
                        <p className="text-sm text-red-700 dark:text-red-400 mt-1">{formState.error}</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-10">
                  <button
                    type="submit"
                    disabled={formState.submitting}
                    className="block w-full rounded-md bg-purple-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600 disabled:opacity-70"
                  >
                    {formState.submitting ? 'Joining...' : 'Join Waitlist'}
                  </button>
                </div>
                <p className="mt-4 text-sm leading-6 text-gray-500 dark:text-gray-400 text-center">
                  We care about your data. Read our{' '}
                  <Link href="/privacy-policy" className="font-semibold text-purple-600 dark:text-purple-400">
                    Privacy Policy
                  </Link>
                  .
                </p>
              </form>
            )}
          </div>
        </div>

        {/* CTA Section */}
        <CTASection
          title="Not ready for self-service?"
          subtitle="Our agency team can build and deploy your Next.js application for you."
          buttonText="Hire Our Agency"
          buttonLink="/contact"
        />
      </main>
      <Footer />
    </div>
  );
} 