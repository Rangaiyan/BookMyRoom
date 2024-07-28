const mongoose = require("mongoose");
// maxcount: {
//     type: Number,
//     required: true
// },

const roomSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
      },
      rentperday: {
        type: Number,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      no_of_beds: {
        type: Number,
        required: true,
      },
      phonenumber: {
        type: String,
        required: true,
      },
      amenities: {
        type: String,
        required: true,
      },
      imageurls: {
        type: [String],
        required: true,
      },
      room_no: {
        type: Number,
        required: true,
      },
      currentbookings: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Booking",
        default: []
      },
    }, { timestamps: true });
     // Specify timestamps as an option

const roomModel = mongoose.model('room', roomSchema);

module.exports = roomModel;
