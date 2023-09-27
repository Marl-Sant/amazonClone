'use strict';
const {User, Address} = require('../models')
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const userAddress = [
  {
    email: 'demo@user.io',
    addresses: [
      {
        name: 'Home',
        street: '123 Lollipop Lane',
        city: 'Townsville',
        state: 'Fl',
        addressPhoneNum: '1234567890',
        postCode: 'ABC12',
        defaultAddress: true
      },
      {
        name: 'Work',
        street: '456 Sweet Street',
        city: 'Townsville',
        state: 'Fl',
        addressPhoneNum: '0123456789',
        postCode: 'ABC12',
        defaultAddress: false
      },
    ]
  },
  {
    email: 'demo2@user.io',
    addresses: [
      {
        name: 'Home',
        street: '741 Candy Court',
        city: 'Simcity',
        state: 'Al',
        addressPhoneNum: '0987654321',
        postCode: 'DEF45',
        defaultAddress: true
      },
      {
        name: 'Work',
        street: '852 Dipped Cone Drive',
        city: 'Simcity',
        state: 'Al',
        addressPhoneNum: '0112233445',
        postCode: 'DEF45',
        defaultAddress: false
      },
    ]
  },
  {
    email: 'demo3@user.io',
    addresses: [
      {
        name: 'Home',
        street: '963 Jawbreaker Junction',
        city: 'Stormwind',
        state: 'WA',
        addressPhoneNum: '0985674321',
        postCode: 'GHI67',
        defaultAddress: true
      },
      {
        name: 'Work',
        street: '456 Rocky Road',
        city: 'Stormwind',
        state: 'WA',
        addressPhoneNum: '5443322110',
        postCode: 'GHI67',
        defaultAddress: false
      },
    ]
  }
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    for (let userIdx = 0; userIdx < userAddress.length; userIdx++) {
      const { email, addresses } = userAddress[userIdx];
      const user = await User.findOne({ where: { email } });

      
      for (let addressIdx = 0; addressIdx < addresses.length; addressIdx++) {
        const address = addresses[addressIdx];
        await Address.create({ ...address, ownerId: user.id });
      }
    }
  },

  async down (queryInterface, Sequelize) {
    
    for (let userIdx = 0; userIdx < userAddress.length; userIdx++) {
      const { email, addresses } = userAddress[userIdx];
      const user = await User.findOne({ where: { email } });

      
      for (let addressIdx = 0; addressIdx < addresses.length; addressIdx++) {
        const address = addresses[addressIdx];
        await Address.destroy({ ...address, ownerId: user.id });
      }
    }
  }
};
