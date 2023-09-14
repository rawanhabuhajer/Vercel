const express = require("express");
const router = express.Router();
const Booking = require("../models/BookingModal");
const bookingController = require("./../controllers/BookingController");


// router.get(
//   "/checkout-session/:serviceId",
//   bookingController.getCheckoutSession
// );

router
  .route("/")
  .get(bookingController.getAllBookings)
  .post(bookingController.createBooking);

router
  .route("/:id")
  .get(bookingController.getBooking)
  .patch(bookingController.updateBooking)
  .delete(bookingController.deleteBooking);

module.exports = router;

