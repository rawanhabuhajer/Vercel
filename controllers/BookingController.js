const Booking = require("../models/BookingModal");
const catchAsync = require("../utils/CatchAysnc");
const AppError = require("../utils/AppError");
const Service = require("../models/ServicesModal");
const Expert = require("../models/ExpertModal");
const User = require("../models/userModel");

exports.getAllBookings = async (req, res, next) => {
  const bookings = await Booking.find();
  db.student.find()
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
    const {
      user: userId,
      service: serviceId,
      time,
      duration,
      expert: expertId,
      paid,
      date,
      location
    } = req.body;

    // Populate the 'service' field by fetching the service document
    const service = await Service.findById(serviceId);
    const expert = await Expert.findById(expertId);
    const user = await User.findById(userId);

    if (!service) {
      return res.status(404).json({ error: "Service not found." });
    }
    if (!expert) {
      return res.status(404).json({ error: "expert not found." });
    }
    if (!user) {
      return res.status(404).json({ error: "user not found." });
    }

    // Calculate the price based on the service price and duration
    const price = service.servicePrice * duration;
    // Create a new booking document with the populated 'service' field and calculated price
    const newBooking = await Booking.create({
      user,
      service: service,
      time,
      duration,
      price,
      date,
      expert: expert,
      paid,
      date,
      location
    });

    res.status(201).json({
      status: "success",
      data: {
        booking: newBooking,
      },
    });
    
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Error creating booking",
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

exports.getAllUserBookings = async (req, res, next) => {
  try {
    const userId = req.user.id; 
    const bookings = await Booking.find({ user: userId }); 

    res.status(200).json({
      status: "success",
      results: bookings.length,
      data: {
        bookings,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Error retrieving bookings",
      error: err.message,
    });
  }
};

