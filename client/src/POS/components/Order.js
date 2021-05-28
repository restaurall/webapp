import React, {useState, useEffect} from 'react';
import {usePOSContext} from '../POSContext';
import OrderItem from './OrderItem';

const Order = () => {

    const {
        orderNum,
        itemList,
        onEdit,
        placeOrder,
        setItemList
    } = usePOSContext();

    const [subTotal, setSubTotal] = useState(0);

    // calculate total
    useEffect(() => {
        let newSubTotal = 0;
        itemList.forEach(item => {
            if(!item.isCrossed && item.qty) {
                newSubTotal += (item.price) * item.qty;
            }
        });
        setSubTotal(newSubTotal);
    }, [itemList]);

    // const handlePlaceOrder = () => {
    //     if(itemList.length > 0) {
    //         const total = (subTotal * 1.13).toFixed(2);
    //         const newOrder = {
    //             orderNum: onEdit ? onEdit.orderNum : orderNum,
    //             itemList: itemList,
    //             total,
    //             isComplete: false,
    //         };
    //         placeOrder(newOrder);
    //     } else {
    //         //TODO: empty list error msg
    //     }
    // }

    return (
        <section className="orderItems">
            <h2> #{onEdit ? onEdit.orderNum : orderNum} </h2>
            <div className='itemList'>
                {itemList.map((item) => 
                    <div key={item.name}>
                        <OrderItem item={item}/>
                    </div>
                )}       
            </div>
            <hr />
            <div className="orderTotal">
                <div style={{'fontSize':'14px'}}>Sub-Total: ${subTotal.toFixed(2)}</div>
                <div style={{'fontSize':'14px', 'marginTop':'2px'}}>HST: ${(subTotal * 0.13).toFixed(2)}</div>
                <div style={{'fontWeight':'bold', 'fontSize':'20px', 'marginTop':'5px'}}>
                    Total: ${(subTotal * 1.13).toFixed(2)}
                </div>
            </div>
            {/* {onEdit ? 
                <button 
                    type="button" 
                    className="finishBtns" 
                    id="payNow"
                    onClick={displayPayment}>Pay Now</button> : null
            } */}
            <button
                type='button'
                className='finishOrderBtn cancelOrderBtn'
                onClick={() => setItemList([])}
                disabled={!itemList.length}>Cancel</button>
            <button 
                type="button" 
                className="finishOrderBtn placeOrderBtn" 
                onClick={placeOrder}
                disabled={!itemList.length}>Place Order</button>
        </section>
    );    
}

export default Order;
