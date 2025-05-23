const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // Import cors
const config = require("./config/database");
const notificationRoutes = require("./routes/notifications");

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const bookRoutes = require("./routes/books");
const reservationRoutes = require("./routes/reservations");
// Initialize app
const app = express();

require('dotenv').config();
// Apply middleware
app.use(cors()); // Apply cors after initializing app
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI || config.database)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("Could not connect to MongoDB", err);
    process.exit(1); // Exit if we can't connect to the database
  });

// Define routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/notifications", notificationRoutes);

// Health check route for Render
app.get('/healthz', (req, res) => res.send('Just changed this!'));

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));