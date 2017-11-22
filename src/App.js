import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Home from './home'
import AddEditContact from './contacts'
import RemoveContact from './remove'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {red700} from 'material-ui/styles/colors';
import AppBar from 'material-ui/AppBar';

import {BrowserRouter, Route, Link, Switch, Redirect}
  from 'react-router-dom';

const theme = getMuiTheme({
  palette: {primary1Color: red700}
});


class App extends Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={theme}>
        <BrowserRouter>
          <div>
            <AppBar title='Welcome'/>
            <ul>
              <li><Link to='/'>Home</Link></li>
              {/* <li><Link to='/contacts'>Contacts</Link></li> */}
              <li><Link to='/add'>Add Contacts</Link></li>
            </ul>
            <Switch>
              <Route exact path='/' component={Home}/>
              <Route path='/add' component={AddEditContact}/>
              <Route path='/edit/:id' component={AddEditContact}/>
              <Route path='/remove/:id' component={RemoveContact}/>
            </Switch>
          </div>
        </BrowserRouter>
      </MuiThemeProvider>
    );
  }
}

export default App;
