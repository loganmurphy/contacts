import React, { Component } from 'react';
import { auth } from './fsociety';

import './css/login.css';

class Login extends Component{
  constructor(props) {
    super(props);
    console.log('login', this.props.login)

  }

    render(){

      return(
        <div>
          <button className='login' onClick={()=> this.props.login(this.props.history)}>Login With Google</button>
        </div>
      );
    }
  }


  export default Login;
