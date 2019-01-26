module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("users", {
    username: DataTypes.STRING
  });

  User.associate = function(models) {
    User.belongsToMany(models.games, {
      through: 'usergame'
    });
  };

  return User;
};
