module.exports = (sequelize, DataTypes) => {
	const Question = sequelize.define(
		"quizQuestion",
		{
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER
			},
			courseId: {
				allowNull: false,
				references: {
					key: "id",
					model: "courses"
				},
				onDelete: "CASCADE",
				onUpdate: "CASCADE",
				type: DataTypes.INTEGER
			},
			question: {
				allowNull: false,
				type: DataTypes.STRING(255)
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
			tableName: "quizQuestions",
			timestamps: true
		}
	);

	Question.associate = models => {
		Question.belongsTo(models.course, {
			foreignKey: "courseId",
			otherKey: "id",
			as: "course"
		});

		Question.hasMany(models.quizOption, {
			foreignKey: "questionId",
			otherKey: "id",
			as: {
				singular: "option",
				plural: "options"
			}
		});

		Question.hasOne(models.quizAnswer, {
			foreignKey: "questionId",
			otherKey: "optionId",
			as: "answer"
		});
	};

	return Question;
};
