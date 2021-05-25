const chalk = require('chalk');

const { log } = console;

const error = (msg) => {
  log(chalk.redBright(msg));
};

const success = (msg) => {
  log(chalk.greenBright(msg));
};

const info = (msg) => {
  log(chalk.blueBright(msg));
};

module.exports = {
  info,
  error,
  success,
};
