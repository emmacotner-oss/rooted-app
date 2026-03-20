'use client';

import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Breadcrumbs from '../components/Breadcrumbs';
import { useApp } from '../context/AppContext';

export default function SubmitStoryPage() {
  const { showToast } = useApp();
  const [formData, setFormData] = useState({
    topic: '',
    category: '',
    description: '',
    whyMatters: '',
    name: '',
    email: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // Simulate submission (in real app, would send to API/database)
    setTimeout(() => {
      showToast('Thank you! Your topic suggestion has been submitted.', 'success');
      setFormData({
        topic: '',
        category: '',
        description: '',
        whyMatters: '',
        name: '',
        email: ''
      });
      setSubmitting(false);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header />

      {/* Hero */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-6xl mb-4 block" role="img" aria-label="Megaphone emoji">📣</span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Submit a Story</h1>
          <p className="text-xl opacity-95 max-w-2xl mx-auto">
            What's trending in your world? Suggest a topic you'd like to see explored through a biblical lens.
          </p>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Breadcrumbs />

        {/* Info Section */}
        <div className="mb-8 bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-500 rounded-lg p-6">
          <h2 className="text-lg font-bold text-purple-900 dark:text-purple-100 mb-2">
            We want to hear from you!
          </h2>
          <p className="text-purple-800 dark:text-purple-200 text-sm">
            Your perspective matters. Tell us what pop culture moments, celebrity news, trends, or conversations 
            you'd like to understand from a Christian perspective. We'll consider your suggestions for future articles.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 space-y-6">
          {/* Topic */}
          <div>
            <label htmlFor="topic" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              What's the topic or trend? <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="topic"
              name="topic"
              required
              value={formData.topic}
              onChange={handleChange}
              placeholder="e.g., Taylor Swift's new album, latest Marvel movie, trending TikTok challenge..."
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Which category best fits? <span className="text-red-500">*</span>
            </label>
            <select
              id="category"
              name="category"
              required
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="">Select a category</option>
              <option value="mental health">Mental Health</option>
              <option value="self-worth">Self-Worth</option>
              <option value="relationships">Relationships</option>
              <option value="social media">Social Media</option>
              <option value="decision-making">Decision Making</option>
              <option value="purpose">Purpose</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Tell us more <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              required
              rows={4}
              value={formData.description}
              onChange={handleChange}
              placeholder="What's happening? Who's involved? What's the conversation about?"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
            />
          </div>

          {/* Why it matters */}
          <div>
            <label htmlFor="whyMatters" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Why does this matter to you or your generation? <span className="text-red-500">*</span>
            </label>
            <textarea
              id="whyMatters"
              name="whyMatters"
              required
              rows={3}
              value={formData.whyMatters}
              onChange={handleChange}
              placeholder="How is this impacting you or people you know? What questions does it raise?"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
            />
          </div>

          {/* Optional Contact Info */}
          <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Contact Info (Optional)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="First name or nickname"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>
            <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
              We'll only use this to follow up if we need clarification. We won't share your info or spam you.
            </p>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={submitting}
              className="w-full px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:shadow-xl transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {submitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </span>
              ) : (
                'Submit Your Suggestion'
              )}
            </button>
          </div>
        </form>

        {/* Additional Info */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <span className="text-3xl mb-3 block" role="img" aria-label="Clock emoji">⏱️</span>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Review Process</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              We review all submissions and prioritize topics based on relevance, timeliness, and community interest. 
              Not every suggestion will become an article, but we read them all!
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <span className="text-3xl mb-3 block" role="img" aria-label="Community emoji">🤝</span>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Community Driven</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Rooted exists to serve you. Your suggestions help us stay relevant and create content that actually 
              matters to your generation. Thank you for being part of this community!
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
