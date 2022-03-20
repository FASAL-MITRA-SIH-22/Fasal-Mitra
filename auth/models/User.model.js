const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First name is required"],
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
  },
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: [true, "Username should be unique"],
  },
  email: {
    type: String,
    unique: [true, "Email shoul be unique"]
  },
  phone: {
    type: String,
    required: [true, "Phone is required"],
    unique: [true, "Phone should be unique"],
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  type: {
    type: String,
    required: [true, "Type is required"],
  },
  detectionHistory: {
    type: [mongoose.SchemaTypes.ObjectId],
  },
});


const User = mongoose.model("user", UserSchema);

module.exports = User;
