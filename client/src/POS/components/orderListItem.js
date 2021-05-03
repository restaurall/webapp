import React from 'react';

const OrderListItems = (props) => {

    const {
        item,
        handleDelete,
        toggleCrossOut,
        decrementQty,
        changeQty,
        incrementQty
    } = props;

    return (
        <div key={item.id} className="orderListItems">
            <button 
                type="button" 
                className="removeItemButton" 
                onClick={handleDelete}>X</button>
            <div 
                className="item"
                style={{textDecoration: item.crossed ? "line-through" : ""}}
                onClick={toggleCrossOut}>
                {item.name}
            </div>
            <button 
                type="button" 
                className="decrementBtn" 
                onClick={decrementQty}>-</button>
            <input className="inputQty" value={item.quantity} onChange={(e) => changeQty(e, item.id)} />
            <button 
                type="button" 
                className="incrementBtn" 
                onClick={incrementQty}>+</button>
        </div>
    );    
}

export default OrderListItems;
