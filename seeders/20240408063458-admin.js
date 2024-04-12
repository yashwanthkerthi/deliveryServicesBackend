'use strict';
const bcrypt = require("bcryptjs");
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash("admin", salt);
    return queryInterface.bulkInsert('users', [{
      first_name: 'Admin',
      last_name:"@Delivery services",
      email: 'admin@gmail.com',
      password,
      mobile_number: "9876543210",
      user_role: 2,
      created_at: new Date(),
      updated_at: new Date()
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
