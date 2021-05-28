import './style/global.css'
import React from 'react';
import {BrowserRouter as Switch, Route} from 'react-router-dom';
import SignIn from './SignIn/SignIn'
import POS from './POS/POS'

const App = () => {
    return (
        <Switch>
            <Route exact path='/' component={SignIn} />
            <Route path='/POS' component={POS} />
        </Switch>
    )
}

export default App;