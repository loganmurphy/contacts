import React, { Component } from 'react';
import Core from './core/index';
import database, {User} from './fsociety';


class RemoveContact extends Core{
  constructor(props) {
    super(props);

  this.state = {
    key: '',
    prefix: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    contacts: '',
  }
    this.get_contacts();

    console.log(props, props.match.params.id);
  }

  remove_contact(){
    console.log('contacts', this.state.contacts)
    var id = this.props.match.params.id;
    var contacts = this.state.contacts || [];

    let index_contact = contacts.findIndex(function (c) {
      return c.id === id;
    });
    // console.log('key of removed', index_contact);
    contacts.splice(index_contact, 1);
    this.setState({contacts: contacts})
    database.ref('contacts/' + User.user.uid).set(this.state.contacts);
    this.props.history.push("/contacts");
  }

  render(){
    let i = this.props.match.params.id;
    console.log(i);

    return(
      <div className='remove_buttons_div' >
        <h1>Are you sure?</h1>
        <button className='remove_buttons_keep' onClick={()=> this.remove_contact()}>YES!</button>
        <button className='remove_button_delete' onClick={()=> this.props.history.push("/contacts")}>Never Mind!</button>
      </div>
    );
  }
}

export default RemoveContact;
