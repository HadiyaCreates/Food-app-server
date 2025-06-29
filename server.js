// backend/server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const foodRoutes = require("./route/foodRoutes"); // Importing food 

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb+srv://hadiyashaikh2006:edns8W4JPnAoH19D@cluster0.c9qwmwm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
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
