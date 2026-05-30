import Razorpay from 'razorpay';

if (!process.env.RAZORPAY_KEY_SECRET || !process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID) {
  console.warn('Razorpay keys are not set. Payment features will not work.');
}

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || '',
  key_secret: process.env.RAZORPAY_KEY_SECRET || '',
});

export default razorpay;
