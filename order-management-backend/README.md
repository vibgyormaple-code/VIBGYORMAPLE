# Order Management Backend

A comprehensive order management backend API built with Node.js, Express, and MongoDB Atlas. This backend provides complete CRUD operations for managing orders with advanced features like pagination, filtering, and statistics.

## 🚀 Features

- ✅ Complete CRUD operations for orders
- ✅ MongoDB Atlas integration
- ✅ Advanced filtering and pagination
- ✅ Order statistics and analytics
- ✅ Input validation and error handling
- ✅ RESTful API design
- ✅ Postman collection included
- ✅ Production-ready with security middleware

## 📋 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/orders` | Get all orders (with pagination & filtering) |
| GET | `/api/orders/:id` | Get single order by ID |
| POST | `/api/orders` | Create new order |
| PUT | `/api/orders/:id` | Update order status |
| DELETE | `/api/orders/:id` | Delete order |
| GET | `/api/orders/stats/summary` | Get order statistics |

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas
- **Security:** Helmet, CORS
- **Validation:** Express-validator
- **Logging:** Morgan
- **Environment:** dotenv

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account
- Postman (for testing APIs)

### Installation

1. **Clone the repository**
   ```bash
   cd order-management-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```

4. **Configure MongoDB Atlas**
   - Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create a database user
   - Get your connection string
   - Update `.env` file:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/order-management?retryWrites=true&w=majority
   PORT=5000
   NODE_ENV=development
   ```

5. **Start the server**
   ```bash
   # Development mode
   npm run dev

   # Production mode
   npm start
   ```

## 📊 Testing with Postman

1. **Import the collection**
   - Open Postman
   - Click "Import" → "Upload Files"
   - Select `postman-collection.json`

2. **Test the endpoints**
   - **Create Order:** POST `http://localhost:5000/api/orders`
   - **Get Orders:** GET `http://localhost:5000/api/orders`
   - **Get Order by ID:** GET `http://localhost:5000/api/orders/:id`

## 📖 API Documentation

### Create Order
```http
POST /api/orders
Content-Type: application/json

{
  "customerDetails": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+919876543210",
    "address": {
      "street": "123 Main St",
      "city": "Mumbai",
      "state": "Maharashtra",
      "zipCode": "400001",
      "country": "India"
    }
  },
  "items": [
    {
      "productId": "PROD-001",
      "productName": "Mole Trap Premium",
      "quantity": 2,
      "price": 1500,
      "total": 3000
    }
  ],
  "orderSummary": {
    "subtotal": 3000,
    "tax": 540,
    "shipping": 100,
    "total": 3640
  }
}
```

### Get Orders with Filtering
```http
GET /api/orders?page=1&limit=10&status=confirmed&email=john@example.com
```

### Update Order Status
```http
PUT /api/orders/:id
Content-Type: application/json

{
  "orderStatus": "confirmed",
  "notes": "Order confirmed and processing"
}
```

## 🔧 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB Atlas connection string | Required |
| `PORT` | Server port | 5000 |
| `NODE_ENV` | Environment mode | development |
| `CLIENT_URL` | Frontend URL for CORS | * |

## 🧪 Testing

### Run Tests
```bash
# Test API endpoints
npm test
```

### Manual Testing
1. Start the server: `npm run dev`
2. Import Postman collection
3. Test all endpoints

## 📊 Database Schema

### Order Document Structure
```javascript
{
  orderNumber: "ORD-123456789",
  customerDetails: {
    name: "John Doe",
    email: "john@example.com",
    phone: "+919876543210",
    address: { /* address object */ }
  },
  items: [/* array of items */],
  orderSummary: {
    subtotal: 3000,
    tax: 540,
    shipping: 100,
    total: 3640
  },
  orderStatus: "pending",
  createdAt: "2024-01-01T00:00:00.000Z",
  updatedAt: "2024-01-01T00:00:00.000Z"
}
```

## 🚀 Deployment

### Using Heroku
1. Install Heroku CLI
2. Create Heroku app
3. Set environment variables
4. Deploy

### Using Docker
```bash
# Build image
docker build -t order-management-backend .

# Run container
docker run -p 5000:5000 --env-file .env order-management-backend
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support, email support@yourcompany.com or create an issue in the repository.
