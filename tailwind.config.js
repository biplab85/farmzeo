/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1B3252',
          50: '#E8EEF4',
          100: '#C5D0DC',
          600: '#1B3252',
          700: '#0A3A5C',
          800: '#025080',
          900: '#021B33',
        },
        secondary: {
          DEFAULT: '#0D9984',
          50: '#E6FAF7',
          100: '#B3EDE4',
          300: '#5DD4C4',
          400: '#2ABFAD',
          500: '#00A896',
          600: '#0D9984',
          700: '#087A6A',
        },
        accent: {
          DEFAULT: '#F5A623',
          50: '#FFF8E7',
          400: '#FFBE4F',
          500: '#F5A623',
          600: '#D4900E',
        },
        dark: '#021B33',
        navy: '#025080',
        teal: '#0D9984',
        body: '#4A5568',
        muted: '#94A3B8',
        light: '#F8FAFB',
      },
      fontFamily: {
        heading: ['"DM Sans"', 'sans-serif'],
        body: ['"DM Sans"', 'sans-serif'],
      },
      maxWidth: {
        '8xl': '1400px',
      },
      borderRadius: {
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '20px',
        '2xl': '24px',
      },
      boxShadow: {
        sm: '0 1px 3px rgba(2,27,51,0.04)',
        md: '0 4px 12px rgba(2,27,51,0.06)',
        lg: '0 12px 40px rgba(2,27,51,0.08)',
        xl: '0 20px 60px rgba(2,27,51,0.12)',
        glow: '0 0 40px rgba(13,153,132,0.15)',
        'glow-lg': '0 0 80px rgba(13,153,132,0.2)',
        'amber-glow': '0 0 30px rgba(245,166,35,0.3)',
      },
      animation: {
        float: 'float 4s ease-in-out infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'float-slower': 'float 8s ease-in-out infinite',
        shimmer: 'shimmer 4s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
        'spin-slow': 'spin 12s linear infinite',
        wave: 'wave 8s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        wave: {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(-20px)' },
        },
      },
    },
  },
  plugins: [],
}
