import { NextRequest, NextResponse } from 'next/server';
import { sendOrderNotification, sendOrderConfirmation } from '@/lib/email';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      customerName, email, phone, address,
      items, subtotal, tax, shipping, total,
      paymentMethod, paymentStatus = 'pending',
    } = body;

    if (!customerName || !email || !phone || !address || !items?.length || !paymentMethod) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    // Generate a unique mock order ID instead of MongoDB ObjectId
    const mockOrderId = `GH-${Math.floor(100000 + Math.random() * 900000)}`;

    const order = {
      _id: mockOrderId,
      customerName,
      email,
      phone,
      address,
      items,
      subtotal,
      tax,
      shipping,
      total,
      paymentMethod,
      paymentStatus,
      status: 'confirmed',
      createdAt: new Date(),
    };

    // Push order to Parul Chemicals Pipeline CRM
    const pushToCRM = async () => {
      try {
        const formData = new FormData();
        formData.append('source_website', 'vibgyor_maple');
        formData.append('full_name', customerName);
        formData.append('email', email);
        formData.append('phone', phone);
        formData.append('company_name', 'N/A');
        
        const mainItem = items[0] || { name: 'Grasshawk KLAW Mole Trap', qty: 1, price: 0 };
        formData.append('product_name', mainItem.name);
        formData.append('quantity', mainItem.qty.toString());
        formData.append('intent', 'purchase');
        formData.append('rate_per_unit', mainItem.price.toString());
        formData.append('shipping', shipping.toString());
        
        if (address) {
          if (address.line1) formData.append('street_address', address.line1);
          if (address.city) formData.append('city', address.city);
          if (address.state) formData.append('province', address.state);
          if (address.pincode) formData.append('postal_code', address.pincode);
        }

        const rfqRes = await fetch('https://pc-sales-8phu.onrender.com/api/leads/intake/rfq', {
          method: 'POST',
          headers: {
            'X-API-Key': 'PCSALES'
          },
          body: formData
        });

        if (!rfqRes.ok) {
          console.error('Failed to push RFQ to CRM', await rfqRes.text());
        }
      } catch (error) {
        console.error('Error pushing RFQ to CRM:', error);
      }
    };

    // Await emails because Vercel Serverless Functions immediately freeze execution
    // the moment NextResponse is returned, killing non-blocking background promises.
    await Promise.all([
      sendOrderNotification({
        _id: mockOrderId,
        customerName,
        email,
        phone,
        address,
        items,
        subtotal,
        tax,
        shipping,
        total,
        paymentMethod
      }).catch(console.error),
      sendOrderConfirmation({
        _id: mockOrderId,
        customerName,
        email,
        items,
        subtotal,
        tax,
        shipping,
        total,
        paymentMethod,
        address
      }).catch(console.error),
      pushToCRM()
    ]);

    return NextResponse.json({ success: true, order }, { status: 201 });
  } catch (error) {
    console.error('POST /api/orders error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function GET() {
  // Return empty list or mock list since database is removed
  return NextResponse.json({ orders: [] });
}
