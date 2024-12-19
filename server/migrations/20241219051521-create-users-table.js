"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("users", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      userId: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      username: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      email: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      phone_number: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      password: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      token: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      profile_img: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      stories: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      following: {
        type: Sequelize.JSON,
        allowNull: false,
        defaultValue: "[]",
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal(
          "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
        ),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("users");
  },
};
