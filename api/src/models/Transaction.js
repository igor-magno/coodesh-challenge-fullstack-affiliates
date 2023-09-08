import { DataTypes } from 'sequelize'
import connection from '../db/connection.js'
import Type from './Type.js'

const Transaction = connection.define('Transaction', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  typeId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  product: {
    type: DataTypes.STRING,
    allowNull: false
  },
  value: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  seller: {
    type: DataTypes.STRING,
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false
  },
  updatedAt: {
    type: DataTypes.DATE
  }
}, {})

Transaction.belongsTo(Type)

export default Transaction

