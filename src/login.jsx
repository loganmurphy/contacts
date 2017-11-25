import React, { Component } from 'react';
import { auth } from './fsociety';

class Login extends Component{
  // constructor(props) {
  //   super(props);
  // }
    login () {
      var user;
      auth()
        .then(function (user) {
          console.log(user);
        })
        .catch(function (e) {
          console.log(e);
        });
        console.log(user)
        this.props.history.push("/contacts");

    }
    render(){
      return(
        <div>
          <button onClick={()=> this.login()}>Login With Google</button>
        </div>
      );
    }
  }


  export default Login;
