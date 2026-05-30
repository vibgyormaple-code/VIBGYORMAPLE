# VIBGYOR Maple - Full Stack Setup Guide

## 🚀 Complete Backend & Frontend Integration with Stripe Payments & Authentication

This guide will help you set up the complete VIBGYOR Maple application with backend integration, Stripe payments, and user authentication.

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB Atlas account (free tier available)
- Stripe account (free tier available)
- Git

## 🗄️ Database Setup

### 1. MongoDB Atlas Setup
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account
3. Create a new cluster
4. Create a database user
5. Get your connection string

### 2. Database Configuration
- Database Name: `grasshawk`
- Collections will be created automatically:
  - `users` - User accounts and authentication
  - `orders` - Order management
  - `carts` - Shopping cart data

## 💳 Stripe Setup

### 1. Stripe Account Setup
1. Go to [Stripe](https://stripe.com)
2. Create a free account
3. Get your API keys from the dashboard
4. Set up webhooks (optional for production)

### 2. Stripe Configuration
- **Test Mode**: Use test keys for development
- **Webhook Endpoint**: `http://localhost:5000/api/stripe/webhook`
- **Success URL**: `http://localhost:3000/success`
- **Cancel URL**: `http://localhost:3000/cancel`

## 🔧 Backend Setup

### 1. Navigate to Backend Directory
```bash
cd order-management-backend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env` file in the `order-management-backend` directory:

```env
# Server Configuration
NODE_ENV=development
PORT=5000
CLIENT_URL=http://localhost:3000

# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/grasshawk?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-random
JWT_EXPIRE=7d

# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# Success and Cancel URLs
SUCCESS_URL=http://localhost:3000/success
CANCEL_URL=http://localhost:3000/cancel
```

### 4. Start Backend Server
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

## 🎨 Frontend Setup

### 1. Navigate to Frontend Directory
```bash
cd frontend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Update App.js to Use New Components
Replace the current App.js with the enhanced version that includes authentication:

```javascript
// In App.js, replace the Navbar import:
import NavbarAuth from "./components/NavbarAuth";

// And wrap your app with AuthProvider:
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  // ... existing code ...
  
  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          <NavbarAuth 
            language={language} 
            setLanguage={setLanguage}
            cartCount={cartItems.reduce((a, b) => a + b.quantity, 0)}
          />
          {/* ... rest of your routes ... */}
        </div>
      </Router>
    </AuthProvider>
  );
}
```

### 4. Update Cart Route
Replace the Cart component with the backend-connected version:

```javascript
// In App.js routes:
<Route 
  path="/cart" 
  element={<CartBackend />} 
/>
```

### 5. Start Frontend Server
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## 🔐 Authentication Features

### User Registration
- Full name, email, password
- Optional phone and address
- Email validation
- Password strength requirements

### User Login
- Email and password authentication
- JWT token management
- Persistent sessions
- Secure logout

### User Profile
- View and edit profile information
- Change password
- Order history (coming soon)

## 🛒 Shopping Cart Features

### Cart Management
- Add/remove items
- Update quantities
- Persistent cart storage
- Session-based cart management

### Checkout Process
1. User adds items to cart
2. Clicks "Proceed to Checkout"
3. Redirected to Stripe checkout page
4. Completes payment
5. Redirected back to success page
6. Order saved to database

## 💰 Payment Integration

### Stripe Checkout
- Secure payment processing
- Multiple payment methods
- Real-time payment status
- Automatic order creation

### Order Management
- Complete order tracking
- Customer information storage
- Payment status monitoring
- Order history

## 🚀 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile
- `POST /api/auth/logout` - User logout

### Cart Management
- `GET /api/cart/:sessionId` - Get cart
- `POST /api/cart/:sessionId/add` - Add item
- `PUT /api/cart/:sessionId/update/:productId` - Update quantity
- `DELETE /api/cart/:sessionId/remove/:productId` - Remove item
- `DELETE /api/cart/:sessionId/clear` - Clear cart

### Stripe Integration
- `POST /api/stripe/create-checkout-session` - Create checkout
- `GET /api/stripe/session-status/:sessionId` - Check status
- `POST /api/stripe/webhook` - Handle webhooks

### Order Management
- `GET /api/orders` - Get all orders
- `POST /api/orders` - Create order
- `GET /api/orders/:id` - Get order by ID
- `PUT /api/orders/:id` - Update order
- `DELETE /api/orders/:id` - Delete order

## 🔧 Testing the Integration

### 1. Test User Registration
1. Go to `http://localhost:3000`
2. Click "Sign Up" in the navbar
3. Fill out the registration form
4. Verify user is logged in

### 2. Test Shopping Cart
1. Navigate to products page
2. Add items to cart
3. Go to cart page
4. Verify items are displayed
5. Update quantities

### 3. Test Stripe Payment
1. Go to cart with items
2. Click "Proceed to Checkout"
3. Use Stripe test card: `4242 4242 4242 4242`
4. Complete payment
5. Verify redirect to success page

### 4. Test Order Creation
1. Check backend logs for order creation
2. Verify order appears in database
3. Check order details

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Check your connection string
   - Ensure IP whitelist includes your IP
   - Verify database user credentials

2. **Stripe Payment Fails**
   - Check Stripe API keys
   - Verify webhook configuration
   - Check browser console for errors

3. **Authentication Issues**
   - Check JWT_SECRET in .env
   - Verify token expiration settings
   - Check browser localStorage

4. **CORS Errors**
   - Ensure CLIENT_URL is set correctly
   - Check backend CORS configuration
   - Verify frontend is running on correct port

### Debug Mode
Enable debug logging by setting:
```env
NODE_ENV=development
```

## 📱 Mobile Responsiveness

The application is fully responsive and includes:
- Mobile-optimized authentication modals
- Touch-friendly cart interface
- Responsive navigation
- Mobile payment flow

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token authentication
- Input validation and sanitization
- CORS protection
- Helmet security headers
- Rate limiting (can be added)

## 🚀 Production Deployment

### Backend Deployment
1. Set up production MongoDB cluster
2. Configure production Stripe keys
3. Set up environment variables
4. Deploy to Heroku/Railway/DigitalOcean

### Frontend Deployment
1. Build production bundle: `npm run build`
2. Deploy to Netlify/Vercel/GitHub Pages
3. Update API URLs for production

## 📞 Support

If you encounter any issues:
1. Check the console logs
2. Verify all environment variables
3. Ensure all dependencies are installed
4. Check network connectivity

## 🎉 Success!

Once everything is set up, you'll have:
- ✅ Full user authentication system
- ✅ Shopping cart with backend persistence
- ✅ Stripe payment integration
- ✅ Order management system
- ✅ Responsive design
- ✅ Secure data handling

Your VIBGYOR Maple application is now ready for production use!

