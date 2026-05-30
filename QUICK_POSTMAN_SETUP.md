# 🚀 Quick Postman Setup - Ready to Test!

## 📥 **Import Files into Postman:**

### **1. Import Collection:**
- Open Postman
- Click **"Import"**
- Select `VIBGYOR_Maple_API.postman_collection.json`
- Collection will be imported with all API endpoints

### **2. Import Environment:**
- Click **"Import"** again
- Select `VIBGYOR_Maple_Environment.postman_environment.json`
- Environment will be imported with variables

### **3. Select Environment:**
- Click the environment dropdown (top right)
- Select **"VIBGYOR Maple Environment"**

## 🏃‍♂️ **Quick Test Steps:**

### **Step 1: Start Backend**
```bash
cd Backend
npm run dev
```
✅ Server should start on `http://localhost:4242`

### **Step 2: Test Health Check**
- Run: **"Health Check"** request
- Should return: `"VIBGYOR Maple Backend is running"`

### **Step 3: Register User**
- Run: **"Register User"** request
- ✅ Token will be automatically saved to environment
- Response should show user data and token

### **Step 4: Login User**
- Run: **"Login User"** request
- ✅ Token will be automatically saved
- Should return same user data

### **Step 5: Get User Info**
- Run: **"Get Current User"** request
- ✅ Uses saved token automatically
- Should return user profile

### **Step 6: Add Items to Cart**
- Run: **"Add Item to Cart - Mole Trap"**
- Run: **"Add Item to Cart - Grass Seed"**
- ✅ Items will be stored in cart

### **Step 7: Check Cart**
- Run: **"Get Cart"** request
- ✅ Should show both items with totals

### **Step 8: Create Checkout**
- Run: **"Create Stripe Checkout Session"**
- ✅ Should return Stripe checkout URL

## 🎯 **Expected Results:**

### **Health Check:**
```json
{
  "success": true,
  "message": "VIBGYOR Maple Backend is running"
}
```

### **Register/Login:**
```json
{
  "success": true,
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

### **Cart:**
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "productId": "mole-trap-001",
        "productName": "Professional Mole Trap",
        "quantity": 2,
        "price": 29.99
      }
    ],
    "totalItems": 2,
    "totalPrice": 59.98
  }
}
```

### **Stripe Checkout:**
```json
{
  "success": true,
  "url": "https://checkout.stripe.com/pay/cs_test_...",
  "sessionId": "cs_test_1234567890"
}
```

## 🔧 **Environment Variables:**

The collection uses these variables:
- `{{base_url}}` = `http://localhost:4242`
- `{{token}}` = Auto-saved after login/register
- `{{session_id}}` = `session123`

## 🚨 **Troubleshooting:**

### **Server Not Starting:**
- Check if port 4242 is available
- Run: `npm install` in Backend folder
- Check for any error messages

### **CORS Errors:**
- Make sure backend is running on port 4242
- Check browser console for errors

### **Token Issues:**
- Token is auto-saved after login/register
- Check if token variable is set in environment
- Make sure Authorization header includes "Bearer "

### **Cart Not Working:**
- Use same session_id for all cart operations
- Session_id can be any string (default: "session123")

## ✅ **Success Checklist:**

- [ ] Backend server running on port 4242
- [ ] Health check returns success
- [ ] User registration works
- [ ] User login works
- [ ] Token is auto-saved
- [ ] Cart items are stored
- [ ] Stripe checkout URL is generated

## 🎉 **You're Ready!**

Your API is fully functional and ready to test. The Postman collection includes:
- ✅ All authentication endpoints
- ✅ Cart management
- ✅ Stripe payment integration
- ✅ Auto-token management
- ✅ Environment variables
- ✅ Test scripts

Just import the files and start testing!

