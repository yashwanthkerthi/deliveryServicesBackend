"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable("trackingdetails", {
      tracking_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      order_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        references: {
          model: {
            tableName: "orderdetails",
          },
          key: "id",
        },
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        references: {
          model: {
            tableName: "users",
          },
          key: "id",
        },
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
    await queryInterface.dropTable("trackingdetails");
  },
};




