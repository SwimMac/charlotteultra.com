module.exports = {
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1rem',
        lg: '2rem'
      },
    },
    extend: {
      colors: {
        'primary': {
          DEFAULT: '#F97900',
          'dark': '#d66800'
        },
        'secondary': {
          DEFAULT: '#003756'
        }
      }
    },
  },
  variants: {},
  plugins: [
    require('@tailwindcss/forms')
  ],
  purge: process.env.NODE_ENV === 'production' ? {
    enabled: true,
    content: ['src/**/*.njk', 'src/**/*.js', '.eleventy.js'],
  } : {}
}