// Import the Express library for creating a web server
const express = require("express");

// Create an instance of an Express application
const app = express();

// Import the database configuration to ensure the connection is established
const dbconfig = require("./db");
const roomsRoutes = require("./routes/roomsRoutes");
const usersRoutes = require("./routes/usersRoutes");
const bookingRoute = require("./routes/bookingsRoute");
app.use(express.json());
app.use("/api/rooms", roomsRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/bookings", bookingRoute);
// Define the port on which the server will listen for incoming requests
const port = process.env.PORT || 5000;

// Start the server and listen on the specified port
app.listen(port, () => console.log("Server running on port", { port }));
