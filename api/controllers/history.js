const HistoryModel = require("../models/historyModel");
const _ = require("lodash");

class HistoryControllers {
  static async findAll (req, res, next) {
    try {
      const fetchHistories = await HistoryModel.findAll(req);

      if (fetchHistories.length > 0) {
        return res.status(200).json({
          message: "Successfully fetch History Data!",
          results: fetchHistories,
          request: {
            type: "GET",
            url: `/history`
          }
        })
      } else {
        return res.status(200).json({
          message: "No record/histories found",
          results: [],
          request: {
            type: "GET",
            url: `/history`
          }
        })
      }

    } catch (err) {
      next(err)
    }
  }

  static async findOne (req, res, next) {
    try {
      const id = req.params.id;

      const getDetailHistory = await HistoryModel.findOne(id);
      
      if(_.isEmpty(getDetailHistory)) {
        throw {
          name: "Custom_Error",
          status: 404,
          message: `Can't find History Detail`
        };
      }

      return res.status(200).json({
        message: "Successfully fetch Detail History!",
        result: getDetailHistory,
        request: {
          type: "GET",
          url: `/history/${id}`
        }
      });

    } catch (err) {
      next(err)
    }
  }
}

module.exports = HistoryControllers;
