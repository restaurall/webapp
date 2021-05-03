import React from 'react';
import {BrowserRouter as Switch, Route} from 'react-router-dom';

import Home from './home/Home'
import POS from './POS/POS'

const App = () => {
    return (
        <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/POS' component={POS} />
        </Switch>
    )
}

export default App;