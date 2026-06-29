import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // Use STARTTLS (port 587) instead of SSL (port 465) which is sometimes blocked by Vercel
  auth: {
    user: process.env.GMAIL_USER,
    pass: (process.env.GMAIL_APP_PASSWORD || '').replace(/\s+/g, ''), // Strip spaces from the app password
  },
});

const BUSINESS_EMAIL = process.env.BUSINESS_EMAIL || 'contact.grasshawk@gmail.com';

// ─── Lead Notification ────────────────────────────────────────────────────────
export async function sendLeadNotification(lead: {
  name: string;
  companyName?: string;
  email: string;
  phone: string;
  message: string;
  inquiryType: string;
}) {
  await transporter.sendMail({
    from: `"Grasshawk KLAW" <${process.env.GMAIL_USER}>`,
    to: BUSINESS_EMAIL,
    subject: `New Lead: ${lead.inquiryType} from ${lead.name}`,
    html: `
      <div style="font-family:Inter,sans-serif;max-width:600px;margin:auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #eee;">
        <div style="background:#C8102E;padding:24px;text-align:center;">
          <h1 style="color:#fff;margin:0;font-size:24px;">Grasshawk KLAW — New Lead</h1>
        </div>
        <div style="padding:32px;">
          <table width="100%" cellpadding="8" style="border-collapse:collapse;">
            <tr><td style="font-weight:600;color:#555;width:40%;">Name</td><td>${lead.name}</td></tr>
            <tr style="background:#f8f8f8;"><td style="font-weight:600;color:#555;">Company</td><td>${lead.companyName || '—'}</td></tr>
            <tr><td style="font-weight:600;color:#555;">Email</td><td><a href="mailto:${lead.email}">${lead.email}</a></td></tr>
            <tr style="background:#f8f8f8;"><td style="font-weight:600;color:#555;">Phone</td><td>${lead.phone}</td></tr>
            <tr><td style="font-weight:600;color:#555;">Inquiry Type</td><td style="text-transform:capitalize;">${lead.inquiryType.replace('_',' ')}</td></tr>
            <tr style="background:#f8f8f8;"><td style="font-weight:600;color:#555;vertical-align:top;">Message</td><td>${lead.message}</td></tr>
          </table>
        </div>
        <div style="background:#1a1a1a;padding:16px;text-align:center;color:#aaa;font-size:12px;">
          VIBGYOR Maple Inc. · contact.grasshawk@gmail.com · +1 639 590 9729
        </div>
      </div>`,
  });
}

// ─── OTP Email ────────────────────────────────────────────────────────────────
export async function sendOTPEmail(email: string, otp: string) {
  await transporter.sendMail({
    from: `"Grasshawk KLAW" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: `Your Grasshawk verification code: ${otp}`,
    html: `
      <div style="font-family:Inter,sans-serif;max-width:480px;margin:auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #eee;">
        <div style="background:#C8102E;padding:24px;text-align:center;">
          <h1 style="color:#fff;margin:0;font-size:22px;">Verify Your Email</h1>
        </div>
        <div style="padding:40px;text-align:center;">
          <p style="color:#555;margin-bottom:32px;">Your one-time password for Grasshawk KLAW checkout:</p>
          <div style="background:#f8f8f8;border:2px dashed #C8102E;border-radius:12px;padding:24px;display:inline-block;">
            <span style="font-size:48px;font-weight:800;letter-spacing:12px;color:#1a1a1a;">${otp}</span>
          </div>
          <p style="color:#999;margin-top:24px;font-size:14px;">This code expires in <strong>10 minutes</strong>. Do not share it with anyone.</p>
        </div>
        <div style="background:#1a1a1a;padding:16px;text-align:center;color:#aaa;font-size:12px;">
          VIBGYOR Maple Inc. · contact.grasshawk@gmail.com
        </div>
      </div>`,
  });
}

// ─── Order Notification (to business) ────────────────────────────────────────
export async function sendOrderNotification(order: {
  _id: string;
  customerName: string;
  email: string;
  phone: string;
  address: { line1: string; city: string; state: string; pincode: string; country: string };
  items: { name: string; qty: number; price: number }[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  paymentMethod: string;
}) {
  const itemRows = order.items
    .map(i => `<tr><td style="padding:8px">${i.name}</td><td style="padding:8px;text-align:center;">${i.qty}</td><td style="padding:8px;text-align:right;">$${(i.price * i.qty).toFixed(2)}</td></tr>`)
    .join('');

  await transporter.sendMail({
    from: `"Grasshawk KLAW" <${process.env.GMAIL_USER}>`,
    to: BUSINESS_EMAIL,
    subject: `New Order #${order._id} — $${order.total.toFixed(2)} CAD`,
    html: `
      <div style="font-family:Inter,sans-serif;max-width:600px;margin:auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #eee;">
        <div style="background:#C8102E;padding:24px;text-align:center;">
          <h1 style="color:#fff;margin:0;font-size:22px;">New Order Received</h1>
          <p style="color:#ffd0d0;margin:4px 0 0;">Order #${order._id}</p>
        </div>
        <div style="padding:32px;">
          <h3 style="color:#1a1a1a;margin-bottom:8px;">Customer Details</h3>
          <p><strong>${order.customerName}</strong> · ${order.email} · ${order.phone}</p>
          <p>${order.address.line1}, ${order.address.city}, ${order.address.state} ${order.address.pincode}, ${order.address.country}</p>
          <h3 style="color:#1a1a1a;margin-top:24px;">Items</h3>
          <table width="100%" style="border-collapse:collapse;border:1px solid #eee;">
            <thead><tr style="background:#f8f8f8;"><th style="padding:8px;text-align:left;">Item</th><th style="padding:8px;">Qty</th><th style="padding:8px;text-align:right;">Amount</th></tr></thead>
            <tbody>${itemRows}</tbody>
            <tfoot>
              <tr><td colspan="2" style="padding:8px;text-align:right;color:#555;">Subtotal</td><td style="padding:8px;text-align:right;">$${order.subtotal.toFixed(2)}</td></tr>
              <tr><td colspan="2" style="padding:8px;text-align:right;color:#555;">Tax (HST 13%)</td><td style="padding:8px;text-align:right;">$${order.tax.toFixed(2)}</td></tr>
              <tr><td colspan="2" style="padding:8px;text-align:right;color:#555;">Shipping</td><td style="padding:8px;text-align:right;">$${order.shipping === 0 ? 'FREE' : order.shipping.toFixed(2)}</td></tr>
              <tr style="background:#C8102E;color:#fff;font-weight:700;"><td colspan="2" style="padding:10px;text-align:right;">Total</td><td style="padding:10px;text-align:right;">$${order.total.toFixed(2)} CAD</td></tr>
            </tfoot>
          </table>
          <p style="margin-top:16px;color:#555;">Payment Method: <strong style="text-transform:uppercase;">${order.paymentMethod}</strong></p>
        </div>
      </div>`,
  });
}

// ─── Order Confirmation (to customer) ────────────────────────────────────────
export async function sendOrderConfirmation(order: {
  _id: string;
  customerName: string;
  email: string;
  items: { name: string; qty: number; price: number }[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  paymentMethod: string;
  address: { line1: string; city: string; state: string; pincode: string; country: string };
}) {
  const itemRows = order.items
    .map(i => `<tr><td style="padding:8px">${i.name}</td><td style="padding:8px;text-align:center;">${i.qty}</td><td style="padding:8px;text-align:right;">$${(i.price * i.qty).toFixed(2)}</td></tr>`)
    .join('');

  await transporter.sendMail({
    from: `"Grasshawk KLAW" <${process.env.GMAIL_USER}>`,
    to: order.email,
    subject: `Your Grasshawk KLAW Order Confirmation #${order._id}`,
    html: `
      <div style="font-family:Inter,sans-serif;max-width:600px;margin:auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #eee;">
        <div style="background:#C8102E;padding:32px;text-align:center;">
          <h1 style="color:#fff;margin:0;font-size:26px;">Thank You, ${order.customerName}!</h1>
          <p style="color:#ffd0d0;margin:8px 0 0;font-size:16px;">Your order has been confirmed.</p>
        </div>
        <div style="padding:32px;">
          <p style="color:#555;">Order ID: <strong>#${order._id}</strong></p>
          <p style="color:#555;">Delivery to: ${order.address.line1}, ${order.address.city}, ${order.address.state} ${order.address.pincode}, ${order.address.country}</p>
          <table width="100%" style="border-collapse:collapse;border:1px solid #eee;margin-top:16px;">
            <thead><tr style="background:#f8f8f8;"><th style="padding:8px;text-align:left;">Product</th><th style="padding:8px;">Qty</th><th style="padding:8px;text-align:right;">Amount</th></tr></thead>
            <tbody>${itemRows}</tbody>
            <tfoot>
              <tr><td colspan="2" style="padding:8px;text-align:right;color:#555;">Subtotal</td><td style="padding:8px;text-align:right;">$${order.subtotal.toFixed(2)}</td></tr>
              <tr><td colspan="2" style="padding:8px;text-align:right;color:#555;">Tax (HST 13%)</td><td style="padding:8px;text-align:right;">$${order.tax.toFixed(2)}</td></tr>
              <tr><td colspan="2" style="padding:8px;text-align:right;color:#555;">Shipping</td><td style="padding:8px;text-align:right;">${order.shipping === 0 ? 'FREE' : '$' + order.shipping.toFixed(2)}</td></tr>
              <tr style="background:#C8102E;color:#fff;font-weight:700;"><td colspan="2" style="padding:10px;text-align:right;">Total</td><td style="padding:10px;text-align:right;">$${order.total.toFixed(2)} CAD</td></tr>
            </tfoot>
          </table>
          <div style="background:#f0fff0;border:1px solid #00aa44;border-radius:8px;padding:16px;margin-top:24px;">
            <p style="margin:0;color:#006622;">&#10003; We'll notify you when your order ships. For questions, email <a href="mailto:support.grasshawk@vibgormaple.com">support.grasshawk@vibgormaple.com</a></p>
          </div>
        </div>
        <div style="background:#1a1a1a;padding:16px;text-align:center;color:#aaa;font-size:12px;">
          VIBGYOR Maple Inc. · AB, Canada · +1 639 590 9729
        </div>
      </div>`,
  });
}
