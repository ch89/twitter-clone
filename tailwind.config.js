module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: [
    './public/**/*.html',
    './src/**/*.vue'
  ],
  theme: {
    extend: {
      colors: {
        blue: '#1DA1F2',
        'dark-blue': '#2795D9',
        'light-blue': '#EFF9FF',
        dark: '#657786'
      },
      borderRadius: {
        xl: "1rem"
      }
    },
  },
  variants: {},
  plugins: [],
}
