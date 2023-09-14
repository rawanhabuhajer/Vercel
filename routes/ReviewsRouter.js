// const express = require("express");
// const reviewController = require("../controllers/ReviewsController");
// const authController = require("../controllers/AuthConrtoller");

// const router = express.Router();

// // router.use(authController.protect);

// router.route("/").get(reviewController.getAllReviews).post(
//   // authController.restrictTo('user'),
//   // reviewController.setTourUserIds,
//   reviewController.createReview
// );

// router
//   .route("/:id")
//   .get(reviewController.getReview)
//   .patch(
//     authController.restrictTo("user", "admin", "superAdmin"),
//     reviewController.updateReview
//   )
//   .delete(
//     authController.restrictTo("user", "admin", "superAdmin"),
//     reviewController.deleteReview
//   );

// module.exports = router;
