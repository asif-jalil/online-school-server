"use strict";

const seq = require("sequelize");

module.exports = {
	/**
	 * @param {seq.QueryInterface} queryInterface
	 * @param {seq} sequelize
	 */
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable(
			"quizOptions",
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
				option: {
					allowNull: false,
					type: Sequelize.STRING(255)
				},
				answer: {
					allowNull: false,
					type: Sequelize.BOOLEAN
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

		await queryInterface.addIndex("quizOptions", {
			fields: ["questionId", "answer"]
		});
	},

	/**
	 * @param {seq.QueryInterface} queryInterface
	 * @param {seq} sequelize
	 */
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable("quizOptions");
	}
};
