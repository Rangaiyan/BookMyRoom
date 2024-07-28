const mongoose = require("mongoose");

// Define the MongoDB connection URL with credentials
var mongoURL =
  "mongodb+srv://RoomBooking:room1234@cluster0.i6iqcwc.mongodb.net/Guest-Rooms";

// Connect to the MongoDB server using the connection URL and options
mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Get the default connection object from mongoose
var connection = mongoose.connection;

// Set up an event listener for the 'error' event on the connection
connection.on("error", (error) => {
  console.error("MongoDB connection failed:", error); // Log an error message if the connection fails
});

// Set up an event listener for the 'connected' event on the connection
connection.on("connected", () => {
  console.log("Connected successfully to MongoDB"); // Log a success message when connected
});
