import React, { Component } from 'react';
import './css/App.css';
import Login from './login'
import Home from './home'
import AddEditContact from './contacts'
import RemoveContact from './remove'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {red700} from 'material-ui/styles/colors';
import AppBar from 'material-ui/AppBar';
import Menu, { MenuItem } from 'material-ui/Menu';

import {BrowserRouter, Route, Link, Switch, Redirect}
  from 'react-router-dom';

import { auth, User } from './fsociety';

const theme = getMuiTheme({
  palette: {primary1Color: red700}
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logged_in: false
    }

    console.log(props)//, props.match.params.id);

    this.login_checker();
  }

  PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
      this.state.logged_in ? (
        <Component {...props}/>
      ) : (
        <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }}/>
      )
    )}/>
  )

  login_checker(){
    if (User.user) {
      this.setState({logged_in: true});
    } else {
      setTimeout(() => {
        this.login_checker();
      }, 1000);
    }
  }

  login (h) {
    var user;
    auth()
      .then( (user) => {
        console.log('this', this)
        console.log(user);
      })
      .catch(function (e) {
        console.log(e);
      });
      console.log(user)
      // window.location.pathname = "/contacts"
      h.push("/contacts")
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={theme}>
        <BrowserRouter>
          <div>
            <AppBar title=''>

              <Menu  id="menu-appbar" anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                onRequestClose={this.handleRequestClose}>

                <MenuItem onClick={this.handleRequestClose}><Link class='menu-item' to='/contacts'>Contacts</Link></MenuItem>
                <MenuItem onClick={this.handleRequestClose}><Link class='menu-item' to='/add'>Add Contacts</Link></MenuItem>
              </Menu>
            </AppBar>
              <Switch>
                <Route exact path='/' render={(props) => (
                  <Login login={this.login} {...props}/>
                )}
                />
                <this.PrivateRoute exact path='/contacts' component={Home}/>
                <this.PrivateRoute path='/add' component={AddEditContact}/>
                <this.PrivateRoute path='/edit/:id' component={AddEditContact}/>
                <this.PrivateRoute path='/remove/:id' component={RemoveContact}/>
              </Switch>
          </div>
        </BrowserRouter>
      </MuiThemeProvider>
    );
  }
}

export default App;
