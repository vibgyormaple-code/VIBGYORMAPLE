import mongoose, { Schema, Document, Model } from 'mongoose';

interface OrderItem {
  productId: string;
  name: string;
  qty: number;
  price: number;
}

interface Address {
  line1: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}

export interface IOrder extends Document {
  customerName: string;
  email: string;
  phone: string;
  address: Address;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  paymentMethod: 'razorpay' | 'stripe' | 'cod';
  paymentStatus: 'pending' | 'paid' | 'failed';
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  stripeSessionId?: string;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
  createdAt: Date;
}

const OrderSchema = new Schema<IOrder>(
  {
    customerName: { type: String, required: true },
    email: { type: String, required: true, lowercase: true },
    phone: { type: String, required: true },
    address: {
      line1: String,
      city: String,
      state: String,
      pincode: String,
      country: { type: String, default: 'Canada' },
    },
    items: [
      {
        productId: String,
        name: String,
        qty: { type: Number, min: 1 },
        price: Number,
      },
    ],
    subtotal: { type: Number, required: true },
    tax: { type: Number, required: true },
    shipping: { type: Number, default: 0 },
    total: { type: Number, required: true },
    paymentMethod: {
      type: String,
      enum: ['razorpay', 'stripe', 'cod'],
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'failed'],
      default: 'pending',
    },
    razorpayOrderId: String,
    razorpayPaymentId: String,
    stripeSessionId: String,
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'shipped', 'delivered'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

const Order: Model<IOrder> =
  mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);

export default Order;
