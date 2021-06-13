const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  Nama: {
    type: String,
    required: [true, "name is required!"]
  },
  Email: {
    type: String,
    required: [true, "email is required!"]
  },
  Password: {
    type: String,
    minLength: 7,
    required: [true, "password should be at least 7 characters!"]
  },
  userID: {
    type: String,
    required: [true, "user ID is required!"]
  },
  App_pin: {
    type: String,
    required: [true, "App Pin is required!"]
  },
  Alamat: {
    type: Object,
    required: [true, "alamat is required!"]
  },
  Device: {
    type: Object,
    required: [true, "device data is required!"]
  },
  Card: [
    {
      type: Schema.Types.ObjectId,
      ref: "Card",
      required: [true, "please select card!"]
    }
  ],
  History: String,
  Token: String,
  RegisteredDate: {
    type: Date,
    default: Date.now()
  }
});

module.exports = UserSchema;
