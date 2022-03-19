const User = require("../models/User.model");
const createHttpError = require("http-errors");
const { signJWT } = require("../helpers/jwtSign.helper");
const { verifyJWT } = require("../helpers/jwtVerify.helper");
const { redisClient } = require("../configs/redis.config");
const {
  registerSchema,
  loginSchema,
} = require("../validations/Auth.validation");

const maxAge = 3 * 24 * 60 * 60 * 1000;

//cookie options
const cookieOptions = {
  httpOnly: true,
  maxAge: maxAge,
  signed: true,
};

const register = async (req, res, next) => {
  try {
    const result = await registerSchema.validateAsync(req.body);

    const existingUser = await User.findOne({ username: result.username });

    if (existingUser) {
      throw createHttpError.Conflict(
        `${result.username} is already been registered`
      );
    }

    const existingPhoneUser = await User.findOne({ phone: result.phone });

    if (existingPhoneUser)
      throw createHttpError.Conflict(
        `${result.phone} is already been registered`
      );

    if (result.email) {
      const existingEmailUser = await User.findOne({ email: result.email });

      if (existingEmailUser)
        throw createHttpError.Conflict(
          `${result.email} is already been registered`
        );
    }

    const user = new User(result);
    let savedUser = await user.save();

    const accessToken = await signJWT({ _id: savedUser._id });

    await redisClient.set(accessToken, "", { EX: maxAge / 10 }); // value is in seconds be careful!!

    // removing secret data
    savedUser = savedUser.toObject();
    delete savedUser.password;
    delete savedUser._id;

    return res
      .cookie("accessToken", accessToken, cookieOptions)
      .status(201)
      .json({
        message: "Registered successfully",
        savedUser,
      });
  } catch (err) {
    if (err.isJoi === true)
      return next(createHttpError.UnprocessableEntity("Invalid Credentials"));

    // mongoDB duplicate error
    if (err.code === 11000)
      return next(
        createHttpError.Conflict(
          "User Already exists with the provided credentials"
        )
      );

    next(err);
  }
};

const viewAccount = async (req, res, next) => {
  try {
    const userId = await verifyJWT(req.signedCookies.accessToken);

    let user = await User.findById(userId);

    if (!user) createHttpError.NotFound("User not registered");

    // removing secret data
    user = user.toObject();
    delete user.password;
    delete user._id;

    res.status(200).json({ user });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const result = await loginSchema.validateAsync(req.body);

    let user = await User.findOne({ username: result.username });

    if (!user) throw createHttpError.NotFound("User not registerd");

    const isMatch = await user.isValidPassword(result.password);
    if (!isMatch)
      throw createHttpError.Unauthorized("Username/Password not valid");

    const accessToken = await signJWT({ _id: user._id });

    // removing secret data
    user = user.toObject();
    delete user.password;
    delete user._id;

    await redisClient.set(accessToken, "", { EX: maxAge / 10 }); // value is in seconds be careful!!
    return res
      .cookie("accessToken", accessToken, cookieOptions)
      .status(200)
      .json({
        message: "Login successfully",
        user,
      });
  } catch (err) {
    if (err.isJoi === true)
      return next(
        createHttpError.UnprocessableEntity("Invalid Username/Password")
      );

    next(err);
  }
};

const logout = async (req, res, next) => {
  try {
    await verifyJWT(req.signedCookies.accessToken);
    await redisClient.del(req.signedCookies.accessToken);
    res
      .cookie("accessToken", "", { maxAge: 0 })
      .status(200)
      .json({ message: "Logged out Successfully" });
  } catch (err) {
    next(err);
  }
};

const authorization = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};

module.exports = {
  register,
  viewAccount,
  login,
  logout,
  authorization,
};