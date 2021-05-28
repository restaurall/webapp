import './style/POS.css'
import React from 'react';
import {BrowserRouter as Switch, Route} from 'react-router-dom';
import POSProvider from './POSContext';
import TakeOrder from './TakeOrderPage';
import Nav from './components/Nav';

const POS = () => {
    return (
        <POSProvider>
            <div className='POS'>
                <Switch>
                    <Route exact path='/POS' >
                        <TakeOrder />
                    </Route>
                    <Route path='/POS/Orders' />
                    <Route path='/POS/History' />
                </Switch>
                <Nav />
            </div>
        </POSProvider>
    )
}

export default POS;