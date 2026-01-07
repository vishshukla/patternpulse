# PatternPulse Landing Page

A high-converting, modern landing page for PatternPulse - a developer tool that trains pattern recognition for LeetCode problems.

## Features

- 🎨 **Modern Design**: Dark mode with Bento Grid/Linear.app aesthetic
- 🎯 **Interactive Pattern Test**: Quiz widget to test pattern recognition skills
- 📱 **Fully Responsive**: Mobile-friendly design
- ✨ **Smooth Animations**: Framer Motion for elegant transitions
- 🎨 **Tailwind CSS**: Utility-first styling with custom colors

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Tech Stack

- **Next.js 14** (App Router)
- **React 18**
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion**
- **Lucide Icons**

## Project Structure

```
landing_page/
├── app/
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Main landing page
│   └── globals.css     # Global styles
├── components/
│   ├── PatternTest.tsx # Interactive pattern quiz widget
│   └── ValuePropCard.tsx # Value proposition card component
└── package.json
```

## Customization

- Colors can be adjusted in `tailwind.config.js`
- Problem statements and patterns can be modified in `components/PatternTest.tsx`
- Content can be updated in `app/page.tsx`

## Build for Production

```bash
npm run build
npm start
```

