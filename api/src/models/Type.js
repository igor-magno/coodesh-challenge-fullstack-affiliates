import { DataTypes } from 'sequelize'
import connection from '../db/connection.js'

const Type = connection.define('Type', {
    id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nature: {
        type: DataTypes.STRING,
        allowNull: false
    },
    operator: {
        type: DataTypes.STRING,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {});

export default Type
