const db = require('../models');

module.exports = function(app) {
    // Route for pulling collection
    app.get("/api/collection/:id", function(req, res) {
        let userId = req.params.id;
        db.User.findById(userId).then(function(user){
            user.getGames().then(function (dbusergame) {
                let handlebarsObj = {
                    collection: dbusergame
                };                
                console.log(handlebarsObj);
                res.json(handlebarsObj);
                // res.render("index", handlebarsObj);
            })
        });
    });
    // Route for adding a game to a collection
    app.get("/api/collection/:userId/add/:gameId", function(req,res) {
        let userId = req.params.userId;
        let gameId = req.params.gameId;
        db.User.findById(userId).then(function(user){
            db.Game.findById(gameId).then(function(game){
                user.addGame(game).then(function(dbusergame) {
                    res.json(dbusergame);
                    console.log(dbusergame);
                });
            });
        });
    });
};