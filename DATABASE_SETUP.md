# 🗄️ Database Setup Guide

## 📊 **Current Data Storage:**

Your data is now stored in **MongoDB** (permanent database) instead of in-memory storage.

## 🗄️ **Where Data is Stored:**

### **MongoDB Collections:**
- **`users`** - User accounts and authentication
- **`carts`** - Shopping cart data
- **`orders`** - Order history and details

### **Database Location:**
- **MongoDB Atlas** (cloud database)
- **Connection:** `mongodb+srv://grasshawk.dxdbpyi.mongodb.net/grasshawk`

## 🔧 **Setup Instructions:**

### **1. Create .env File:**
Create a file called `.env` in the `Backend` folder:

```bash
# MongoDB Connection
MONGODB_URI=mongodb+srv://grasshawk.dxdbpyi.mongodb.net/grasshawk

# Stripe Configuration (optional)
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here

# Server Port
PORT=4242

# Environment
NODE_ENV=development
```

### **2. Install Dependencies:**
```bash
cd Backend
npm install mongoose dotenv
```

### **3. Start Server:**
```bash
npm run dev
```

## 📋 **Data Models:**

### **User Model:**
```javascript
{
  name: String,
  email: String (unique),
  password: String,
  createdAt: Date,
  updatedAt: Date
}
```

### **Cart Model:**
```javascript
{
  sessionId: String (unique),
  items: [{
    productId: String,
    name: String,
    price: Number,
    quantity: Number,
    image: String
  }],
  total: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### **Order Model:**
```javascript
{
  orderNumber: String (unique),
  sessionId: String,
  items: [CartItem],
  customerDetails: {
    name: String,
    email: String,
    address: String,
    city: String,
    postalCode: String,
    country: String
  },
  pricing: {
    subtotal: Number,
    tax: Number,
    shipping: Number,
    total: Number
  },
  payment: {
    stripeSessionId: String,
    paymentStatus: String,
    paymentDate: Date
  },
  status: String,
  createdAt: Date,
  updatedAt: Date
}
```

## ✅ **Benefits of Database Storage:**

- **Persistent Data** - Survives server restarts
- **Scalable** - Can handle multiple users
- **Backup** - Data is safely stored in cloud
- **Queryable** - Can search and filter data
- **Relationships** - Can link users to orders
- **History** - Keep order history

## 🎯 **What Happens Now:**

1. **Users** are stored in MongoDB
2. **Carts** are stored in MongoDB
3. **Orders** will be stored in MongoDB
4. **Data persists** between server restarts
5. **Multiple users** can use the system simultaneously

## 🔍 **View Your Data:**

You can view your data in:
- **MongoDB Compass** (desktop app)
- **MongoDB Atlas** (web interface)
- **Your existing connection:** `grasshawk.dxdbpyi.mongodb.net`

## 🎉 **Ready to Use:**

Your system now has a real database! All user accounts, carts, and orders will be permanently stored.
