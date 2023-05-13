const path = require('path');
const fs = require('fs');
const getYArgs = require('../core/yargs');

const args = getYArgs().argv;

module.exports = {
  /**
   *
   * @param type
   * @param name
   * @param options
   */
  getFileName(type, name, options) {
    return this.addFileExtension(
      [getCurrentYYYYMMDDHHmms(), name || `unnamed-${type}`].join('-'),
      options
    );
  },

  /**
   *
   */
  getFileExtension() {
    return 'js';
  },

  /**
   *
   * @param basename
   * @param options
   */
  addFileExtension(basename, options) {
    return [basename, this.getFileExtension(options)].join('.');
  },

  /**
   *
   * @param componentName
   */
  getComponentPath(componentName) {
    return (
      args.componentPath ||
      path.resolve(process.cwd(), `src/modules/${componentName}`)
    );
  },

  /**
   *
   * @param pathToCheck
   */
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
  },
};
