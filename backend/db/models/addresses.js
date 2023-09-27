'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Addresses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Addresses.init({
    ownerId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    street: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    addressPhoneNum: DataTypes.STRING,
    postCode: DataTypes.STRING,
    defaultAddress: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Addresses',
  });
  return Addresses;
};