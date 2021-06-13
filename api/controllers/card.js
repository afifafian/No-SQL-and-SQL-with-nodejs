const CardModel = require("../models/cardModel");
const HistoryModel = require("../models/historyModel");
const FormCard = require("../dto/request/formCard");
const FormHistory = require("../dto/request/formHistory");
const _ = require("lodash");

class CardControllers {
  static async findAll (req, res, next) {
    try {
      const fetchCards = await CardModel.findAll(req)

      if (fetchCards.length > 0) {
        return res.status(200).json({
          message: "Successfully fetch Card Data!",
          results: fetchCards,
          request: {
            type: "GET",
            url: `/card`
          }
        })
      } else {
        return res.status(200).json({
          message: "No cards found, please insert your card data first",
          results: [],
          request: {
            type: "GET",
            url: `/card`
          }
        })
      }
      
    } catch (err) {
      next(err)
    }
  }

  static async insert (req, res, next) {
    try {
      const input = new FormCard();

      const dataHistory = new FormHistory();
      
      Object.keys(input).forEach((key) => {        
        if (req.body.hasOwnProperty(key)) {
          if (!_.isEmpty(req.body[key])) {
            input[key] = req.body[key];
          }
        }
      });
      input.Username = req.userData.name;

      const createCard = await CardModel.insert(input);

      dataHistory.user_id = req.userData.userID;
      dataHistory.card_id = createCard._id.toString();

      await HistoryModel.insert(dataHistory);

      return res.status(201).json({
        message: "Successfully Add new Card!",
        data: createCard,
        request: {
          type: "POST",
          url: `/card`
        }
      });

    } catch (err) {
      next(err)
    }
  }

  static async update (req, res, next) {
    try {
      const _id = req.params.id;
      const input = new FormCard();

      if (!_id.match(/^[0-9a-fA-F]{24}$/)){
        throw {
          name: "Custom_Error",
          status: 400,
          message: `Invalid Parameter ID!`
        };
      }

      const getDetailCard = await CardModel.findOne({_id});

      if (_.isEmpty(getDetailCard)) {
        throw {
          name: "Custom_Error",
          status: 404,
          message: `Card Data is not found!`
        };
      }

      Object.keys(input).forEach((key) => {        
        if (req.body.hasOwnProperty(key)) {
          if (!_.isEmpty(req.body[key])) {
            input[key] = req.body[key];
          }
        }
      });
      input.Username = req.userData.name;

      const updateCard = await CardModel.update(_id, input);

      return res.status(200).json({
        message: "Successfully updated Card data!",
        totalUpdated: updateCard.nModified,
        request: {
          type: "PUT",
          url: `/card/${_id}`
        }
      });
    } catch (err) {
      next(err)
    }
  }

  static async destroy (req, res, next) {
    try {
      const _id = req.params.id;

      if (!_id.match(/^[0-9a-fA-F]{24}$/)){
        throw {
          name: "Custom_Error",
          status: 400,
          message: `Invalid Parameter ID!`
        };
      }

      const getDetailCard = await CardModel.findOne({_id});

      if (_.isEmpty(getDetailCard)) {
        throw {
          name: "Custom_Error",
          status: 404,
          message: `Card Data is not found!`
        };
      }

      const deleteCard = await CardModel.delete({_id});

      return res.status(200).json({
        message: "Successfully deleted Card data!",
        totalDeleted: deleteCard.deletedCount,
        request: {
          type: "DELETE",
          url: `/card/${_id}`
        }
      });

    } catch (err) {
      next(err)
    }
  }    
}

module.exports = CardControllers;
