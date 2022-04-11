"use strict";

const seq = require("sequelize");

module.exports = {
	/**
	 * @param {seq.QueryInterface} queryInterface
	 * @param {seq} sequelize
	 */
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("users", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			name: {
				allowNull: true,
				type: Sequelize.STRING(100)
			},
			email: {
				allowNull: false,
				type: Sequelize.STRING(100),
				unique: true
			},
			password: {
				allowNull: false,
				type: Sequelize.STRING
			},
			status: {
				allowNull: false,
				type: Sequelize.ENUM(["banned", "approved"]),
				defaultValue: "approved"
			},
			role: {
				allowNull: false,
				type: Sequelize.ENUM(["admin", "teacher", "student"]),
				defaultValue: "student"
			},
			contact: {
				allowNull: true,
				type: Sequelize.STRING(100)
			},
			lastLoginAt: {
				allowNull: true,
				type: Sequelize.DATE
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			}
		});
	},

	/**
	 * @param {seq.QueryInterface} queryInterface
	 * @param {seq} sequelize
	 */
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable("users");
	}
};
