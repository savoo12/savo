'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

// Example logos - replace with actual client logos when available
const clients = [
  {
    name: 'TechCorp',
    logo: '/images/clients/placeholder1.svg',
    industry: 'SaaS',
  },
  {
    name: 'EcoStore',
    logo: '/images/clients/placeholder2.svg',
    industry: 'E-commerce',
  },
  {
    name: 'HealthPlus',
    logo: '/images/clients/placeholder3.svg',
    industry: 'Healthcare',
  },
  {
    name: 'FinEdge',
    logo: '/images/clients/placeholder4.svg',
    industry: 'Finance',
  },
];

export default function ClientShowcase() {
  return (
    <section className="bg-gray-50 dark:bg-gray-800 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div 
          className="mx-auto max-w-2xl lg:text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-base font-semibold leading-7 text-purple-600 dark:text-purple-400">Trusted By</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Companies That Trust Our Expertise
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
            We've helped businesses across industries build high-performance web applications using Next.js and Cloudflare.
          </p>
        </motion.div>
        
        <div className="mt-16 flow-root">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 md:gap-12">
            {clients.map((client) => (
              <motion.div 
                key={client.name}
                className="flex flex-col items-center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                viewport={{ once: true }}
              >
                <div className="h-16 w-32 relative grayscale hover:grayscale-0 transition duration-300">
                  <div className="bg-white dark:bg-gray-700 rounded-lg shadow-sm p-4 h-16 w-32 flex items-center justify-center">
                    <p className="text-gray-700 dark:text-gray-300 font-medium text-center">{client.name}</p>
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{client.industry}</p>
              </motion.div>
            ))}
          </div>
        </div>
        
        <div className="mt-20 bg-white dark:bg-gray-700 rounded-xl shadow-lg p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.div 
              className="lg:col-span-2"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                "The CloudNext team helped us reduce our page load times by 60% and cut our hosting costs in half."
              </h3>
              <p className="mt-4 text-base text-gray-600 dark:text-gray-300">
                When we approached CloudNext, our e-commerce site was struggling with performance issues during peak traffic. 
                Their team implemented a Next.js frontend with Cloudflare's edge caching, resulting in significantly faster 
                load times and improved conversion rates. The expertise they brought to our project was invaluable.
              </p>
              <div className="mt-6 flex items-center">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-800 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 dark:text-purple-300 font-semibold">ES</span>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Emma Smith</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">CTO, EcoStore</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="hidden lg:flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="relative h-48 w-full">
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-600 rounded-lg">
                  <div className="text-center p-6">
                    <div className="text-purple-600 dark:text-purple-400 text-4xl font-bold">60%</div>
                    <div className="text-gray-600 dark:text-gray-300 text-sm">Faster Load Times</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
} 