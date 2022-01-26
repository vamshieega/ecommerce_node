const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    mobileNo: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  //timestamp will provide by the mongoose to capture the exact time
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
