'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, XCircle, Clock } from 'lucide-react'

interface Problem {
  statement: string
  code: string
  language: string
  correctPattern: string
  explanation: string
}

const problems: Problem[] = [
  {
    statement: 'Given an array of integers and a target value k, find the maximum sum of any k consecutive elements in the array.',
    code: `def max_sum_subarray(arr, k):
    max_sum = float('-inf')
    window_sum = 0
    
    for i in range(len(arr)):
        window_sum += arr[i]
        if i >= k - 1:
            max_sum = max(max_sum, window_sum)
            window_sum -= arr[i - k + 1]
    
    return max_sum`,
    language: 'Python',
    correctPattern: 'Sliding Window',
    explanation: 'The keyword "consecutive" combined with finding a "maximum sum" over a fixed window size is a classic sliding window indicator.',
  },
  {
    statement: 'Given a sorted array, find two numbers that add up to a target value. Return their indices.',
    code: `vector<int> twoSum(vector<int>& nums, int target) {
    int left = 0, right = nums.size() - 1;
    
    while (left < right) {
        int sum = nums[left] + nums[right];
        if (sum == target) {
            return {left, right};
        } else if (sum < target) {
            left++;
        } else {
            right--;
        }
    }
    return {};
}`,
    language: 'C++',
    correctPattern: 'Two Pointers',
    explanation: 'A sorted array with a target sum problem typically uses two pointers moving from opposite ends.',
  },
  {
    statement: 'Given n steps, find the number of distinct ways to reach the top if you can climb 1 or 2 steps at a time.',
    code: `public int climbStairs(int n) {
    if (n <= 2) return n;
    
    int[] dp = new int[n + 1];
    dp[1] = 1;
    dp[2] = 2;
    
    for (int i = 3; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    
    return dp[n];
}`,
    language: 'Java',
    correctPattern: 'Dynamic Programming',
    explanation: 'The problem asks for "number of ways" with overlapping subproblems, which is a clear DP pattern.',
  },
  {
    statement: 'Given activities with start and end times, find the maximum number of non-overlapping activities you can schedule.',
    code: `def max_activities(activities):
    activities.sort(key=lambda x: x[1])
    count = 1
    last_end = activities[0][1]
    
    for start, end in activities[1:]:
        if start >= last_end:
            count += 1
            last_end = end
    
    return count`,
    language: 'Python',
    correctPattern: 'Greedy',
    explanation: 'Optimization problems with "maximum number" and scheduling constraints often use greedy algorithms.',
  },
]

const patterns = ['Sliding Window', 'Two Pointers', 'Dynamic Programming', 'Greedy']

export default function PatternTest() {
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0)
  const [selectedPattern, setSelectedPattern] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [timerStarted, setTimerStarted] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const currentProblem = problems[currentProblemIndex]

  useEffect(() => {
    if (timerStarted && !showResult) {
      intervalRef.current = setInterval(() => {
        setTimeElapsed((prev) => prev + 0.1)
      }, 100)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [timerStarted, showResult])

  // Start timer when component mounts or problem changes
  useEffect(() => {
    setTimerStarted(true)
    setTimeElapsed(0)
    setShowResult(false)
    setSelectedPattern(null)
  }, [currentProblemIndex])

  const handlePatternSelect = (pattern: string) => {
    if (showResult) return
    
    setTimerStarted(false)
    setSelectedPattern(pattern)
    const correct = pattern === currentProblem.correctPattern
    setIsCorrect(correct)
    setShowResult(true)
  }

  const handleNext = () => {
    setSelectedPattern(null)
    setShowResult(false)
    setTimeElapsed(0)
    setCurrentProblemIndex((prev) => (prev + 1) % problems.length)
  }

  const formatTime = (seconds: number) => {
    return seconds.toFixed(1) + 's'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-3xl mx-auto"
    >
      <div className="bg-gray-900 border border-slate-800 rounded-lg p-6">
        {/* Header with Timer */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-white">Pattern Recognition Test</h3>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Clock className="w-4 h-4" />
            <span className="font-mono">{formatTime(timeElapsed)}</span>
          </div>
        </div>

        {/* Problem Statement */}
        <div className="mb-6">
          <p className="text-gray-300 text-sm leading-relaxed bg-gray-950 border border-slate-800 p-4 rounded font-mono">
            {currentProblem.statement}
          </p>
        </div>

        {/* Code Editor */}
        <div className="mb-6 bg-gray-950 border border-slate-800 rounded-lg overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2 bg-gray-900 border-b border-slate-800">
            <span className="text-xs text-gray-500 font-mono">{currentProblem.language}</span>
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
              <div className="w-2 h-2 rounded-full bg-yellow-500/50"></div>
              <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
            </div>
          </div>
          <div className="p-4 overflow-x-auto">
            <pre className="text-xs font-mono text-gray-300 leading-relaxed">
              <code>
                {currentProblem.code.split('\n').map((line, idx) => (
                  <div key={idx} className="flex">
                    <span className="text-gray-600 mr-4 select-none w-8 text-right">{idx + 1}</span>
                    <span className="flex-1">{line || ' '}</span>
                  </div>
                ))}
              </code>
            </pre>
          </div>
        </div>

        {/* Pattern Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
          {patterns.map((pattern) => {
            const isSelected = selectedPattern === pattern
            const isCorrectChoice = pattern === currentProblem.correctPattern
            const showCorrectState = showResult && isCorrectChoice

            return (
              <motion.button
                key={pattern}
                onClick={() => handlePatternSelect(pattern)}
                disabled={showResult && !isSelected && !isCorrectChoice}
                className={`
                  relative px-4 py-3 rounded-lg font-medium text-left transition-all text-sm
                  ${!showResult
                    ? 'bg-gray-800 hover:bg-gray-750 border border-slate-800 hover:border-electric-purple/50 text-white active:scale-[0.98]'
                    : isSelected && isCorrect
                    ? 'bg-emerald-green/20 border border-emerald-green text-emerald-green'
                    : isSelected && !isCorrect
                    ? 'bg-red-500/20 border border-red-500 text-red-400'
                    : showCorrectState
                    ? 'bg-emerald-green/20 border border-emerald-green text-emerald-green'
                    : 'bg-gray-800/50 border border-slate-800 text-gray-500 cursor-not-allowed'
                  }
                `}
                whileHover={!showResult ? { scale: 1.01 } : {}}
                whileTap={!showResult ? { scale: 0.98 } : {}}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs">{pattern}</span>
                  <AnimatePresence>
                    {showResult && isSelected && (
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0 }}
                      >
                        {isCorrect ? (
                          <CheckCircle2 className="w-4 h-4" />
                        ) : (
                          <XCircle className="w-4 h-4" />
                        )}
                      </motion.div>
                    )}
                    {showResult && showCorrectState && !isSelected && (
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                      >
                        <CheckCircle2 className="w-4 h-4" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.button>
            )
          })}
        </div>

        {/* Result Explanation */}
        <AnimatePresence>
          {showResult && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-4"
            >
              <div className={`
                p-3 rounded-lg border text-xs
                ${isCorrect 
                  ? 'bg-emerald-green/10 border-emerald-green/30' 
                  : 'bg-red-500/10 border-red-500/30'
                }
              `}>
                <p className={`font-mono ${isCorrect ? 'text-emerald-green' : 'text-red-400'}`}>
                  <span className="font-semibold">
                    {isCorrect ? '✓ Correct! ' : '✗ Incorrect. '}
                  </span>
                  {currentProblem.explanation}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Next Button */}
        {showResult && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={handleNext}
            className="w-full bg-electric-purple hover:bg-electric-purple/90 active:scale-[0.98] text-white font-semibold py-2.5 px-4 rounded-lg transition-colors text-sm"
            whileTap={{ scale: 0.98 }}
          >
            Try Another Problem
          </motion.button>
        )}
      </div>
    </motion.div>
  )
}
