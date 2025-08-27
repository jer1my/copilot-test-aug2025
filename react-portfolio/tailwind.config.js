/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Poppins"','system-ui','sans-serif'],
        sans: ['"Inter"','system-ui','sans-serif']
      },
      colors: {
        brand: {
          50: '#f5f3ff',
          100: '#ede9fe',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9'
        }
      },
      boxShadow: {
        'soft': '0 8px 28px -8px rgba(0,0,0,0.6)',
        'glow': '0 0 0 1px rgba(139,92,246,0.4),0 4px 18px -4px rgba(139,92,246,0.5)'
      },
      keyframes: {
        blob: {
          '0%': { transform: 'translate(0px,0px) scale(1)' },
          '33%': { transform: 'translate(20px,-30px) scale(1.05)' },
            '66%': { transform: 'translate(-25px,10px) scale(.95)' },
          '100%': { transform: 'translate(0px,0px) scale(1)' }
        }
      },
      animation: {
        blob: 'blob 14s ease-in-out infinite'
      }
    }
  },
  plugins: []
};
