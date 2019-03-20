const npsUtils = require('nps-utils');

const serialize = npsUtils.series;
const quoteScript = (script, escaped) => {
  const quote = escaped ? '\\"' : '"';
  const shouldQuote = script.indexOf(' ') !== -1;
  return shouldQuote ? `${quote}${script}${quote}` : script;
};
const npsSeries = (...scriptNames) =>
  serialize(
    ...scriptNames
      .filter(Boolean)
      .map(scriptName => scriptName.trim())
      .filter(Boolean)
      .map(scriptName => `nps -c .npmscripts.js ${quoteScript(scriptName)}`)
  );

const linterTasks = npsSeries('json.format.data', 'sass.lint.strict');
const projectPath = (p = '') => `PROJECT_BASE_PATH="./${p}"`;

const eslint = 'eslint "**/*.js"';
const prettier = 'prettier --write';
const stylelint = 'stylelint --syntax scss';
const sassPatterns = [
  'common/**/*.scss',
  'preview/scss/*.scss',
  'src/scss/**/*.scss',
  '!common/partials/_mail-resets.scss'
];

module.exports = {
  scripts: {
    default: `${projectPath()} grunt`,
    js: {
      format: `${prettier} --single-quote --print-width=120 --parser=babel "**/*.js"`,
      lint: {
        default: `${eslint} || true`,
        fix: `${eslint} --fix`,
        strict: eslint
      }
    },
    sass: {
      format: `${stylelint} "${sassPatterns.join('" "')}" --fix`,
      lint: {
        default: `${stylelint} "${sassPatterns[0]}" || true`,
        strict: `${stylelint} "${sassPatterns[0]}"`
      }
    },
    json: {
      format: {
        default: `${prettier} --parser=json-stringify "**/*.json"`,
        data: `${prettier} --parser=json-stringify "src/**/*.json"`
      }
    },
    build: {
      default: serialize(linterTasks, `${projectPath()} grunt build`),
      devel: `${projectPath()} grunt devel`,
      examples: serialize(
        `${projectPath('examples/newsletter')} grunt devel`,
        `${projectPath('examples/legal-jobs')} grunt devel`
      ),
      preview: `${projectPath()} grunt buildPreview`
    },
    report: `${projectPath()} grunt report`,
    upload: `${projectPath()} grunt upload`,
    publish: serialize(linterTasks, `${projectPath()} grunt publish`),
    bump: serialize(npsSeries('js.lint.strict'), 'bilberry bump')
  }
};
