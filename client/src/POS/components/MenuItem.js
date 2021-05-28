import React from 'react';
import {usePOSContext} from '../POSContext';

const MenuItem = ({name, price, color}) => {

    const {
        addOrderItem
    } = usePOSContext();

    return (
        <button 
            type="button" 
            className="menuItem" 
            onClick={() => 
                addOrderItem({
                    name: name,
                    isCrossed: false,
                    price: price,
                    qty: 1         
                })
            }
            style={{"backgroundColor": color}}
        >
            {name}
        </button>            
    );
}

export default MenuItem;
