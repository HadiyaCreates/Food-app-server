// backend/server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const foodRoutes = require("./route/foodRoutes"); // Importing food 
require('dotenv').config(); 
const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI, {
    
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"));

app.use("/api/auth", require("./route/auth"));
app.use('/api/foods', foodRoutes);
app.use("/api/contact", require("./route/contactRoute")); 

const orderRoutes = require("./route/orderRoutes");
app.use("/order", orderRoutes);

app.listen(8000, () => {
  console.log("Server running on http://localhost:8000");
});
