const bcrypt = require("bcrypt");

const hashPasswordHook = function (user) {
	if (!user.changed("password")) return;
	// eslint-disable-next-line consistent-return
	return bcrypt.hash(user.password, 10).then(hashedPassword => {
		user.setDataValue("password", hashedPassword);
	});
};

module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define(
		"user",
		{
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.INTEGER
			},
			name: {
				allowNull: true,
				type: DataTypes.STRING(100)
			},
			email: {
				allowNull: false,
				type: DataTypes.STRING(100),
				unique: true
			},
			password: {
				allowNull: false,
				type: DataTypes.STRING
			},
			status: {
				allowNull: false,
				type: DataTypes.ENUM(["banned", "approved"]),
				defaultValue: "approved"
			},
			role: {
				allowNull: false,
				type: DataTypes.ENUM(["admin", "teacher", "student"]),
				defaultValue: "student"
			},
			contact: {
				allowNull: true,
				type: DataTypes.STRING(100)
			},
			lastLoginAt: {
				allowNull: true,
				type: DataTypes.DATE
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
			tableName: "users",
			defaultScope: {
				attributes: {
					exclude: ["password"]
				}
			}
		}
	);

	User.associate = models => {
		User.hasMany(models.course, {
			foreignKey: "creatorId",
			otherKey: "id",
			as: {
				singular: "course",
				plural: "courses"
			}
		});
	};

	User.prototype.comparePassword = function (password) {
		// note: remember to add unscoped() to the user query
		return bcrypt.compare(password, this.getDataValue("password"));
	};

	User.prototype.updateLastLoginAt = function () {
		return this.update({ lastLoginAt: new Date() }, { silent: true });
	};

	User.addHook("beforeCreate", hashPasswordHook);
	User.addHook("beforeUpdate", hashPasswordHook);

	return User;
};
