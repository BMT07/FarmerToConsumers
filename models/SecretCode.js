const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const secretCodeSchema = new mongoose.Schema({
  user: { type: Schema.Types.ObjectId, ref: "users" },
  date: { type: Date, default: new Date() },
  code:Number
});

module.exports = User = mongoose.model("secretcode", secretCodeSchema);