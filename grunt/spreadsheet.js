const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const Csv = require('../lib/csv');

module.exports = grunt => {
  grunt.registerMultiTask(
    'spreadsheet',
    'Get images and links attributes from HTML documents.',
    function spreadsheet() {
      const done = this.async();

      this.filesSrc.forEach(file => {
        const filename = path.basename(file).replace('.html', '.csv');
        const data = fs.readFileSync(file, 'utf8');
        const $ = cheerio.load(data);

        const linksHolder = $('a')
          .map((idx, elem) => $(elem).attr('href'))
          .get();

        const allLinks = new Csv(linksHolder, this.data.options);
        allLinks
          .count(['href'])
          .getUtmVars('href')
          .write(`links-${filename}`);

        const imagesHolder = $('img')
          .map((idx, elem) => [[$(elem).attr('src'), $(elem).attr('alt')]])
          .get();

        const allImages = new Csv(imagesHolder, this.data.options);
        allImages
          .count(['src', 'alt'])
          .getImageSize('src')
          .write(`images-${filename}`);
      });

      done();
    }
  );

  return {
    csv: {
      src: 'dist/*.html',
      options: {
        tagsPath: '<%= paths.tags %>',
        localImagesPath: '<%= paths.distImg %>',
        liveImagesPath: '<%= paths.liveImg %>'
      }
    }
  };
};
