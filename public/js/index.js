let userId;
let gameId;
// Prompt the user for their username upon page load.
$(document).ready(function() {
    // Initialize Materialize modal
    // $('.modal').modal();
    usernameSelect();
    gameSearch();
});


    // Display modal for user selection
    // $('#userSelection').modal('open');


// On clicking the Submit button, this will run the API route for user login/creation.  Returned object will be used to populate #username, as well as store the userId global variable for later use.
function usernameSelect() {
    $('#usernameInput').on("click", function(event){
        if (userId == null) {
            // Pull username string out of text input
            let userCheck = $('#usernameText').val().trim();
            // Hit API and run the route for user login/creation
            $.ajax('/api/user/'+userCheck)
                // What to do with promise
                .then(
                    function(result) {
                        console.log("Result of usernameSelect():");
                        // Sequelize's .findOrCreate() method returns results in an array, so we must select the first index value to get actual user data.
                        console.log(result[0]);
                        // Map the primary key id value of the returned user to the global userId variable, for later queries.
                        userId = result[0].id;
                        console.log("userId is "+userId);
                        // Display the returned username in the appropriate div element.
                        let usernameDiv = $('#username');
                        usernameDiv.append(result[0].username);
                        showCollection();
                    }
                );
            }
        });
}

// Upon pressing the enter key in the search box, query the Giant Bomb API using the game name specified by the user in the search box.  We'll use the query results to build the table of search results.
function gameSearch() {
    // Keypress event targeted to the search box
    $('#search').keypress(function(event){
        // Checks to ensure Enter keypress
        if(event.which == 13) {
            // Check to see if user is logged in
            if (userId != null) {
            // Map the text written in search box to variable gameTitle
            let gameTitle = $('#search').val().trim();
            // Run AJAX query against API route for search then perform some logic with the response.
            $.ajax('/api/search/'+gameTitle).then(function(response){
                console.log("Results:");
                console.log(response);
                console.log("Name is: "+response.results[0].name);
                console.log("Boxart URL is: "+response.results[0].image.icon_url);
                console.log("First platform listed is: "+response.results[0].platforms[0].abbreviation);
                console.log("Guid is: "+response.results[0].guid);
                // Big block of table construction using jQuery!  This will create a table displaying the results of the search query, with buttons to add a game to your collection.
                let resultsTableDiv = $('#searchResults');
                let resultsTableMain = $('<table>');
                let resultsTableBody = $('<tbody>');
                resultsTableDiv.append(resultsTableMain);
                resultsTableDiv.append(resultsTableBody);
                for (let i = 0; i < response.results.length; i++) {
                    let currentResults = response.results[i];
                    let resultsTableRow = $('<tr>');
                    resultsTableDiv.append(resultsTableRow);
                    let resultsTableBoxartDisplay = $('<td>');
                    let resultsTableBoxart = $('<img>');
                    resultsTableBoxart.attr('src', currentResults.image.icon_url);
                    resultsTableBoxart.attr("data-boxart"+i, currentResults.image.icon_url);
                    resultsTableBoxartDisplay.append(resultsTableBoxart);
                    resultsTableDiv.append(resultsTableBoxartDisplay);
                    let resultsTableNameDisplay = $('<td>');
                    let resultsTableName = currentResults.name;
                    // Store the Title of the game for use in collection add
                    resultsTableNameDisplay.attr("data-name"+i, currentResults.name);
                    resultsTableNameDisplay.attr("id", "gameNameResult"+i);
                    resultsTableNameDisplay.append(resultsTableName);
                    resultsTableDiv.append(resultsTableNameDisplay);
                    let resultsTablePlatformsDisplay = $('<td>');
                    let currentResultsPlatformLength;
                    if (currentResults.platforms === null) {
                        currentResultsPlatformLength = 0;
                    } else {
                        currentResultsPlatformLength = currentResults.platforms.length;
                    };
                    console.log("Result "+i+" platforms.length is "+currentResultsPlatformLength);
                    for (let j = 0; j < currentResultsPlatformLength; j++) {
                        let platformLoop = currentResults.platforms[j].abbreviation;
                        resultsTablePlatformsDisplay.append(platformLoop);
                        resultsTablePlatformsDisplay.attr("data-platforms"+i, platformLoop);
                        if (j < (currentResults.platforms.length - 1)) {
                            resultsTablePlatformsDisplay.append(" / ");
                        }
                    }
                    resultsTableDiv.append(resultsTablePlatformsDisplay);
                    let resultsTableButtonDisplay = $('<td>');
                    let resultsTableButton = $('<a>');
                    resultsTableButton.addClass("btn-floating btn-small waves-effect waves-light grey darken-1 addToCollection");
                    resultsTableButton.attr("data-guid", currentResults.guid);
                    resultsTableButton.attr("data-resultId", i);
                    let resultsTableButtonIcon = $('<i>');
                    resultsTableButtonIcon.addClass("material-icons")
                    resultsTableButtonIcon.append("save")
                    resultsTableButton.append(resultsTableButtonIcon);
                    resultsTableButtonDisplay.append(resultsTableButton);
                    resultsTableDiv.append(resultsTableButtonDisplay);
                }
                addToCollection();
            });
            }
        }
    });
}

// Function to add a game from search results to your collection.
function addToCollection() {
    $(".addToCollection").on("click", function() {
        let resultId = $(this).attr("data-resultId");
        let titleId = "#gameNameResult"+resultId;
        let dataId = "data-name"+resultId;
        let title = $(titleId).attr(dataId);
        let guid = $(this).attr("data-guid");
        // Query our API to check to see if the game already exists.  If it doesn't, create it in our games table, then add it to collection.  If it does, just add to collection.
        $.ajax('/api/game/'+title+'/'+guid)
            .then(function(response) {
                console.log(response);
                let gameId = response[0].id
                console.log("Ajax query to local API complete.  gameId is: "+gameId);
                $.ajax('/api/collection/'+userId+'/add/'+gameId)
                    .then(function(response) {
                        console.log("Add to collection response is:");
                        console.log(response);
                        $("#searchResults").empty();
                    });
            });
    });
}

function showCollection() {
    $.ajax('/api/collection/'+userId).then(function(response){
        // Big block of table construction using jQuery!  This will create a table displaying the user's collection, with buttons to remove a game from your collection.
        let resultsTableDiv = $('#collection');
        let resultsTableMain = $('<table>');
        let resultsTableBody = $('<tbody>');
        resultsTableDiv.append(resultsTableMain);
        resultsTableDiv.append(resultsTableBody);
        // for (let i = 0; i < response.collection.length; i++) {
        //     let currentResults = response.collection[i];
        //     let resultsTableRow = $('<tr>');
        //     resultsTableDiv.append(resultsTableRow);
        //     let resultsTableBoxartDisplay = $('<td>');
        //     let resultsTableBoxart = $('<img>');
        //     resultsTableBoxart.attr('src', currentResults.image.icon_url);
        //     resultsTableBoxartDisplay.append(resultsTableBoxart);
        //     resultsTableDiv.append(resultsTableBoxartDisplay);
        //     let resultsTableNameDisplay = $('<td>');
        //     let resultsTableName = currentResults.name;
        //     // Store the Title of the game for use in collection add
        //     resultsTableNameDisplay.attr("data-name"+i, currentResults.name);
        //     resultsTableNameDisplay.attr("id", "collectionGameResult"+i);
        //     resultsTableNameDisplay.append(resultsTableName);
        //     resultsTableDiv.append(resultsTableNameDisplay);
        //     let resultsTablePlatformsDisplay = $('<td>');
        //     for (let j = 0; j < currentResults.platforms.length; j++) {
        //         let platformLoop = currentResults.platforms[j].abbreviation;
        //         resultsTablePlatformsDisplay.append(platformLoop);
        //         if (j < (currentResults.platforms.length - 1)) {
        //             resultsTablePlatformsDisplay.append(" / ");
        //         }
        //     }
        //     resultsTableDiv.append(resultsTablePlatformsDisplay);
        //     let resultsTableButtonDisplay = $('<td>');
        //     let resultsTableButton = $('<a>');
        //     resultsTableButton.addClass("btn-floating btn-small waves-effect waves-light grey darken-1 removeFromCollection");
        //     resultsTableButton.attr("data-guid", currentResults.guid);
        //     resultsTableButton.attr("data-resultId", i);
        //     let resultsTableButtonIcon = $('<i>');
        //     resultsTableButtonIcon.addClass("material-icons")
        //     resultsTableButtonIcon.append("delete_forever")
        //     resultsTableButton.append(resultsTableButtonIcon);
        //     resultsTableButtonDisplay.append(resultsTableButton);
        //     resultsTableDiv.append(resultsTableButtonDisplay);
        // }
    });
}