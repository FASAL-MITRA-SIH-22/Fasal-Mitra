const mongoose = require("mongoose");

const PlantSchema = new mongoose.Schema({
  commonName: String,
  scientificName: String,
  description: String,
  thumbnail: String,
  diseases: [{ type: mongoose.SchemaTypes.ObjectId, ref: "disease" }],
});

const Plant = mongoose.model("plant", PlantSchema);

module.exports = Plant;
