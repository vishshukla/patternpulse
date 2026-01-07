/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#6366f1',
        'primary-hover': '#4f46e5',
        'success': '#22c55e',
        'charcoal': '#1a1a2e',
        'charcoal-dark': '#0f0f1a',
        // Keep aliases for backwards compatibility
        'electric-purple': '#6366f1',
        'emerald-green': '#22c55e',
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'Monaco', 'monospace'],
      },
    },
  },
  plugins: [],
}

