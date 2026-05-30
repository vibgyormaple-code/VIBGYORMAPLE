# VIBGYOR Maple - Quick Setup

## 🚀 Backend Setup (Done!)

I've already set up everything in your `Backend` folder:

### ✅ What's Been Added:
- **Authentication System**: User registration, login, JWT tokens
- **Cart Management**: Add/remove items, persistent storage
- **Stripe Integration**: Payment processing with checkout
- **Database Models**: User, Cart, Order models
- **API Routes**: Complete REST API
- **Security**: Password hashing, input validation, CORS

### 📁 New Files Created:
- `Backend/models/User.js` - User authentication model
- `Backend/models/Cart.js` - Shopping cart model
- `Backend/middleware/auth.js` - Authentication middleware
- `Backend/routes/authRoutes.js` - User auth endpoints
- `Backend/routes/cartRoutes.js` - Cart management endpoints
- `Backend/routes/stripeRoutes.js` - Payment processing
- `Backend/env.example` - Environment variables template

## 🔧 Frontend Setup (Done!)

I've updated your frontend to connect to the backend:

### ✅ What's Been Updated:
- **Authentication UI**: Login/Register modals
- **Cart Integration**: Connected to backend API
- **User Management**: Profile, logout, user menu
- **Payment Flow**: Stripe checkout integration

### 📁 New Files Created:
- `frontend/src/contexts/AuthContext.js` - Authentication context
- `frontend/src/components/Login.jsx` - Login modal
- `frontend/src/components/Register.jsx` - Registration modal
- `frontend/src/components/NavbarAuth.jsx` - Enhanced navbar with auth
- `frontend/src/components/CartBackend.jsx` - Backend-connected cart
- `frontend/src/components/Login.css` - Auth styling

## 🚀 How to Run

### 1. Backend Setup
```bash
cd Backend
npm install
```

### 2. Create Environment File
Copy `Backend/env.example` to `Backend/.env` and fill in your details:
- MongoDB connection string
- Stripe API keys
- JWT secret

### 3. Start Backend
```bash
cd Backend
npm run dev
```
Backend runs on: `http://localhost:5000`

### 4. Start Frontend
```bash
cd frontend
npm start
```
Frontend runs on: `http://localhost:3000`

## 🎯 What You Can Do Now

1. **Register/Login**: Create user accounts
2. **Add to Cart**: Products are saved to database
3. **Checkout**: Stripe payment processing
4. **Order Management**: Orders saved to database
5. **User Profiles**: Update user information

## 🔑 API Endpoints

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `GET /api/cart/:sessionId` - Get cart
- `POST /api/cart/:sessionId/add` - Add to cart
- `POST /api/stripe/create-checkout-session` - Create payment

## 🎉 Ready to Use!

Your VIBGYOR Maple application now has:
- ✅ Complete user authentication
- ✅ Shopping cart with database storage
- ✅ Stripe payment processing
- ✅ Order management
- ✅ Modern, responsive UI

Just set up your environment variables and you're ready to go!

