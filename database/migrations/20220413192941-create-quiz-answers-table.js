"use strict";

const seq = require("sequelize");

module.exports = {
	/**
	 * @param {seq.QueryInterface} queryInterface
	 * @param {seq} sequelize
	 */
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable(
			"quizAnswers",
			{
				id: {
					allowNull: false,
					autoIncrement: true,
					primaryKey: true,
					type: Sequelize.INTEGER
				},
				questionId: {
					allowNull: false,
					references: {
						key: "id",
						model: "quizQuestions"
					},
					onDelete: "CASCADE",
					onUpdate: "CASCADE",
					type: Sequelize.INTEGER
				},
				optionId: {
					allowNull: false,
					references: {
						key: "id",
						model: "quizOptions"
					},
					onDelete: "CASCADE",
					onUpdate: "CASCADE",
					type: Sequelize.INTEGER
				},
				createdAt: {
					allowNull: false,
					type: Sequelize.DATE
				},
				updatedAt: {
					allowNull: false,
					type: Sequelize.DATE
				}
			},
			{
				charset: "utf8mb4",
				collate: "utf8mb4_bin"
			}
		);

    await queryInterface.addIndex("quizAnswers", {
      unique: true,
      fields: ["questionId", "optionId"]
    })
	},

	/**
	 * @param {seq.QueryInterface} queryInterface
	 * @param {seq} sequelize
	 */
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable("quizAnswers");
	}
};
