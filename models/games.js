module.exports = function (sequelize, DataTypes) {
    var Games = sequelize.define("users", {
        guid: DataTypes.STRING,
        title: DataTypes.STRING
    });
    Games.associate = function(models) {
        Games.belongsToMany(models.Users, {through: 'UserCollection', foreignKey: 'guid'})
    }
    return Games;
};

