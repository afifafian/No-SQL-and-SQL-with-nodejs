const { History } = require("../../config/db/sequelize");

class HistoryModel {
  static async findAll(req) {
    try {
      const getHistories = await History.findAll({
        where: {
          user_id: req.userData.userID
        }
      });
      return getHistories;

    } catch (err) {
      console.log(err)
    }
  }

  static async findOne(id) {
    try {
      const getHistory = await History.findOne({
        where: { id }
      });
      return getHistory;
    } catch (err) {
      console.log(err)
    }
  }

  static async insert(data) {
    try {
      const createHistory = await History.create(data);
      return createHistory;
    } catch (err) {
      console.log(err)
    }
  }
}

module.exports = HistoryModel;
