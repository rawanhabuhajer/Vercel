const Service = require("../models/ServicesModal");
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/Multer");
const sharp = require("sharp");

exports.getAllServices = async (req, res, next) => {
  const services = await Service.find();

  res.status(200).json({
    status: "success",
    results: services.length,
    data: {
      services,
    },
  });
};

exports.getService = async (req, res, next) => {
  const service = await Service.findById(req.params.id);

  if (!service) {
    throw Error("No service found with that ID", 404);
  }

  res.status(200).json({
    status: "success",
    data: {
      service,
    },
  });
};

exports.createService = async (req, res, next) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    const { servicename, servicePrice, category } = req.body;
    const newService = await Service.create({
      servicename,
      servicePrice,
      category,
      imageCover: result.secure_url,
      cloudinary_id: result.public_id,
    });

    res.status(201).json({
      status: "success",
      data: {
        service: newService,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Error creating service",
      error: err.message,
    });
  }
};

// };

exports.updateService = async (req, res, next) => {
  let service = await Service.findById(req.params.id);
  await cloudinary.uploader.destroy(service.cloudinary_id);

  let result;
  if (req.file) {
    result = await cloudinary.uploader.upload(req.file.path);
  }
  const data = {
    imageCover: result?.secure_url || service.imageCover,
    cloudinary_id: result?.public_id || service.cloudinary_id,
  };
  service = await Service.findByIdAndUpdate(req.params.id, data, {
    new: true,
    runValidators: true,
  });

  if (!service) {
    throw Error("No service found with that ID", 404);
  }

  res.status(200).json({
    status: "success",
    data: {
      service,
    },
  });
};

exports.deleteService = async (req, res, next) => {
  const service = await Service.findByIdAndDelete(req.params.id);
  console.log(service);
  if (!service) {
    throw Error("No service found with that ID", 404);
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
};
