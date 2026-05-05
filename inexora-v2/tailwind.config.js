module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        violet: {
          DEFAULT: '#8A3FFC',
        },
        cyan: {
          DEFAULT: '#00BFFF',
        },
      },
      animation: {
        glow: 'glow 1.5s infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { textShadow: '0 0 5px rgba(138, 63, 252, 0.7), 0 0 10px rgba(138, 63, 252, 0.7), 0 0 15px rgba(138, 63, 252, 0.7)' },
          '100%': { textShadow: '0 0 10px rgba(138, 63, 252, 1), 0 0 20px rgba(138, 63, 252, 1), 0 0 30px rgba(138, 63, 252, 1)' },
        },
      },
    },
  },
  plugins: [],
};