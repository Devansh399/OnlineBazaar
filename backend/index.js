const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const userRoutes = require("./routes/authRoutes");
dotenv.config();

const connectDB = require("./config/db");
connectDB();

const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173",  "https://onlinebazaar-frontend.onrender.com"], // Replace with your frontend URL
    // origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    // allowedHeaders: ['Content-Type', 'Authorization'],
    // credentials: true, // Allow cookies to be sent
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Backend is running...");
});

app.use("/api/auth", userRoutes);
app.use("/api/products", require("./routes/productRoutes.js"));
app.use("/api/orders", require("./routes/orderRoutes.js"));
app.use("/api/payment", require("./routes/paymentRoutes.js"));
app.use("/api/analytics", require("./routes/analyticsRoutes.js"));

//server frontend in production
// if (process.env.NODE_ENV === "production") {
//   const path = require("path");

//   app.use(express.static(path.join(__dirname, "../frontend/e-frontend/dist")));

//   app.get("*", (req, res) => {
//     res.sendFile(
//       path.resolve(__dirname, "../frontend/e-frontend/dist", "index.html"),
//     );
//   });
// } else {
//   app.get("/", (req, res) => {
//     res.send("OnlineBazaar API is running... in development mode");
//   });
// }

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on the port ${PORT}`);
});
