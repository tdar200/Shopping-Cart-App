const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");
const app = express();

dotenv.config();
connectDB();

app.use(cors());

const productRoutes = require("./routes/productRoutes");

app.use(express.json());

app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
  res.send("API is running....");
});

const PORT = 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
