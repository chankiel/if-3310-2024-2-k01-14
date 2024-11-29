/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
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
        "linkin-border": "#DFDEDA",
      },
      backgroundColor: {},
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
