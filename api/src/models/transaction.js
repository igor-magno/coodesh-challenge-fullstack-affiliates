'use strict';
const {
  Model, Transaction
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
    }
  }
  Transaction.init({
    type: DataTypes.INTEGER,
    date: DataTypes.DATE,
    product: DataTypes.STRING,
    value: DataTypes.INTEGER,
    seller: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  Transaction.Type = Transaction.belongsTo(Type)
  return Transaction;
};
