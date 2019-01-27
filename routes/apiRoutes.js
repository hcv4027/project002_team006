const db = require('../models');

module.exports = function(app) {
    app.get("/", function(req, res) {
        res.render("index");
    });
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
                user.addGame(game).then(function(dbGame) {
                    res.json(dbGame);
                    console.log(dbGame);
                });
            });
        });
    });
    // Route for a user login/creation.
    app.get("/api/user/:username", function(req, res) {
        let userName = req.params.username;
        db.User.findOrCreate({
            where: {
                username: userName
            }
        }).then(function(user){
            let handlebarsObj = {
                username: user
            };
            console.log(user);
            res.json(user);
            // res.render("index", handlebarsObj);
        });
    });
};