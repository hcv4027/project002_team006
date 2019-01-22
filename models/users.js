module.exports = function (sequelize, DataTypes) {
    var Users = sequelize.define("users", {
        username: DataTypes.STRING,
    });

    Users.associate = function(models) {
        Users.hasMany(models.Games, {through: 'UserCollection', foreignKey: 'userId'});
    };
    return Users;
};

