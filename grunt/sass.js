const path = require('path');
const Eyeglass = require('eyeglass');

const cwd = process.cwd();

// Takes your SCSS files and compiles them to CSS
module.exports = {
  dist: {
    options: Eyeglass({
      outputStyle: 'expanded',
      includePaths: [path.join(cwd, '/node_modules/sassy-maps/sass/')]
    }),
    files: [
      {
        expand: true,
        cwd: '<%= paths.src %>/css/scss',
        src: ['*.scss'],
        dest: '<%= paths.src %>/css',
        ext: '.css'
      }
    ]
  },

  // This task compiles Sass for the browser-baed preview UI.
  // You should not need to edit it.
  preview: {
    options: {
      style: 'compressed'
    },
    files: {
      '<%= paths.preview %>/css/preview.css': '<%= paths.preview %>/scss/preview.scss'
    }
  }
};
