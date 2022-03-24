const mongoose = require("mongoose");

const DiseaseSchema = new mongoose.Schema({
  name: String,
  thumbnail: String,
  symptoms: String,
  trigger: String,
  // pathogen: String,
  organic: String,
  chemical: String,
});

const Disease = mongoose.model("disease", DiseaseSchema);

module.exports = Disease;
