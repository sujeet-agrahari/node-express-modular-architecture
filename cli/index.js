#!/usr/bin/env node
/* eslint-disable no-unused-expressions */

const yargs = require('yargs');
const helpers = require('./helpers');
const component = require('./commands/component');

helpers.view.teaser();

yargs
  .help()
  .version()
  .command('init:component', 'Create a new component', component)
  .wrap(yargs.terminalWidth())
  .demandCommand(1, 'Please specify a command')
  .help()
  .strict()
  .recommendCommands().argv;
