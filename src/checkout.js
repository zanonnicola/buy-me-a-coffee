/* global PaymentRequest */

export function initPaymentAPI(displayItems) {
  // Supported payment methods
  const networks = [
    'amex', 'diners', 'discover', 'jcb', 'mastercard', 'unionpay', 'visa', 'mir',
  ];
  const types = ['debit', 'credit', 'prepaid'];
  const supportedInstruments = [{
    supportedMethods: networks,
  }, {
    supportedMethods: ['basic-card'],
    data: { supportedNetworks: networks, supportedTypes: types },
  }];

  const options = {
    requestShipping: false,
    requestPayerEmail: true,
    requestPayerPhone: true,
    requestPayerName: true,
  };

  // Checkout details
  const details = {
    total: {
      label: 'Total due',
      amount: { currency: 'GBP', value: '1.00' },
    },
  };
  details.displayItems = displayItems;
  const total = displayItems.map(displayItem => displayItem.amount.value);
  details.total.amount.value = total.reduce((a, b) => a + b, 0);
  console.log(details);
  // 1. Create a `PaymentRequest` instance
  return new PaymentRequest(supportedInstruments, details, options);
}

export function initPaymentRequest(request) {
  if (!window.PaymentRequest) {
    // PaymentRequest API is not available. Forwarding to
    // legacy form based experience.
    console.log('PaymentRequest API is not available');
    document.getElementById('result').innerHTML = 'PaymentRequest API is not available :(';
    return;
  }
  // 2. Show the native UI with `.show()`
  request.show().then((instrumentResponse) => {
    window.setTimeout(() => {
      instrumentResponse.complete('success')
          .then(() => {
            document.getElementById('result').innerHTML = 'Thank you :)';
          })
          .catch((err) => {
            console.log(err);
          });
      instrumentResponse.complete('fail').then(() => {
        document.getElementById('result').innerHTML = 'No coffee then?  :(';
      });
    }, 2000);
  })
  .catch((err) => {
    document.getElementById('result').innerHTML = `oops! Something went wrong: ${err}`;
  });
}
