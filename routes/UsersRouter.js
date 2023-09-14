const express = require("express");
const UsersController = require("./../controllers/UsersController");
const AuthController = require("../controllers/AuthConrtoller");
const router = express.Router();

router
  .route("/")
  .get(UsersController.getAllUsers)
  // .get(AuthController.protect, UsersController.getAllUsers)
  .post(UsersController.createUser);

router
  .route("/:id")
  .get(UsersController.getUser)
  .patch(UsersController.updateUser)
  .delete(
    // AuthController.protect,
    // AuthController.restrictTo("superAdmin"),
    UsersController.deleteUser
  );

// router.patch('/updateMe/:id', UsersController.updateMe);

module.exports = router;
