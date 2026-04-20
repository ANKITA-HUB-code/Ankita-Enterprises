const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth");

const app = express();

// ✅ Allow CORS + handle preflight
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.options("*", cors());  // 💡 This line is important

// ✅ Parse JSON bodies
app.use(express.json());

// ✅ Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection failed", err));

// ✅ Register auth routes
app.use("/api", authRoutes);

// ✅ Start the server
app.listen(5000, () => {
  console.log("🚀 Server running on http://localhost:5000");
});

console.log("Mongo URI:", process.env.MONGO_URI);
