module.exports = function (sequelize, DataTypes) {
    var users = sequelize.define("users", {
        id: DataTypes.INT,
        users: DataTypes.STRING,
        games: DataTypes.STRING
    });
    return users;
};

module.exports = function (sequelize, DataTypes) {
    var games = sequelize.define("users", {
        name: DataTypes.STRING,
        id_val: DataTypes.INT,
        games: DataTypes.STRING
    });
    return games;
};