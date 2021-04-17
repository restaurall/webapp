import React, { useState, useEffect } from 'react';
import {send} from '../HelperFunctions';

const PaidOrder = ({order:{order_number, total, number_of_items}}) => {

    const [items, setItems] = useState([]);
    const [hidden, setHidden] = useState(true);

    useEffect(() => {
        send("GET", "/api/orderItems/" + order_number + "/", null, function(err, res) {
            if(err) console.log(err);
            else{
                setItems(res);
            }
        })   
    }, []);

    return(
        <div>
            <div className='order' style={{"cursor": "pointer"}} onClick={() => setHidden(prev => !prev)}>
                <div className="orderNumber">Order number: #{order_number}</div>
                <div className="orderTotal">Total: {total}</div>
                <div className="orderTotal">Number of items: {number_of_items}</div>
            </div>
            {hidden ? null :
                <div className="orderList">
                    {items.map((item) => 
                        <div className="paymentItemsHeader paymentItems" key={item.id}>
                            <div className="itemQty">Qty: {item.quantity}</div>
                            <div className="itemName">{item.name}</div>
                            <div className="itemPrice">Price: {(item.price * item.quantity).toFixed(2)}</div>
                        </div>
                    )}
                </div>
            }
        </div>
    )
}

export default PaidOrder;

// export default class PaidOrder extends Component {

//     constructor(props) {
//         super(props);
    
//         this.state = {
//             items: [],
//             hidden: true
//         };

//         this.getOrderList(this.props.order.order_number);
//     }

//     getOrderList = (orderNumber) => {
//         send("GET", "/api/orderItems/" + orderNumber + "/", null, function(err, res) {
//             if(err) console.log(err);
//             else{
//             this.setState({
//                 items: res
//             });
//             }
//         }.bind(this));   
//     }

//     toggleHidden = () => {
//         this.setState({
//             hidden: !this.state.hidden
//         });
//     }

//     render() {
//         return(
//             <div>
//                 <div className='order' style={{"cursor": "pointer"}} onClick={this.toggleHidden}>
//                     <div className="orderNumber">Order number: #{this.props.order.order_number}</div>
//                     <div className="orderTotal">Total: {this.props.order.total}</div>
//                     <div className="orderTotal">Number of items: {this.props.order.number_of_items}</div>
//                 </div>
//                 {this.state.hidden ? null :
//                     <div className="orderList">
//                         {this.state.items.map((item) => 
//                             <div className="paymentItemsHeader paymentItems" key={item.id}>
//                                 <div className="itemQty">Qty: {item.quantity}</div>
//                                 <div className="itemName">{item.name}</div>
//                                 <div className="itemPrice">Price: {(item.price * item.quantity).toFixed(2)}</div>
//                             </div>
//                         )}
//                     </div>
//                 }
//             </div>
//         )
//     }
// }