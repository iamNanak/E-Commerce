//packages
import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";

//utilites
import connectDB from "./config/db.js";

dotenv.config({
  path: "./.env",
});
const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// app.get("/", (req, res) => {
//   res.send("Hello wOrld");
// });

// console.log("MONGODB_URI", process.env.MONGODB_URI);

//routes
import userRouter from "./routes/user.routes.js";
import categoryRouter from "./routes/category.routes.js";
import productRouter from "./routes/product.routes.js";

app.use("/api/users", userRouter);
app.use("/api/category", categoryRouter);
app.use("/api/products", productRouter);

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
