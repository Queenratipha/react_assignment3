# Garden Management System - React Assignment 3

A full-stack web application for managing a garden shop with separate user and admin interfaces.

## 🚀 Features

### User Features
- User registration and login
- Browse plants catalog
- Place orders
- View order history
- Responsive dashboard

### Admin Features
- Separate admin login portal
- Dashboard with statistics
- User management (view, edit, delete, change roles)
- Plant inventory management
- Order management
- Reports and analytics
- Comprehensive settings panel

## 🛠️ Tech Stack

**Frontend:**
- React 19.2.0
- React Router DOM 7.13.0
- Vite (Rolldown)
- CSS3 with animations

**Backend:**
- Node.js with Express
- MySQL database
- bcrypt for password hashing
- CORS enabled

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- MySQL Server
- npm or yarn

### Backend Setup

1. Navigate to server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Configure database in `.env` file (already created with defaults)

4. Start backend server:
```bash
npm run dev
```

Backend runs on: `http://localhost:5000`

### Frontend Setup

1. Navigate to root directory:
```bash
cd ..
```

2. Install dependencies:
```bash
npm install
```

3. Start frontend:
```bash
npm run dev
```

Frontend runs on: `http://localhost:3000`

## 🔐 Default Admin Credentials

- **Email:** admin@garden.com
- **Password:** Ant2007#

## 📱 Application Routes

### User Routes
- `/` - Home redirect
- `/login` - User login
- `/signup` - User registration
- `/landing` - Landing page (protected)
- `/dashboard` - User dashboard (protected)
- `/about` - About page (protected)
- `/contact` - Contact page (protected)

### Admin Routes
- `/admin-login` - Admin login portal
- `/admin` - Admin dashboard (protected)

## 🎨 Key Features

### Animations
- Smooth page transitions
- Animated gradient backgrounds
- Card hover effects
- Sidebar slide animations

### Security
- Protected routes
- Role-based access control
- Password hashing with bcrypt
- Session management

### Responsive Design
- Mobile-friendly interface
- Adaptive layouts
- Touch-optimized controls

## 📊 Database Schema

### Users Table
- id (Primary Key)
- name
- email (Unique)
- password_hash
- role (user/admin)
- created_at

### Plants Table
- id (Primary Key)
- name
- price
- stock
- description
- created_at

### Orders Table
- id (Primary Key)
- user_id (Foreign Key)
- plant_id (Foreign Key)
- quantity
- status
- created_at

## 🔧 API Endpoints

### Users
- `GET /api/users` - Get all users
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - User/Admin login
- `PATCH /api/users/:id` - Update user
- `PATCH /api/users/:id/role` - Change user role
- `DELETE /api/users/:id` - Delete user

### Plants
- `GET /api/plants` - Get all plants
- `POST /api/plants` - Add new plant
- `PUT /api/plants/:id` - Update plant
- `DELETE /api/plants/:id` - Delete plant

### Orders
- `GET /api/orders` - Get all orders
- `POST /api/orders` - Create order
- `PUT /api/orders/:id/status` - Update order status

## 👨‍💻 Developer

**Queen Latifa**
- Email: irakozeratipha@gmail.com
- Portfolio: https://queenlatifa-portfolio.netlify.app

## 📝 License

This project is created for educational purposes as part of React.js Assignment No 3.

## 🤝 Contributing

This is an assignment project. For any issues or suggestions, please contact the developer.

## 📞 Support

For support, email irakozeratipha@gmail.com or visit the contact page in the application.
