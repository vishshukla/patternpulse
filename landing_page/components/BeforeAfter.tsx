'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { EyeOff } from 'lucide-react'

export default function BeforeAfter() {
  const [showAfter, setShowAfter] = useState(false)

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Toggle */}
      <div className="flex items-center justify-center gap-4 mb-6">
        <button
          onClick={() => setShowAfter(false)}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            !showAfter
              ? 'text-white border-b-2 border-electric-purple'
              : 'text-gray-500 hover:text-gray-300'
          }`}
        >
          The Spoiler Problem
        </button>
        <div className="w-px h-6 bg-slate-800"></div>
        <button
          onClick={() => setShowAfter(true)}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            showAfter
              ? 'text-white border-b-2 border-electric-purple'
              : 'text-gray-500 hover:text-gray-300'
          }`}
        >
          The PatternPulse Advantage
        </button>
      </div>

      {/* Content */}
      <div className="relative">
        <motion.div
          initial={false}
          animate={{ opacity: showAfter ? 0 : 1, x: showAfter ? -20 : 0 }}
          transition={{ duration: 0.3 }}
          className={`absolute inset-0 ${showAfter ? 'pointer-events-none' : ''}`}
        >
          <div className="bg-gray-900 border border-slate-800 rounded-lg overflow-hidden">
            <div className="bg-gray-950 px-4 py-2 border-b border-slate-800 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
              <span className="ml-4 text-xs text-gray-400 font-mono">leetcode.com/problems/sliding-window-maximum</span>
            </div>
            <div className="bg-white p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">Sliding Window Maximum</h3>
                <div className="flex gap-2">
                  <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs font-medium rounded">
                    Hard
                  </span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                    Sliding Window
                  </span>
                  <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded">
                    Queue
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                You are given an array of integers nums, there is a sliding window of size k which is moving from the very left of the array to the very right.
              </p>
              <div className="bg-gray-50 border border-gray-200 rounded p-3">
                <p className="text-xs text-red-600 font-medium">⚠️ Tags visible — pattern spoiled!</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={false}
          animate={{ opacity: showAfter ? 1 : 0, x: showAfter ? 0 : 20 }}
          transition={{ duration: 0.3 }}
          className={`${!showAfter ? 'pointer-events-none' : ''}`}
        >
          <div className="bg-gray-900 border border-electric-purple/50 rounded-lg overflow-hidden">
            <div className="bg-gray-950 px-4 py-2 border-b border-electric-purple/30 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
              <span className="ml-4 text-xs text-gray-400 font-mono">leetcode.com/problems/sliding-window-maximum</span>
              <div className="ml-auto flex items-center gap-2">
                <EyeOff className="w-3.5 h-3.5 text-electric-purple" />
                <span className="text-xs text-electric-purple font-medium">PatternPulse Active</span>
              </div>
            </div>
            <div className="bg-white p-6 relative">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">Sliding Window Maximum</h3>
                <div className="flex gap-2 relative">
                  {/* Blurred Tags */}
                  <div className="backdrop-blur-md bg-gray-900/60 px-3 py-1 rounded border border-slate-800">
                    <div className="flex gap-2">
                      <div className="w-20 h-5 bg-gray-700/50 rounded blur-sm"></div>
                      <div className="w-16 h-5 bg-gray-700/50 rounded blur-sm"></div>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                You are given an array of integers nums, there is a sliding window of size k which is moving from the very left of the array to the very right.
              </p>
              
              {/* PatternPulse Overlay */}
              <div className="bg-gradient-to-br from-electric-purple/10 to-emerald-green/10 border border-electric-purple/30 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-electric-purple">Your Pattern Guess</span>
                  <span className="text-xs text-gray-500">85% confidence</span>
                </div>
                <div className="font-mono text-sm text-white mb-2">Sliding Window</div>
                <p className="text-xs text-gray-400">Keywords detected: "sliding window", "size k", "moving"</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

