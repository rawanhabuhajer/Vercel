const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  service: {
    type: mongoose.Schema.ObjectId,
    ref: "Service",
    required: [true, "Booking must belong to a Service!"],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Booking must belong to a User!"],
  },
  price: {
    type: Number,
    require: [true, "Booking must have a price."],
  },
  time: {
    type: String,
    require: [true, "Booking must have a time."],
  },
  date: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  duration: {
    type: Number,
    required: [true, "Booking must have a duration."],
  },
  expert: {
    type: mongoose.Schema.ObjectId,
    ref: "Expert",
    required: true,
  },
  paid: {
    type: Boolean,
    default: true
  }
});

bookingSchema.pre(/^find/, function (next) {
  this.populate("user").populate("expert").populate("service");
  next();
});


const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;



