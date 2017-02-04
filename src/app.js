/* eslint no-undef: "error" */
/* eslint-env browser */

import { install as offlineInstall } from 'offline-plugin/runtime';
import './css/normalize.css';
import './css/global.css';

function bootstrap() {
  if (!window.indexedDB) {
    console.log("Your browser doesn't support a stable version of IndexedDB. Saving your data will not be possible.");
  }
  console.log('Yolo!');
  if (process.env.NODE_ENV === 'production') {
    offlineInstall();
  }
}

/* eslint-disable */

// this is only relevant when using `hot` mode with webpack
// special thanks to Eric Clemmons: https://github.com/ericclemmons/webpack-hot-server-example
const reloading = document.readyState === 'complete'
if (module.hot) {
  module.hot.accept(function(err) {
    console.log('❌  HMR Error:', err)
  })
  if (reloading) {
    console.log('🔁  HMR Reloading.')
    bootstrap()
  } else {
    console.info('✅  HMR Enabled.')
    bootstrap()
  }
} else {
  console.info('❌  HMR Not Supported.')
  bootstrap()
}
