const mongoose = require("mongoose");
const UserSchema = require("../../api/models/schema/userSchema");
const CardSchema = require("../../api/models/schema/cardSchema");

mongoose.connect(process.env.DB_URL, { 
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("Connected Successfully to Database!")
})
.catch(err => {
  console.log(`Error while connecting to Database: ${err}`)
});

const User = mongoose.model("User", UserSchema);
const Card = mongoose.model("Card", CardSchema);

module.exports = {
  User,
  Card
};
