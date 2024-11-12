/* eslint-disable no-param-reassign */
import { Model } from 'sequelize'
import bcrypt from 'bcryptjs'

/**
 * User model definition.
 *
 * @param {import('sequelize').Sequelize} sequelize - The Sequelize instance.
 * @param {import('sequelize/types')} DataTypes - The Sequelize DataTypes.
 * @returns {typeof Model} - The User model.
 */
const UserModel = (sequelize, DataTypes) => {
  /**
   * User class extending Sequelize Model.
   */
  class User extends Model {
    /**
     * Associate models.
     *
     * @param {object} models - The models to associate.
     */
    static associate (models) {
      // define association here
      if (models.Student) {
        models.User.hasOne(models.Student, {
          foreignKey: 'userId'
        })
      }
    }

    /**
     * Override toJSON method to exclude password.
     *
     * @returns {object} - The user object without the password.
     */
    toJSON () {
      const user = { ...this.dataValues }
      delete user.password
      return user
    }
  }

  User.init(
    {
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
          is: /^[6-9]\d{9}$/
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true
        }
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      role: {
        type: DataTypes.STRING,
        defaultValue: 'Student',
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
          isIn: [['Student', 'Teacher']]
        }
      }
    },
    {
      sequelize,
      schema: 'NITTI',
      modelName: 'User',
      hooks: {
        /**
         * Hash the password before validating the user.
         *
         * @param {User} user - The user instance.
         */
        beforeValidate: async (user) => {
          if (user.password) {
            user.password = await bcrypt.hash(user.password, 8)
          }
        }
      }
    }
  )

  return User
}

export default UserModel
