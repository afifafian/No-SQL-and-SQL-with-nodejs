const { Card } = require("../../config/db/mongo");
const bcrypt = require("bcrypt");

class CardModel {
  static findAll(req) {
    console.log(req.userData)
    return Card.find({ Username: req.userData.name });
  }

  static insert(data) {
    
    const cardName = data.cardName.length > 0 ? bcrypt.hashSync(data.cardName, 10) 
    : "";
    
    const cvv = data.CVV.length > 2 ? bcrypt.hashSync(data.CVV, 10) 
    : "";

    const cardNumber = data.cardNumber.length > 15 ? bcrypt.hashSync(data.cardNumber, 10) 
    : "";

    data.CVV = cvv;
    data.cardNumber = cardNumber;
    data.cardName = cardName;

    return Card.create(data);
  }

  static findOne(value) {
    return Card.findOne(value);
  }

  static update(_id, body) {
    const cardName = body.cardName.length > 0 ? bcrypt.hashSync(body.cardName, 10) 
    : "";
    
    const cvv = body.CVV.length > 2 ? bcrypt.hashSync(body.CVV, 10) 
    : "";

    const cardNumber = body.cardNumber.length > 15 ? bcrypt.hashSync(body.cardNumber, 10) 
    : "";

    body.CVV = cvv;
    body.cardNumber = cardNumber;
    body.cardName = cardName;

    return Card.updateOne({ _id }, body, { runValidators: true });
  }

  static async delete(value) {
    return Card.deleteOne(value);
  }
}

module.exports = CardModel;
