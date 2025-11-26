// ==========================
//  Basic Setup
// ==========================
const express = require("express");
require("dotenv").config();

const app = express();
app.use(express.json());

// In-memory product "database"
let products = [
  { id: 1, name: "Phone", price: 800 },
  { id: 2, name: "Laptop", price: 1500 },
];

// ==========================
//  Middleware
// ==========================

// Logger middleware
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
};

// Simple fake authentication
const auth = (req, res, next) => {
  const token = req.headers["x-auth-token"];
  if (!token || token !== "12345") {
    return res.status(401).json({
      success: false,
      message: "Unauthorized - missing or invalid token",
    });
  }
  next();
};

// Product validation middleware
const validateProduct = (req, res, next) => {
  const { name, price } = req.body;

  if (!name || !price) {
    return res.status(400).json({
      success: false,
      message: "Name and price are required",
    });
  }

  next();
};

// Apply logger globally
app.use(logger);

// ==========================
//  Routes / Controllers
// ==========================

// GET all products (with search, filter, pagination)
app.get("/api/products", (req, res) => {
  let result = [...products];

  // Search by name
  if (req.query.search) {
    result = result.filter((p) =>
      p.name.toLowerCase().includes(req.query.search.toLowerCase())
    );
  }

  // Min & Max price filtering
  if (req.query.minPrice) {
    result = result.filter(
      (p) => p.price >= parseFloat(req.query.minPrice)
    );
  }

  if (req.query.maxPrice) {
    result = result.filter(
      (p) => p.price <= parseFloat(req.query.maxPrice)
    );
  }

  // Pagination
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || result.length;
  const start = (page - 1) * limit;
  const end = start + limit;

  const paginated = result.slice(start, end);

  res.json({
    success: true,
    count: paginated.length,
    data: paginated,
  });
});

// GET single product
app.get("/api/products/:id", (req, res, next) => {
  const product = products.find(
    (p) => p.id === parseInt(req.params.id)
  );

  if (!product) {
    const err = new Error("Product not found");
    err.statusCode = 404;
    return next(err);
  }

  res.json({ success: true, data: product });
});

// CREATE product
app.post("/api/products", auth, validateProduct, (req, res) => {
  const newProduct = {
    id: products.length + 1,
    ...req.body,
  };

  products.push(newProduct);

  res.status(201).json({ success: true, data: newProduct });
});

// UPDATE product
app.put("/api/products/:id", auth, validateProduct, (req, res, next) => {
  const product = products.find(
    (p) => p.id === parseInt(req.params.id)
  );

  if (!product) {
    const err = new Error("Product not found");
    err.statusCode = 404;
    return next(err);
  }

  Object.assign(product, req.body);

  res.json({ success: true, data: product });
});

// DELETE product
app.delete("/api/products/:id", auth, (req, res, next) => {
  const index = products.findIndex(
    (p) => p.id === parseInt(req.params.id)
  );

  if (index === -1) {
    const err = new Error("Product not found");
    err.statusCode = 404;
    return next(err);
  }

  products.splice(index, 1);

  res.json({ success: true, message: "Product deleted" });
});

// ==========================
//  Global Error Handler
// ==========================
app.use((err, req, res, next) => {
  console.error("ERROR:", err.message);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Server Error",
  });
});

// ==========================
//  Start Server
// ==========================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
