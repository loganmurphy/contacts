import React, { Component } from 'react';

import uid from 'uid'
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import database, {User} from './fsociety';

import './MyForm.css';


class AddEditContact extends Component {
  constructor(props) {
    super(props);

    var key = props.match.params.id || null;
    var contacts = JSON.parse(localStorage.contacts) || [];
    var contact = {};

    console.log(key, contacts);

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
      contacts: contacts
    }
  }


  update_state(event, key) {
    if (key === 'prefix'){
      this.setState({
        [key]: event.target.innerHTML,
      });
      console.log(event.target.innerHTML)
    } else {
      this.setState({
        [key]: event.target.value,
      });
      console.log(event.target.value)
    }
  }

  handle_submit(event) {
    var newArray;

    console.log(`submitted: prefix:${this.state.prefix} name:${this.state.name}
      email:${this.state.email} phone:${this.state.phone} address:${this.state.address}
      city:${this.state.city} state:${this.state.state} zip:${this.state.zip}`)
    event.preventDefault();
    let contact = {
      key: uid(),
      prefix: this.state.prefix,
      name: this.state.name,
      email: this.state.email,
      phone: this.state.phone,
      address: this.state.address,
      city: this.state.city,
      state: this.state.state,
      zip: this.state.zip,
    }

    database.ref('contacts/' + User.user.uid).set(this.state.contacts);

// check here
    if (this.state.key) {
      contact.key = this.state.key;

      var i = this.state.contacts.findIndex((c) => {
        return c.key === this.state.key;
      });
      console.log('here is my eye', i);

      this.state.contacts[i] = contact;
      newArray = this.state.contacts;
      console.log('new', newArray)
    } else {
      contact.key = uid();
      newArray = this.state.contacts;
      newArray.push(contact);
    }
    localStorage.contacts = JSON.stringify(this.state.contacts);
    this.props.history.push("/contacts");
  }

  edit_contact(key){
    var contacts = this.state.contacts;
    var i = contacts.findIndex((c) => {
      return c.key === key;

    });
    var contact = contacts[i];
    console.log(i, contact);
    this.setState({
      key: contact.key,
      prefix: contact.prefix,
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      address: contact.address,
      city: contact.city,
      state: contact.state,
      zip: contact.zip,
    })
  }

  render() {
    return (
      <div>
        <Card className="md-card">
          <form onSubmit={event => this.handle_submit(event)}>
            <CardTitle title='Contacts'/>
            <CardText>
            <SelectField className='select' floatingLabelText='prefix' value={this.state.prefix}
              onChange={event => this.update_state(event, 'prefix')}>
              <MenuItem value={'Mr.'} primaryText='Mr.' />
              <MenuItem value={'Mrs.'} primaryText='Mrs.' />
            </SelectField>
            <TextField className='name' required floatingLabelText='name' type='text' name="form_name" value={this.state.name}
              onChange={event => this.update_state(event, 'name')}/><br></br>
              <TextField className='name' floatingLabelText='email' type='text' name="form_email" value={this.state.email}
                onChange={event => this.update_state(event, 'email')}/>
              <TextField className='name' floatingLabelText='phone' type='text' name="form_phone" value={this.state.phone}
                onChange={event => this.update_state(event, 'phone')}/><br></br>
              <TextField className='name' floatingLabelText='address' type='text' name="form_address" value={this.state.address}
                onChange={event => this.update_state(event, 'address')}/>
              <TextField className='name' floatingLabelText='city' type='text' name="form_city" value={this.state.city}
                onChange={event => this.update_state(event, 'city')}/>
              <TextField className='name' floatingLabelText='state' type='text' name="form_state" value={this.state.state}
                onChange={event => this.update_state(event, 'state')}/>
              <TextField className='name' floatingLabelText='zip' type='text' name="form_zip" value={this.state.zip}
                onChange={event => this.update_state(event, 'zip')}/>
            </CardText>
            <CardActions>
              <RaisedButton type='submit'>Submit</RaisedButton>
            </CardActions>
          </form>
        </Card>
        {/* <ol>
          {this.sort()}
        </ol> */}
      </div>
    );
  }
}

export default AddEditContact;
