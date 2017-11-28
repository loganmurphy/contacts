import React, { Component } from 'react';
import database, {User} from '../fsociety';

class Core extends Component {
  get_contacts(){
    console.log('get contacts: User is:', User)
    database.ref('contacts/' + User.user.uid)
      .once('value')
      .then((contacts)=> {
        console.log('here are your contacts from the db', contacts.val());
        this.setState({contacts: contacts.val()});
      })
      .catch((err)=>{console.error(err)})
  }
}

export default Core;
