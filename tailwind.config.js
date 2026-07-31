/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        haldiYellow: {
          50: '#FEFCE8',
          100: '#FEF9C3',
          200: '#FEF08A',
          400: '#FACC15',
          500: '#F6C445',
          600: '#EAB308',
          700: '#CA8A04',
          DEFAULT: '#F6C445'
        },
        royalPurple: {
          50: '#F5F3FF',
          100: '#EDE9FE',
          200: '#DDD6FE',
          400: '#A78BFA',
          500: '#8B5CF6',
          600: '#6B3DF5',
          700: '#5227D1',
          800: '#3B18A5',
          900: '#2E1065',
          DEFAULT: '#6B3DF5'
        },
        pixelMint: '#6EE7B7',
        pixelSky: '#7DD3FC',
        pixelPink: '#F472B6',
        pixelLavender: '#D8B4FE',
        pixelCream: '#FFFDF5',
        pixelDark: '#1E1B4B'
      },
      fontFamily: {
        pixel: ['"Pixelify Sans"', '"Press Start 2P"', 'monospace'],
        body: ['"Plus Jakarta Sans"', 'sans-serif']
      }
    },
  },
  plugins: [],
}
