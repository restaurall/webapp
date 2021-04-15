import React from 'react';
import {getUserName} from '../HelperFunctions'

const HomePg = () => {

  return(
    <div className="signup_form">
      <div className="welcomeMsg">Welcome {getUserName()} to Restaurall</div>
    </div>
  )
}

export default HomePg;