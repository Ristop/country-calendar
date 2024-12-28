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
      'black': '#000000',
      'gray': '#747b83',
      'dark-blue': '#12263f',
      'base-blue': '#28536b',
      'base-blue-hover': '#406282',
      'light-blue': '#ABC8DB',
      'light-blue-hover': '#b6d7ea',
      'light-blue-hover-2': 'rgba(182,215,234,0.35)',
      'secondary': '#dee7ef',
      'secondary-text': '#7ea8be',
      'secondary-hover': '#cfd6df',
      'danger': '#B66C6C',
      'success': '#75c17c',
      'success-text': '#393939',
      'success-hover': '#86db8d',
    },
    backgroundImage: {
      'custom-radial': 'radial-gradient(1124px 720px at 0% 0%, #dee7ef 0%, white 100%)',
      'modal-radial': 'radial-gradient(#dee7ef 0%, white 100%)',
      'navbar-default': 'linear-gradient(rgba(171, 200, 219, 0.76) 0%, rgb(255, 255, 255) 100%)',
      'navbar-trash': 'linear-gradient(rgb(239, 222, 229) 0%, rgb(255, 255, 255) 100%)',
      'navbar-trash-over': 'linear-gradient(rgb(187, 128, 128) 0%, rgb(255, 255, 255) 100%)',
    },
  },
  plugins: [],
};

