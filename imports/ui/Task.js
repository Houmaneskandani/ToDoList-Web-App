import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Tasks } from '../api/tasks';

import TaskDropDownMenu from './TaskDropDownMenu.js';

class TaskDelete extends Component {


   deleteMultipleTasks() {
    //var findMultiple = Tasks.find({ checkedTask: { $ne: true } }).fetch();


      Meteor.call('tasks.remove', findMultiple._id);
    
  }

  render() {
    return (
        <button className="delete-multiple" 
        onClick={this.props.deletion}>
          Delete Multiple 
          </button>
      );
  }
}
 
// Task component - represents a single todo item
export default class Task extends Component {
  state = {
    subtask: '^H',
  } 
 constructor(props) {
    super(props);
      this.state ={
        toggleDelete: false,
      }
  }


  toggleCheckedTask() {
    this.setState({
      toggleDelete: !this.state.toggleDelete,
    });
    
    Meteor.call('tasks.checkDelete', this.props.task._id, 
      !this.props.task.markForDelete);
  }

  deleteMoreTasks() {

    Meteor.call('tasks.removeMultiple');

  }

  toggleChecked() {
    // Set the checked property to the opposite of its current value
    Meteor.call('tasks.setChecked', this.props.task._id,
      !this.props.task.checked);
  }

  deleteThisTask() {
    Meteor.call('tasks.remove', this.props.task._id);
  }


  deleteAccount(userId){
	  console.log("Delete Account!");
	  console.log(this.userId);
	  Meteor.call('selfDelete')
	  //Meteor.users.remove(' the _id of the user ');
	  //db.users.remove({_id:this.userID});
  }
 //  <button onClick={this.deleteAccount.bind(this)} type = "button" className ="delete-account">  Delete Account </button>

  handleChange(e) {
    const { value } = e.target;
    this.setState({
      subtask: value,
    });
  }

  addSubTask(e) {  
    e.preventDefault();
    const { subtask } = this.state;
    Meteor.call('tasks.addSubTask', this.props.task._id,
    subtask);
    this.setState({
      subtask: ''
    })
  }

  removeSubTask(subTaskTitle) {
    Meteor.call('tasks.removeSubTask', this.props.task._id,
    subTaskTitle);
}
  renderDropDownMenu(){
    return (
      <TaskDropDownMenu key={this.props.task._id} task={this.props.task} />
    );
  }

  render() {

    const {
      activeSubtaskPanelTaskId,
      task,
      handleAddSubTaskButton
    } = this.props;
  	// Give tasks a different className when they are checked off,
    // so that we can style them nicely in CSS
    const taskClassName = this.props.task.checked ? 'checked' : '';
    const hidden = this.props.task.checkedTask ? 'hidden' : '';

    return (
      <div>
        <li className={taskClassName}/>
 
        <button className="delete" onClick={this.deleteThisTask.bind(this)}>
          &times;
        </button>

        <button onClick={() => handleAddSubTaskButton(task._id)} type="button" className="add-button">+ Add SubTasks</button>

        <input
          type="checkbox"
          readOnly
          checked={!!this.props.task.checked}
          onClick={this.toggleChecked.bind(this)}
        />

        <span className="text">

        <strong>{this.props.task.username}</strong>: {this.props.task.text} 
       </span>
       {this.renderDropDownMenu()}
       
    <div className="subtask-container">  

         <form className={`${activeSubtaskPanelTaskId !== task._id ? 'hide' : ''}`} onSubmit={this.addSubTask.bind(this)}>
          <input type="text" placeholder="add subtask title" value={this.state.subtask} onChange={this.handleChange.bind(this)} />
         </form>
         {task.subtasks && <ul>
           {task.subtasks.map((subTaskTitle, i) => (
            <li key={i}>
              {subTaskTitle}

              <button type="button" onClick={this.removeSubTask.bind(this, subTaskTitle)}>
                &times;
              </button>
            </li>
          ))}
         </ul>} 
    </div>
    </div>
   );
  } 
}                  
