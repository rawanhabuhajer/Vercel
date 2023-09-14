const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const expertSchema = new Schema({
  expertname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    required: true,
  },
  experience: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    enum: [
      "deep cleaning",
      "Furniture",
      "Laundry",
      "Pools",
      "Organizing Cabinets",
      "Gardens",
      "Windows",
      "Vehicle services",
      "Farms",
      "pest control",
      "After building",
    ],
    default: "deep cleaning",
  },
  PhoneNumber: {
    type: String,
    require:true
  },
  // availability: {
  //   type: Boolean,
  // },
  location: {
    type: String,
  },
  tel:{
    type:String,
    require:true
  }
});

expertSchema.statics.signup = async function (expertname, email, password) {
  if (!expertname || !email || !password) {
    throw Error("Please provide all fields");
  }
  if (!validator.isEmail(email)) {
    throw Error("Incorrect Email");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("password not strong enough");
  }
  const exist = await this.findOne({ email });
  if (exist) {
    throw Error("email already exist");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const expert = await this.create({ expertname, email, password: hash });

  return expert;
};

expertSchema.statics.signin = async function (email, password) {
  //validation
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  const expert = await this.findOne({ email });

  if (!expert) {
    throw Error("Incorrect email or password");
  }

  const match = await bcrypt.compare(password, expert.password);
  if (!match) {
    throw Error("Incorrect email or password");
  }

  return expert;
};

// protect token from change password
// expertSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
//   if (this.passwordChangedAt) {
//     const changedTimestamp = parseInt(
//       this.passwordChangedAt.getTime() / 1000,
//       10
//     );

//     return JWTTimestamp < changedTimestamp;
//   }
// //  False means NOT changed
//   return false;
// };
module.exports = mongoose.model("Expert", expertSchema);
