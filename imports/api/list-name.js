import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check'; 
 
export const ListName = new Mongo.Collection('listName');

Meteor.methods({
  'listName.insert'(text, nameId) {
    check(text, String);
    check(text, String);
 
    // Make sure the user is logged in before inserting a task
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
 
    ListName.insert({
      text, 
      createdAt: new Date(),
      owner: this.userId,
      username: Meteor.users.findOne(this.userId).username,
    });


  },
  'listName.remove'(nameId) {
    check(nameId, String);
 
    ListName.remove(nameId);
  },


  'listName.defaultName'() {
  	ListName.insert({text: "Untitled List"});
  }

});