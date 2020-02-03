import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check'; 

export const Tasks = new Mongo.Collection('tasks');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('tasks', function tasksPublication() {
    return Tasks.find();
  });
}

Meteor.methods({
  'tasks.insert'(text) {
    check(text, String); 
    // Make sure the user is logged in before inserting a task
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
 
    Tasks.insert({
      text,
      dateCheck: false,
      timeCheck: false,
      dateTime: new Date(), 
      createdAt: new Date(),
      owner: this.userId,
      username: Meteor.users.findOne(this.userId).username,
      subtasks: []
    });
  



  },

  'tasks.remove'(taskId) {
    check(taskId, String);
 
    Tasks.remove(taskId);
  },


  'tasks.setDateTime'(taskId, setDateTime){
    check(taskId, String);
    check(setDateTime, Date);
 
    Tasks.update(taskId, { $set: { dateTime: setDateTime } });
  },

  'tasks.setDateCheck'(taskId, setDateCheck){
    check(taskId, String);
    check(setDateCheck, Boolean);
 
    Tasks.update(taskId, { $set: { dateCheck: setDateCheck } });
  },

  'tasks.setTimeCheck'(taskId, setTimeCheck){
    check(taskId, String);
    check(setTimeCheck, Boolean);
 
    Tasks.update(taskId, { $set: { timeCheck: setTimeCheck } });
  },

  'tasks.setChecked'(taskId, setChecked) {
    check(taskId, String);
    check(setChecked, Boolean);
 
    Tasks.update(taskId, { $set: { checked: setChecked } });
  },

  'selfDelete'(userId) {
			console.log("selfDelete!");
			//console.log(Meteor.userId);
		  Meteor.users.remove(this.userId);
  },
  
  'tasks.addSubTask'(taskId, taskName) {
    check(taskId, String);
    check(taskName, String);
    Tasks.update(taskId, { $push: { subtasks: taskName } });
  },
  'tasks.removeSubTask'(taskId, taskName) {
    check(taskId, String);
    check(taskName, String);
    Tasks.update(taskId, { $pull: { subtasks: taskName } });
  },
  'removeAllTasks'() {
    var findcollection = Tasks.find().fetch();
    var myId = findcollection[0]._id;
    console.log(myId);
    Tasks.remove({});
   },
   
  'tasks.checkDelete'(taskId, checkOff) {
    check(taskId, String);
    check(checkOff, Boolean);

    Tasks.update(taskId, { $set: { markForDelete: checkOff } });
  },

  'tasks.removeMultiple'() {
   
    Tasks.remove({markForDelete: true});


  },
});
