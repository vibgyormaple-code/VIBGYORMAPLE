## Quick Start Guide - Form-Based Order System

### Backend Setup

```bash
cd stripe-backend
npm install
npm start
```

### Backend Endpoints

- **Health Check**: http://localhost:4242/health
- **Submit Order**: POST http://localhost:4242/submit-order
- **Get Orders**: GET http://localhost:4242/orders
ngose c
### Frontend Integration

Use the OrderForm component to collect order data and submit to the backend.

### Quick Test

```bash
curl -X POST http://localhost:4242/submit-order \
  -H "Content-Type: application/json" \
  -d '{"customerName":"Test User","email":"test@example.com","items":[{"name":"Product 1","price":99.99,"quantity":1}]}'
```

### Frontend Component

Use the OrderForm component in your React app to collect order data and submit to the backend.

### Features

- ✅ Simple form-based order collection
- ✅ MongoDB Atlas integration
- ✅ No Stripe payment processing
- ✅ Easy to integrate with any frontend
- ✅ Health check endpoint
- ✅ Comprehensive error handling

### Ready to Use

- Backend is already running on port 4242
- Backend is connected to MongoDB Atlas
- Frontend component is ready to use
- Health check endpoint is available
- Comprehensive error handling is in place
