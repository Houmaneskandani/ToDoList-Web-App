import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

import { Tasks } from '../api/tasks.js';
import Task from './Task.js';
import DateTime from './DateTimePicker.js';

export default class TaskDropDownMenu extends Component {

	constructor(props) {
    	super(props);
  	}

	toggleDateCheck(){
    	if(this.props.task.dateCheck == true){
      		document.getElementsByClassName('add-time')[0].style.display="none";
      		document.getElementsByClassName('dropdown-content')[0].style.minHeight="2.5em";
    	}
    	else if(this.props.task.dateCheck == false){
      		document.getElementsByClassName('add-time')[0].style.display="block";
      		document.getElementsByClassName('dropdown-content')[0].style.minHeight="5em";
    	}

    	Meteor.call('tasks.setDateCheck', this.props.task._id, !this.props.task.dateCheck);
  	}

  	toggleTimeCheck(){
    	Meteor.call('tasks.setTimeCheck', this.props.task._id, !this.props.task.timeCheck);
  	}

  	renderDateTimePicker() {
    	if(this.props.task.dateCheck == true){
      		return (
        		<DateTime key={this.props.task._id} task={this.props.task} />
      		);
    	}
  	}

	render(){
		return (
			<div>
			<div className="dropdown">
          		<button className="dropbtn">
          		options
          		</button>
          		<div className="dropdown-content">
            		<label className="add-date">
              			<input
                			type="checkbox"
                			readOnly
                			checked={this.props.task.dateCheck}
                			onClick={this.toggleDateCheck.bind(this)}            
              			/>
              			Add Date
              		</label>
              		<label className="add-time">
                		<input
                  			type="checkbox"
                  			readOnly
                  			checked={this.props.task.timeCheck}
                  			onClick={this.toggleTimeCheck.bind(this)}   
                		/>
                		Add Time
            		</label>
          		</div>
			</div>
			{this.renderDateTimePicker()}
			</div>
		);
	}

}