import React, {useState, useEffect} from 'react';
import { send } from '../HelperFunctions';
import {Redirect} from 'react-router-dom';

const POSLogin = () => {

    const [input, setInput] = useState('');
    const [error, setError] = useState('');
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        if(error) {
            let resetError = setTimeout(() => {
                setError('');
            }, 5000);
            return () => clearTimeout(resetError);
        }
    }, [error])

    const handleSubmit = (e) => {
        e.preventDefault();
        
        send('POST', '/access-POS', {key: input}, function(err, res) {
            setInput('');
            if(err) {
                console.log(err);
                setError('An error occur');
            }
            if(!res) {
                console.log('Access denied');
                // Reset error so that useEffect will take effect
                setError('')
                setError('Access denied');
            } else {
                console.log('Access granted');
                setIsAuth(true);
            }
        });
    }

    if (isAuth) {
        return <Redirect to='/POS' />
    } else {
        return (
            <form className='signin-form POS'>
                <h2>POS</h2>
                <img src='images/POS-Symbol.png' alt='POS_symbol'/>
                <div className='container'>
                    <img src='images/key-icon.png' alt='key-icon' id='key-icon'/>
                    <input 
                        className='access-key' 
                        type='text' 
                        placeholder='access key: "demo"'
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                </div>
                <aside className='errorMsg'>{error}</aside>
                <button 
                    type='submit' 
                    className='btn sign-in-btn'
                    onClick={handleSubmit}
                    disabled={!input}>Start</button>
            </form>
        )
    }
}

export default POSLogin;