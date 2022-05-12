const helpers = require('../helpers');
const { baseOptions } = require('../core/yargs');

function initComponent(args) {
  helpers.init.createComponentFolder(args.name, !!args.force);
  helpers.init.createModuleFile(args.name, !!args.force);
  helpers.init.createControllerFile(args.name, !!args.force);
  helpers.init.createServiceFile(args.name, !!args.force);
  helpers.init.createValidatorFile(args.name, !!args.force);
  helpers.init.createRoutesFile(args.name, !!args.force);
}

module.exports = {
  builder: (yargs) =>
    baseOptions(yargs).option('force', {
      describe: 'Will drop the existing component and re-create it',
      type: 'boolean',
      default: false
    }).argv,

  handler: async (argv) => {
    switch (argv._[0]) {
      case 'init:component':
        await initComponent(argv);
        break;
      default:
        break;
    }
    process.exit(0);
  }
};
