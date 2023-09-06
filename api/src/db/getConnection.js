import { Sequelize } from 'sequelize'

const getConnection = () => {
    return new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
        host: process.env.DB_HOST,
        dialect: process.env.DB_CONNECTION,
        // Choose one of the logging options
        // logging: console.log,                  // Default, displays the first parameter of the log function call
        // logging: (...msg) => console.log(msg), // Displays all log function call parameters
        // logging: false,                        // Disables logging
        // logging: msg => logger.debug(msg),     // Use custom logger (e.g. Winston or Bunyan), displays the first parameter
        // logging: logger.debug.bind(logger)     // Alternative way to use custom logger, displays all messages
    })
}

export default getConnection
