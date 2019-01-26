const db = require('../models');

module.exports = function(app) {
    // Route for pulling collection
    app.get("/api/collection/:id", function(req, res) {
        let userId = req.params.id;
        let collection = userId.getGame().then(function(dbusergame) {
            res.json(dbusergame);
            console.log(collection);
        });
    });

    // Route for adding a game to a collection
    app.post("api/collection/:userId/add/:gameId", function(req,res) {
        let userId = req.params.id;
        userId.addGame(req.params.gameId).then(function(dbusergame) {
            res.json(dbusergame);
            console.log(dbusergame);
        });
    });
};