const Expert = require("../models/ExpertModal");
const bcrypt = require("bcrypt");

exports.getAllExperts = async (req, res, next) => {
  const experts = await Expert.find();

  res.status(200).json({
    status: "success",
    results: experts.length,
    data: {
      experts,
    },
  });
};

exports.getExpert = async (req, res, next) => {
  const expert = await Expert.findById(req.params.id);
  // expert.findOne({ _id: req.params.id })

  if (!expert) {
    throw Error("No expert found with that ID", 404);
  }

  res.status(200).json({
    status: "success",
    data: {
      expert,
    },
  });
};

exports.createExpert = async (req, res, next) => {
  try {
    const {
      expertname,
      email,
      password,
      about,
      availability,
      experience,
      location,
      department,
      tel,
    } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const newexpert = await Expert.create({
      expertname,
      email,
      password: hashedPassword,
      about,
      availability,
      experience,
      location,
      department,
      tel,
    });

    res.status(201).json({
      status: "success",
      data: {
        expert: newexpert,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Error creating expert",
      error: err.message,
    });
  }
};

// };

exports.updateExpert = async (req, res, next) => {
  const expert = await Expert.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!expert) {
    throw Error("No expert found with that ID", 404);
  }

  res.status(200).json({
    status: "success",
    data: {
      expert,
    },
  });
};

exports.deleteExpert = async (req, res, next) => {
  const expert = await Expert.findByIdAndDelete(req.params.id);
  console.log(expert);
  if (!expert) {
    throw Error("No expert found with that ID", 404);
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
};
