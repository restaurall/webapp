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
