'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface ValuePropCardProps {
  title: string
  description: string
  icon: ReactNode
  delay?: number
}

export default function ValuePropCard({ title, description, icon, delay = 0 }: ValuePropCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="bg-gray-900 border border-slate-800 rounded-lg p-6 hover:border-electric-purple/50 transition-all duration-300"
    >
      <div className="mb-3 text-electric-purple">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
    </motion.div>
  )
}
