const Service = require("../models/ServicesModal");
const multer = require("multer");
const sharp = require("sharp");
const catchAysnc = require("../utilies/CatchAysnc");

// const multerStorage = multer.memoryStorage();

// const multerFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith("image")) {
//     cb(null, true);
//   } else {
//     cb(new AppError("Not an image! Please upload only images.", 400), false);
//   }
// };

// const upload = multer({
//   storage: multerStorage,
//   fileFilter: multerFilter,
// });

// exports.uploadServiceImges = upload.fields([
//   { name: "imageCover", maxCount: 1 },
//   { name: "images", maxCount: 3 },
// ]);

// exports.resizeServiceImg = catchAysnc(async (req, res, next) => {
//   if (!req.files.imageCover || !req.files.images) return next();

//   // 1) Cover image
//   req.body.imageCover = `service-${req.params.id}-${Date.now()}-cover.jpeg`;
//   await sharp(req.files.imageCover[0].buffer)
//     .resize(50, 50)
//     .toFormat("jpeg")
//     .jpeg({ quality: 90 })
//     .toFile(`public/img/services/${req.body.imageCover}`);
// });

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
    const { servicename, servicePrice, category } = req.body;
    const newService = await Service.create({
      servicename,
      servicePrice,
      category,
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
  const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
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
