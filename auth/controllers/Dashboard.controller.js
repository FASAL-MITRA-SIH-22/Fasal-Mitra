const createHttpError = require("http-errors");

const Dashboard = require("../models/Dashboard.model");
const Plant = require("../models/Plant.model");

const getDashboardData = async (req, res, next) => {
  try {
    const mapData = Dashboard.aggregate([
      {
        $group: {
          id: { city: "$state" },
          numberOfValue: { $sum: 1 },
        },
      },
    ]);

    const plantData = Plant.aggregate([
      {
        $group: {id: {plant: "$commonName"}},
        numberOfValue: { $sum: 1 },
      }
    ])

    const result = await Promise.all([mapData, plantData])

    res.status(200).json({
      mapData: result[0],
      plantData: result[1],
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

module.exports = { getDashboardData, getTotalRequest };
