module.exports = function (sequelize, DataTypes) {
    var Users = sequelize.define("users", {
        users: DataTypes.STRING,
        games: DataTypes.STRING
    });

User.associate = function(models) {
    User.hasMany(models.Games, {
        onDelete: "cascade"
    });
};
    return Users;
};

