'use client'

import { motion } from 'framer-motion'
import { Shield, BarChart3, RotateCcw, Chrome, Sparkles, CheckCircle2 } from 'lucide-react'
import PatternTest from '@/components/PatternTest'
import ValuePropCard from '@/components/ValuePropCard'
import BrowserExtensionHero from '@/components/BrowserExtensionHero'
import BeforeAfter from '@/components/BeforeAfter'
import { useState } from 'react'

export default function Home() {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you'd send this to your backend
    console.log('Email submitted:', email)
    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
      setEmail('')
    }, 3000)
  }

  return (
    <main className="min-h-screen bg-charcoal">
      {/* Hero Section */}
      <section className="relative overflow-hidden engineering-grid">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-10 md:pt-16 md:pb-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-electric-purple/10 border border-electric-purple/30 rounded-md text-electric-purple text-xs font-medium mb-6"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Chrome Extension Beta</span>
            </motion.div>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
              Stop grinding.
              <br />
              <span className="bg-gradient-to-r from-electric-purple to-emerald-green bg-clip-text text-transparent">
                Start recognizing.
              </span>
            </h1>

            <p className="text-base md:text-lg text-gray-400 mb-8 max-w-3xl leading-relaxed">
              The skill that separates good interviewers from great ones isn't solving speed — it's pattern recognition. Train it with a Chrome extension that quizzes you on the pattern before you solve.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-start items-center mb-10">
              <motion.a
                href="#waitlist"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto px-6 py-3 bg-electric-purple hover:bg-electric-purple/90 active:scale-[0.98] text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 text-sm"
              >
                <Chrome className="w-4 h-4" />
                Add to Chrome (Beta)
              </motion.a>
              <motion.a
                href="#pattern-test"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto px-6 py-3 bg-gray-900 hover:bg-gray-800 active:scale-[0.98] border border-slate-800 text-white font-semibold rounded-lg transition-colors text-sm"
              >
                Take the Pattern Quiz
              </motion.a>
            </div>

            {/* Browser Extension Demo */}
            <div className="mt-8">
              <BrowserExtensionHero />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Before & After Section */}
      <section className="py-12 md:py-16 border-t border-slate-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              See the Difference
            </h2>
            <p className="text-gray-400 text-sm max-w-2xl mx-auto">
              Compare standard LeetCode (with spoilers) vs. PatternPulse-enhanced LeetCode (pattern training mode).
            </p>
          </motion.div>
          <BeforeAfter />
        </div>
      </section>

      {/* Pattern Test Section */}
      <section id="pattern-test" className="py-12 md:py-16 border-t border-slate-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Can You Spot the Pattern?
            </h2>
            <p className="text-gray-400 text-sm max-w-2xl mx-auto">
              Try identifying the algorithmic pattern from just the problem statement and code—no tags, no hints, just pure pattern recognition.
            </p>
          </motion.div>
          <PatternTest />
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="py-12 md:py-16 border-t border-slate-800 bg-gradient-to-b from-transparent via-gray-900/10 to-transparent">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Built for Real Learning
            </h2>
            <p className="text-gray-400 text-sm max-w-2xl mx-auto">
              PatternPulse doesn't just hide tags—it trains your intuition with analytics and spaced repetition.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <ValuePropCard
              title="The Spoiler Shield"
              description="Automatically blurs tags and difficulty on LeetCode so you don't cheat your own brain. Works seamlessly as a browser extension."
              icon={<Shield className="w-6 h-6" />}
              delay={0}
            />
            <ValuePropCard
              title="Accuracy Analytics"
              description="Track which patterns you actually understand and which ones you're just guessing. See your progress with detailed insights."
              icon={<BarChart3 className="w-6 h-6" />}
              delay={0.1}
            />
            <ValuePropCard
              title="Spaced Repetition"
              description="Surfaces problems you misidentified a week later to ensure the concept stuck. Learn once, remember forever."
              icon={<RotateCcw className="w-6 h-6" />}
              delay={0.2}
            />
          </div>
        </div>
      </section>

      {/* Pattern Preview Section */}
      <section className="py-12 md:py-16 border-t border-slate-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              15 Core Patterns
            </h2>
            <p className="text-gray-400 text-sm max-w-2xl mx-auto">
              Master these patterns and you'll cover 95% of interview questions.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 max-w-5xl mx-auto">
            {['Hash Map', 'Two Pointers', 'Sliding Window', 'Binary Search', 'BFS', 'DFS', 'Tree Traversal', 'Graph', 'Dynamic Programming', 'Backtracking', 'Greedy', 'Heap/Priority Queue', 'Stack', 'Linked List', 'Trie'].map((pattern, i) => (
              <motion.div
                key={pattern}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.03 }}
                className="px-3 py-2.5 bg-gray-900 border border-slate-800 rounded-md text-center hover:border-electric-purple/50 transition-colors"
              >
                <span className="text-xs font-medium text-gray-300">{pattern}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 md:py-16 border-t border-slate-800 bg-gradient-to-b from-transparent via-gray-900/10 to-transparent">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            <details className="group bg-gray-900 border border-slate-800 rounded-lg p-4 hover:border-slate-700 transition-colors">
              <summary className="cursor-pointer font-semibold text-white text-sm flex items-center justify-between">
                Is this free?
                <span className="text-gray-500 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-3 text-gray-400 text-sm">
                Yes, core features are free forever. We may introduce premium features for advanced analytics in the future.
              </p>
            </details>

            <details className="group bg-gray-900 border border-slate-800 rounded-lg p-4 hover:border-slate-700 transition-colors">
              <summary className="cursor-pointer font-semibold text-white text-sm flex items-center justify-between">
                What problems are covered?
                <span className="text-gray-500 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-3 text-gray-400 text-sm">
                200+ problems from Blind 75, NeetCode 150, and top LeetCode questions. We're constantly adding more.
              </p>
            </details>

            <details className="group bg-gray-900 border border-slate-800 rounded-lg p-4 hover:border-slate-700 transition-colors">
              <summary className="cursor-pointer font-semibold text-white text-sm flex items-center justify-between">
                Does it work with LeetCode Premium?
                <span className="text-gray-500 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-3 text-gray-400 text-sm">
                Yes, PatternPulse works seamlessly with both free and premium LeetCode accounts.
              </p>
            </details>

            <details className="group bg-gray-900 border border-slate-800 rounded-lg p-4 hover:border-slate-700 transition-colors">
              <summary className="cursor-pointer font-semibold text-white text-sm flex items-center justify-between">
                How does it track my progress?
                <span className="text-gray-500 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-3 text-gray-400 text-sm">
                All data is stored locally in your browser using Chrome's storage API. Your stats include accuracy by pattern, daily streaks, and weak pattern identification.
              </p>
            </details>

            <details className="group bg-gray-900 border border-slate-800 rounded-lg p-4 hover:border-slate-700 transition-colors">
              <summary className="cursor-pointer font-semibold text-white text-sm flex items-center justify-between">
                Can I disable the pattern quiz?
                <span className="text-gray-500 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-3 text-gray-400 text-sm">
                Yes, you can toggle Pattern Shield on/off anytime from the extension popup. You can also skip individual problems if you've seen them before.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* Waitlist Footer */}
      <section id="waitlist" className="py-12 md:py-16 border-t border-slate-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto text-center"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Get Early Access
            </h2>
            <p className="text-gray-400 text-sm mb-6">
              Join the beta and be among the first to install the PatternPulse Chrome extension.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-green/10 border border-emerald-green/30 rounded-md text-emerald-green text-xs font-medium mb-6">
              <span>Limited spots available</span>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-4 py-2.5 bg-gray-900 border border-slate-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-electric-purple transition-colors text-sm font-mono"
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitted}
                className="px-6 py-2.5 bg-electric-purple hover:bg-electric-purple/90 active:scale-[0.98] text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                {isSubmitted ? 'Joined!' : 'Get Early Access'}
              </motion.button>
            </form>

            <p className="text-gray-500 text-xs mt-4">
              No spam. Unsubscribe anytime.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 border-t border-slate-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left text-gray-500 text-xs">
              <p>© 2024 PatternPulse. Built for developers who want to think, not memorize.</p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-900 border border-slate-800 rounded-md">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-green" />
              <span className="text-xs text-gray-400 font-mono">Manifest V3 Compatible</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
