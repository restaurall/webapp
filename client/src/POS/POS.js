import React from 'react';
import {BrowserRouter as Switch, Route} from 'react-router-dom';

const POS = () => {
    return (
        <Switch>
            <Route exact path='/POS' render={() => <div>POS PAGE</div>} />
            <Route path='/POS/orders' render={} />
            <Route path='/POS/history' />
        </Switch>
    )
}

export default POS;