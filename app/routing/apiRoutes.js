var friends = require("../data/friends");

module.exports = function(app) {

  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });


  app.post("/api/friends", function(req, res) {
      var compatibilty = {
          index:0,
          rating:0
      }
      friends.forEach(function(friends,index){
          var rating =0;
          for(var i=0;i<friends.scores.length;i++){
            rating+=Math.abs(req.body.scores[i]-friends.scores[i])
          }
          if(compatibilty.rating<rating){
              compatibilty.rating=rating;
              compatibilty.index=index;
          }
      });
      friends.push(req.body);
      res.json(friends[compatibilty.index]);
  })
}