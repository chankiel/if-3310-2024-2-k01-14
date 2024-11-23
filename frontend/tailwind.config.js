/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-bg-color': 'rgb(244, 242, 238)',
      },
      fontFamily: {
        'custom-font': [
          '-apple-system',
          'system-ui',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          '"Fira Sans"',
          'Ubuntu',
          'Oxygen',
          '"Oxygen Sans"',
          'Cantarell',
          '"Droid Sans"',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Lucida Grande"',
          'Helvetica',
          'Arial',
          'sans-serif'
        ],
      },
    },
  },
  plugins: [],
}