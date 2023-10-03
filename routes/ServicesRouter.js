const express = require("express");
const ServicesController = require("../controllers/ServicesController");
const router = express.Router();
const BookingContraller = require("../controllers/BookingController");
const upload = require('../utils/Multer')
router
  .route("/")
  .get(ServicesController.getAllServices)
  //  .get(AuthController.protect, UsersController.getAllUsers)
  .post( upload.single("image"), ServicesController.createService);

router
  .route("/:id")
  .get(ServicesController.getService)
  .patch( upload.single("image") , ServicesController.updateService
  )
  .delete(
    // AuthController.protect,
    ServicesController.deleteService
  );

module.exports = router;
