/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui'
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  daisyui: {
    themes: ['dim', 'light'],
  },
  theme: {
    extend: {
      screens: {
        xs: '470px',
      },
    },
  },
  plugins: [daisyui],
}
