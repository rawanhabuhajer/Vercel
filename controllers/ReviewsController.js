// const Review = require('./../models/ReviewsModal');

// exports.setTourUserIds = (req, res, next) => {
//     // Allow nested routes
//     if (!req.body.expert) req.body.expert = req.params.expertId;
//     if (!req.body.user) req.body.user = req.user.id;
//     next();
//   };
  
// exports.getAllReviews = async (req, res, next) => {

//     const reviews = await Review.find();
  
//     res.status(200).json({
//       status: "success",
//       results: reviews.length,
//       data: {
//         reviews,
//       },
//     });
//   };
  
//   exports.getService = async (req, res, next) => {
//     const review = await Review.findById(req.params.id);
  
//     if (!review) {
//       throw Error("No review found with that ID", 404);
//     }
  
//     res.status(200).json({
//       status: "success",
//       data: {
//         review,
//       },
//     });
//   };
  
//   exports.createReview = async (req, res, next) => {
//     try {
//       const newReview = await Review.create(req.body);
  
//       res.status(201).json({
//         status: "success",
//         data: {
//             review: newReview,
//         },
//       });
//     } catch (err) {
//       res.status(500).json({
//         status: "error",
//         message: "Error creating review",
//         error: err.message,
//       });
//     }
//   };