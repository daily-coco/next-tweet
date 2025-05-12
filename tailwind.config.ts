import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class', // 또는 'media'
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      //webFont
      fontFamily: {
        nanum: ['var(--font-nanum)', 'sans-serif'],
      },
      // custom
      primary: '#1e40af',
      secondary: '#64748b',
      danger: {
        default: '#ef4444',
        light: '#fca5a5',
        dark: '#b91c1c',
      },
    },
  },
  plugins: [],
};
export default config;
