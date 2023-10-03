require("dotenv").config();
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRouter");
const UsersRouter = require("./routes/UsersRouter");
const ExpertsRouter = require("./routes/ExpertsRouter");
const ServicesRouter = require("./routes/ServicesRouter");
const BookingRouter = require("./routes/BookingRoutes");
// express app
const app = express();

// middleware
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  req.requestTime = new Date().toString();
  console.log(req.headers);
  next();
});

//Routes
app.use("/api/user", userRoutes);
app.use("/api/users", UsersRouter);
app.use("/api/experts", ExpertsRouter);
app.use("/api/services", ServicesRouter);
app.use("/api/book", BookingRouter);
// app.use("/api/reviews", reviewsRouter);

//connect to db
mongoose
  .connect(process.env.DATABASE_GLOBAL)
  .then(() => console.log("DB connection successful!"));

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
