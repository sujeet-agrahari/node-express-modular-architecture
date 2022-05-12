/* eslint-disable no-param-reassign */
const { Model } = require('sequelize');
const bcrypt = require('bcryptjs');

/**
 *
 * @param {import('sequelize').Sequelize} sequelize
 * @param {import('sequelize/types')} DataTypes
 * @returns
 */
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    // with static add custom class method
    static associate(models) {
      // define association here
      if (models.Student) {
        models.User.hasOne(models.Student, {
          foreignKey: 'userId'
        });
      }
    }

    // add instance method here, below overrides toJSON()
    toJSON() {
      const user = { ...this.dataValues };
      delete user.password;
      return user;
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
        // before validate will be called before beforeCreate, so it will throw validation error if used beforeCreate
        beforeValidate: async (user) => {
          if (user.password) {
            user.password = await bcrypt.hash(user.password, 8);
          }
        }
      }
    }
  );
  return User;
};
