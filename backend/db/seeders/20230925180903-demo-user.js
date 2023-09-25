'use strict';

const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Users';
    return queryInterface.bulkInsert(options, [
      {
        name: 'Demo User',
        email: 'demo@user.io',
        hashedPassword: bcrypt.hashSync('password'),
        phoneNum: '1234567890'
      },
      {
        name: 'Marlon Santos',
        email: 'demo2@user.io',
        hashedPassword: bcrypt.hashSync('password'),
        phoneNum: '0987654321'
      },
      {
        name: 'abc',
        email: 'demo3@user.io',
        hashedPassword: bcrypt.hashSync('password'),
        phoneNum: '0985674321'
      }
    ], {})
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      email: { [Op.in]: ['demo@user.io', 'demo2@user.io', 'demo3@user.io'] }
    }, {});
  }
};
