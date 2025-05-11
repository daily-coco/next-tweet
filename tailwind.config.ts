import type { Config } from 'tailwindcss';

const config: Config = {
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
