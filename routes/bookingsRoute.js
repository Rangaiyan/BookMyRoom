const express = require("express");
const router = express.Router();
const Booking = require("../models/booking");
const moment = require("moment");
const Room = require("../models/room");
const { v4: uuidv4 } = require("uuid");
const stripe = require("stripe")("sk_test_51PfPjUAyBtgnOaAV6Rf33q7VEKVu2IjraSJFBVxsgu0fNZIVcIPUbRmmQEFl9LjyeIQw7osI4lGIefMyjB4V5qGJ00ej35NEK1");

router.post("/bookroom", async (req, res) => {
  const { room, userid, fromdate, todate, totalamount, totaldays, token } = req.body;

  console.log("Request payload:", req.body); // Log the request payload

  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const payment = await stripe.charges.create(
      {
        amount: totalamount * 100,
        customer: customer.id,
        currency: "inr",
        receipt_email: token.email,
      },
      {
        idempotencyKey: uuidv4(),
      }
    );

    if (payment) {
      try {
        const formattedFromDate = moment(fromdate, "DD-MM-YYYY").format("DD-MM-YYYY");
        const formattedToDate = moment(todate, "DD-MM-YYYY").format("DD-MM-YYYY");

        const newbooking = new Booking({
          room: room.name,
          roomid: room._id,
          userid,
          fromdate: formattedFromDate,
          todate: formattedToDate,
          totalamount,
          totaldays,
          transactionid: payment.id,
        });

        const booking = await newbooking.save();

        const roomtemp = await Room.findOne({ _id: room._id });
        roomtemp.currentbookings.push({
          bookingid: booking._id,
          fromdate: formattedFromDate,
          todate: formattedToDate,
          userid,
          status: booking.status,
        });

        await roomtemp.save();

        return res.json({ success: true, message: "Room booked successfully" });
      } catch (error) {
        console.error("Error booking room:", error); // Log the error
        return res.status(400).json({ success: false, error: "Room booking failed. Please try again later." });
      }
    }
  } catch (error) {
    console.error("Error processing payment:", error); // Log the error
    return res.status(400).json({ success: false, error: "Payment processing failed. Please try again later." });
  }
});


router.post('/getbookingsbyuserid', async (req, res) => {
  const { userid } = req.body;
  try {
    const bookings = await Booking.find({ userid });
    res.send(bookings);
  } catch (error) {
    console.error("Error retrieving bookings:", error);
    return res.status(400).json({ error: "Failed to retrieve bookings. Please try again later." });
  }
});

router.post('/cancelbooking', async (req, res) => {
  const { bookingid, roomid } = req.body;
  try {
    const bookingitem = await Booking.findOne({ _id: bookingid });
    if (!bookingitem) {
      return res.status(404).json({ error: "Booking not found" });
    }

    bookingitem.status = 'cancelled';
    await bookingitem.save();

    const room = await Room.findOne({ _id: roomid });
    const bookings = room.currentbookings.filter(booking => booking.bookingid.toString() !== bookingid);
    room.currentbookings = bookings;

    await room.save();
    res.send("Your booking was cancelled successfully");
  } catch (error) {
    console.error("Error cancelling booking:", error);
    return res.status(400).json({ error: "Failed to cancel booking. Please try again later." });
  }
});

router.get("/getallbookings",async(req,res)=>{
  try {
    const bookings=await Booking.find()
    res.sendStatus(bookings)
  } catch (error) {
    return res.status(404).json({error})
  }
})

module.exports = router;

// const express = require("express");
// const router = express.Router();
// const Booking = require("../models/booking");
// const moment = require("moment");
// const Room = require("../models/room");
// const { v4: uuidv4 } = require("uuid");
// const stripe = require("stripe")(
//   "sk_test_51PfPjUAyBtgnOaAV6Rf33q7VEKVu2IjraSJFBVxsgu0fNZIVcIPUbRmmQEFl9LjyeIQw7osI4lGIefMyjB4V5qGJ00ej35NEK1"
// );

// router.post("/bookroom", async (req, res) => {
//   const { room, userid, fromdate, todate, totalamount, totaldays, token } = req.body;

//   try {
//     const customer = await stripe.customers.create({
//       email: token.email,
//       source: token.id,
//     });

//     const payment = await stripe.charges.create(
//       {
//         amount: totalamount * 100,
//         customer: customer.id,
//         currency: "inr",
//         receipt_email: token.email,
//       },
//       {
//         idempotencyKey: uuidv4(),
//       }
//     );

//     if (payment) {
//       // Format the dates
//       const formattedFromDate = moment(fromdate, "DD-MM-YYYY").format("DD-MM-YYYY");
//       const formattedToDate = moment(todate, "DD-MM-YYYY").format("DD-MM-YYYY");

//       // Debugging logs
//       console.log(`Formatted From Date: ${formattedFromDate}`);
//       console.log(`Formatted To Date: ${formattedToDate}`);

//       // Create a new booking
//       const newbooking = new Booking({
//         room: room.name,
//         roomid: room._id,
//         userid,
//         fromdate: formattedFromDate,
//         todate: formattedToDate,
//         totalamount,
//         totaldays,
//         transactionid: payment.id,
//         // type: room.type, // Uncomment if room object contains type
//         // maxcount: room.maxcount // Uncomment if room object contains maxcount
//       });

//       // Save the booking
//       const booking = await newbooking.save();

//       // Update the room's current bookings
//       const roomtemp = await Room.findOne({ _id: room._id });
//       roomtemp.currentbookings.push({
//         bookingid: booking._id,
//         fromdate: formattedFromDate,
//         todate: formattedToDate,
//         userid,
//         status: booking.status,
//       });

//       // Save the updated room document
//       await roomtemp.save();

//       return res.send("Room booked successfully");
//     }
//   } catch (error) {
//     console.error("Error processing payment or booking:", error); // Debugging
//     return res.status(400).json({ error: "Payment processing or booking failed. Please try again later." });
//   }
// });

// module.exports = router;
