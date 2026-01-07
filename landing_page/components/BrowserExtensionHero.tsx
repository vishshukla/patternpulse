'use client'

import { motion } from 'framer-motion'
import { Chrome, Sparkles } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function BrowserExtensionHero() {
  const [extensionVisible, setExtensionVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setExtensionVisible(true), 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Browser Chrome */}
      <div className="bg-gray-900 border border-slate-800 rounded-t-lg overflow-hidden">
        {/* Browser Tabs */}
        <div className="flex items-center gap-2 px-4 py-2 bg-gray-950 border-b border-slate-800">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
          </div>
          <div className="flex-1 mx-4">
            <div className="bg-gray-900 border border-slate-800 rounded-md px-4 py-1.5 text-sm text-gray-400 font-mono text-xs">
              leetcode.com/problems/two-sum
            </div>
          </div>
          <Chrome className="w-4 h-4 text-gray-500" />
        </div>

        {/* LeetCode Page Content */}
        <div className="bg-white p-6 relative min-h-[400px]">
          {/* LeetCode UI Mockup */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-gray-900">Two Sum</h2>
              <div className="flex gap-2">
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded">
                  Easy
                </span>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                  Array
                </span>
                <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded">
                  Hash Table
                </span>
              </div>
            </div>
            
            <div className="prose max-w-none">
              <p className="text-gray-700 text-sm leading-relaxed">
                Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
              </p>
            </div>

            {/* Code Editor */}
            <div className="bg-gray-950 rounded-lg border border-slate-800 p-4 mt-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs text-gray-500 font-mono">Python3</span>
              </div>
              <pre className="text-xs font-mono text-gray-300">
                <code>{`def twoSum(nums, target):
    hashmap = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in hashmap:
            return [hashmap[complement], i]
        hashmap[num] = i`}</code>
              </pre>
            </div>
          </div>

          {/* PatternPulse Extension Overlay */}
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={extensionVisible ? { x: 0, opacity: 1 } : { x: '100%', opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="absolute top-4 right-4 bg-gray-950 border border-electric-purple/50 rounded-lg p-4 shadow-lg max-w-xs"
          >
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-electric-purple" />
              <span className="text-xs font-semibold text-white">PatternPulse</span>
            </div>
            <div className="space-y-2">
              <div className="text-xs text-gray-400">Tags hidden</div>
              <div className="text-xs font-mono text-electric-purple">Guess: Hash Table</div>
              <div className="text-xs text-gray-500">Confidence: 85%</div>
            </div>
          </motion.div>

          {/* Blurred Tags Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={extensionVisible ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="absolute top-6 right-6"
          >
            <div className="backdrop-blur-sm bg-gray-900/80 px-3 py-1.5 rounded border border-slate-800">
              <div className="flex gap-2">
                <div className="w-16 h-5 bg-gray-700/50 rounded blur-sm"></div>
                <div className="w-20 h-5 bg-gray-700/50 rounded blur-sm"></div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

