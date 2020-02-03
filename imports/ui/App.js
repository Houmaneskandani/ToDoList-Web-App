import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import TrackerReact from 'meteor/ultimatejs:tracker-react'

import { Tasks } from '../api/tasks.js';
import { ListName } from '../api/list-name.js';

import Task from './Task.js';
import TheListName from './ListName.js'
import AccountsUIWrapper from './AccountsUIWrapper.js';

import Overlay from './Overlay.js';

class NamePopup extends TrackerReact(Component) {
  constructor(props) {
    super(props);

    this.state = {
      exitPopup: false,
      cnt: ListName.find().count(),
    };
  }

  handleEnterPress(e){
    if(e.charCode == 13)
        {this.props.closeNamePopup}
      
  }

  updateListName(event) {
    event.preventDefault();

    if(this.props.cnt === 1) {
      Meteor.call('listName.remove', this.props.thelistname._id);
    }

    // Find the text field via the React ref
    const lnameText = ReactDOM.findDOMNode(this.refs.lnameInput).value.trim();

    //Meteor.call('listName.remove', lnameText);
    Meteor.call('listName.insert', lnameText);



    // Clear form
    ReactDOM.findDOMNode(this.refs.lnameInput).value = '';
  }

  render() {
    return (
      <div className="name-popup">
        <div className="name-popup-inner">

        <form className="edit-name" 
          onSubmit={this.updateListName.bind(this)}>
          <input 
            type="text" 
            ref="lnameInput"
            placeholder="Type to name the list"
          />
        </form>

        <button 
          className="update-button"
          onClick={this.props.closeNamePopup}>Update</button>
        </div>
      </div>
      );
  }

}

// App component - represents the whole app
class App extends TrackerReact(Component) {

  constructor(props) {
    super(props);
 
    this.state = {
      hideCompleted: false,
      activeSubtaskPanelTaskId: null,
      showNamePopup: false,
    };
  }

  listname() {
    return ListName.find().fetch();
  } 

    handleSubmit(event) {
    event.preventDefault();
 
    // Find the text field via the React ref
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

    // insert the text
    Meteor.call('tasks.insert', text);
    
    // Clear form
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
  }

  toggleHideCompleted() {
    this.setState({
      hideCompleted: !this.state.hideCompleted,
    });
  }
  deleteAccount(userId){
	  console.log("Delete Account!");
	  console.log(this.userId);
	  Meteor.call('selfDelete');
	  //Meteor.users.remove(' the _id of the user ');
	  //db.users.remove({_id:this.userID});
  }

  displayOverlay() {
    document.getElementsByClassName('overlay')[0].style.display="block";
  }

  handleAddSubTaskButton(task_id) {
    this.setState({
      activeSubtaskPanelTaskId: task_id
    })
  }

  removeAllTasks(task_id) {
    Meteor.call('removeAllTasks');
  }

  toggleNamePopup() {
      this.setState({
        showNamePopup: !this.state.showNamePopup,
    });
  }

  renderTasks() {
    let filteredTasks = this.props.tasks;
    if (this.state.hideCompleted) {
      filteredTasks = filteredTasks.filter(task => !task.checked);
    }

    return filteredTasks.map((task) => (
      <Task
        key={task._id}
        task={task}
        activeSubtaskPanelTaskId={this.state.activeSubtaskPanelTaskId}
        handleAddSubTaskButton={this.handleAddSubTaskButton.bind(this)}
      />
    ));
  }

  renderOverlay() {
    return (<Overlay/>);
  }
  renderListName() {
    let lname = this.listname();

    if(lname.length < 1) {
      return (<div>Untitled List</div>)
    }

 
    return lname.map((thelistname) => (
      <TheListName 
      key={thelistname._id} 
      thelistname={thelistname}
      />
    ));
  }

  render() {
 
    return (
      <div className="container">
        <header>
          <h1>Todo List ({this.props.incompleteCount}): </h1>

          <div className="listname-container">
          <h1>{this.renderListName()}</h1>
          </div>
         
          <label className="hide-completed">
            <input
              type="checkbox"
              readOnly
              checked={this.state.hideCompleted}  
              onClick={this.toggleHideCompleted.bind(this)}
            />

            Hide Completed Tasks
        <button onClick={this.removeAllTasks.bind(this)} type="button" className="delete-button"> Delete All</button>

          </label>
          { this.renderOverlay() }         
          <input type ="button" onClick={this.displayOverlay.bind(this)} value="Account Settings"/>

          <AccountsUIWrapper />

          
          { this.props.currentUser ?
          <form className="new-task" onSubmit={this.handleSubmit.bind(this)} >
            <input
              type="text"
              ref="textInput"
              placeholder="Type to add new tasks"
            />
          </form> : ''
        }

        <div className="edit-name-button">
        <button onClick={this.toggleNamePopup.bind(this)} >Edit Name</button>
        { this.state.showNamePopup ?
          <NamePopup 
          text='Edit Name'
          closeNamePopup={this.toggleNamePopup.bind(this)}
          />
          : null
        }

        
      </div>

        
        

        </header>

        

        <ul>
          {this.renderTasks()} 
        </ul>
      </div>

      

    );
  }
}

export default withTracker(() => {
  

  return {
    tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
    listName: ListName.find({}).fetch(),
    incompleteCount: Tasks.find({ checked: { $ne: true } }).count(),
    currentUser: Meteor.user(),
  };
})(App);
