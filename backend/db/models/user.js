'use strict';
const {
  Model, Validator
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 15],
        isAlpha: true,
        isNotEmail(value) {
          if (Validator.isEmail(value)) {
            throw new Error("Name cannot be an email.")
          }
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 256],
        isEmail: true
      }
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      validate: {
        len: [60, 60]
      }
    },
    phoneNum: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len:[10, 10],
        isValidNum(value) {
          if (!Validator.isMobilePhone(value, ['am-Am'], { strictMode: false })) {
            throw new Error("Phone number is not valid")
          }
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
    defaultScope: {
      attributes: {
        exclude: ["hashedPassword", "email", "phoneNum", "updatedAt"]
      }
    }
  });
  return User;
};
