"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("address", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      from_address: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      from_email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      from_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      from_mobile_number: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      from_pincode: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      from_address: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      to_email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      to_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      to_mobile_number: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      to_pincode: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("address");
  },
};
