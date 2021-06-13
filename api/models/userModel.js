const { User } = require("../../config/db/mongo");
const bcrypt = require("bcrypt");

class UserModel {
  static findAll() {
    return User.find().select
    (
      "-_id -Password"
    ).
    populate
    (
      "Card"
    );
  }

  static findOne(value) {
    return User.findOne(value).populate("Card");
  }

  static createOne(insertData) {
    const password = insertData.Password.length > 6 ?
    bcrypt.hashSync(insertData.Password, 10) : "";

    insertData.Password = password;

    return User.create(insertData);
  }
}

module.exports = UserModel;
