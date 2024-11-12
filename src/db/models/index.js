/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */

import { Sequelize } from 'sequelize'
import configFile from '../../../config/dbConfig.js'
import UserModel from './User.js'

/**
 * Initializes and configures the Sequelize instance and models.
 * @module db/models
 */

const env = process.env.NODE_ENV || 'development'
const config = configFile[env]
const db = {}

let sequelize
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config)
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    process.env.DB_PASSWORD,
    config
  )
}

db.User = UserModel(sequelize, Sequelize.DataTypes)

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

export { sequelize, Sequelize }

export default db
