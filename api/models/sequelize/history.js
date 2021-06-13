module.exports = (sequelize, type) => {
  return sequelize.define('histories', {        
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: type.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "User Id is required!"
        },
        notEmpty: {
          msg: "User Id is required!"
        }
      }
    },
    card_id: {
      type: type.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Card Id is required!"
        },
        notEmpty: {
          msg: "Card Id is required!"
        }
      }
    },
    merchant: type.STRING,
    success: type.BOOLEAN,
    created_date: {
      type : 'TIMESTAMP',
      defaultValue: sequelize.NOW,
      allowNull:true
    }
  },
  {
    timestamps: false,
    freezeTableName: true
  })
}
