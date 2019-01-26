var db = require("../models");

module.exports = function (app) {
    // Get all examples
    app.get("/api/games", function (req, res) {
        db.Games.findAll({}).then(function (dbGames) {
            res.json(dbGames);
        });
    });

    // Create a new example
    app.put("/api/games/:id", function (req, res) {
        db.Users.addGames(req.params.id).then(function (dbGames) {
            //how to let it know which specific user collection to update?
            //how to take the user id value and pass it into this method so it doesnt give it to a randomn user
            console.log(dbGames);
        });
    });
};



//TODO and logic
//take orms and use it to create a local instance of the database to play around with data to test it and see what we get back
//updating the users game tables when adding new game to the specific users games collection
//populating links and user data on screen
//get one method to pull user info out of database
//usernames for the seach page, user id and associate with the games
//connect the add game button to the code to update the table of user games
//user collection page,find operation against the user id and returning the games that are associated with the user
//and the game pages, pulls info on the game to fill out this page
