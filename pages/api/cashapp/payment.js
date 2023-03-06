import CashFreeClient from 'cashfree-sdk';

export default async (req, res) => {
  switch(req.method){
    case "POST":
      await createCashAppPayment(req, res)
      break;
  }
}


const createCashAppPayment = async (req, res) => {
  const { amount } = req.body;

  const cashfreeClient = new CashFreeClient({
    env: 'PROD',
    clientID: 'YOUR_CLIENT_ID',
    clientSecret: 'YOUR_CLIENT_SECRET',
    mode: 'PROD',
  });

  const paymentToken = await cashfreeClient.paymentToken({
    amount,
    orderId: 'ORDER_ID',
    orderCurrency: 'USD',
    orderNote: 'Order Note',
    customerName: 'Customer Name',
    customerEmail: 'customer@email.com',
    customerPhone: '1234567890',
    notifyUrl: '/api/cashapp/payment/notification',
    returnUrl: '/payment/return',
  });

  res.send({ paymentToken });
};

// router.post('/payment/notification', (req, res) => {
//   const { txStatus } = req.body;

//   // Handle payment status and update your database

//   res.send({ status: 'success' });
// });

// export default router;
