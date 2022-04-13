const mongoose = require("mongoose");

const DashoardSchema = new mongoose.Schema(
  {
    createdAt: Date,
    ip: String,
    location: {
      x: Number,
      y: Number,
    },
    plantId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "plants",
    },
    diseaseId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "disease",
    },
    rating: Number,
    city: String,
    district: String,
    state: String,
  },
  { collection: "detectionHistory" }
);

const Dashboard = mongoose.model("detectionHistory", DashoardSchema);

module.exports = Dashboard;
