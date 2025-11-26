Here’s a **simple, clean, student-friendly README.md** you can put directly in your project.

---

# 📦 Express.js REST API – Products Service

A simple RESTful API built with **Express.js** for managing products.  
This project includes routing, middleware, error handling, and advanced API features like filtering, search, and pagination.

---

## 🚀 Features

- CRUD operations for products  
- Custom middleware:
  - Logger  
  - Authentication  
  - Request validation  
- Global error handling  
- Filtering by price  
- Searching by name  
- Pagination  

---

## 📁 Project Setup

### 1️⃣ Install dependencies

```sh
npm install
```

### 2️⃣ Start the server

```sh
npm start
```

If using nodemon:

```sh
npm run dev
```

---

## 🔧 Environment Variables

Create a `.env` file:

```
PORT=5000
```

---

## 📡 API Endpoints

### **GET /api/products**
Get all products (supports search, filtering, pagination).

**Query examples:**

```
/api/products?search=phone
/api/products?minPrice=500&maxPrice=2000
/api/products?page=1&limit=5
```

---

### **GET /api/products/:id**
Get a single product.

---

### **POST /api/products**
Create a new product.  
Requires authentication header:

```
x-auth-token: 12345
```

**Body example:**

```json
{
  "name": "Tablet",
  "price": 1200
}
```

---

### **PUT /api/products/:id**
Update a product.

Requires:

- `x-auth-token`
- Valid product body

---

### **DELETE /api/products/:id**
Delete a product.

Requires:

- `x-auth-token`

---

## 🧪 Example Request (cURL)

```sh
curl -X POST http://localhost:5000/api/products \
-H "Content-Type: application/json" \
-H "x-auth-token: 12345" \
-d '{"name": "TV", "price": 3000}'
```

---

## 🧱 Technologies Used

- Node.js  
- Express.js  
- dotenv  

---

## 📝 Notes

This project uses an **in-memory product array**, meaning data resets when the server restarts.  
Perfect for learning REST APIs with Express.

---

If you'd like, I can also generate a **professional README**, **Postman collection**, or **GitHub-ready badges**.