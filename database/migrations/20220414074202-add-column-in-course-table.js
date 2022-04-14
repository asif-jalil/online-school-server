"use strict";

const seq = require("sequelize");

module.exports = {
	/**
	 * @param {seq.QueryInterface} queryInterface
	 * @param {seq} sequelize
	 */
	up: async (queryInterface, Sequelize) => {
		await queryInterface.addColumn("courses", "courseDomain", {
			allowNull: false,
			type: Sequelize.STRING(36)
		});

		await queryInterface.addIndex("courses", {
			fields: ["courseDomain"],
			unique: true
		});
	},

	/**
	 * @param {seq.QueryInterface} queryInterface
	 * @param {seq} sequelize
	 */
	down: async (queryInterface, Sequelize) => {
		await queryInterface.removeColumn("courses", "courseDomain");
	}
};
