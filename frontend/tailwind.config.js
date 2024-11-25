/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "linkin-blue": "#0a66c2",
        "linkin-dark-blue": "#004182",
        "linkin-gray": "#6c757d",
        "linkin-lightgray": "#adb5bd",
        "linkin-green": "#4caf50",
        "linkin-darkgreen": "#218838",
        "linkin-subtleblue": "#f0f7fe",
        "linkin-subtleyellow": "#f4f2ee",
        "linkin-hoverblue": "#EBF4FD",
      },
      backgroundColor: {},
      fontFamily: {
        "custom-font": [
          "-apple-system",
          "system-ui",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          '"Helvetica Neue"',
          '"Fira Sans"',
          "Ubuntu",
          "Oxygen",
          '"Oxygen Sans"',
          "Cantarell",
          '"Droid Sans"',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Lucida Grande"',
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};
