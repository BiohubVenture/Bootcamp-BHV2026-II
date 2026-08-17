/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bio: {
          cream: '#FAF8F3',
          paper: '#F3EFE6',
          sand: '#E8E2D5',
          navy: '#003D7A',
          navyDark: '#00254D',
          navyDeep: '#07162C',
          green: '#2D9B4C',
          greenDark: '#1E5631',
          neon: '#7ACD42',
          neonHover: '#69B635',
          biogenia: '#22B878',
          igbm: '#5BB8D6',
          scale: '#6B4DD6',
          card: '#FFFFFF',
          textDark: '#1F2937',
          textMuted: '#4B5563',
          accentYellow: '#E2A036',
          accentCoral: '#E26D5C'
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        display: ['"Plus Jakarta Sans"', 'sans-serif']
      },
      backgroundImage: {
        'retro-gradient': 'linear-gradient(135deg, #003D7A 0%, #1E5631 100%)',
        'hero-sun': 'radial-gradient(circle at 70% 30%, rgba(122, 205, 66, 0.15) 0%, rgba(250, 248, 243, 0) 70%)',
        'glass-card': 'linear-gradient(180deg, rgba(255, 255, 255, 0.95) 0%, rgba(243, 239, 230, 0.8) 100%)',
        'dark-banner': 'linear-gradient(135deg, #07162C 0%, #00254D 50%, #0F3B2E 100%)'
      },
      boxShadow: {
        'retro': '0 10px 30px -10px rgba(0, 61, 122, 0.12)',
        'retro-lg': '0 20px 40px -15px rgba(0, 61, 122, 0.2)',
        'neon-glow': '0 0 20px rgba(122, 205, 66, 0.4)',
        'card-hover': '0 12px 28px -5px rgba(45, 155, 76, 0.15)'
      }
    },
  },
  plugins: [],
}
