const Booking = require("../models/BookingModal");
const catchAsync = require("../utilies/CatchAysnc");
const AppError = require("../utilies/AppError");
const Service = require("../models/ServicesModal");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  // 1) Get the currently booked tourm
  const service = await Service.findById(req.params.serviceId);
  console.log(service);

  // 2) Create checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    success_url: `${req.protocol}://${req.get("host")}/my-service/?service=${
      req.params.serviceId
    }&user=${req.user.id}&price=${service.price}`,
    cancel_url: `${req.protocol}://${req.get("host")}/service`,
    customer_email: req.user.email,
    client_reference_id: req.params.serviceId,
    line_items: [
      {
        name: `${service.servicename} Service`,
        description: service.summary,
        amount: service.price * 100,
        currency: "usd",
        quantity: 1,
      },
    ],
  });

  // 3) Create session as response
  res.status(200).json({
    status: "success",
    session,
  });
});

exports.getAllBookings = async (req, res, next) => {
  const bookings = await Booking.find();

  res.status(200).json({
    status: "success",
    results: bookings.length,
    data: {
      bookings,
    },
  });
};

exports.getBooking = catchAsync(async (req, res, next) => {
  const booking = await Booking.findById(req.params.id);
  // user.findOne({ _id: rلeq.params.id })

  if (!booking) {
    new AppError("No booking found with that ID", 404);
  }

  res.status(200).json({
    status: "success",
    data: {
      booking,
    },
  });
});

exports.createBooking = async (req, res, next) => {
  try {
    const { user, service: serviceId, time, duration, date, expert, paid } = req.body;

    // Populate the 'service' field by fetching the service document
    const service = await Service.findById(serviceId);

    if (!service) {
      return res.status(404).json({ error: 'Service not found.' });
    }

    // Calculate the price based on the service price and duration
    const price = service.servicePrice * duration;

    // Create a new booking document with the populated 'service' field and calculated price
    const newBooking = await Booking.create({
      user,
      service: service, // This will be the populated service document
      time,
      duration,
      price,
      date,
      expert,
      paid,
    });

    res.status(201).json({
      status: 'success',
      data: {
        booking: newBooking,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: 'Error creating booking',
      error: err.message,
    });
  }
};

// };

exports.updateBooking = catchAsync(async (req, res, next) => {
  const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!booking) {
    new AppError("No booking found with that ID", 404);
  }

  res.status(200).json({
    status: "success",
    data: {
      booking,
    },
  });
});

exports.deleteBooking = catchAsync(async (req, res, next) => {
  const booking = await Booking.findByIdAndDelete(req.params.id);
  console.log(booking);
  if (!booking) {
    new AppError("No booking found with that ID", 404);
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});
// exports.createBookingCheckout = catchAsync(async (req, res, next) => {
//   // This is only TEMPORARY, because it's UNSECURE: everyone can make bookings without paying
//   const { service, user, price, time } = req.query;

//   if (!service && !user && !price && !time) return next();
//   await Booking.create({ service, user, price, time });
//   // res.redirect(req.originalUrl.split('?')[0]);
// });
