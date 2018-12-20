var friends = require("../data/friends");

var apiRoutes = function(app){
    app.get("/api/friends", function(req, res){
        res.json(friends);
    });

    app.post("/api/friends", function(req, res){
        var bestFriend = {
            name: "",
            score: Infinity
        }

        for (var i = 0; i < friends.length; i++){
            var friend = friends[i];
            var scoreDifference = 0;

            for (var j = 0; j < friend.scores.length; j++){
                scoreDifference += Math.abs(parseInt(req.body.scores[j]) - parseInt(friend.scores[j]));
            }

            if (scoreDifference <= bestFriend.score) {
                bestFriend.name = friend.name;
                bestFriend.score = friend.scoreDifference;
            }
        }

        friends.push(req.body);
        res.json(bestFriend);
    });
}

module.exports = apiRoutes;