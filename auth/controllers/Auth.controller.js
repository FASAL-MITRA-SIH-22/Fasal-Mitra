const User = require("../models/User.model");
const createHttpError = require("http-errors");
const { signJWT } = require("../helpers/jwtSign.helper");
const { verifyJWT } = require("../helpers/jwtVerify.helper");
const { redisClient } = require("../configs/redis.config");
const { registerSchema, loginSchema } = require("../validations/Auth.validation");
const bcrypt = require("bcrypt");

const maxAge = process.env.EXPIRATION_TIME;

//cookie options
const cookieOptions = {
  httpOnly: true,
  maxAge: maxAge,
  signed: true,
};

const register = async (req, res, next) => {
  try {
    let result = await registerSchema.validateAsync(req.body);

    const existingUser = await User.findOne({
      $or: [
        { username: result.username },
        { phone: result.phone },
        { email: result.email },
      ],
    });

    if (existingUser) {
      if (existingUser.username === result.username)
        throw createHttpError.Conflict(
          `${result.username} is already been registered`
        );

      if (existingUser.phone === result.phone)
        throw createHttpError.Conflict(
          `${result.phone} is already been registered`
        );

      if (existingUser.email === result.email)
        throw createHttpError.Conflict(
          `${result.email} is already been registered`
        );
    }

    const salt = await bcrypt.genSalt(10);
    result['password'] = await bcrypt.hash(result.password, salt);

    const user = new User(result);
    let savedUser = await user.save();

    const accessToken = await signJWT({ userId: savedUser._id });

    await redisClient.set(savedUser._id, accessToken, { EX: maxAge / 10 }); // value is in seconds be careful!!

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
      {console.log(err)
      return next(createHttpError.UnprocessableEntity("Invalid Credentials"));}

    // mongoDB duplicate error
    if (err.code === 11000) {
      return next(createHttpError.Conflict(err.name));
    }

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
    const isMatch = await bcrypt.compare(result.password, user.password);
    if (!isMatch)
      throw createHttpError.Unauthorized("Username/Password not valid");

    const accessToken = await signJWT({userId: user._id});

    await redisClient.set(user._id, accessToken, { EX: maxAge / 10 }); // value is in seconds be careful!!
    
    // removing secret data
    user = user.toObject();
    delete user.password;
    delete user._id;

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
    const decoded = await verifyJWT(req.signedCookies.accessToken);
    await redisClient.del(decoded.userId);
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
    verifyJWT(req.signedCookies.accessToken).
      then((response) => {
        if (uid) {
          res.setHeader('x-uid', uid)
          res.status(200).json({
            authorize: true,
            uid,
          })
        }
      })
      .catch((error) => {

      })
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
