const path = require('path');
const fs = require('fs');
const getYArgs = require('../core/yargs');

const args = getYArgs().argv;

module.exports = {
  getFileName(type, name, options) {
    return this.addFileExtension([getCurrentYYYYMMDDHHmms(), name || `unnamed-${type}`].join('-'), options);
  },

  getFileExtension() {
    return 'js';
  },

  addFileExtension(basename, options) {
    return [basename, this.getFileExtension(options)].join('.');
  },

  getComponentPath(componentName) {
    return args.componentPath || path.resolve(process.cwd(), `src/components/${componentName}`);
  },

  existsSync(pathToCheck) {
    if (fs.accessSync) {
      try {
        fs.accessSync(pathToCheck, fs.R_OK);
        return true;
      } catch (e) {
        return false;
      }
    } else {
      return fs.existsSync(pathToCheck);
    }
  }
};
