import React, { useEffect, useState } from 'react';
import CategoryItem from './category';
import OrderListItem from './orderListItem';
import OrderTotal from './orderTotal';
import {send} from '../HelperFunctions';
import Payment from './paymentPage';

//TODO: create usecontext to avoid prop drilling
//TODO: want state of current orders to be preserved even when switching
//      to different pages:view order, order history. (keep orders page state as global for pos)
//TODO: onEdit should change "place order" button to "confirm"
const OrderListMenu = ({orderNumber, onEdit, incrementOrderNum, viewOrders}) => {

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({});
  const [menuItems, setMenuItems] = useState([]);
  const [categoryItems, setCategoryItems] = useState([]);
  const [orderList, setOrderList] = useState([]);
  //TODO: want nav instead of display state
  const [display, setDisplay] = useState('takeOrder');
  const [orderNum, setOrderNum] = useState(orderNumber);

  // fetch category items from database
  const getCategoryItems = (category) => {
    send("GET", "/api/menuItems/", null, function(err, res) {
      if(err) console.log(err);
      else{
        setCategoryItems(res.filter(item => item.category === category.category_name));
        setMenuItems(res);
      }
    });
  }

  // fetch categories and items from database and initialize states
  useEffect(() => {
		send("GET", "/api/categories/", null, function(err, res) {
      if(err) console.log(err);
      else{
        setCategories(res);
        if(res.length > 0) {
          setSelectedCategory(res[0]);
          getCategoryItems(res[0]);          
        }
      }
    });
  }, [])

  // get order list with given ordernumber
  useEffect(() => {
    if(onEdit) {
      send("GET", "/api/orderItems/" + orderNum + "/", null, function(err, res) {
        if(err) console.log(err);
        else{
          setOrderList(res);
        }
      });   
    }    
  }, []);

  const calculateSubTotal = () => {
    let subTotal = 0;
    let items = orderList.filter(item => !item.crossed);
    items.forEach(item => subTotal += (parseFloat(item.price)) * item.quantity);
    return subTotal
  };

  const sendOrderItems = () => {
    // for each item in itemList, store in database with the current order number
    orderList.forEach(item => send("POST", "/api/orderItems/", {
        id: item.id,
        order_number: orderNum,
        name: item.name,
        crossed: item.crossed,
        price: item.price,
        quantity: item.quantity
      }, function(err, res) {if(err) console.log(err);})
    );
  }

  const placeOrder = () => {
    if(orderList.length !== 0) {
      let total = (calculateSubTotal() * 1.13).toFixed(2);
      let orderData = {
        order_number: orderNum, 
        number_of_items: orderList.length,
        total,
        completed: false,
        payed:false
      };
      if (onEdit) {
        send("DELETE", "/api/order/items/", {orderNumber: orderNum}, function(err, res) {
          if(err) console.log(err);
          else{
              send("PATCH", "/api/order/total/", {total, orderNumber: orderNum}, function(err, res){
                if(err) console.log(err);
              });
              sendOrderItems();
              setOrderList([]);
          }
        });
      } else {
        // for each item in itemList, store in database with the current order number
        // stored in state of App.js
        send("POST", "/api/orders/", orderData, function(err, res) {
          if(err) console.log(err);
          else{
            sendOrderItems();
            // increment order number in App.js state
            incrementOrderNum();
            setOrderList([]);
            setOrderNum((prevNum) => prevNum + 1);
          }
        });
      }
    }
  }

  const categoryOnClick = (category) => {
    let items = menuItems.filter(item => item.category === category.category_name);
    setSelectedCategory(category);
    setCategoryItems(items);
  }

  const addItem = (item) => {
    setOrderList((prevList) => [...prevList, item]);
  }

  const toggleCrossOut = (id) => {
    setOrderList(prevList => prevList.map(item => {
        if (item.id === id) {
          return {
            ...item, 
            crossed: !item.crossed
          };
        } else {
          return item;
        }
      })
    );
  };

  const handleDelete = (id) => {
    setOrderList(prevList => prevList.filter(item => item.id !== id));
  };

  const decrementQty = (id) => {
    setOrderList(prevList => prevList.map(item => {
        if (item.id === id && item.quantity !== 1) {
          return {
            ...item, 
            quantity: item.quantity - 1
          };
        } else {
          return item;
        }
      })
    );  
  }  

  const incrementQty = (id) => {
    setOrderList(prevList => prevList.map(item => {
        if (item.id === id) {
          return {
            ...item, 
            quantity: item.quantity + 1
          };
        } else {
          return item;
        }
      })
    );   
  }

  //TODO: check input value and display error when need to
  const changeQty = (event, id) => {
      const value = event.target.value;
      setOrderList(prevList => prevList.map(item => {
          if (item.id === id) {
            return {
              ...item, 
              quantity: value ? parseInt(value, 10) : ""
            };
          } else {
            return item;
          }
        })
      );       
  }

  //TODO: want to use nav and link instead to display page
  const displayPayment = () => {
    setDisplay('pay')
  }

  //TODO: want to use nav and link instead to display page
  const displayTakeOrder = () => {
    setDisplay('takeOrder')
  }

  if (display === 'takeOrder') {
    return (
      <div>
        <div className="orderMenuTitles">
          <h1 id="order_list_title"> Order #{orderNum} </h1>
          <h1 id="menu_title"> Menu </h1>
        </div>
        <div className="orderListMenu">
          <div className="orderList">
            {orderList.map((item) => 
              <OrderListItem 
                key={item.id}
                item={item}
                toggleCrossOut={() => toggleCrossOut(item.id)}
                handleDelete={() =>  handleDelete(item.id)}
                decrementQty={() => decrementQty(item.id)}
                incrementQty={() => incrementQty(item.id)}
                changeQty={changeQty}
              />)}
          </div>
          <div className="menu">
            <div className="categories">
              {categories.map((category, index) => 
                <button 
                  type="button" 
                  className="category" 
                  key={category.category_name}
                  style={selectedCategory.category_name === category.category_name ? 
                    {"backgroundColor": category.color} : null}
                  onClick={() => categoryOnClick(category)}>
                  {category.category_name}
                </button>)}
              <div className="animation start-home"></div>
            </div>
            <div className="items">
              {categoryItems.map((item, index) => <CategoryItem 
                addItem={addItem}
                key={index}
                itemName={item.name}
                price={item.price}
                color={selectedCategory.color}/>)}
            </div>
            <OrderTotal calculateSubTotal={calculateSubTotal} 
              placeOrder={placeOrder} 
              displayPayment={displayPayment}
              onEdit={onEdit}/>
          </div>
        </div>
      </div>
    );      
  }
  else if(display === "pay") {
    return(
      <Payment 
        orderNumber={orderNum}
        items={orderList}
        total={calculateSubTotal()*1.13}
        displayTakeOrder={displayTakeOrder}
        viewOrders={viewOrders}/>
    )
  } else {
    return (
      <>
      </>
    )
  }
}

export default OrderListMenu;

// export default class OrderListMenu extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       categories: [],
//       selectedCategory: null,
//       menuItems: [],
//       categoryItems:[],
//       orderList: [],
//       display: "takeOrder",
//       orderNumber: this.props.orderNumber,
//       paymentAmount: 0.00
//     };
    
//     if(this.props.onEdit) {this.getOrderList(this.props.orderNumber)};

//     this.getCategories();
//   }

//   // get order list with given ordernumber
//   getOrderList = (orderNumber) => {
//     send("GET", "/api/orderItems/" + orderNumber + "/", null, function(err, res) {
//       if(err) console.log(err);
//       else{
//         this.setState({
//           orderList: res
//         });
//       }
//     }.bind(this));   
//   }

//   // fetch category items from database and initialize states
//   getCategoryItems = (category) => {
//     send("GET", "/api/menuItems/", null, function(err, res) {
//       if(err) console.log(err);
//       else{
//         this.setState({
//           menuItems: res,
//           categoryItems: res.filter(item => item.category === category.category_name)
//         });
//       }
//     }.bind(this));
//   }

//   // fetch categories and items from database and initialize this.state
//   getCategories = () => {
// 		send("GET", "/api/categories/", null, function(err, res) {
//       if(err) console.log(err);
//       else{
//         this.setState({
//           categories: res,
//           selectedCategory: res[0]
//         });
//         this.getCategoryItems(res[0]);
//       }
//     }.bind(this));
//   }

  // placeOrder = () => {
  //   if(this.state.orderList.length !== 0) {
  //     let orderNumber = this.state.orderNumber;
  //     let total = (this.calculateSubTotal() * 1.13).toFixed(2);
  //     let orderData = {order_number: orderNumber, 
  //       number_of_items: this.state.orderList.length,
  //       total: total,
  //       completed: false,
  //       payed:false};
  //     if (this.props.onEdit) {
  //       send("DELETE", "/api/order/items/", {orderNumber: orderNumber}, function(err, res) {
  //         if(err) console.log(err);
  //         else{
  //             send("PATCH", "/api/order/total/", {total: total, orderNumber: orderNumber}, function(err, res){
  //               if(err) console.log(err);
  //             });
  //             this.sendOrderItems();
  //             this.setState({orderList: []});
  //         }
  //       }.bind(this));
  //     } else {
  //       // for each item in itemList, store in database with the current order number
  //       // stored in state of App.js
  //       send("POST", "/api/orders/", orderData, function(err, res) {
  //         if(err) console.log(err);
  //         else{
  //           this.sendOrderItems();
  //           // increment order number in App.js state
  //           this.props.incrementOrderNum();
  //           this.setState({orderList: [], orderNumber: this.state.orderNumber + 1});
  //         }
  //       }.bind(this));
  //     }
  //   }
  // }

  // sendOrderItems = () => {
  //     // for each item in itemList, store in database with the current order number
  //     this.state.orderList.map(item => send("POST", "/api/orderItems/", {
  //       id: item.id,
  //       order_number: this.state.orderNumber,
  //       name: item.name,
  //       crossed: item.crossed,
  //       price: item.price,
  //       quantity: item.quantity
  //     }, function(err, res) {if(err) console.log(err);}));
  // }

  // categoryOnClick = (C) => {
  //   let items = this.state.menuItems.filter(item => item.category === C.category_name)
  //   this.setState({
  //     selectedCategory: C,
  //     categoryItems: items
  //   });
  // }

  // addItem = (item) => {
  //   const temp = [...this.state.orderList, item];
  //   this.setState({
  //     orderList: temp
  //   });
  // }

  // toggleCrossOut = (id) => {
  //   this.setState({
  //     orderList: this.state.orderList.map(item => {
  //       if (item.id === id) {
  //         return {
  //           ...item, 
  //           crossed: !item.crossed
  //         };
  //       } else {
  //         return item;
  //       }
  //     })
  //   });
  // };

  // handleDelete = (id) => {
  //   this.setState({
  //     orderList: this.state.orderList.filter(item => item.id !== id)
  //   })
  // };

  // decrementQty = (id) => {
  //   this.setState({
  //     orderList: this.state.orderList.map(item => {
  //       if (item.id === id && item.quantity !== 1) {
  //         return {
  //           ...item, 
  //           quantity: item.quantity - 1
  //         };
  //       } else {
  //         return item;
  //       }
  //     })
  //   });  
  // }

  // incrementQty = (id) => {
  //   this.setState({
  //     orderList: this.state.orderList.map(item => {
  //       if (item.id === id) {
  //         return {
  //           ...item, 
  //           quantity: item.quantity + 1
  //         };
  //       } else {
  //         return item;
  //       }
  //     })
  //   });  
  // }

  // changeQty = (event, id) => {
  //   this.setState({
  //     orderList: this.state.orderList.map(item => {
  //       if (item.id === id) {
  //         return {
  //           ...item, 
  //           quantity: event.target.value ? parseInt(event.target.value, 10) : ""
  //         };
  //       } else {
  //         return item;
  //       }
  //     })
  //   }); 
  // }

  // calculateSubTotal = () => {
  //   let itemsList = this.state.orderList;
  //   let subTotal = 0;
  //   let items = itemsList.filter(item => !item.crossed);
  //   items.map(item => subTotal += (parseFloat(item.price)) * item.quantity);
  //   return subTotal
  // };

  // displayPayment = () => {
  //   this.setState({
  //     display: "pay"
  //   });
  // }

  // displayTakeOrder = () => {
  //   this.setState({
  //     display: "takeOrder"
  //   });
  // }

//   render() {
//     if (this.state.display === "takeOrder") {
//       return (
//         <div>
//           <div className="orderMenuTitles">
//             <h1 id="order_list_title"> Order #{this.state.orderNumber} </h1>
//             <h1 id="menu_title"> Menu </h1>
//           </div>
//           <div className="orderListMenu">
//             <div className="orderList">
//               {this.state.orderList.map((item) => 
//                 <OrderListItem 
//                   key={item.id}
//                   item={item}
//                   toggleCrossOut={() => this.toggleCrossOut(item.id)}
//                   handleDelete={() =>  this.handleDelete(item.id)}
//                   decrementQty={() => this.decrementQty(item.id)}
//                   incrementQty={() => this.incrementQty(item.id)}
//                   changeQty={(event) => this.changeQty(event, item.id)}
//                 />)}
//             </div>
//             <div className="menu">
//               <div className="categories">
//                 {this.state.categories.map((category, index) => 
//                   <button type="button" className="category" key={category.category_name}
//                     style={this.state.selectedCategory.category_name === category.category_name ? 
//                       {"backgroundColor": category.color} : null}
//                     onClick={this.categoryOnClick.bind(this, category)}>
//                     {category.category_name}
//                   </button>)}
//                 <div className="animation start-home"></div>
//               </div>
//               <div className="items">
//                 {this.state.categoryItems.map((item, index) => <CategoryItem 
//                   addItem={this.addItem}
//                   key={index}
//                   itemName={item.name}
//                   price={item.price}
//                   color={this.state.selectedCategory.color}/>)}
//               </div>
//               <OrderTotal calculateSubTotal={this.calculateSubTotal} 
//                 placeOrder={this.placeOrder} 
//                 displayPayment={this.displayPayment}
//                 onEdit={this.props.onEdit}/>
//             </div>
//           </div>
//         </div>
//       );      
//     }
//     else if(this.state.display === "pay") {
//       return(
//         <Payment 
//           orderNumber={this.state.orderNumber}
//           items={this.state.orderList}
//           total={this.calculateSubTotal()*1.13}
//           displayTakeOrder={this.displayTakeOrder}
//           viewOrders={this.props.viewOrders}/>
//       )
//     }
//   }
// }