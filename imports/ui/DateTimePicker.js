import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

import 'flatpickr/dist/themes/material_blue.css'
import Flatpickr from 'react-flatpickr'
import { Tasks } from '../api/tasks.js';

export default class DateTime extends Component{
	constructor(props) {
    super(props);

    this.state = {
      date: new Date()
    };
  }

  setDateTime(){
    //console.log(this.state.date);
    Meteor.call('tasks.setDateTime', this.props.task._id, this.state.date[0])
  }

	render() {
    const { date } = this.state;
    if(this.state.date[0] == undefined)
      this.state.date[0] = new Date();
    if(this.props.task.timeCheck == false){
    	return (
        <div className="DatePickerContainer">
          <label className="dateLabel">
            Finish Task By This Day:  
          </label>
          <Flatpickr data-enable-time
            options={{
              minDate: "today",
              altInput: true,
              altFormat: "F j, Y",
              dateFormat: "F j, Y",
            }}
            value={date}
            onChange={this.setDateTime(), date => { this.setState({date}) }} 
          />
        </div>
		  );
    }
    else if(this.props.task.timeCheck == true){
      return (
        <div className="DatePickerContainer">
          <label className="dateLabel">
            Finish Task By This Day and Time:  
          </label>
          <Flatpickr data-enable-time
            options={{
              enableTime: true,
              minDate: "today",
              altInput: true,
              altFormat: "F j, Y G:i K",
              dateFormat: "F j, Y G:i K",
            }}
            value={date}
            onChange={this.setDateTime(), date => { this.setState({date}) }} 
          />
        </div>
      );
    }
	}
}