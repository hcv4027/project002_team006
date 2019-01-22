module.exports = function (sequelize, DataTypes) {
    var Games = sequelize.define("users", {
        id: DataTypes.STRING,
        //TODO Look into Guid datatypes
        guid: DataTypes.(),
        name: DataTypes.STRING
    });
    Games.associate = function(models) {
        Games.belongsTo(models.Users, {
            foreignKey: {
                allowNull: false
            }
        })
    }
    return Games;
};

