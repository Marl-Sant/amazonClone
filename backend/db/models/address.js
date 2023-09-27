'use strict';
const {
  Model, Validator
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Address.belongsTo(
        models.User,
        {foreignKey: 'ownerId'}
      )
    }
  }
  Address.init({
    ownerId: {
      type:DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type:DataTypes.STRING,
      allowNull: false
    },
    street: {
      type:DataTypes.STRING,
      allowNull: false
    },
    city: {
      type:DataTypes.STRING,
      allowNull: false
    },
    state: {
      type:DataTypes.STRING,
      allowNull: false
    },
    addressPhoneNum: {
      type:DataTypes.STRING,
      allowNull: false
    },
    postCode: {
      type:DataTypes.STRING,
      allowNull: false
    },
    defaultAddress: {
      type:DataTypes.BOOLEAN,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Address',
  });
  return Address;
};
