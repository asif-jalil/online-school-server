module.exports = (sequelize, DataTypes) => {
	const Answer = sequelize.define(
		"quizAnswer",
		{
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER
			},
			questionId: {
				allowNull: false,
				references: {
					key: "id",
					model: "quizQuestions"
				},
				onDelete: "CASCADE",
				onUpdate: "CASCADE",
				type: DataTypes.INTEGER
			},
			optionId: {
				allowNull: false,
				references: {
					key: "id",
					model: "quizOptions"
				},
				onDelete: "CASCADE",
				onUpdate: "CASCADE",
				type: DataTypes.INTEGER
			},
			createdAt: {
				allowNull: false,
				type: DataTypes.DATE
			},
			updatedAt: {
				allowNull: false,
				type: DataTypes.DATE
			}
		},
		{
			tableName: "quizAnswers",
			timestamps: true
		}
	);

	// Answer.associate = models => {
	//   Answer.belongsTo(models.quizQuestion, {
	// 		foreignKey: "questionId",
	// 		otherKey: "optionId",
	// 		as: "question"
	//   });

	//   Answer.belongsTo(models.quizOption, {
	// 		foreignKey: "optionId",
	// 		otherKey: "questionId",
	// 		as: "question"
	// 	});
	// }

	return Answer;
};
