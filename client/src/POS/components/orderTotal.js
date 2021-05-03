import React from 'react';

//TODO: pass in the value of subTotal instead of passing the function as prop?
const OrderTotal = ({calculateSubTotal, onEdit, displayPayment, placeOrder}) => {
 
    const subTotal = calculateSubTotal();

    return(
        <div className="finishOrder">
            <div className="orderTotal">
                <div className="subTotal">HST: {(subTotal * 0.13).toFixed(2)}</div>
                <div className="SubTotal">Sub-Total: {subTotal.toFixed(2)}</div>
                <div className="total">Total: {(subTotal * 1.13).toFixed(2)}</div>
            </div>
            {onEdit ? 
                <button 
                    type="button" 
                    className="finishBtns" 
                    id="payNow"
                    onClick={displayPayment}>Pay Now</button> : null
            }
            <button 
                type="button" 
                className="finishBtns" 
                id="placeOrder"
                onClick={placeOrder}>Place Order</button>
        </div>
    )
}

export default OrderTotal;
