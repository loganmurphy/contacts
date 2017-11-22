import React, { Component } from 'react';
// import AddContact from './contacts'

class Home extends Component {
  constructor(props){
    super(props);
    var key = props.match.id || null;

    var contacts = JSON.parse(localStorage.contacts) || [];
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
      show_all: false,
    }
  }

// This toggles visible fields

  toggle_all(){
    this.setState({show_all: !this.state.show_all})
  }

  sort(){
    var contact_array;
    var contacts;

    if (localStorage.contacts){
      console.log('I have contacts in my local storage, WHOOO!')
      contact_array = JSON.parse(localStorage.contacts);
      console.log('local contacts', contact_array)
    } else {
      console.log('I have no contacts in my local storage, BOOOHOOOHOOO!')
    }

    var sorted_contacts = contact_array.sort(function(c1, c2){
      if(c1.name > c2.name){
        return 1;
      } else {
        return -1;
      }
    });

    console.log('sorted', sorted_contacts)

    contacts = sorted_contacts.map((contact)=> {
      let i = contact.key;
      if (this.state.show_all){
       return (
         <li key={contact.key} onClick={()=> this.toggle_all()}>
           <button onClick={()=> this.remove_contact(i)}>X</button>
           <button onClick={()=> this.edit_contact(i)}>edit</button>
           {contact.name} {contact.city} {contact.state}</li>
       );
     } else {
       return (

         <li key={contact.key} onClick={()=> this.toggle_all()}>
           {/* <button onClick={()=> this.remove_contact(i)}>X</button> */}
           <a href={'/remove/' + contact.key}>X</a>

           {/* <button onClick={()=> this.edit_contact(i)}>edit</button> */}
           <a href={'/edit/' + contact.key}>edit</a>
           {contact.prefix} {contact.name} {contact.email} {contact.phone} {contact.address} {contact.city} {contact.state} {contact.zip}</li>
       );
     }
    });
    console.log('map', contacts)
    return contacts;

  }


  render(){

    return(
      <div>
        <h1>HI!</h1>
        {/* list all contacts here */}
        <ol>
          {this.sort()}
        </ol>
      </div>
    );
  }
}


export default Home;
