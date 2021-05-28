import React, {useState} from 'react';
import {Link} from 'react-router-dom';

const SocialLogin = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    return(
        <form className='signin-form social'>
            <h2>Social</h2>
            <img src='images/home/social-icon.png' alt='social-icon'/>
            <div className='signin-inputs'>
                <label htmlFor='userNameInput'>username</label> 
                <input 
                    id='userNameInput' 
                    value={username} 
                    type='text' 
                    name='userName'
                    onChange={(e) => setUsername(e.target.value)}
                />
                <label htmlFor='passwordInput'>password</label> 
                <input 
                    id='passwordInput' 
                    value={password} 
                    type='password' 
                    name='password'
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button type='submit' className='btn sign-in-btn'>Sign in</button>
            <footer>
                <Link to='/'>Forgot password?</Link>
                <Link to='/'>Sign up</Link>
            </footer>
        </form>
    )
}

export default SocialLogin;