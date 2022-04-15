"use strict";

const seq = require("sequelize");

module.exports = {
	/**
	 * @param {seq.QueryInterface} queryInterface
	 * @param {seq} sequelize
	 */
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable(
			"enrollment",
			{
				id: {
					allowNull: false,
					autoIncrement: true,
					primaryKey: true,
					type: Sequelize.INTEGER
				},
				userId: {
					allowNull: false,
					references: {
						key: "id",
						model: "users"
					},
					onDelete: "CASCADE",
					onUpdate: "CASCADE",
					type: Sequelize.INTEGER
				},
				courseId: {
					allowNull: false,
					references: {
						key: "id",
						model: "courses"
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

    await queryInterface.addIndex("enrollment", {
      unique: true,
      fields: ["userId", "courseId"]
    })
	},

	/**
	 * @param {seq.QueryInterface} queryInterface
	 * @param {seq} sequelize
	 */
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable("enrollment");
	}
};
