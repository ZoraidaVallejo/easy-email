module.exports = (grunt, options) => ({
  emails: {
    files: [
      '<%= paths.src %>/emails/*',
      '<%= paths.src %>/layouts/*',
      '<%= paths.src %>/data/*',
      '<%= paths.src %>/css/scss/**/*',
      '<%= paths.src %>/partials/**/*'
    ],
    tasks: [options.conversionType, 'stylelint']
  },

  dist: {
    files: ['./dist/*'],
    tasks: [],
    options: {
      livereload: true
    }
  },

  preview: {
    files: ['<%= paths.preview %>/scss/**/*'],
    tasks: ['sass:preview', 'autoprefixer:preview'],
    options: {
      livereload: true
    }
  }
});
