const express = require("express");
const ExpertsController = require("../controllers/ExpertsController");
const AuthController = require("../controllers/AuthConrtoller");
const router = express.Router();

router
  .route("/")
  .get(ExpertsController.getAllExperts)
  //  .get(AuthController.protect, UsersController.getAllUsers)
  .post(ExpertsController.createExpert);

router
  .route("/:id")
  .get(ExpertsController.getExpert)
  .patch(ExpertsController.updateExpert)
  .delete(
    AuthController.protect,
    AuthController.restrictTo("superAdmin"),
    ExpertsController.deleteExpert
  );

module.exports = router;
