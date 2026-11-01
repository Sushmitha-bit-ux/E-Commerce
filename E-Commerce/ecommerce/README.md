# 🛒 NOVA Store — Full-Stack Spring Boot E-Commerce Application

A complete, modern E-Commerce web application developed with **Spring Boot 3**, **Spring Data JPA**, **Hibernate**, and **MySQL**, featuring a responsive storefront with dynamic shopping cart, user authentication, and order processing.

---

## ✨ Features

- **🛍️ Product Catalog & Categories**: Browse items across multiple categories (Electronics, Fashion, Home & Living) with real-time stock indicators.
- **🔍 Live Search & Filter**: Real-time keyword search across products and description, instant category pill filters, and price/name sorting.
- **🔐 User Authentication**:
  - User registration (`POST /api/auth/register`) with email uniqueness and password length validation.
  - User login (`POST /api/auth/login`) with credential validation and session state.
  - User profile management (`GET /api/auth/me/{id}`).
  - Quick demo sign-in for Customer and Admin roles.
- **🛒 Shopping Cart Management**:
  - Add to cart with automated stock checks.
  - Quantity calculation and item deletion.
  - Persistent cart stored in database per user account.
- **📦 Checkout & Order Management**:
  - Checkout with custom delivery address and payment method selector.
  - Automatic stock inventory deduction on order completion.
  - Order tracking and complete order history by customer ID.
- **🎨 Modern Responsive UI**: Clean interface built with modern typography, slide-over cart drawer, and interactive modals.

---

## 🛠️ Tech Stack

- **Backend**: Java 17, Spring Boot 3.2.5 (Spring Web, Spring Data JPA, Spring Validation)
- **Database**: MySQL 8.0 / Hibernate 6
- **Build Tool**: Apache Maven
- **Frontend**: HTML5, CSS3 (Modern Flexbox & CSS Grid), Vanilla JavaScript (Fetch API)
- **Utilities**: Project Lombok, HikariCP

---

## 📁 Project Structure

```
ecommerceapp/
├── src/
│   ├── main/
│   │   ├── java/com/ecommerce/ecommerceapp/
│   │   │   ├── config/
│   │   │   │   └── DataInitializer.java      # Database seeder (categories, products, demo users)
│   │   │   ├── controller/
│   │   │   │   ├── AuthController.java       # Register & login APIs
│   │   │   │   ├── CatalogController.java    # Product & category APIs
│   │   │   │   ├── CartController.java       # Shopping cart APIs
│   │   │   │   ├── OrderController.java      # Checkout & order tracking APIs
│   │   │   │   └── UserController.java       # User profile APIs
│   │   │   ├── entity/
│   │   │   │   ├── Users.java                # User account entity
│   │   │   │   ├── Category.java             # Product category entity
│   │   │   │   ├── Product.java              # Product item entity
│   │   │   │   ├── CartItem.java             # User shopping cart item entity
│   │   │   │   ├── OrderEntity.java          # Customer order entity
│   │   │   │   └── OrderItem.java            # Individual order line items
│   │   │   ├── repository/                   # Spring Data JPA repositories
│   │   │   ├── service/                      # Business logic services
│   │   │   └── exception/                    # Global exception handlers
│   │   └── resources/
│   │       ├── application.properties        # Server port & MySQL configuration
│   │       └── static/
│   │           └── index.html                # Responsive storefront web UI
└── pom.xml
```

---

## 🚀 Getting Started

### 1. Prerequisites
- **Java 17** or later
- **Maven 3.8+**
- **MySQL Server 8.0+**

### 2. Configure MySQL Database
Create the database in your MySQL server:
```sql
CREATE DATABASE IF NOT EXISTS ecommercedatabase;
```

Update your MySQL credentials in `src/main/resources/application.properties` if needed:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/ecommercedatabase?createDatabaseIfNotExist=true&useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD
```

### 3. Run the Application
Open a terminal in the project root directory and run:
```bash
mvn spring-boot:run
```

Once started, open your browser and navigate to:
👉 **http://localhost:8080**

---

## 🔑 Demo Accounts

For quick testing, the database is automatically seeded with:

| Role | Email | Password |
| :--- | :--- | :--- |
| **Customer** | `demo@example.com` | `demo123` |
| **Admin** | `admin@example.com` | `admin123` |

You can also create a new account anytime using the **Sign In / Register** button in the storefront.

---

## 📡 REST API Reference

### Authentication
- `POST /api/auth/register` - Create a new user account
- `POST /api/auth/login` - Authenticate with email & password
- `GET /api/auth/me/{id}` - Get user details

### Products & Categories
- `GET /api/products` - List all active products
- `GET /api/products/{id}` - Get product by ID
- `GET /api/categories` - List all categories
- `GET /api/categories/{id}/products` - Get products by category

### Shopping Cart
- `GET /api/cart/{customerId}` - Get current cart items
- `POST /api/cart/{customerId}` - Add item to cart `{ "productId": 1, "quantity": 1 }`
- `DELETE /api/cart/items/{itemId}` - Remove an item from cart
- `DELETE /api/cart/{customerId}` - Clear entire cart

### Orders & Checkout
- `POST /api/orders/checkout` - Place order from cart `{ "customerId": 1, "shippingAddress": "..." }`
- `GET /api/orders/customer/{customerId}` - List order history for a customer
- `PATCH /api/orders/{id}/status` - Update order delivery status

---

## 📄 License
This project is open-source and available under the MIT License.
