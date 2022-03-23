const mongoose = require("mongoose");

const DashoardSchema = new mongoose.Schema({
  createdAt: Date,
  ip: String,
  location: {
    x: Number,
    y: Number,
  },
  plantId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "plant",
  },
  diseaseId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "disease",
  },
  rating: Number,
  city: String,
  district: String,
  state: String,
});

const Dashboard = mongoose.model("dashboard", DashoardSchema);

module.exports = Dashboard;