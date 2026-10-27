export default {content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        script: ['Caveat', 'cursive'],
      },
      colors: {
        bg: 'rgb(var(--bg) / <alpha-value>)',
        surface: 'rgb(var(--surface) / <alpha-value>)',
        'surface-2': 'rgb(var(--surface-2) / <alpha-value>)',
        ink: 'rgb(var(--ink) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        line: 'rgb(var(--line) / <alpha-value>)',
        band: 'rgb(var(--band) / <alpha-value>)',
        primary: 'rgb(var(--primary) / <alpha-value>)',
        'primary-ink': 'rgb(var(--primary-ink) / <alpha-value>)',
        violet: 'rgb(var(--violet) / <alpha-value>)',
        'violet-deep': 'rgb(var(--violet-deep) / <alpha-value>)',
        lavender: 'rgb(var(--lavender) / <alpha-value>)',
        pink: 'rgb(var(--pink) / <alpha-value>)',
        lemon: 'rgb(var(--lemon) / <alpha-value>)',
        success: 'rgb(var(--success) / <alpha-value>)',
        danger: 'rgb(var(--danger) / <alpha-value>)',
        night: '#161638',
      },
      boxShadow: {
        soft: '0 1px 2px rgb(22 22 56 / 0.04), 0 8px 24px -8px rgb(22 22 56 / 0.10)',
        lift: '0 2px 4px rgb(22 22 56 / 0.06), 0 24px 48px -16px rgb(59 91 255 / 0.28)',
      },
    },
  },
};
