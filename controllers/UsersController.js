const User = require("./../models/userModel");
const bcrypt = require("bcrypt");
const catchAsync = require("../utils/CatchAysnc");
const AppError = require("../utils/AppError");

exports.getAllUsers = async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: "success",
    results: users.length,
    data: {
      users,
    },
  });
};

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  // user.findOne({ _id: rلeq.params.id })

  if (!user) {
    new AppError("No user found with that ID", 404);
  }

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

exports.createUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      role: req.body.role,
    });

    res.status(201).json({
      status: "success",
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Error creating user",
      error: err.message,
    });
  }
};

// };

exports.updateUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    new AppError("No user found with that ID", 404);
  }

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);
  console.log(user);
  if (!user) {
    new AppError("No user found with that ID", 404);
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.updateMe = async (req, res, next) => {

  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser
    }
  });
};
