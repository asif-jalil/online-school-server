const { Sequelize, Op } = require("sequelize");
const models = require("../../models");

module.exports = async userId => {
	let user = await models.user.findOne({
    where: { id: userId },
    include: {
      model: models.course,
      as: "courses"
    }
  });

  await user.updateLastLoginAt();
  delete user.lastLoginAt;
  
  user = user.toJSON();

  return user;
};
