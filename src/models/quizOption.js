module.exports = (sequelize, DataTypes) => {
	const Option = sequelize.define(
		"quizOption",
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
			option: {
				allowNull: false,
				type: DataTypes.STRING(255)
			},
			answer: {
				allowNull: false,
				type: DataTypes.BOOLEAN
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
			tableName: "quizOptions",
			timestamps: true
		}
	);

	Option.associate = models => {
		Option.belongsTo(models.quizQuestion, {
			foreignKey: "questionId",
			otherKey: "id",
			as: "question"
		});

		Option.hasOne(models.quizAnswer, {
			foreignKey: "optionId",
			otherKey: "questionId",
			as: "quizAnswer"
		});
	};

	return Option;
};
