const createHttpError = require("http-errors");

const Dashboard = require("../models/Dashboard.model");
const Plant = require("../models/Plant.model");

const getDashboardData = async (req, res, next) => {
  try {
    const mapData = Dashboard.aggregate([
      {
        $group: {
          _id: "$state",
          numberOfValue: { $sum: 1 },
        },
      },
    ]);

    const dashboardPlantData = Dashboard.aggregate([
      {
        $group: { _id: "$plantId", numberOfValue: { $sum: 1 } },
      },
    ]);

    const dashboardDiseaseData = Dashboard.aggregate([
      {
        $group: { _id: "$diseaseId", numberOfValue: { $sum: 1 } },
      },
    ]);

    const populateData = await Promise.all([
      dashboardPlantData,
      dashboardDiseaseData,
    ]);

    const plantData = Dashboard.populate(populateData[0], {
      path: "plant",
      select: "commonName",
    });

    const diseaseData = Dashboard.populate(populateData[1], {
      path: "disease",
      select: "name",
    });

    const result = await Promise.all([mapData, plantData, diseaseData]);

    res.status(200).json({
      mapData: result[0],
      plantData: result[1].reduce(
        (acc, item) => ({
          legends: [...acc.legends, item._id],
          data: [...acc.data, item.numberOfValue],
        }),
        {}
      ),
      diseaseData: result[2].reduce(
        (acc, item) => ({
          legends: [...acc.legends, item._id],
          data: [...acc.data, item.numberOfValue],
        }),
        {}
      ),
    });
  } catch (err) {
    console.log({ err });
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
