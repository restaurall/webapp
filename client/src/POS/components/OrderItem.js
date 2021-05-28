import React from 'react';
import { usePOSContext } from '../POSContext';

const OrderItem = ({item}) => {

    const {
        removeOrderItem, 
        toggleCrossOut, 
        decrementQty,
        incrementQty, 
        changeQty
    } = usePOSContext();

    const {name, isCrossed, price, qty} = item;

    return (
        <div className='item'>
            <button 
                type="button" 
                className="removeItemButton" 
                onClick={() => removeOrderItem(name)}>X</button>
            <p 
                className="itemName"
                style={{textDecoration: isCrossed ? 'line-through' : ''}}
                onClick={() => toggleCrossOut(name)}>{name}</p>
            <p className='price'>{price.toFixed(2)}</p>
            <div>
                <button 
                    type="button" 
                    className="decrementBtn" 
                    onClick={() => (qty > 1) ? decrementQty(name) : removeOrderItem(name)}>-</button>
                <input className="inputQty" value={qty} onChange={(e) => changeQty(e, name)} />
                <button 
                    type="button" 
                    className="incrementBtn" 
                    onClick={() => incrementQty(name)}>+</button>
            </div>
        </div>
    )
}

export default OrderItem;