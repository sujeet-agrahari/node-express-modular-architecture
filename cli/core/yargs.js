const fs = require('fs');
const yargs = require('yargs');

const path = require('path');

function loadRCFile(componentsPath) {
  const rcFile = componentsPath || path.resolve(process.cwd(), '.necarc');
  const rcFileResolved = path.resolve(rcFile);
  return fs.existsSync(rcFileResolved) ? JSON.parse(JSON.stringify(require(rcFileResolved))) : {};
}

const args = yargs.help(false).version(false).config(loadRCFile(yargs.argv.componentsPath));

module.exports = function getYArgs() {
  return args;
};

module.exports.baseOptions = (yargs) => {
  return yargs
    .option('name', {
      describe: 'The name of the component',
      default: 'Dummy',
      type: 'string'
    })
    .option('components-path', {
      describe: 'The path to a JSON file containing components path',
      type: 'string'
    });
};
