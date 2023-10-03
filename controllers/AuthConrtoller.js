const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
require("dotenv").config();

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "5d" });
};

//signup controller

exports.signup = async (req, res) => {
  const { username, email, password } = req.body;
  const role = req.body.role;
  const passwordChangedAt = req.body.passwordChangedAt;
  try {
    const user = await User.signup(
      username,
      email,
      password
      // role,
      // passwordChangedAt
    );
    const token = createToken(user._id);
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//signin controller

exports.signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.signin(email, password);

    // create token
    const token = createToken(user._id);

    const id = user._id;
    const username = user.username;
    const role = user.role;

    res.status(200).json({ email, token, id, password, username, role });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// 1 protect user info with token
exports.protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
    console.log(token);
  }

  if (!token) {
    return res.status(401).json({ message: "You are not logged in" });
  }

  try {
    // 2 verify token
    const decoded = await promisify(jwt.verify)(token, process.env.SECRET);

    // 3 check if the user still exsist
    const currentUser = await User.findById(decoded._id);

    if (!currentUser) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

    req.user = currentUser;
    next();
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res
        .status(401)
        .json({ message: "You do not have permission to perform this action" });
    }
    next();
  };
};
