const cwd = process.cwd();
const path = require('path');

console.log(__dirname, cwd);

module.exports = {
  options: {
    layouts: [
      path.join(cwd, '/common/layouts/*.hbs'),
      '<%= paths.src %>/layouts/*.hbs'
    ],
    partials: ['<%= paths.src %>/partials/**/*.hbs'],
    plugins: 'grunt-assemble-contextual',
    contextual: {
      dest: './temp/'
    },
    helpers: ['./scripts/handlebars-helpers.js', './node_modules/handlebars-helpers/lib/**/*.js'],
    data: ['<%= paths.src %>/data/*.{json,yml}', 'custom-config.json'],
    flatten: true
  },
  pages: {
    src: ['<%= paths.src %>/emails/*.hbs'],
    dest: '<%= paths.dist %>/'
  }
};
