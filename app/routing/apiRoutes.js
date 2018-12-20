var friends = require("../data/friends");

var apiRoutes = function(app){
    app.get("/api/friends", function(req, res){
        res.json(friends);
    });

    app.post("/api/friends", function(req, res){
        var bestFriend = {
            name: "",
            friendDifference: Infinity
        }

        var userData = req.body;
        var userScores = userData.scores;

        var scoreDifference;

        for (var i = 0; i < friends.length; i++){
            var friend = friends[i];
            scoreDifference = 0;

            console.log(friend.name);

            for (var j = 0; j < friend.scores.length; j++){
                scoreDifference += Math.abs(parseInt(req.body.scores[j]) - parseInt(friend.scores[j]));
            }

            if (scoreDifference <= bestFriend.friendDifference) {
                bestFriend.name = friend.name;
                bestFriend.friendDifference = scoreDifference;
            }
        }

        friends.push(req.body);
        res.json(bestFriend);
    });
}

module.exports = apiRoutes;