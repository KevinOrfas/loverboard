import { Meteor } from 'meteor/meteor';



Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.publish('thePlayers', function() {
  var currentUserId = this.userId;
  return PlayersList.find({createdBy: currentUserId});
});

Meteor.methods({
  'insertPlayerData': function(playerNameVar,playerScoreVar){
    var currentUserId = Meteor.userId();
    PlayersList.insert({
      name: playerNameVar,
      score: parseInt(playerScoreVar),
      createdBy: currentUserId
    });
  },
  'removePlayerData': function(selectedPlayer) {
    var currentUserId = Meteor.userId();
    PlayersList.remove({ _id:selectedPlayer, createdBy: currentUserId});
  },
  'modifyPlayerScore': function(selectedPlayer,scoreValue) {
    PlayersList.update( {_id: selectedPlayer, createdBy: currentUserId}, {$inc: {score: scoreValue} });
  }
});
