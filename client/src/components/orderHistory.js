import React, { useEffect, useState } from 'react';
import PaidOrder from './paidOrder';
import {send} from '../HelperFunctions';

const OrderHistory = () => {

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        // retrieve all payed orders from the database
        send("GET", "/api/orders/true/", null, function(err, res) {
            if(err) console.log(err);
            else{
                setOrders(res);
            }
        });
    }, []);

    return (
        <div className='orders'>
            {orders.map(order => <PaidOrder order={order} key={order.order_number}/>)}
        </div>
    )
}

export default OrderHistory;

