import React, { Component } from 'react';
import database, {User} from '../fsociety';

class Core extends Component {
  get_contacts(callback){
    console.log('get contacts: User is:', User)
    database.ref('contacts/' + User.user.uid)
      .once('value')
      .then((contacts)=> {
        var contacts_list = contacts.val() || [];
        console.log('here are your contacts from the db', contacts_list);


        if (callback) {
          callback(contacts_list);
        } else {
          this.setState({contacts: contacts_list});
        }
      })
      .catch((err)=>{console.error(err)})
  }
}

export default Core;
