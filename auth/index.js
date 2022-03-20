require("dotenv").config();
const express = require("express");
const cors = require("cors");
const createHttpError = require("http-errors");
const app = express();
const authRoutes = require("./routes/Auth.route");
const cookieParser = require("cookie-parser");
const port = process.env.PORT || 8080;

// database connection
require("./configs/mongodb.config");

//redis connection
require("./configs/redis.config");

// middlewares
app.use(express.json());
app.use(cookieParser("secret"));
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);

app.get("/api/auth", (req, res) => {
  res.json({ message: "base url" });
});

//Invalid route
app.use(async (req, res, next) => {
  console.log(req.url)
  next(createHttpError.NotFound("This route does not exist"));
});

//error handling
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

app.listen(port, () => {
  console.log(`Auth service listening on port ${port}`);
});
