import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Mongo } from 'meteor/mongo';

import './main.html';

Meteor.subscribe('thePlayers');

Template.leaderboard.events({
  'click .player': function() {
      var playerId = this._id;
      Session.set('selectedPlayer', playerId);
    },
    'click .increment': function() {
      var selectedPlayer = Session.get('selectedPlayer');
      Meteor.call('modifyPlayerScore', selectedPlayer, 5);
    },
    'click .decrement': function() {
      var selectedPlayer = Session.get('selectedPlayer');
      Meteor.call('modifyPlayerScore', selectedPlayer, -5);
    },
    'click .remove': function() {
      var selectedPlayer = Session.get('selectedPlayer');
      removalConfirmation = window.confirm('Do you wish to remove this player');
      if (removalConfirmation === true) {
        Meteor.call('removePlayerData',selectedPlayer);
      }
    }
 });

Template.leaderboard.helpers({
    'player': function(){
        var currentUserId = Meteor.userId();
        return PlayersList.find({}, {sort: {score: -1, name: 1} });
    },
    'selectedClass': function(){
      var playerId = this._id;
      var selectedPlayer = Session.get('selectedPlayer');
      if(playerId == selectedPlayer){
          return 'selected';
      }
    },
    'showSelectedPlayer': function(){
      var selectedPlayer = Session.get('selectedPlayer');
      return PlayersList.findOne(selectedPlayer);
    },
    'counter': function() {
      return PlayersList.find().count();
    }
});


Template.addPlayerForm.events({
  'submit form': function(event){
    event.preventDefault();
    var playerNameVar =  event.target.playerName.value;
    var playerScoreVar = event.target.playerScore.value;
    Meteor.call('insertPlayerData',playerNameVar,playerScoreVar);
    event.target.playerName.value = '';
    event.target.playerScore.value = '';
  }
});
