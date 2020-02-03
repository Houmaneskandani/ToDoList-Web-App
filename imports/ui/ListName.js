import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { ListName } from '../api/list-name.js';
import TrackerReact from 'meteor/ultimatejs:tracker-react'


//handles the list name
export default class TheListName extends TrackerReact(Component) {
	constructor(props) {
    super(props);

    this.state = {
      showNamePopupTest: false,
    };
  }
	
  removeName() {
    Meteor.call('listName.remove', this.props.thelistname._id);
  }


  render() {
    return (
     	<div id="title-container">
      		<div className="list-title">
      		({this.props.thelistname.text})
      		</div>


      		<button className="delete-name"
      		onClick={this.removeName.bind(this)}>Delete Name</button>
     </div>
      
    );
  }
}
