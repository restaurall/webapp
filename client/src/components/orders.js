import React, { useState, useEffect } from 'react';
import {send} from '../HelperFunctions';
import Order from './order';

const Orders = ({editOrder}) => {

    const [orders, setOrders] = useState([]);

    // retrieve all currently processing orders from the database
    useEffect(() => {
        send("GET", "/api/orders/false/", null, function(err, res) {
            if(err) console.log(err);
            else{
                setOrders(res);
            }
        });   
    }, [])

    const removeOrder = (orderNumber) => {
        let data = {orderNumber}
        send("DELETE", "/api/order/", data, function(err, res) {
            if(err) console.log(err);
            else{
                setOrders(prevState => prevState.filter(order => order.order_number !== orderNumber));
            }
        });
    }

    return (
        <div className='orders'>
            {orders.map(order => 
                <Order 
                    key={order.order_number} 
                    removeOrder={() => removeOrder(order.order_number)} 
                    order={order}
                    editOrder={() => editOrder(order.order_number)}
                />
            )}
        </div>
    )    
}

export default Orders;
