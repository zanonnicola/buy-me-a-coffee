// require all modules ending in "_test" from the
// current directory and all subdirectories
const testsContext = require.context('./test', true, /-test\.js$/);
testsContext.keys().forEach((path) => {
  try {
    testsContext(path);
  } catch (err) {
    console.error('[ERROR] WITH SPEC FILE: ', path);
    console.error(err);
  }
});
