const createHttpError = require("http-errors");

const Dashboard = require("../models/Dashboard.model");

const getMapData = async (req, res, next) => {
  try {
    const result = await Dashboard.aggregate([
      {
        $group: {
          _id: { city: "$city" },
          numberOfDetection: { $sum: 1 },
          plantIds: { $push: "$plantId" },
          location: { $first: "$location" },
        },
      },
    ]);

    const getDataPerCity = await Dashboard.populate(result);

    res.status(200).json({
      data: getDataPerCity,
    });
  } catch (err) {
    next(err);
  }
};

const getTotalRequest = async (res, req, next) => {
  try {
    const result = await Dashboard.aggregate([
      {
        $group: {
          _id: null,
          totalRequest: { $sum: 1 },
        },
      },
    ]);

    return res.status(200).json({
      data: result,
    });
  } catch (err) {
    next();
  }
};

module.exports = { getMapData, getTotalRequest };
