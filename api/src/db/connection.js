import { Sequelize } from 'sequelize'
import _config from './config.js'

const config = _config[process.env.NODE_ENV || 'development']

const connection = new Sequelize(config.database, config.username, config.password, {
    dialect: config.dialect,
    host: config.host,
    port: config.port,
    logging: false
})

export default connection
