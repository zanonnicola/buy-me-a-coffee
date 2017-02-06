/* eslint no-undef: "error" */
/* eslint-env browser */

import { install as offlineInstall } from 'offline-plugin/runtime';
import './css/normalize.css';
import './css/global.css';
import { initPaymentAPI, initPaymentRequest } from './checkout';

function bootstrap() {
  const buyBtn = document.querySelector('#buy');
  const quantity = document.querySelector('#quantity');
  const cartTotal = document.querySelector('#total');
  const order = document.querySelector('#order');
  let counter = 0;
  const price = 2.10;
  let total;
  const displayItems = [
    {
      label: 'Coffee Mug',
      amount: { currency: 'GBP', value: price },
    },
  ];
  buyBtn.addEventListener('click', (evt) => {
    evt.preventDefault();
    counter += 1;
    quantity.innerHTML = counter;
    total = (price * counter).toFixed(2);
    cartTotal.innerHTML = total;
  });
  order.addEventListener('click', (evt) => {
    evt.preventDefault();
    const request = initPaymentAPI(displayItems);
    initPaymentRequest(request);
  });
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
