import React, { useState } from 'react';
import {send} from '../HelperFunctions';

const PaymentPage = ({items, total, orderNumber, viewOrders, displayTakeOrder}) => {

  const [payment, setPayment] = useState(0);

  const handleBillPay = (event) => {
    const value = event.target.value;
    setPayment(value ? parseFloat(value) : '');
  }  

  const payOrder = (orderNumber) => {
    //TODO: Else display error message?
    if(payment >= total) {
      send("PATCH", "/api/order/payed/", {payed: true, orderNumber: orderNumber}, function(err, res){
        if(err) console.log(err);
        else{
          viewOrders();
        }
      });
    }
  }
  
  return(
    <main>
      <div className="orderMenuTitles">
        <h1 id="order_list_title"> Order #{orderNumber} </h1>
      </div>
      <div className="orderListMenu">
        <div className="orderList">
          <div className="paymentItemsHeader">
            <button className="itemQty">Qty.</button>
            <button className="itemName">Name</button>
            <button className="itemPrice">price</button>
          </div>
          {items.map((item) => 
              <div className="paymentItemsHeader paymentItems" key={item.id}>
                <div className="itemQty">{item.quantity}</div>
                <div className="itemName">{item.name}</div>
                <div className="itemPrice">
                  {(item.price * item.quantity).toFixed(2)}</div>
              </div>
            )}
        </div>
        <div className="applyPayment">
            <button type="button" id="five" value={5.00} onClick={handleBillPay}>$5</button>
            <button type="button" id="ten" value={10.00} onClick={handleBillPay}>$10</button>
            <button type="button" id="twenty" value={20.00} onClick={handleBillPay}>$20</button>
            <button type="button" id="fifty" value={50.00} onClick={handleBillPay}>$50</button>
            <button type="button" id="hundred" value={100.00} onClick={handleBillPay}>$100</button>
            <button 
              type="button" 
              id="balance" 
              value={total.toFixed(2)} 
              onClick={handleBillPay}>Balance</button>
            <div className="paymentCalculations">
              <div className="customAmount">
                  <div className="amountText">Amount:</div>
                  <input 
                    className="inputAmount" 
                    type="number" 
                    step="0.01" 
                    value={payment} 
                    onChange={handleBillPay}
                  />
              </div>
              <div className="paymentTotalText">Total: {total.toFixed(2)}</div>
              <div className="paymentTotalText">
                Change due: {(payment - total).toFixed(2)}
              </div>
            </div>
            <button 
              type="button" 
              className="finishPaymentBtns" 
              id="ok"
              onClick={() => payOrder(orderNumber)}>OK</button>
            <button 
              type="button" 
              onClick={displayTakeOrder} 
              className="finishPaymentBtns" 
              id="cancel">CANCEL</button>
        </div>
      </div>
    </main>
  )  
}

export default PaymentPage;
