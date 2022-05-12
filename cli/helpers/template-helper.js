/* eslint-disable no-param-reassign */
const _ = require('lodash');
const beautify = require('js-beautify');
const helpers = require('./index');

module.exports = {
  render(path, locals, options) {
    options = _.assign(
      {
        beautify: true,
        indent_size: 2,
        preserve_newlines: false
      },
      options || {}
    );

    const template = helpers.asset.read(path);
    let content = _.template(template)(locals || {});

    if (options.beautify) {
      content = beautify(content, options);
    }

    return content;
  }
};
