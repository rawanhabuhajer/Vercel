// // review / rating / createdAt / ref to expert / ref to user
// const mongoose = require('mongoose');
// const Expert = require('./ExpertModal');

// const reviewSchema = new mongoose.Schema(
//   {
//     // review: {
//     //   type: String,
//     //   required: [true, 'Review can not be empty!']
//     // },
//     rating: {
//       type: Number,
//       min: 1,
//       max: 5
//     },
//     createdAt: {
//       type: Date,
//       default: Date.now
//     },
//     expert: {
//       type: mongoose.Schema.ObjectId,
//       ref: 'Expert',
//       required: [true, 'Review must belong to a expert.']
//     },
//     user: {
//       type: mongoose.Schema.ObjectId,
//       ref: 'User',
//       required: [true, 'Review must belong to a user']
//     }
//   },
//   {
//     toJSON: { virtuals: true },
//     toObject: { virtuals: true }
//   }
// );

// reviewSchema.index({ expert: 1, user: 1 }, { unique: true });

// reviewSchema.pre(/^find/, function(next) {
//   // this.populate({
//   //   path: 'tour',
//   //   select: 'name'
//   // }).populate({
//   //   path: 'user',
//   //   select: 'name photo'
//   // });

//   this.populate({
//     path: 'user',
//     select: 'name photo'
//   });
//   next();
// });

// reviewSchema.statics.calcAverageRatings = async function(expertId) {
//   const stats = await this.aggregate([
//     {
//       $match: { expert: expertId }
//     },
//     {
//       $group: {
//         _id: '$expert',
//         nRating: { $sum: 1 },
//         avgRating: { $avg: '$rating' }
//       }
//     }
//   ]);
//   // console.log(stats);

//   if (stats.length > 0) {
//     await Expert.findByIdAndUpdate(expertId, {
//       ratingsQuantity: stats[0].nRating,
//       ratingsAverage: stats[0].avgRating
//     });
//   } else {
//     await Expert.findByIdAndUpdate(expertId, {
//       ratingsQuantity: 0,
//       ratingsAverage: 4.5
//     });
//   }
// };

// reviewSchema.post('save', function() {
//   // this points to current review
//   this.constructor.calcAverageRatings(this.expert);
// });

// // findByIdAndUpdate
// // findByIdAndDelete
// reviewSchema.pre(/^findOneAnd/, async function(next) {
//   this.r = await this.findOne();
//   // console.log(this.r);
//   next();
// });

// reviewSchema.post(/^findOneAnd/, async function() {
//   // await this.findOne(); does NOT work here, query has already executed
//   await this.r.constructor.calcAverageRatings(this.r.expert);
// });

// const Review = mongoose.model('Review', reviewSchema);

// module.exports = Review;
