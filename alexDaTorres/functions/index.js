const functions = require("firebase-functions");
const braintree = require("braintree");

// Usa sandbox per test, production per produzione
const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: "YOUR_MERCHANT_ID",
  publicKey: "YOUR_PUBLIC_KEY",
  privateKey: "YOUR_PRIVATE_KEY",
});

exports.generateToken = functions.https.onRequest((request, response) => {
  gateway.clientToken.generate({}, (err, res) => {
    if (err) {
      response.status(500).send(err);
    } else {
      response.send({clientToken: res.clientToken});
    }
  });
});

exports.processPayment = functions.https.onRequest((request, response) => {
  const nonceFromClient = request.body.paymentMethodNonce;
  const amount = request.body.amount;
  // L'importo da addebitare, in questo caso 0.10 €

  gateway.transaction.sale({
    amount: amount,
    paymentMethodNonce: nonceFromClient,
    options: {
      submitForSettlement: true,
    },
  }, (err, result) => {
    if (result && result.success) {
      response.send({success: true, transactionId: result.transaction.id});
    } else {
      response.status(500).send({
        success: false,
        message: err || result.message,
      });
    }
  });
});

