'use strict';

const seq = require("sequelize");

module.exports = {
  /**
	 * @param {seq.QueryInterface} queryInterface
	 * @param {seq} sequelize
	 */
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("courses", {
      id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
      },
      creatorId: {
        allowNull: false,
        references: {
          key: "id",
          model: "users"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(255)
      },
      createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			}
    })
  },

  /**
	 * @param {seq.QueryInterface} queryInterface
	 * @param {seq} sequelize
	 */
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("courses");
  }
};
