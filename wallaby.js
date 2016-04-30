const babel = require('babel-core');
const fs = require('fs');

const babelConfig = (() => {
  const file = __dirname + '/.babelrc';

  try {
    fs.accessSync(file, fs.R_OK);
  } catch (error) {
    return {babel};
  }

  try {
    const config = JSON.parse(fs.readFileSync(file));
    config.babel = babel;
    return config;
  } catch (error) {
    throw error;
  }
})();

module.exports = wallaby => {
  return {
    files: [
      'src/**/*.js*',
      'test/setup.js'
    ],

    tests: [
      'test/**/*spec.js'
    ],

    compilers: {
      '**/*.js*': wallaby.compilers.babel(babelConfig),
    },

    env: {
      type: 'node',
      runner: 'node'
    },

    testFramework: 'mocha',

    bootstrap: function bootstrap() {
      require.extensions['.jsx'] = require.extensions['.js'];
      require('./test/setup.js');
    }
  };
};
