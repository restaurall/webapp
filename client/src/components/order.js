import React, { useState } from 'react';
import {send} from '../HelperFunctions';

const Order = ({order: {completed, order_number, total}, removeOrder, editOrder}) => {

    const [complete, setComplete] = useState(completed);

    const toggleComplete = () => {
        let data = {
            completed: !complete,
            orderNumber: order_number
        }
		send("PATCH", "/api/order/status/complete/", data, function(err, res) {
            if(err) console.log(err);
            else{
                setComplete(prevState => !prevState);
            }
        });
    } 

    //TODO: is it necessary to store complete in db?
    return (
        <div className='order'>
            <button type="button" className="removeOrderBtn" onClick={removeOrder}>Remove</button>
            <div className="orderNumber">Order number: #{order_number}</div>
            <div className="orderTotal">Total: {total}</div>
            {
                complete ? 
                    <button 
                        type="buttton" 
                        className="toggleCompleteBtn" 
                        onClick={toggleComplete} 
                        style={{"backgroundColor": "#6AFA5C"}}
                    >
                        Complete
                    </button> 
                : 
                    <button 
                        type="buttton" 
                        className="toggleCompleteBtn" 
                        onClick={toggleComplete} 
                        style={{"backgroundColor": "#FF6B2B"}}>
                            In progress
                    </button>
            }
            <button 
                type="button" 
                className="editOrderBtn" 
                onClick={editOrder}
            >
                Edit Order
            </button>
        </div>
    )
}

export default Order;

// export default class Order extends Component {
    
//     state = {
//         complete: this.props.order.completed
//     }

//     toggleComplete = () => {
//         let data = {
//             completed: !this.state.complete,
//             orderNumber: this.props.order.order_number
//         }
// 		send("PATCH", "/api/order/status/complete/", data, function(err, res) {
//             if(err) console.log(err);
//             else{
//                 this.setState({
//                     complete: !this.state.complete
//                 })
//             }
//           }.bind(this));
//     }

//     render() {
//         return (
//             <div className='order'>
//                 <button type="button" className="removeOrderBtn" 
//                 onClick={this.props.removeOrder}>Remove</button>
//                 <div className="orderNumber">Order number: #{this.props.order.order_number}</div>
//                 <div className="orderTotal">Total: {this.props.order.total}</div>
//                 {this.state.complete ? <button type="buttton" className="toggleCompleteBtn" 
//                 onClick={this.toggleComplete} style={{"backgroundColor": "#6AFA5C"}}>Complete</button> 
//                 : <button type="buttton" className="toggleCompleteBtn" 
//                 onClick={this.toggleComplete} style={{"backgroundColor": "#FF6B2B"}}>In progress</button>}
//                 <button type="button" className="editOrderBtn" 
//                 onClick={this.props.editOrder}>Edit Order</button>
//             </div>
//         )
//     }
// }