module.exports = (sequelize, DataTypes) => {
	const Enroll = sequelize.define(
		"enrollment",
		{
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER
			},
			userId: {
				allowNull: false,
				references: {
					key: "id",
					model: "users"
				},
				onDelete: "CASCADE",
				onUpdate: "CASCADE",
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
			tableName: "enrollment",
			timestamps: true
		}
	);

	return Enroll;
};
