import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

export default class TaskDropDownMeny extends Component {

  constructor(props) {
    super(props);
  }

  deleteAccount(userId) {
    console.log("Delete Account!");
    console.log(this.userId);
    Meteor.call('selfDelete');
  }

  closeNav() {
    document.getElementsByClassName('overlay')[0].style.display = "none";
  }

  render() {
    return(
       <div className="overlay">
         <div className = "overlay-content">
           <h3> Account Settings </h3>

           <p>Username: <input type="text" name="username" value = ""></input></p>
           <p>Display Name: <input type="text" name="display-name" value=""></input></p>
           <p>Email: <input type="text" name="email" value=""></input></p>

           <p>Dark Mode:<input type="checkbox" id="dark"></input></p>
           
           <p><button type="button">Submit</button>
              <button type="button" onClick= { this.deleteAccount.bind(this)}>Delete Account</button>
              <button type="button" onClick= { this.closeNav.bind(this) }>Cancel</button></p>
         </div>
       </div>
    );

  }
}
