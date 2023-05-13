const fs = require('fs');
const path = require('path');
const helpers = require('./index');

/**
 *
 * @param folderName
 * @param folder
 * @param force
 */
function createFolder(folderName, folder, force) {
  if (force && fs.existsSync(folder) === true) {
    helpers.view.log(`Deleting the ${folderName} folder. (--force)`);

    try {
      fs.readdirSync(folder).forEach((filename) => {
        fs.unlinkSync(path.resolve(folder, filename));
      });
    } catch (e) {
      helpers.view.error(e);
    }

    try {
      fs.rmdirSync(folder);
      helpers.view.log(`Successfully deleted the ${folderName} folder.`);
    } catch (e) {
      helpers.view.error(e);
    }
  }

  try {
    if (fs.existsSync(folder) === false) {
      helpers.asset.mkdirp(folder);
      helpers.view.log(
        `Successfully created ${folderName} folder at "${folder}".`
      );
    } else {
      helpers.view.log(`${folderName} folder at "${folder}" already exists.`);
    }
  } catch (e) {
    helpers.view.error(e);
  }
}

const init = {
  /**
   *
   * @param componentName
   * @param force
   */
  createComponentFolder: (componentName, force) => {
    createFolder(
      componentName,
      helpers.path.getComponentPath(componentName),
      force
    );
  },
  /**
   *
   * @param componentName
   * @param force
   */
  createModuleFile: (componentName, force) => {
    const modulePath = helpers.path.getComponentPath(componentName);
    const moduleFilePath = path.resolve(
      modulePath,
      helpers.path.addFileExtension(`${componentName.toLowerCase()}.module`)
    );

    if (!helpers.path.existsSync(modulePath)) {
      helpers.view.log('Models folder not available.');
    } else if (helpers.path.existsSync(moduleFilePath) && !force) {
      helpers.view.notifyAboutExistingFile(moduleFilePath);
    } else {
      helpers.asset.write(
        moduleFilePath,
        helpers.template.render(
          'module.js',
          {
            name: componentName,
            nameLower: componentName.toLowerCase(),
          },
          {
            beautify: false,
          }
        )
      );
    }
  },
  /**
   *
   * @param componentName
   * @param force
   */
  createControllerFile: (componentName, force) => {
    const modulePath = helpers.path.getComponentPath(componentName);
    const moduleFilePath = path.resolve(
      modulePath,
      helpers.path.addFileExtension(`${componentName.toLowerCase()}.controller`)
    );

    if (!helpers.path.existsSync(modulePath)) {
      helpers.view.log('Models folder not available.');
    } else if (helpers.path.existsSync(moduleFilePath) && !force) {
      helpers.view.notifyAboutExistingFile(moduleFilePath);
    } else {
      helpers.asset.write(
        moduleFilePath,
        helpers.template.render(
          'controller.js',
          {
            name: componentName,
            nameLower: componentName.toLowerCase(),
          },
          {
            beautify: false,
          }
        )
      );
    }
  },
  /**
   *
   * @param componentName
   * @param force
   */
  createServiceFile: (componentName, force) => {
    const modulePath = helpers.path.getComponentPath(componentName);
    const moduleFilePath = path.resolve(
      modulePath,
      helpers.path.addFileExtension(`${componentName.toLowerCase()}.service`)
    );

    if (!helpers.path.existsSync(modulePath)) {
      helpers.view.log('Models folder not available.');
    } else if (helpers.path.existsSync(moduleFilePath) && !force) {
      helpers.view.notifyAboutExistingFile(moduleFilePath);
    } else {
      helpers.asset.write(
        moduleFilePath,
        helpers.template.render(
          'service.js',
          {
            name: componentName,
            nameLower: componentName.toLowerCase(),
          },
          {
            beautify: false,
          }
        )
      );
    }
  },
  /**
   *
   * @param componentName
   * @param force
   */
  createRoutesFile: (componentName, force) => {
    const modulePath = helpers.path.getComponentPath(componentName);
    const moduleFilePath = path.resolve(
      modulePath,
      helpers.path.addFileExtension(`${componentName.toLowerCase()}.routes`)
    );

    if (!helpers.path.existsSync(modulePath)) {
      helpers.view.log('Models folder not available.');
    } else if (helpers.path.existsSync(moduleFilePath) && !force) {
      helpers.view.notifyAboutExistingFile(moduleFilePath);
    } else {
      helpers.asset.write(
        moduleFilePath,
        helpers.template.render(
          'routes.js',
          {
            name: componentName,
            nameLower: componentName.toLowerCase(),
          },
          {
            beautify: false,
          }
        )
      );
    }
  },
  /**
   *
   * @param componentName
   * @param force
   */
  createValidatorFile: (componentName, force) => {
    const modulePath = helpers.path.getComponentPath(componentName);
    const moduleFilePath = path.resolve(
      modulePath,
      helpers.path.addFileExtension(`${componentName.toLowerCase()}.validator`)
    );

    if (!helpers.path.existsSync(modulePath)) {
      helpers.view.log('Models folder not available.');
    } else if (helpers.path.existsSync(moduleFilePath) && !force) {
      helpers.view.notifyAboutExistingFile(moduleFilePath);
    } else {
      helpers.asset.write(
        moduleFilePath,
        helpers.template.render(
          'validator.js',
          {
            name: componentName,
            nameLower: componentName.toLowerCase(),
          },
          {
            beautify: false,
          }
        )
      );
    }
  },
};

module.exports = init;
module.exports.default = init;
