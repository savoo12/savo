'use client';

import { useState, FormEvent, ChangeEvent } from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import ContactForm from "../components/ContactForm";

interface Office {
  name: string;
  address: string;
  phone: string;
  email: string;
}

interface FormState {
  name: string;
  email: string;
  phone: string;
  message: string;
  submitting: boolean;
  submitted: boolean;
  error: string | null;
}

const offices: Office[] = [
  {
    name: 'San Francisco',
    address: '100 Market St, Suite 300, San Francisco, CA 94103',
    phone: '+1 (555) 123-4567',
    email: 'sf@cloudnext.com',
  },
  {
    name: 'New York',
    address: '234 Broadway, 25th Floor, New York, NY 10007',
    phone: '+1 (555) 987-6543',
    email: 'nyc@cloudnext.com',
  },
  {
    name: 'London',
    address: '10 Downing Street, Westminster, London SW1A 2AA, UK',
    phone: '+44 20 7123 4567',
    email: 'london@cloudnext.com',
  },
];

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <div className="bg-white dark:bg-gray-900 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
                Let's Work Together
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
                Ready to build a lightning-fast web experience? We're here to help. Fill out the form below to get in touch with our team of Next.js and Cloudflare experts.
              </p>
            </div>
            
            <div className="mx-auto mt-16 max-w-2xl">
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Services We Offer</h2>
                  <ul className="mt-6 space-y-4">
                    <li className="flex gap-x-3">
                      <svg className="h-6 w-5 flex-none text-purple-600 dark:text-purple-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <strong className="font-semibold text-gray-900 dark:text-white">Next.js Development</strong>
                        <p className="mt-1 text-gray-600 dark:text-gray-400">Custom websites and applications</p>
                      </div>
                    </li>
                    <li className="flex gap-x-3">
                      <svg className="h-6 w-5 flex-none text-purple-600 dark:text-purple-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <strong className="font-semibold text-gray-900 dark:text-white">Cloudflare Integration</strong>
                        <p className="mt-1 text-gray-600 dark:text-gray-400">Edge computing and global CDN</p>
                      </div>
                    </li>
                    <li className="flex gap-x-3">
                      <svg className="h-6 w-5 flex-none text-purple-600 dark:text-purple-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <strong className="font-semibold text-gray-900 dark:text-white">Performance Optimization</strong>
                        <p className="mt-1 text-gray-600 dark:text-gray-400">Speed up your existing website</p>
                      </div>
                    </li>
                    <li className="flex gap-x-3">
                      <svg className="h-6 w-5 flex-none text-purple-600 dark:text-purple-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <strong className="font-semibold text-gray-900 dark:text-white">Migration Services</strong>
                        <p className="mt-1 text-gray-600 dark:text-gray-400">Move to modern web infrastructure</p>
                      </div>
                    </li>
                  </ul>
                  
                  <div className="mt-10">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Contact Information</h2>
                    <dl className="mt-6 space-y-4 text-base leading-7 text-gray-600 dark:text-gray-400">
                      <div className="flex gap-x-3">
                        <svg className="h-7 w-5 flex-none text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <dd><a className="hover:text-purple-600 dark:hover:text-purple-400" href="tel:+15555555555">+1 (555) 555-5555</a></dd>
                      </div>
                      <div className="flex gap-x-3">
                        <svg className="h-7 w-5 flex-none text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <dd><a className="hover:text-purple-600 dark:hover:text-purple-400" href="mailto:contact@cloudnext.dev">contact@cloudnext.dev</a></dd>
                      </div>
                    </dl>
                  </div>
                </div>
                
                <div>
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-800 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                Our Process
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
                Here's how we work with clients to deliver exceptional results.
              </p>
            </div>
            
            <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 items-center gap-y-10 sm:max-w-xl sm:gap-y-14 lg:max-w-none lg:grid-cols-4">
              <div className="text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-600 mx-auto">
                  <span className="text-xl font-bold text-white">1</span>
                </div>
                <h3 className="mt-6 text-lg font-semibold text-gray-900 dark:text-white">Consultation</h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">We discuss your goals, requirements, and challenges.</p>
              </div>
              
              <div className="text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-600 mx-auto">
                  <span className="text-xl font-bold text-white">2</span>
                </div>
                <h3 className="mt-6 text-lg font-semibold text-gray-900 dark:text-white">Proposal</h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">We provide a detailed proposal with timeline and cost estimates.</p>
              </div>
              
              <div className="text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-600 mx-auto">
                  <span className="text-xl font-bold text-white">3</span>
                </div>
                <h3 className="mt-6 text-lg font-semibold text-gray-900 dark:text-white">Development</h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Our team builds your solution with regular updates and milestones.</p>
              </div>
              
              <div className="text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-600 mx-auto">
                  <span className="text-xl font-bold text-white">4</span>
                </div>
                <h3 className="mt-6 text-lg font-semibold text-gray-900 dark:text-white">Launch & Support</h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">We deploy your solution and provide ongoing maintenance and support.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 