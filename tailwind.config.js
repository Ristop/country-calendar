/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html'
  ],
  theme: {
    colors: {
      'main-border': '#d2ddec',
      'white': '#fff',
      'gray': '#747b83',
      'dark-blue': '#12263f',
      'base-blue': '#28536b',
      'base-blue-hover': '#406282',
      'light-blue': '#ABC8DB',
      'secondary': '#dee7ef',
      'danger': '#B66C6C',
    },
    backgroundImage: {
      'custom-radial': 'radial-gradient(1124px 720px at 0% 0%, #dee7ef 0%, white 100%)',
      'navbar-default': 'linear-gradient(rgba(171, 200, 219, 0.76) 0%, rgb(255, 255, 255) 100%)',
      'navbar-trash': 'linear-gradient(rgb(239, 222, 229) 0%, rgb(255, 255, 255) 100%)',
      'navbar-trash-over': 'linear-gradient(rgb(187, 128, 128) 0%, rgb(255, 255, 255) 100%)',
    },
  },
  plugins: [],
};

