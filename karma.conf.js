process.env.BABEL_ENV = 'test';
const webpackEnv = { test: true };
const webpackConfig = require('./webpack.config.babel')(webpackEnv);

module.exports = (config) => {
  config.set({
    browsers: process.env.TRAVIS ? ['Chrome_travis_ci'] : ['Chrome'], // run in Chrome
    singleRun: true, // just run once by default
    frameworks: ['mocha', 'chai'], // use the mocha test framework
    files: [
      'tests.webpack.js', // just load this file
    ],
    preprocessors: {
      'tests.webpack.js': ['webpack', 'sourcemap'], // preprocess with webpack and our sourcemap loader
    },
    reporters: ['progress', 'coverage', 'coveralls'],
    coverageReporter: {
      check: {
        global: {
          statements: 11,
          branches: 0,
          functions: 0,
          lines: 11,
        },
      },
      reporters: [
        { type: 'lcov', dir: 'coverage/', subdir: '.' },
        { type: 'json', dir: 'coverage/', subdir: '.' },
        { type: 'text-summary' },
      ],
    },
    customLaunchers: {
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox'],
      },
    },
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true,
      stats: 'errors-only',
    },
    colors: true,
    concurrency: Infinity,
    logLevel: config.LOG_DEBUG,
  });
};
