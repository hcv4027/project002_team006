module.exports = function(sequelize, DataTypes) {
  var Game = sequelize.define("games", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    guid: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });

  Game.associate = function(models) {
    Game.belongsToMany(models.users, {
      through: 'usergame'
    });
  };

  return Game;
};
