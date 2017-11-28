import React, { Component } from 'react';
import database, {User} from './fsociety';
import {Link} from 'react-router-dom';
import Core from './core/index';


class Home extends Core {
  constructor(props){
    super(props);

    var key = props.match.id || null;

    var contacts = [];
    var contact = {};

    if (key) {
      var i = contacts.findIndex((c) => {
        return c.key === key;

      });

    contact = contacts[i];
    }

    this.state = {
      key: key,
      prefix: contact.prefix || '',
      name: contact.name || '',
      email: contact.email || '',
      phone: contact.phone || '',
      address: contact.address || '',
      city: contact.city || '',
      state: contact.state || '',
      zip: contact.zip || '',
      contacts: contacts,
      // show_all: false,
    }
    console.log('userrrrrr', )
    this.get_contacts();
  }
// This toggles visible fields

  toggle_all(key){
    console.log('key', key)
    let contacts = this.state.contacts;
    let contactIndex = contacts.findIndex((c)=>{
      return (c.key == key)
    })
    console.log('toggle all', contactIndex)
    contacts[contactIndex].show_all = !contacts[contactIndex].show_all
    this.setState({contacts: contacts})
  }

  sort(){
    console.log('this', this)
    var contact_array = []
    var contacts;
    var sorted_contacts = []
    // console.log('props here', this.props)

    contact_array.push(this.state.contacts);
    sorted_contacts = contact_array.sort(function(c1, c2){
    if(c1.name > c2.name){
      return 1;
    } else {
      return -1;
    }
  })
  console.log('here are your sorted from the db', typeof sorted_contacts);


  contacts = Object.keys(sorted_contacts[0]).map((key, index) => {
    let contact = this.state.contacts[key]

    if(contact.show_all === false){
      return (
        <li key={key} details={contact[key]} onClick={()=> this.toggle_all(contact.key)}>
          {contact.name} address: {contact.city}, {contact.state}</li>
      );
    } else {
      return (

        <li key={contact.key} onClick={()=> this.toggle_all(contact.key)}>
          {/* <button onClick={()=> this.remove_contact(i)}>X</button> */}
          <button><Link to={'/remove/' + contact.key}>X</Link></button>

          {/* <button onClick={()=> this.edit_contact(i)}>edit</button> */}
          <button><Link to={'/edit/' + contact.key}>edit</Link></button>
          {contact.prefix}{contact.name} email: {contact.email} phone: {contact.phone} adress: {contact.address}, {contact.city}, {contact.state}, {contact.zip}</li>
      );
    }
  });

  return contacts;

  }

  render(){
    return(
      <div>
        <h1>HI {User.user.displayName}!</h1>
        <h2>Here are your contacts:</h2>
        <ol>
          {this.sort()}
        </ol>
      </div>
    );
  }
}


export default Home;
