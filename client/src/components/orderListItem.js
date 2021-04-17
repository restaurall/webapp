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

// export default class OrderListItem extends Component {

//     render() {
//         return (
//             <div key={this.props.item.id} className="orderListItems">
//                 <button type="button" className="removeItemButton" 
//                 onClick={this.props.handleDelete}>X</button>
//                 <div 
//                     className="item"
//                     style={{textDecoration: this.props.item.crossed ? "line-through" : ""}}
//                     onClick={this.props.toggleCrossOut}>
//                     {this.props.item.name}
//                 </div>
//                 <button type="button" className="decrementBtn" 
//                 onClick={this.props.decrementQty}>-</button>
//                 <input className="inputQty" value={this.props.item.quantity} onChange={this.props.changeQty} />
//                 <button type="button" className="incrementBtn" 
//                 onClick={this.props.incrementQty}>+</button>
//             </div>
//         );
//     }
// }