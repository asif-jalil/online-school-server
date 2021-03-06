module.exports = (sequelize, DataTypes) => {
	const Course = sequelize.define(
		"course",
		{
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER
			},
			creatorId: {
				allowNull: false,
				references: {
					key: "id",
					model: "users"
				},
				onDelete: "CASCADE",
				onUpdate: "CASCADE",
				type: DataTypes.INTEGER
			},
			name: {
				allowNull: false,
				type: DataTypes.STRING(255)
			},
			courseDomain: {
				allowNull: false,
				type: DataTypes.STRING(36)
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
			tableName: "courses",
			timestamps: true
		}
	);

	Course.associate = models => {
		Course.belongsToMany(models.user, {
			through: models.enrollment,
			foreignKey: "courseId",
			otherKey: "userId",
			as: {
				singular: "user",
				plural: "users"
			}
		})

		Course.belongsTo(models.user, {
			foreignKey: "creatorId",
			otherKey: "id",
			as: "mentor"
		});

		Course.hasMany(models.quizQuestion, {
			foreignKey: "courseId",
			otherKey: "id",
			as: {
				singular: "question",
				plural: "questions"
			}
		});
	};

	return Course;
};
