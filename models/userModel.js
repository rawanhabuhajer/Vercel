const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
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
  role: {
    type: String,
    enum: ["admin", "superAdmin", "user"],
    default: "user",
    required: false,
  },
  // passwordChangedAt : Date
});

userSchema.statics.signup = async function (username, email, password, role) {
  if (!username || !email || !password) {
    throw Error("Please provide all fields");
  }
  if (!validator.isEmail(email)) {
    throw Error("Incorrect Email");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough");
  }
  const exist = await this.findOne({ email });
  if (exist) {
    throw Error("Email already exist");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const user = await this.create({ username, email, password: hash, role });

  return user;
};

userSchema.statics.signin = async function (email, password) {
  //validation
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error("Incorrect email or password");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Incorrect email or password");
  }

  return user;
};

// protect token from change password
// userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
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
module.exports = mongoose.model("User", userSchema);
