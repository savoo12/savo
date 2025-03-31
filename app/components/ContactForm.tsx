'use client';

import { useState, FormEvent, ChangeEvent } from 'react';

interface FormState {
  name: string;
  email: string;
  phone: string;
  company: string;
  budget: string;
  message: string;
  submitting: boolean;
  submitted: boolean;
  error: string | null;
}

export default function ContactForm() {
  const [formState, setFormState] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    company: '',
    budget: '',
    message: '',
    submitting: false,
    submitted: false,
    error: null,
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // In a real application, you would submit this to an API endpoint
    // For this demo, we'll just simulate a submission
    setFormState({ ...formState, submitting: true });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Form submitted:', {
        name: formState.name,
        email: formState.email,
        phone: formState.phone,
        company: formState.company,
        budget: formState.budget,
        message: formState.message,
      });
      
      setFormState({
        name: '',
        email: '',
        phone: '',
        company: '',
        budget: '',
        message: '',
        submitting: false,
        submitted: true,
        error: null,
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormState({
        ...formState,
        submitting: false,
        error: 'There was an error submitting your message. Please try again.',
      });
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };
  
  if (formState.submitted) {
    return (
      <div className="rounded-md bg-green-50 dark:bg-green-900/30 p-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-lg font-medium text-green-800 dark:text-green-300">Message sent</h3>
            <p className="mt-2 text-base text-green-700 dark:text-green-400">
              Thank you for reaching out! We'll review your project details and get back to you within 24 hours.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-gray-900 p-6 rounded-lg shadow-sm">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Request a Consultation</h3>
      
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="name"
          id="name"
          autoComplete="name"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          value={formState.name}
          onChange={handleInputChange}
          required
        />
      </div>
      
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          name="email"
          id="email"
          autoComplete="email"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          value={formState.email}
          onChange={handleInputChange}
          required
        />
      </div>
      
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Phone
        </label>
        <input
          type="tel"
          name="phone"
          id="phone"
          autoComplete="tel"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          value={formState.phone}
          onChange={handleInputChange}
        />
      </div>
      
      <div>
        <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Company
        </label>
        <input
          type="text"
          name="company"
          id="company"
          autoComplete="organization"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          value={formState.company}
          onChange={handleInputChange}
        />
      </div>
      
      <div>
        <label htmlFor="budget" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Project Budget
        </label>
        <select
          id="budget"
          name="budget"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          value={formState.budget}
          onChange={handleInputChange}
        >
          <option value="">Select a budget range</option>
          <option value="< $5,000">Less than $5,000</option>
          <option value="$5,000 - $10,000">$5,000 - $10,000</option>
          <option value="$10,000 - $25,000">$10,000 - $25,000</option>
          <option value="$25,000 - $50,000">$25,000 - $50,000</option>
          <option value="$50,000+">$50,000+</option>
        </select>
      </div>
      
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Project Details <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          placeholder="Please describe your project, goals, and timeline."
          value={formState.message}
          onChange={handleInputChange}
          required
        />
      </div>
      
      {formState.error && (
        <div className="rounded-md bg-red-50 dark:bg-red-900/30 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700 dark:text-red-400">{formState.error}</p>
            </div>
          </div>
        </div>
      )}
      
      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-75"
          disabled={formState.submitting}
        >
          {formState.submitting ? 'Sending...' : 'Send Request'}
        </button>
      </div>
    </form>
  );
} 