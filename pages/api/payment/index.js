import Stripe from "stripe";
const stripe = new Stripe('sk_test_51MiJZrDcFnOiz5snzgbVomIHEpJFWkDCuc2coOtreNcVUha1rV7sztHMJglmGhnIJlj18nSjztL3ON1sd93ac5GN00KzRuOJRr')
// const stripe = new Stripe('sk_test_51MctRTK6Bj5jFFfcGIQim5jEWleiX7n8Ay5DXb45IJHeu8QcnF7v9qnG3OtMq926buw31anappX0hlSGckjzpUgK00eAjU8KTr');

export default async (req, res) => {
  switch(req.method){
    case "POST":
      await createPayment(req, res)
      break;
  }
}

const createPayment = async (req, res) => {
  let status, error;
  const { token, amount } = req.body;
  try {
    await stripe.charges.create({
      source: token.id,
      amount,
      currency: 'usd',
    });
    status = 'success';
    console.log('success')
  } catch (error) {
    console.log(error);
    status = 'Failure';
  }
  res.json({ error, status });
};