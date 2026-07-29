# 🍔 QuickBite – Full Stack Food Ordering Platform

QuickBite is a full-stack food ordering web application inspired by modern food delivery platforms like Swiggy. It provides a seamless experience for customers to browse food items, manage their cart and wishlist, place orders, and track order history. An integrated admin panel enables efficient food and order management.

---

## 🚀 Features

### 👤 Customer Module
- User Registration & Login (JWT Authentication)
- Browse Food Menu
- Search Food Items
- Add to Cart
- Update Cart Quantity
- Wishlist Management
- Address Management
- Secure Checkout
- Place Orders
- View Order History
- Cancel Orders

### 🛠️ Admin Module
- Admin Login
- Dashboard with Statistics
- Add New Food Items
- Update Food Details
- Delete Food Items
- Manage Customer Orders
- Update Order Status

---

## 💻 Technologies Used

### Frontend
- React.js
- React Router
- Bootstrap 5
- Axios
- CSS3

### Backend
- Node.js
- Express.js
- JWT Authentication
- Bcrypt.js

### Database
- MySQL

### Tools
- Visual Studio Code
- Git
- GitHub
- Postman

---

## 📂 Project Structure

```
QuickBite/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   ├── server.js
│   └── package.json
│
├── database/
│   └── quickbite_db.sql
│
└── README.md
```

---

## ✨ Key Features

- Secure JWT Authentication
- Role-Based Access Control (Admin & Customer)
- RESTful API Architecture
- Responsive User Interface
- Cart & Wishlist Management
- Order Tracking
- Admin Dashboard
- Food CRUD Operations
- MySQL Database Integration

---

## 🗄️ Database

The project uses **MySQL** as the relational database.

Main Tables:

- Users
- Foods
- Cart
- Wishlist
- Addresses
- Orders
- Order Items

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/DIVITH22/QuickBite.git
```

### Backend

```bash
cd backend
npm install
npm start
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Database

1. Create a MySQL database.
2. Import:

```
database/quickbite_db.sql
```

3. Update database credentials in:

```
backend/config/db.js
```

---

## 📸 Screenshots

- Home Page
  <img width="1920" height="1080" alt="Home Page" src="https://github.com/user-attachments/assets/948c1ad0-3f2d-4c17-8fbb-e3f9e14caf3c" />
- Login
- <img width="1920" height="1080" alt="Login" src="https://github.com/user-attachments/assets/c52b73b4-12fd-4858-a29e-2fdc746691fa" />
- Food Menu
- <img width="1920" height="1080" alt="Food Menu" src="https://github.com/user-attachments/assets/c38e7d3d-cf64-40d0-b391-d795213c47cd" />
- Cart
- <img width="1920" height="1080" alt="Cart" src="https://github.com/user-attachments/assets/31dc7632-5c3c-420f-9342-829a409f5d50" />
- Checkout
- <img width="1920" height="1080" alt="Checkout" src="https://github.com/user-attachments/assets/c6ec90be-9e3b-49ac-bab1-a9665de5ecbd" />
- My Orders
- <img width="1920" height="1080" alt="My Orders" src="https://github.com/user-attachments/assets/33003633-b09b-4222-bdcf-1e1fefdf700d" />
- Admin Dashboard
- <img width="1920" height="1080" alt="Admin Dashboard" src="https://github.com/user-attachments/assets/d0cadd31-9f57-47fb-a8a6-95be4330ad85" />
- Manage Foods
- <img width="1920" height="1080" alt="Manage Foods" src="https://github.com/user-attachments/assets/abf9432e-6100-4d23-8bb5-4837e84e1ea4" />
- Manage Orders
- <img width="1920" height="1080" alt="Manage Orders" src="https://github.com/user-attachments/assets/b0b4f807-c6a5-4947-a71e-494e35364b67" />

---

## 🎯 Future Enhancements

- Online Payment Gateway
- Food Ratings & Reviews
- Email Notifications
- Image Upload using Multer
- Coupon System
- Advanced Search & Filters
- Multiple Restaurant Support

---

## 👨‍💻 Author

**Divith S**

Computer Science Engineering Graduate

GitHub:
https://github.com/DIVITH22

---

## ⭐ If you like this project

Please consider giving this repository a ⭐ on GitHub.
