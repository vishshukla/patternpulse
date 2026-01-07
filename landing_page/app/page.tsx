'use client'

import { motion } from 'framer-motion'
import { BarChart3, Chrome, Sparkles, Target, Brain, Mail, CheckCircle, Loader2 } from 'lucide-react'
import { useState } from 'react'

// TODO: Replace with your actual Chrome Web Store URL after publishing
const CHROME_STORE_URL = 'https://chrome.google.com/webstore/detail/patternpulse/YOUR_EXTENSION_ID'

// Google Form configuration
const GOOGLE_FORM_ACTION = 'https://docs.google.com/forms/d/e/1FAIpQLScSMueGAnRqxrQuC9ziNgi72TlOM8uh-fSYVZS0J2SFw12q1A/formResponse'
const GOOGLE_FORM_EMAIL_ENTRY = 'entry.1669615047'

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [email, setEmail] = useState('')
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || submitStatus === 'loading') return

    setSubmitStatus('loading')

    try {
      // Submit to Google Form
      const formData = new FormData()
      formData.append(GOOGLE_FORM_EMAIL_ENTRY, email)

      await fetch(GOOGLE_FORM_ACTION, {
        method: 'POST',
        mode: 'no-cors',
        body: formData
      })

      setSubmitStatus('success')
      setEmail('')
    } catch (error) {
      setSubmitStatus('error')
    }
  }

  const faqs = [
    {
      q: 'Is this free?',
      a: 'Yes! Completely free. No credit card, no hidden fees, no premium tier.'
    },
    {
      q: 'What problems are covered?',
      a: 'LeetCode\'s first 100 problems, NeetCode 150, and LeetCode 75. We\'re continuously adding more based on feedback.'
    },
    {
      q: 'How do the AI hints work?',
      a: 'When you\'re stuck, you get progressive Socratic-style hints that guide your thinking without giving away the answer. Each problem has 3 hints that gradually point you toward the right pattern.'
    },
    {
      q: 'Will this help in real interviews?',
      a: 'That\'s exactly what it\'s for. Pattern recognition is the skill that lets you quickly identify the right approach, leaving more time for implementation.'
    },
    {
      q: 'How is my progress tracked?',
      a: 'All stats are stored locally in your browser. Your accuracy by pattern and attempt history stay private on your device.'
    }
  ]

  return (
    <main className="min-h-screen bg-charcoal-dark">
      {/* Hero Section */}
      <section className="relative overflow-hidden engineering-grid">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 md:pt-20 md:pb-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-electric-purple/10 border border-electric-purple/30 rounded-full text-electric-purple text-sm font-medium mb-6"
            >
              <Chrome className="w-4 h-4" />
              <span>Launching Soon — 100% Free</span>
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5 leading-tight">
              Train Your
              <span className="relative">
                <span className="bg-gradient-to-r from-electric-purple to-indigo-400 bg-clip-text text-transparent"> Pattern Recognition</span>
                <span className="absolute bottom-1 left-1 right-0 h-3 bg-electric-purple/20 -z-10 rounded"></span>
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed">
              Stop memorizing solutions. Learn to identify the right approach <em>before</em> you start coding — just like in real interviews.
            </p>

            {/* Email Signup Form */}
            <div className="max-w-md mx-auto mb-6">
              {submitStatus === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center justify-center gap-2 py-4 px-6 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400"
                >
                  <CheckCircle className="w-5 h-5" />
                  <span>You're on the list! We'll email you when it's live.</span>
                </motion.div>
              ) : (
                <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1 relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full pl-12 pr-4 py-4 bg-gray-900/80 border border-slate-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-electric-purple transition-colors"
                    />
                  </div>
                  <motion.button
                    type="submit"
                    disabled={submitStatus === 'loading'}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-4 bg-electric-purple hover:bg-primary-hover disabled:opacity-50 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2 whitespace-nowrap"
                  >
                    {submitStatus === 'loading' ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        <Chrome className="w-5 h-5" />
                        Get Early Access
                      </>
                    )}
                  </motion.button>
                </form>
              )}
              {submitStatus === 'error' && (
                <p className="text-red-400 text-sm mt-2 text-center">Something went wrong. Please try again.</p>
              )}
            </div>

            <p className="text-sm text-gray-500">
              <span className="text-emerald-400">100% free</span> — Supports <span className="text-gray-400">NeetCode 150</span> and <span className="text-gray-400">LeetCode 75</span> with AI-powered hints
            </p>
          </motion.div>
        </div>
      </section>

      {/* Problem Statement Section */}
      <section className="py-20 md:py-24 border-t border-slate-800 bg-gradient-to-b from-gray-900/50 to-transparent">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-14"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Why Pattern Recognition?
              </h2>
              <p className="text-gray-400 text-lg">
                The skill that separates good developers from great ones
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-gradient-to-br from-red-500/10 to-red-600/5 border border-red-500/20 rounded-2xl p-8"
              >
                <div className="text-3xl mb-3">❌</div>
                <h3 className="text-xl font-bold text-white mb-3">The Problem</h3>
                <p className="text-base text-gray-300 leading-relaxed">
                  Solving hundreds of problems doesn't teach you to quickly identify patterns during interviews. You memorize solutions, not approaches.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border border-emerald-500/20 rounded-2xl p-8"
              >
                <div className="text-3xl mb-3">✅</div>
                <h3 className="text-xl font-bold text-white mb-3">The Solution</h3>
                <p className="text-base text-gray-300 leading-relaxed">
                  Train pattern recognition as a separate skill. Identify the approach <span className="text-emerald-400 font-semibold">before</span> solving, just like in real interviews.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-20 border-t border-slate-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              How It Works
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { step: '1', title: 'Open a problem', desc: 'On LeetCode' },
              { step: '2', title: 'Guess the pattern', desc: 'Before you see hints' },
              { step: '3', title: 'Learn & improve', desc: 'Track your accuracy' }
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center py-6"
              >
                <div className="w-10 h-10 bg-electric-purple/20 text-electric-purple rounded-full flex items-center justify-center mx-auto mb-3 text-lg font-semibold">
                  {item.step}
                </div>
                <h3 className="text-base font-semibold text-white mb-1">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-20 border-t border-slate-800 bg-gradient-to-b from-gray-900/30 to-transparent">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gray-900/50 border border-slate-800 rounded-xl p-6"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-electric-purple/10 rounded-lg flex items-center justify-center text-electric-purple">
                  <Brain className="w-4 h-4" />
                </div>
                <h3 className="text-base font-semibold text-white">15 Core Patterns</h3>
              </div>
              <p className="text-sm text-gray-500">Hash Map, Two Pointers, Sliding Window, Binary Search, DP, Greedy, Backtracking, DFS, BFS, Stack, Linked List, Heap, Trie, Union Find, Topological Sort</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-gray-900/50 border border-slate-800 rounded-xl p-6"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-electric-purple/10 rounded-lg flex items-center justify-center text-electric-purple">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h3 className="text-base font-semibold text-white">AI-Powered Hints</h3>
              </div>
              <p className="text-sm text-gray-500">Stuck? Get progressive Socratic hints that guide your thinking without giving away the answer. 3 hints per problem.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-gray-900/50 border border-slate-800 rounded-xl p-6"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-electric-purple/10 rounded-lg flex items-center justify-center text-electric-purple">
                  <Target className="w-4 h-4" />
                </div>
                <h3 className="text-base font-semibold text-white">Popular Problem Lists</h3>
              </div>
              <p className="text-sm text-gray-500">NeetCode 150, LeetCode 75, and the first 100 LeetCode problems. Continuously adding more.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-gray-900/50 border border-slate-800 rounded-xl p-6"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-electric-purple/10 rounded-lg flex items-center justify-center text-electric-purple">
                  <BarChart3 className="w-4 h-4" />
                </div>
                <h3 className="text-base font-semibold text-white">Track Your Progress</h3>
              </div>
              <p className="text-sm text-gray-500">See which patterns you're strong at and which need more practice. All data stays private on your device.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-20 border-t border-slate-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              FAQ
            </h2>
          </motion.div>

          <div className="max-w-2xl mx-auto space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="bg-gray-900/50 border border-slate-800 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left px-5 py-4 focus:outline-none transition-all"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-medium text-white">{faq.q}</span>
                    <motion.span
                      animate={{ rotate: openFaq === i ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-gray-500 text-sm flex-shrink-0"
                    >
                      ▼
                    </motion.span>
                  </div>
                </button>
                <motion.div
                  initial={false}
                  animate={{
                    height: openFaq === i ? 'auto' : 0,
                    opacity: openFaq === i ? 1 : 0
                  }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-4 pt-0">
                    <p className="text-sm text-gray-500 leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Email CTA Section */}
      <section className="py-16 md:py-20 border-t border-slate-800 bg-gradient-to-b from-gray-900/30 to-transparent">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-md mx-auto text-center"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Ready to level up?
            </h2>

            <p className="text-gray-500 mb-6">
              Get notified when PatternPulse launches. It's completely free.
            </p>

            {submitStatus === 'success' ? (
              <div className="flex items-center justify-center gap-2 py-4 px-6 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400">
                <CheckCircle className="w-5 h-5" />
                <span>You're on the list!</span>
              </div>
            ) : (
              <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-4 bg-gray-900/80 border border-slate-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-electric-purple transition-colors"
                  />
                </div>
                <motion.button
                  type="submit"
                  disabled={submitStatus === 'loading'}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-4 bg-electric-purple hover:bg-primary-hover disabled:opacity-50 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  {submitStatus === 'loading' ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    'Notify Me'
                  )}
                </motion.button>
              </form>
            )}

            <p className="text-xs text-gray-600 mt-4">
              Works on any Chromium browser (Chrome, Edge, Brave, Arc)
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-slate-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-gray-600">
            <p>© {new Date().getFullYear()} PatternPulse</p>
            <span className="hidden sm:inline">•</span>
            <a
              href="https://github.com/vishshukla/patternpulse/blob/main/PRIVACY.md"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400 transition-colors"
            >
              Privacy Policy
            </a>
            <span className="hidden sm:inline">•</span>
            <a
              href="https://github.com/vishshukla/patternpulse"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400 transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </main>
  )
}
