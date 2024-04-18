const User = require("../models/User.model");
const createHttpError = require("http-errors");
const ipInfo = require("ip-info-finder");
const bcrypt = require("bcrypt");

const { signJWT } = require("../helpers/jwtSign.helper");
const { verifyJWT } = require("../helpers/jwtVerify.helper");
const { redisClient } = require("../configs/redis.config");
const {
  registerSchema,
  loginSchema,
} = require("../validations/Auth.validation");

const maxAge = process.env.EXPIRATION_TIME || 2617920000;

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

      if (result.email && existingUser.email === result.email)

        throw createHttpError.Conflict(
          `${result.email} is already been registered`
        );
    }

    const salt = await bcrypt.genSalt(10);
    result["password"] = await bcrypt.hash(result.password, salt);

    const avatar = `https://ui-avatars.com/api/?background=random&name=${result.firstName}%20${result.lastName}&size=128&format=svg`;

    const user = new User({...result, avatar});
    let savedUser = await user.save();

    const accessToken = await signJWT({ userId: savedUser._id });

    await redisClient.set(savedUser._id.toString(), accessToken, { EX: maxAge / 10 }); // value is in seconds be careful!!

    // removing secret data
    savedUser = savedUser.toObject();
    delete savedUser.password;
    delete savedUser._id;

    return res
      .cookie("accessToken", accessToken, cookieOptions)
      .status(201)
      .json({
        message: "Registered successfully",
        user: savedUser,
      });
  } catch (err) {
    if (err.isJoi === true) {
      console.log(err);
      return next(createHttpError.UnprocessableEntity("Invalid Credentials"));
    }

    // mongoDB duplicate error
    if (err.code === 11000) {
      return next(createHttpError.Conflict(err.name));
    }
    console.log(err);

    next(err);
  }
};

const viewAccount = async (req, res, next) => {
  try {
    const decoded = await verifyJWT(req.signedCookies.accessToken);

    let user = await User.findById(decoded.userId);

    if (!user) createHttpError.NotFound("User not registered");

    // removing secret data
    user = user.toObject();
    delete user.password;
    delete user._id;

    res.status(200).json({ user });
  } catch (err) {
    next(createHttpError.Unauthorized());
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

    const accessToken = await signJWT({ userId: user._id });

    await redisClient.set(user._id.toString(), accessToken, { EX: maxAge / 10 }); // value is in seconds be careful!!

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
    const decoded = await verifyJWT(req.signedCookies.accessToken);

    if (!decoded?.userId) throw createHttpError.Unauthorized();

    // let ipData = await ipInfo.getIPInfo(req.ip);
    let ipData
    ipData = { status: "fail" }
    if (ipData.status === "fail") {
      ipData = {
        as: "AS17488 Hathway IP Over Cable Internet",
        asname: "HATHWAY-NET-AP",
        city: "Mumbai",
        continent: "Asia",
        continentCode: "AS",
        country: "India",
        countryCode: "IN",
        currency: "INR",
        district: "",
        hosting: false,
        isp: "Hathway IP over Cable Internet Access",
        lat: 19.0748,
        lon: 72.8856,
        mobile: false,
        offset: 19800,
        org: "",
        proxy: false,
        query: "115.98.234.55",
        region: "MH",
        regionName: "Maharashtra",
        status: "success",
        timezone: "Asia/Kolkata",
        zip: "400070",
      };
    }

    res.setHeader("uid", decoded.userId);
    res.setHeader("ip", req.ip);
    res.setHeader("city", ipData.city.toLowerCase());
    res.setHeader("district", ipData.district.toLowerCase());
    res.setHeader("state", ipData.region);
    res.setHeader("lat", ipData.lat);
    res.setHeader("lon", ipData.lon);

    res.status(200).json({
      authorize: true,
      uid: decoded.userId,
    });
  } catch (err) {
    console.log({ err });
    next(createHttpError.Unauthorized());
  }
};

module.exports = {
  register,
  viewAccount,
  login,
  logout,
  authorization,
};
