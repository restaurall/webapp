import './style/takeOrderPage.css';
import React, { useEffect, useState } from 'react';
// import CategoryItem from './components/category';
import {send} from '../HelperFunctions';
import Payment from './PaymentPage';
import Order from './components/Order';
import Menu from './components/Menu';
import { usePOSContext } from './POSContext';

//TODO: create usecontext to avoid prop drilling
//TODO: want state of current orders to be preserved even when switching
//      to different pages:view order, order history. (keep orders page state as global for pos)
//TODO: onEdit should change "place order" button to "confirm"
const TakeOrder = () => {

  // const [categories, setCategories] = useState([]);
  // const [selectedCategory, setSelectedCategory] = useState({});
  // const [menuItems, setMenuItems] = useState([]);
  // const [categoryItems, setCategoryItems] = useState([]);
  // const [orderList, setOrderList] = useState([]);
  // //TODO: want nav instead of display state
  // const [display, setDisplay] = useState('takeOrder');
  // // initialize orderNum from data base
  // const [orderNum, setOrderNum] = useState(() => {
	// 	send("GET", "/api/orderNumber/", null, function(err, res) {
	// 		if(err) console.log(err);
	// 		else{
  //       return res[0][Object.keys(res[0])[0]] + 1;
	// 		}
	// 	});
  // });

  // fetch category items from database
  // const getCategoryItems = (category) => {
  //   send("GET", "/api/menuItems/", null, function(err, res) {
  //     if(err) console.log(err);
  //     else{
  //       setCategoryItems(res.filter(item => item.category === category.category_name));
  //       setMenuItems(res);
  //     }
  //   });
  // }

  // fetch categories and items from database and initialize states
  // useEffect(() => {
	// 	send("GET", "/api/categories/", null, function(err, res) {
  //     if(err) console.log(err);
  //     else{
  //       setCategories(res);
  //       if(res.length > 0) {
  //         setSelectedCategory(res[0]);
  //         getCategoryItems(res[0]);          
  //       }
  //     }
  //   });
  // }, [])

  // get order list with given ordernumber
  // useEffect(() => {
  //   if(onEdit) {
  //     send("GET", "/api/orderItems/" + orderNum + "/", null, function(err, res) {
  //       if(err) console.log(err);
  //       else{
  //         setOrderList(res);
  //       }
  //     });   
  //   }    
  // }, []);

  // const calculateSubTotal = () => {
  //   let subTotal = 0;
  //   let items = orderList.filter(item => !item.crossed);
  //   items.forEach(item => subTotal += (parseFloat(item.price)) * item.quantity);
  //   return subTotal
  // };

  // const sendOrderItems = (items) => {
  //   // for each item in itemList, store in database with the current order number
  //   items.forEach(item => send("POST", "/api/orderItems/", {
  //       id: item.id,
  //       order_number: orderNum,
  //       name: item.name,
  //       crossed: item.crossed,
  //       price: item.price,
  //       quantity: item.quantity
  //     }, function(err, res) {if(err) console.log(err);})
  //   );
  // }

  // const placeOrder = () => {
  //   if(itemList.length !== 0) {
  //     let total = (subTotal * 1.13).toFixed(2);
  //     let orderInfo = {
  //       order_number: orderNum, 
  //       number_of_items: itemList.length,
  //       total,
  //       completed: false,
  //     };
  //     if (onEdit) {
  //       send("DELETE", "/api/order/items/", {orderNumber: orderNum}, function(err, res) {
  //         if(err) console.log(err);
  //         else{
  //             send("PATCH", "/api/order/total/", {total, orderNumber: orderNum}, function(err, res){
  //               if(err) console.log(err);
  //             });
  //             sendOrderItems();
  //             setOrderList([]);
  //         }
  //       });
  //     } else {
  //       // for each item in itemList, store in database with the current order number
  //       // stored in state of App.js
  //       send("POST", "/api/orders/", orderData, function(err, res) {
  //         if(err) console.log(err);
  //         else{
  //           sendOrderItems();
  //           // increment order number in App.js state
  //           incrementOrderNum();
  //           setOrderList([]);
  //           setOrderNum((prevNum) => prevNum + 1);
  //         }
  //       });
  //     }
  //   }
  // }

  // const categoryOnClick = (category) => {
  //   let items = menuItems.filter(item => item.category === category.category_name);
  //   setSelectedCategory(category);
  //   setCategoryItems(items);
  // }

  // // const addItem = (item) => {
  // //   setOrderList((prevList) => [...prevList, item]);
  // // }

  // const toggleCrossOut = (id) => {
  //   setOrderList(prevList => prevList.map(item => {
  //       if (item.id === id) {
  //         return {
  //           ...item, 
  //           crossed: !item.crossed
  //         };
  //       } else {
  //         return item;
  //       }
  //     })
  //   );
  // };

  // // const handleDelete = (id) => {
  // //   setOrderList(prevList => prevList.filter(item => item.id !== id));
  // // };

  // const decrementQty = (id) => {
  //   setOrderList(prevList => prevList.map(item => {
  //       if (item.id === id && item.quantity !== 1) {
  //         return {
  //           ...item, 
  //           quantity: item.quantity - 1
  //         };
  //       } else {
  //         return item;
  //       }
  //     })
  //   );  
  // }  

  // const incrementQty = (id) => {
  //   setOrderList(prevList => prevList.map(item => {
  //       if (item.id === id) {
  //         return {
  //           ...item, 
  //           quantity: item.quantity + 1
  //         };
  //       } else {
  //         return item;
  //       }
  //     })
  //   );   
  // }

  // //TODO: check input value and display error when need to
  // const changeQty = (event, id) => {
  //     const value = event.target.value;
  //     setOrderList(prevList => prevList.map(item => {
  //         if (item.id === id) {
  //           return {
  //             ...item, 
  //             quantity: value ? parseInt(value, 10) : ""
  //           };
  //         } else {
  //           return item;
  //         }
  //       })
  //     );       
  // }

  // // //TODO: want to use nav and link instead to display page
  // // const displayPayment = () => {
  // //   setDisplay('pay')
  // // }

  // // //TODO: want to use nav and link instead to display page
  // // const displayTakeOrder = () => {
  // //   setDisplay('takeOrder')
  // // }

  return (
    <main className='takeOrderPage'>
      <div className="takeOrderContainer">
        <Order />
        <Menu />
      </div>
    </main>
  )

  // if (display === 'takeOrder') {
  //   return (
  //     <main className='main-page'>
  //       <section className="take-order-container">
  //         <OrderItems />
  //         <div className="menu">
  //           <div className="categories">
  //             {categories.map((category, index) => 
  //               <button 
  //                 type="button" 
  //                 className="category" 
  //                 key={category.category_name}
  //                 style={selectedCategory.category_name === category.category_name ? 
  //                   {"backgroundColor": category.color} : null}
  //                 onClick={() => categoryOnClick(category)}>
  //                 {category.category_name}
  //               </button>)}
  //             <div className="animation start-home"></div>
  //           </div>
  //           <div className="items">
  //             {categoryItems.map((item, index) => <CategoryItem 
  //               addItem={addItem}
  //               key={index}
  //               itemName={item.name}
  //               price={item.price}
  //               color={selectedCategory.color}/>)}
  //           </div>
  //         </div>
  //       </section>
  //     </main>
  //   );      
  // }
  // else if(display === "pay") {
  //   return(
  //     <Payment 
  //       orderNumber={orderNum}
  //       items={itemList}
  //       total={calculateSubTotal()*1.13}
  //       displayTakeOrder={displayTakeOrder}
  //       viewOrders={viewOrders}/>
  //   )
  // } else {
  //   return (
  //     <>
  //     </>
  //   )
  // }
}

export default TakeOrder;
