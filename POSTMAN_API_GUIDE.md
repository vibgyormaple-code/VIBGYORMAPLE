# 🚀 Complete API Testing Guide with Postman

## 📋 **Database Setup (Optional)**

Your current backend uses **in-memory storage** (no database required), but if you want to use MongoDB:

### **MongoDB Atlas Setup:**
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create free account
3. Create new cluster
4. Get connection string
5. Add to your `.env` file:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/grasshawk
```

## 🔧 **Environment Setup**

### **1. Create .env file in Backend folder:**
```env
NODE_ENV=development
PORT=4242
CLIENT_URL=http://localhost:3000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/grasshawk
JWT_SECRET=your-super-secret-jwt-key-here
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
```

### **2. Start Backend Server:**
```bash
cd Backend
npm run dev
```
Server runs on: `http://localhost:4242`

## 📮 **Postman Collection Setup**

### **Base URL:** `http://localhost:4242`

---

## 🔐 **Authentication APIs**

### **1. Health Check**
```
GET http://localhost:4242/health
```
**Response:**
```json
{
  "success": true,
  "message": "VIBGYOR Maple Backend is running",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "environment": "development"
}
```

### **2. Register User**
```
POST http://localhost:4242/api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```
**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com"
    },
    "token": "token_1_1234567890"
  }
}
```

### **3. Login User**
```
POST http://localhost:4242/api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```
**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com"
    },
    "token": "token_1_1234567890"
  }
}
```

### **4. Get Current User**
```
GET http://localhost:4242/api/auth/me
Authorization: Bearer token_1_1234567890
```
**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
}
```

### **5. Logout User**
```
POST http://localhost:4242/api/auth/logout
Authorization: Bearer token_1_1234567890
```
**Response:**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

## 🛒 **Cart APIs**

### **6. Get Cart**
```
GET http://localhost:4242/api/cart/session123
```
**Response:**
```json
{
  "success": true,
  "data": {
    "items": [],
    "totalItems": 0,
    "totalPrice": 0
  }
}
```

### **7. Add Item to Cart**
```
POST http://localhost:4242/api/cart/session123/add
Content-Type: application/json

{
  "productId": "mole-trap-001",
  "productName": "Professional Mole Trap",
  "quantity": 2,
  "price": 29.99,
  "image": "mole-trap.jpg"
}
```
**Response:**
```json
{
  "success": true,
  "message": "Item added to cart",
  "data": {
    "items": [
      {
        "productId": "mole-trap-001",
        "productName": "Professional Mole Trap",
        "quantity": 2,
        "price": 29.99,
        "image": "mole-trap.jpg"
      }
    ],
    "totalItems": 2,
    "totalPrice": 59.98
  }
}
```

### **8. Add Another Item to Cart**
```
POST http://localhost:4242/api/cart/session123/add
Content-Type: application/json

{
  "productId": "grass-seed-001",
  "productName": "Premium Grass Seed",
  "quantity": 1,
  "price": 19.99,
  "image": "grass-seed.jpg"
}
```

---

## 💳 **Payment APIs**

### **9. Create Stripe Checkout Session**
```
POST http://localhost:4242/api/stripe/create-checkout-session
Content-Type: application/json

{
  "items": [
    {
      "productName": "Professional Mole Trap",
      "quantity": 2,
      "price": 29.99
    },
    {
      "productName": "Premium Grass Seed",
      "quantity": 1,
      "price": 19.99
    }
  ],
  "customerDetails": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "address": {
      "street": "123 Main St",
      "city": "Toronto",
      "state": "ON",
      "zipCode": "M5V 3A8",
      "country": "Canada"
    }
  }
}
```
**Response:**
```json
{
  "success": true,
  "url": "https://checkout.stripe.com/pay/cs_test_...",
  "sessionId": "cs_test_1234567890"
}
```

---

## 📱 **Postman Collection Import**

### **Create New Collection in Postman:**

1. **Open Postman**
2. **Click "Import"**
3. **Create new collection:** "VIBGYOR Maple API"
4. **Add all the requests above**

### **Environment Variables in Postman:**
Create environment with:
```
base_url: http://localhost:4242
token: (will be set after login)
session_id: session123
```

---

## 🧪 **Testing Flow:**

### **Step 1: Health Check**
- Test: `GET {{base_url}}/health`
- Should return success message

### **Step 2: Register User**
- Test: `POST {{base_url}}/api/auth/register`
- Copy the token from response
- Set `token` environment variable

### **Step 3: Login User**
- Test: `POST {{base_url}}/api/auth/login`
- Verify token is returned

### **Step 4: Get User Info**
- Test: `GET {{base_url}}/api/auth/me`
- Use Authorization: Bearer {{token}}

### **Step 5: Add Items to Cart**
- Test: `POST {{base_url}}/api/cart/{{session_id}}/add`
- Add multiple items

### **Step 6: Get Cart**
- Test: `GET {{base_url}}/api/cart/{{session_id}}`
- Verify items are stored

### **Step 7: Create Checkout**
- Test: `POST {{base_url}}/api/stripe/create-checkout-session`
- Use items from cart

---

## 🚨 **Common Issues:**

### **CORS Error:**
- Make sure backend is running on port 4242
- Check CORS settings in server.js

### **Token Error:**
- Copy exact token from login/register response
- Include "Bearer " prefix in Authorization header

### **Cart Not Found:**
- Use same session_id for all cart operations
- Session_id can be any string (e.g., "session123")

### **Stripe Error:**
- Add your Stripe secret key to .env file
- Use test keys (sk_test_...)

---

## ✅ **Success Indicators:**

- ✅ Health check returns success
- ✅ User registration returns token
- ✅ Login returns same user data
- ✅ Cart stores items correctly
- ✅ Checkout creates Stripe session
- ✅ All responses have `success: true`

Your API is ready to test! Start with the health check and work through the flow step by step.

