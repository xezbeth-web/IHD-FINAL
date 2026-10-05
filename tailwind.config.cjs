/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Tonal stack (Architectural Precision design system)
        canvas: '#0c0e12',
        'canvas-alt': '#0e1017',
        surface: '#11131a',
        'surface-raised': '#161922',
        'surface-overlay': '#1c202b',
        // Content
        ink: '#f8fafc',
        'ink-body': '#c5cad3',
        'ink-secondary': '#9ca3af',
        'ink-muted': '#7d8594',
        // Signal accents — used sparingly for focus and key junctures
        signal: '#818cf8',
        'signal-strong': '#6366f1',
        'signal-deep': '#4f46e5'
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans Variable"', '"Inter Variable"', 'system-ui', 'sans-serif'],
        sans: ['"Inter Variable"', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        mono: ['"JetBrains Mono Variable"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace']
      },
      maxWidth: {
        site: '80rem'
      },
      spacing: {
        gutter: '1.5rem'
      },
      letterSpacing: {
        eyebrow: '0.22em'
      }
    }
  },
  plugins: []
};
