const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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

// After doc save
UserSchema.post("save", function (doc, next) {
  console.log("New user was created & saved", doc);
  next();
});

//fire a function before doc saved to db
UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.isValidPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (err) {
    throw err;
  }
};

const User = mongoose.model("user", UserSchema);

module.exports = User;
