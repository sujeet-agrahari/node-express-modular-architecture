const fs = require('fs-extra');
const path = require('path');

const assets = {
  /**
   *
   * @param from
   * @param to
   */
  copy: (from, to) => {
    fs.copySync(path.resolve(__dirname, '..', 'assets', from), to);
  },

  /**
   *
   * @param assetPath
   */
  read: (assetPath) => {
    return fs
      .readFileSync(path.resolve(__dirname, '..', 'assets', assetPath))
      .toString();
  },

  /**
   *
   * @param targetPath
   * @param content
   */
  write: (targetPath, content) => {
    fs.writeFileSync(targetPath, content);
  },

  /**
   *
   * @param filePath
   * @param token
   * @param content
   */
  inject: (filePath, token, content) => {
    const fileContent = fs.readFileSync(filePath).toString();
    fs.writeFileSync(filePath, fileContent.replace(token, content));
  },

  /**
   *
   * @param filePath
   * @param configPath
   */
  injectConfigFilePath: (filePath, configPath) => {
    this.inject(filePath, '__CONFIG_FILE__', configPath);
  },

  /**
   *
   * @param pathToCreate
   */
  mkdirp: (pathToCreate) => {
    fs.mkdirpSync(pathToCreate);
  },
};

module.exports = assets;
