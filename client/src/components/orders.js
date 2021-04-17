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
// export default class Orders extends Component {

//     constructor(props) {
//         super(props);

//         this.state = {
//             orders: []
//         };

//         this.getOrders();
//     }

//     // retrieve all currently processing orders from the database
//     getOrders = () => {
//         send("GET", "/api/orders/false/", null, function(err, res) {
//             if(err) console.log(err);
//             else{
//                 this.setState({
//                     orders: res
//                 });
//             }
//         }.bind(this));
//     }

//     removeOrder = (orderNumber) => {
//         let data = {orderNumber: orderNumber}
//         send("DELETE", "/api/order/", data, function(err, res) {
//             if(err) console.log(err);
//             else{
//                 let filteredOrders = this.state.orders.filter(order => order.order_number !== orderNumber);
//                 this.setState({
//                     orders: filteredOrders
//                 });
//             }
//         }.bind(this));
//     }

//     editOrder = (orderNumber) => {
//         this.props.editOrder(orderNumber);
//     }

//     render() {
//         return (
//             <div className='orders'>
//                 {this.state.orders.map(order => 
//                     <Order key={order.order_number} removeOrder={() => this.removeOrder(order.order_number)} order={order}
//                     editOrder={() => this.editOrder(order.order_number)}/>)}
//             </div>
//         )
//     }
// }