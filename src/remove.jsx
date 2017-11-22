import React, { Component } from 'react';
// import AddContact from './contacts'



class RemoveContact extends Component{
  constructor(props) {
    super(props);

    console.log(props, props.match.params.id);
  }

  remove_contact(){
    var id = this.props.match.params.id;
    var contacts = JSON.parse(localStorage.contacts) || [];

    let index_contact = contacts.findIndex(function (c) {
      return c.id === id;
    });
    // console.log('key of removed', index_contact);
    contacts.splice(index_contact, 1);
    // localStorage.removeItem(contacts[index_contact]);
    localStorage.contacts = JSON.stringify(contacts);
    this.props.history.push("/");
  }

  render(){
    let i = this.props.match.params.id;
    console.log(i);

    return(
      <div>
        <h1>Are you sure?</h1>
        <button onClick={()=> this.remove_contact()}>YES!</button>
      </div>
    );
  }
}
export default RemoveContact;
