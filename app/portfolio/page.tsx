import Image from 'next/image';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';

const projects = [
  {
    title: 'E-commerce Platform Overhaul',
    client: 'FashionRetail',
    category: 'E-commerce',
    imageUrl: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2076&q=80',
    description: 'Rebuilt a high-traffic fashion e-commerce site with Next.js and Cloudflare Pages, reducing page load times by 58% and increasing conversion rates by 23%.',
    technologies: ['Next.js', 'Cloudflare Pages', 'Tailwind CSS', 'Stripe'],
    results: [
      '58% faster page load times',
      '23% increase in conversion rate',
      '35% reduction in bounce rate',
      '99.99% uptime since launch'
    ]
  },
  {
    title: 'SaaS Dashboard',
    client: 'AnalyticsPro',
    category: 'SaaS',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    description: 'Developed a real-time analytics dashboard that handles millions of data points. Built with Next.js and Cloudflare Workers, it delivers sub-second rendering even under high load.',
    technologies: ['Next.js', 'Cloudflare Workers', 'React Query', 'D3.js'],
    results: [
      'Processes 5M+ data points daily',
      'Reduced infrastructure costs by 62%',
      'Sub-second rendering on all charts',
      'Seamless global availability'
    ]
  },
  {
    title: 'Healthcare Provider Platform',
    client: 'MediConnect',
    category: 'Healthcare',
    imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    description: 'Built a HIPAA-compliant patient portal that enables secure messaging and telehealth visits. Leveraged Cloudflare Access for secure authentication and identity management.',
    technologies: ['Next.js', 'Cloudflare Access', 'Cloudflare Workers', 'WebRTC'],
    results: [
      'Achieved HIPAA compliance',
      '99.9% uptime for critical services',
      '40% increase in patient engagement',
      'Reduced IT support tickets by 50%'
    ]
  },
  {
    title: 'Global Event Platform',
    client: 'EventMasters',
    category: 'Events',
    imageUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    description: 'Created a virtual event platform that supports 100,000+ concurrent users across 40+ countries with minimal latency using Next.js and Cloudflare Stream.',
    technologies: ['Next.js', 'Cloudflare Stream', 'WebSockets', 'Redis'],
    results: [
      'Supported 100k+ concurrent users',
      'Achieved 150ms average latency worldwide',
      'Processed $2M+ in ticket sales',
      'Saved 40% on bandwidth costs'
    ]
  },
  {
    title: 'Financial Services Application',
    client: 'WealthWise',
    category: 'Finance',
    imageUrl: 'https://images.unsplash.com/photo-1620228885847-9eab2a1adddc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2072&q=80',
    description: 'Developed a secure investment platform with real-time market data integration. Used Cloudflare Workers and KV to cache market data and reduce API costs.',
    technologies: ['Next.js', 'Cloudflare Workers', 'Cloudflare KV', 'TradingView'],
    results: [
      'Reduced API costs by 70%',
      'Achieved 99.99% uptime',
      '65% faster portfolio calculations',
      'SOC 2 compliance certification'
    ]
  },
  {
    title: 'Content Management System',
    client: 'PublishPro',
    category: 'Media',
    imageUrl: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
    description: 'Built a headless CMS with Next.js that powers multiple media websites with 10M+ monthly visitors. Used Cloudflare R2 for asset storage and delivery.',
    technologies: ['Next.js', 'Cloudflare R2', 'GraphQL', 'Sanity'],
    results: [
      'Handles 10M+ monthly visitors',
      'Reduced image delivery costs by 80%',
      '50% faster publishing workflow',
      'Improved Core Web Vitals scores across all sites'
    ]
  },
];

const testimonials = [
  {
    quote: "The CloudNext team delivered a solution that exceeded our expectations. Our site is now blazing fast, and our customers have noticed the difference.",
    author: "Sarah Johnson",
    title: "CTO, FashionRetail",
    imageUrl: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80"
  },
  {
    quote: "Their expertise in Next.js and Cloudflare technologies is unmatched. They found performance optimizations we never would have discovered on our own.",
    author: "Marcus Chen",
    title: "Founder, AnalyticsPro",
    imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80"
  },
];

export default function PortfolioPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Hero section */}
        <div className="bg-white dark:bg-gray-900 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
                Our Work
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
                Explore our portfolio of high-performance Next.js and Cloudflare projects. 
                We've helped businesses across industries achieve remarkable results through 
                modern web technologies.
              </p>
            </div>
          </div>
        </div>

        {/* Case studies grid */}
        <div className="bg-gray-50 dark:bg-gray-800 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:mx-0">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">Case Studies</h2>
              <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
                Each project represents our commitment to performance, security, and exceptional user experiences.
              </p>
            </div>
            <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
              {projects.map((project, projectIdx) => (
                <article key={projectIdx} className="flex flex-col items-start bg-white dark:bg-gray-900 rounded-2xl shadow-md overflow-hidden">
                  <div className="w-full aspect-[16/9] relative">
                    <Image
                      src={project.imageUrl}
                      alt={project.title}
                      className="object-cover"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-x-4 text-xs">
                      <span className="relative z-10 rounded-full bg-purple-100 dark:bg-purple-900 py-1.5 px-3 font-medium text-purple-800 dark:text-purple-300">
                        {project.category}
                      </span>
                      <span className="text-gray-500 dark:text-gray-400">{project.client}</span>
                    </div>
                    <div className="group">
                      <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 dark:text-white">
                        {project.title}
                      </h3>
                      <p className="mt-5 text-sm leading-6 text-gray-600 dark:text-gray-400">
                        {project.description}
                      </p>
                    </div>
                    <div className="mt-4">
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Technologies</h4>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <span key={tech} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="mt-4">
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Results</h4>
                      <ul className="mt-2 space-y-1">
                        {project.results.map((result, resultIdx) => (
                          <li key={resultIdx} className="text-sm text-gray-600 dark:text-gray-400 flex items-start">
                            <svg className="h-4 w-4 flex-shrink-0 text-green-500 dark:text-green-400 mt-0.5 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            {result}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonials section */}
        <div className="bg-white dark:bg-gray-900 py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                What Our Clients Say
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
                Don't just take our word for it. Hear directly from the businesses we've helped.
              </p>
            </div>
            <div className="mx-auto mt-16 flow-root max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none">
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2">
                {testimonials.map((testimonial, testimonialIdx) => (
                  <div key={testimonialIdx} className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-8">
                    <div className="flex items-center gap-x-6">
                      <div className="relative h-14 w-14 flex-none">
                        <Image
                          className="rounded-full object-cover"
                          src={testimonial.imageUrl}
                          alt={testimonial.author}
                          fill
                          sizes="56px"
                        />
                      </div>
                      <div>
                        <div className="text-base font-semibold leading-7 text-gray-900 dark:text-white">{testimonial.author}</div>
                        <div className="text-sm leading-6 text-purple-600 dark:text-purple-400">{testimonial.title}</div>
                      </div>
                    </div>
                    <blockquote className="mt-6 text-base italic leading-7 text-gray-700 dark:text-gray-300">
                      "{testimonial.quote}"
                    </blockquote>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA section */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Ready to build something amazing?
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-white/80">
                Let's discuss how we can help you achieve similar results for your business.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link
                  href="/contact"
                  className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-purple-600 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Contact us
                </Link>
                <Link href="/about" className="text-sm font-semibold leading-6 text-white">
                  Learn more about us <span aria-hidden="true">→</span>
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