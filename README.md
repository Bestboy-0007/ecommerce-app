# E-Commerce Web Application

A full-stack e-commerce web application built with React, Tailwind CSS, Node.js, Express, and MongoDB.

## Features

### User Features
- Product listing with search and category filtering
- Product details page
- Add to cart functionality
- Cart quantity update/remove items
- Checkout process with shipping address
- User login/signup with JWT authentication
- Order history

### Admin Features (Admin Panel)
- Dashboard overview
- Add/edit/delete products (CRUD)
- Manage orders - view all orders and update order status (Pending, Processing, Shipped, Delivered, Cancelled)

## Tech Stack

### Frontend
- React 18+
- Tailwind CSS 3+
- React Router DOM 6+
- Axios for API calls

### Backend
- Node.js + Express.js
- MongoDB with Mongoose ODM
- JSON Web Token (JWT) Authentication
- bcryptjs for password hashing

## Project Structure

```
ecommerce-app/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js           # Database connection
│   │   ├── controllers/        # Request handlers
│   │   │   ├── authController.js
│   │   │   ├── productController.js
│   │   │   └── orderController.js
│   │   ├── middleware/        # Auth middleware
│   │   │   ├── auth.js
│   │   │   └── admin.js
│   │   ├── models/            # Mongoose models
│   │   │   ├── User.js
│   │   │   ├── Product.js
│   │   │   └── Order.js
│   │   ├── routes/            # API routes
│   │   │   ├── authRoutes.js
│   │   │   ├── productRoutes.js
│   │   │   └── orderRoutes.js
│   │   └── index.js          # Server entry point
│   ├── package.json
│   └── .env
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/        # React components
│   │   │   ├── Navbar.js
│   │   │   ├── ProductCard.js
│   │   │   ├── CartItem.js
│   │   │   ├── ProtectedRoute.js
│   │   │   └── AdminRoute.js
│   │   ├── context/           # React context
│   │   │   ├── AuthContext.js
│   │   │   └── CartContext.js
│   │   ├── pages/            # React pages
│   │   │   ├── Home.js
│   │   │   ├── ProductDetails.js
│   │   │   ├── Cart.js
│   │   │   ├── Checkout.js
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── OrderHistory.js
│   │   │   ├── AdminDashboard.js
│   │   │   ├── AdminProducts.js
│   │   │   └── AdminOrders.js
│   │   ├── services/
│   │   │   └── api.js         # API service
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   ├── package.json
│   ├── tailwind.config.js
│   └── postcss.config.js
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. Clone the repository
2. Install backend dependencies:
   
```
bash
   cd backend
   npm install
   
```

3. Install frontend dependencies:
   
```
bash
   cd frontend
   npm install
   
```

### Configuration

1. Create `.env` file in backend directory:
   
```
env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/ecommerce
   JWT_SECRET=your-secret-key
   
```

2. Start MongoDB locally or use MongoDB Atlas

### Running the Application

1. Start the backend server:
   
```
bash
   cd backend
   npm start
   
```
   Server will run on http://localhost:5000

2. Start the frontend development server:
   
```
bash
   cd frontend
   npm start
   
```
   Client will run on http://localhost:3000

### Creating an Admin User

1. Register a new user through the frontend
2. Manually update the user's `isAdmin` field to `true` in MongoDB

## API Endpoints

### Auth
- POST /api/auth/register - Register new user
- POST /api/auth/login - Login user
- GET /api/auth/profile - Get user profile
- PUT /api/auth/profile - Update user profile

### Products
- GET /api/products - Get all products (with search/filter)
- GET /api/products/:id - Get product by ID
- GET /api/products/categories - Get all categories
- POST /api/products - Create product (Admin)
- PUT /api/products/:id - Update product (Admin)
- DELETE /api/products/:id - Delete product (Admin)

### Orders
- POST /api/orders - Create new order
- GET /api/orders/myorders - Get user's orders
- GET /api/orders/:id - Get order by ID
- GET /api/orders - Get all orders (Admin)
- PUT /api/orders/:id/status - Update order status (Admin)
- PUT /api/orders/:id/pay - Update payment status (Admin)

## Cart Storage

Cart is stored in localStorage for persistence across sessions.

## Authentication

JWT tokens are used for authentication. Tokens are stored in localStorage and included in API request headers.

## License

MIT License
