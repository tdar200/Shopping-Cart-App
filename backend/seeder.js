const mongoose = require("mongoose");
const Product = require("./models/productModel");

import products from "./data/products";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Product.insertMany(products);

    console.log("Receipts Imported!");
    process.exit(0);
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

importData();
