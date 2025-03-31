'use client';

import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";

const saasPlans = [
  {
    name: 'Hobby',
    price: '$0',
    description: 'Perfect for small projects and hobbies',
    features: [
      '1 website',
      '50,000 requests/month',
      'Global CDN',
      'SSL included',
      'Community support',
    ],
    cta: 'Start for free',
    highlight: false,
    ctaLink: '/products#waitlist',
  },
  {
    name: 'Pro',
    price: '$19',
    description: 'Best for growing projects and businesses',
    features: [
      '10 websites',
      '1 million requests/month',
      'Global CDN',
      'SSL included',
      'Custom domains',
      'Analytics',
      'Priority support',
    ],
    cta: 'Join waitlist',
    highlight: true,
    ctaLink: '/products#waitlist',
  },
  {
    name: 'Enterprise',
    price: 'Contact us',
    description: 'For large scale applications and businesses',
    features: [
      'Unlimited websites',
      'Unlimited requests',
      'Global CDN',
      'SSL included',
      'Custom domains',
      'Analytics',
      'SLA',
      'Dedicated support',
    ],
    cta: 'Contact sales',
    highlight: false,
    ctaLink: '/contact',
  },
];

const servicesTiers = [
  {
    name: 'Standard Project',
    price: '$5,000 - $15,000',
    description: 'For brochure sites, landing pages, and simple applications',
    features: [
      'Next.js frontend development',
      'Responsive design',
      'Basic API integration',
      'Cloudflare Pages deployment',
      'Performance optimization',
      '30 days of support',
    ],
    cta: 'Contact us',
    highlight: false,
    ctaLink: '/contact',
  },
  {
    name: 'Professional Project',
    price: '$15,000 - $35,000',
    description: 'For e-commerce, complex business logic, custom integrations',
    features: [
      'Advanced Next.js development',
      'Complex API integration',
      'Cloudflare Workers implementation',
      'Custom animations & interactions',
      'Content management system',
      'E-commerce functionality',
      '60 days of support',
    ],
    cta: 'Contact us',
    highlight: true,
    ctaLink: '/contact',
  },
  {
    name: 'Enterprise Solution',
    price: '$35,000+',
    description: 'For high-performance applications, custom architecture, complex systems',
    features: [
      'Custom architecture design',
      'Enterprise integrations',
      'High-scale performance planning',
      'Advanced security implementation',
      'Edge compute optimization',
      'CI/CD pipeline setup',
      '90 days of support',
      'Dedicated project manager',
    ],
    cta: 'Contact us',
    highlight: false,
    ctaLink: '/contact',
  },
];

export default function PricingPage() {
  const [pricingType, setPricingType] = useState<'products' | 'services'>('products');
  const plans = pricingType === 'products' ? saasPlans : servicesTiers;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <div className="bg-white dark:bg-gray-900 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
                Pricing
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
                Choose the option that's right for you
              </p>
              
              {/* Pricing Type Toggle */}
              <div className="mt-10 flex justify-center items-center space-x-4">
                <button
                  onClick={() => setPricingType('products')}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${
                    pricingType === 'products'
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  EdgeDeploy Platform
                </button>
                <button
                  onClick={() => setPricingType('services')}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${
                    pricingType === 'services'
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  Agency Services
                </button>
              </div>

              {/* Description based on selected type */}
              <p className="mt-6 text-base text-gray-600 dark:text-gray-400">
                {pricingType === 'products' 
                  ? "Deploy, monitor, and optimize your Next.js applications on Cloudflare's global network." 
                  : "Custom Next.js development services from our expert team."}
              </p>
            </div>
            
            <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 items-center gap-y-6 sm:mt-20 sm:gap-y-0 lg:max-w-4xl lg:grid-cols-3">
              {plans.map((plan, planIdx) => (
                <div
                  key={plan.name}
                  className={`${
                    plan.highlight
                      ? 'relative -mt-2 bg-white dark:bg-gray-800 rounded-3xl p-8 ring-1 ring-gray-900/10 dark:ring-white/10 shadow-xl sm:-mt-4 sm:rounded-[1.5rem] sm:p-10'
                      : 'bg-white/60 dark:bg-gray-900/60 rounded-3xl p-8 ring-1 ring-gray-900/10 dark:ring-white/10 sm:p-10'
                  } ${
                    planIdx === 0 ? 'rounded-t-3xl lg:rounded-tr-none lg:rounded-l-3xl' : ''
                  } ${
                    planIdx === plans.length - 1 ? 'rounded-b-3xl lg:rounded-bl-none lg:rounded-r-3xl' : ''
                  }`}
                >
                  <h3
                    className={`text-xl font-semibold leading-8 ${
                      plan.highlight ? 'text-purple-600 dark:text-purple-400' : 'text-gray-900 dark:text-white'
                    }`}
                  >
                    {plan.name}
                  </h3>
                  <p className="mt-4 text-sm leading-6 text-gray-600 dark:text-gray-400">{plan.description}</p>
                  <p className="mt-6 flex items-baseline gap-x-1">
                    <span className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">{plan.price}</span>
                    {pricingType === 'products' && plan.price !== 'Contact us' && <span className="text-sm font-semibold leading-6 text-gray-600 dark:text-gray-400">/month</span>}
                  </p>
                  <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-600 dark:text-gray-400">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex gap-x-3">
                        <svg className="h-6 w-5 flex-none text-purple-600 dark:text-purple-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path
                            fillRule="evenodd"
                            d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={plan.ctaLink}
                    className={`mt-8 block rounded-md px-3.5 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                      plan.highlight
                        ? 'bg-purple-600 text-white hover:bg-purple-500 focus-visible:outline-purple-600'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {plan.cta}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-800 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                Frequently asked questions
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
                Have questions? We're here to help.
              </p>
            </div>
            
            <div className="mx-auto mt-16 max-w-2xl divide-y divide-gray-900/10 dark:divide-gray-100/10">
              {pricingType === 'products' ? (
                <>
                  <div className="py-6">
                    <h3 className="text-lg font-semibold leading-7 text-gray-900 dark:text-white">
                      Can I try before I buy?
                    </h3>
                    <p className="mt-2 text-base leading-7 text-gray-600 dark:text-gray-400">
                      Yes, our Hobby plan is free forever with generous limits. The Pro and Enterprise plans will have a 14-day free trial when launched.
                    </p>
                  </div>
                  <div className="py-6">
                    <h3 className="text-lg font-semibold leading-7 text-gray-900 dark:text-white">
                      Can I change plans later?
                    </h3>
                    <p className="mt-2 text-base leading-7 text-gray-600 dark:text-gray-400">
                      Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.
                    </p>
                  </div>
                  <div className="py-6">
                    <h3 className="text-lg font-semibold leading-7 text-gray-900 dark:text-white">
                      What payment methods do you accept?
                    </h3>
                    <p className="mt-2 text-base leading-7 text-gray-600 dark:text-gray-400">
                      We accept all major credit cards and PayPal. Enterprise plans can also be paid via bank transfer.
                    </p>
                  </div>
                  <div className="py-6">
                    <h3 className="text-lg font-semibold leading-7 text-gray-900 dark:text-white">
                      When will EdgeDeploy be available?
                    </h3>
                    <p className="mt-2 text-base leading-7 text-gray-600 dark:text-gray-400">
                      We're currently in development and plan to launch in Q3 2023. Join our waitlist to get early access.
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="py-6">
                    <h3 className="text-lg font-semibold leading-7 text-gray-900 dark:text-white">
                      How does your pricing work?
                    </h3>
                    <p className="mt-2 text-base leading-7 text-gray-600 dark:text-gray-400">
                      Our pricing is project-based. After understanding your requirements, we provide a fixed price quote that includes all development, testing, and deployment.
                    </p>
                  </div>
                  <div className="py-6">
                    <h3 className="text-lg font-semibold leading-7 text-gray-900 dark:text-white">
                      What's your development process?
                    </h3>
                    <p className="mt-2 text-base leading-7 text-gray-600 dark:text-gray-400">
                      We follow an agile development process with regular check-ins and iterations. Projects typically include discovery, design, development, testing, and deployment phases.
                    </p>
                  </div>
                  <div className="py-6">
                    <h3 className="text-lg font-semibold leading-7 text-gray-900 dark:text-white">
                      How long does a typical project take?
                    </h3>
                    <p className="mt-2 text-base leading-7 text-gray-600 dark:text-gray-400">
                      Timelines vary based on complexity. Standard projects typically take 4-6 weeks, Professional projects 8-12 weeks, and Enterprise solutions 12+ weeks.
                    </p>
                  </div>
                  <div className="py-6">
                    <h3 className="text-lg font-semibold leading-7 text-gray-900 dark:text-white">
                      Do you offer maintenance plans?
                    </h3>
                    <p className="mt-2 text-base leading-7 text-gray-600 dark:text-gray-400">
                      Yes, we offer ongoing maintenance and support plans starting at $1,500/month, which include regular updates, monitoring, and bug fixes.
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 