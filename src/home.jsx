import React, { Component } from 'react';
import database, {User} from './fsociety';


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


  // get_contacts(){
  //   database.ref('contacts/' + User.user.uid)
  //     .once('value').then(function(contacts) {
  //       console.log('here are your contacts from the db', contacts.val());
  //       this.props.setState({contacts: contacts.val()});
  //     });
  // }

  sort(){
    // this.get_contacts();

    var contact_array = []
    var contacts;
    var sorted_contacts = []
    var the_map;

    // console.log('props here', this.props)
    var p = new Promise((resolve, reject)=>{
    database.ref('contacts/' + User.user.uid)
      .once('value').then((contacts)=> {
        contact_array.push(contacts.val());
          sorted_contacts = contact_array.sort(function(c1, c2){
          if(c1.name > c2.name){
            return 1;
          } else {
            return -1;
          }
        })
        console.log('here are your contacts from the db', typeof sorted_contacts[0]);
        resolve (sorted_contacts);
      })
    })

    p.then((val)=>{
      console.log('val', val);
      contacts = val[0].map((contact)=> {
        console.log('con', contact.key)
        if (this.state.show_all){
         return (
           <li key={contact.key} onClick={()=> this.toggle_all()}>
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
    })
    .catch((e)=>{
      console.log(e);
    });

    setTimeout(()=>{

      console.log('cons', contacts)
      return contacts;

    }, 3000)

  }

    // contacts = sorted_contacts.map((contact)=> {
    //   let i = contact.key;
    //   if (this.state.show_all){
    //    return (
    //      <li key={contact.key} onClick={()=> this.toggle_all()}>
    //        <button onClick={()=> this.remove_contact(i)}>X</button>
    //        <button onClick={()=> this.edit_contact(i)}>edit</button>
    //        {contact.name} {contact.city} {contact.state}</li>
    //    );
    //  } else {
    //    return (
    //
    //      <li key={contact.key} onClick={()=> this.toggle_all()}>
    //        {/* <button onClick={()=> this.remove_contact(i)}>X</button> */}
    //        <a href={'/remove/' + contact.key}>X</a>
    //
    //        {/* <button onClick={()=> this.edit_contact(i)}>edit</button> */}
    //        <a href={'/edit/' + contact.key}>edit</a>
    //        {contact.prefix} {contact.name} {contact.email} {contact.phone} {contact.address} {contact.city} {contact.state} {contact.zip}</li>
    //    );
    //  }
    // });
    // console.log('map', contacts)
    // return contacts;

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
