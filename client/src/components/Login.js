import React, { useState } from 'react';
import '../style/login.css'
import MSignUp from './ManagerSignUp';
import WSignUp from './WorkerSignUp';
import {send} from '../HelperFunctions';
import HomePg from './Homepg';

const Login = ({handleAuthenticate}) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // validate username, password inputs and set error messages
  const validate = () => {
    let usernameError = '';
    let passwordError = '';

    if(!username) {
      usernameError = 'user name cannot be blank';
    }

    if(!password) {
      passwordError = 'password cannot be blank';
    }

    if (usernameError || passwordError) {
      setUsernameError(usernameError);
      setPasswordError(passwordError);
      return false;
    }

    return true;
  }  

  const handleSubmit = (event) => {
    if(validate()) {
      event.preventDefault();
      send("POST", "/signin/", {username, password}, function(err, res) {
          if(err) console.log(err);
          else{
            handleAuthenticate(true);
          }
        }
      );   
    } 
  }

  const handleWSignup = (event) => {
    if(validate()) {
      event.preventDefault();
      let type = 'worker';
      send("POST", "/signup/", {username, password, type}, function(err, res){
          if(err) console.log(err);
          else{
            handleAuthenticate();
          }
        }
      );
    }
  }

  return (
      <div className="form_container">
        <form className="authenticate_form">
          <div className="authenticate_title">Login or Sign up</div>
          <input 
            className="form_element" 
            placeholder="Username" 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)}
            name="username" 
            required
          />
          {usernameError && <div className="loginErrorMsg">{usernameError}</div>}
          <input 
            className="form_element" 
            placeholder="Password" 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            name="password" 
            required
          />
          {passwordError && <div className="loginErrorMsg">{this.state.passwordError}</div>}
          <div>
            <button onClick={handleSubmit} type="submit" id="loginSubmit" className="authenticateBtn btn submit">Login</button>
            <button onClick={handleWSignup} type="submit" id="signUpSubmit" className="authenticateBtn btn submit">Sign Up</button>
          </div>
        </form>
      </div>
  );
}

export default Login;
