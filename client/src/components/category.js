import React from 'react';
import shortid from 'shortid';

const CategoryItem = ({addItem, itemName, price, color}) => {

    return (
        <button 
            name={itemName} 
            type="button" 
            value={price}
            className="itemBtn" 
            onClick={(e) => {
                addItem({
                    id: shortid.generate() ,
                    name: e.target.name,
                    crossed: false,
                    price: e.target.value,
                    quantity: 1                   
                });
            }}
            style={{"backgroundColor": color}}
        >
            {itemName}
        </button>            
    );
}

export default CategoryItem;
// export default class CategoryItem extends Component {
//     handleOnClick = event => {
//         this.props.addItem({
//             id: shortid.generate() ,
//             name: event.target.name,
//             crossed: false,
//             price: event.target.value,
//             quantity: 1
//         })
//     }

//     render() {
//         return (
//             <button name={this.props.itemName} type="button" value={this.props.price}
//                 className="itemBtn" onClick={(event) => this.handleOnClick(event)}
//                 style={{"backgroundColor": this.props.color}}>{this.props.itemName}</button>            
//         );
//     }
//}
