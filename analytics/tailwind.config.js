/** @type {import('tailwindcss').Config} */
module.exports = {
  daisyui: {
    themes: [
      {
        mytheme: {
        
"primary": "#07206b",
        
"secondary": "#e6acf9",
        
"accent": "#aedb1a",
        
"neutral": "#262b31",
        
"base-100": "#2c3159",
        
"info": "#94def5",
        
"success": "#32e28d",
        
"warning": "#f3c162",
        
"error": "#f06078",
        },
      },
    ],
  },
  darkMode: ['class', '[data-theme="sythwave"]'],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
    "./src/**/**/*.{js,ts,jsx,tsx,vue}",
    "./src/**/**/**/*.{js,ts,jsx,tsx,vue}",
  ],
  theme: {
    extend: {
      daisyui: {
        themes: ['synthwave'],
        base: true,
        darkTheme: "synthwave",

      },

    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
}

