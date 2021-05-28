import React, {useState, useEffect, useContext} from 'react';
import {send} from '../HelperFunctions'

const POSContext = React.createContext();

/*
Provide global context for POS components.
State of MainPage is preserved so that state will not
be lost when switching between pages
*/
const POSProvider = ({children}) => {

    
    const [orderNum, setOrderNum] = useState(null);
    const [categories, setCategories] = useState([]);
    const [menuItems, setMenuItems] = useState([]);
    
    // itemList: [{name, isCrossed, price, qty}, ...]
    const [itemList, setItemList] = useState([]);
    // Temporary storage for itemList when an order is being edited
    const [tempList, setTempList] = useState([]);
    const [selectedCtg, setSelectedCtg] = useState(null);
    /*
    currently processing orders.
    orders: [{orderNum, itemList, total, isComplete}, ...]
    */
    const [orders, setOrders] = useState([]);
    
    /*
    An order being edited.
    onEdit: {orderNum, itemList, total, isComplete}
    */
   const [onEdit, setOnEdit] = useState(null);

   useEffect(() => {
       if(onEdit) {
           setTempList(itemList);
           setItemList(onEdit.itemList);
       }
   }, [onEdit])

   /*
   ======
   initialize components on first load
   ======
   */
   const initOrderNum = (callback) => {
       send("GET", "/api/orderNumber/", null, callback);
   }
   
   const getMenuCategories = (callback) => {
       send("GET", "/api/categories/", null, callback);
   }
   
   const getMenuItems = (callback) => {
       send('GET', '/api/menuItems', null, callback);
   }

   useEffect(() => {
        initOrderNum(function(err, res) {
            if(err) console.log(err);
            else{
                setOrderNum(res[0][Object.keys(res[0])[0]] + 1);
            }
        });
        getMenuCategories(function(err, res) {
            if(err) console.log(err);
            else {
                setCategories(res);
                setSelectedCtg(res[0].category_name);
            }
        });
        getMenuItems(function(err, res) {
            if(err) console.log(err);
            else setMenuItems(res);
        });
    }, []);


    /*
    ======
    Order
    ======
    */
    const placeOrder = (newOrder) => {
        if(onEdit) {
            // Update existing order
            setOrders(prevOrders => {
                return prevOrders.map(order => {
                    if(order.orderNum === newOrder.orderNum) return newOrder;
                    return order;
                });
            });
            setItemList(tempList);
            setOnEdit(null);
            //TODO: Redirect to orders page
        } else {
            setOrders((prevOrders) => [...prevOrders, newOrder]);
            setItemList([]);
            incOrderNum();
            //TODO: display order placed msg
        }
    }
    
    const incOrderNum = () => {
        setOrderNum(prevOrderNum => prevOrderNum + 1);
    }

    /*
    ======
    OrderItem
    ======
    */
    const removeOrderItem = (name) => {
        const newList = itemList.filter(item => item.name !== name);
        setItemList(newList);
    }

    const addOrderItem = (orderItem) => {
        setItemList(prevList => {
            let isNewItem = true;
            // If item is already in itemList, increment qty
            const newList = prevList.map(item => {
                if(item.name === orderItem.name) {
                    isNewItem = false;
                    return {...item, qty: item.qty + 1}
                }
                return item;
            });
    
            if(isNewItem) {
                return [...prevList, orderItem];
            }
    
            return newList;
        });
    }

    const toggleCrossOut = (name) => {
        setItemList(prevList => prevList.map(item => {
            if (item.name === name) {
                return {
                    ...item, 
                    isCrossed: !item.isCrossed
                };
            } else {
                return item;
            }
        }));
    };

    const decrementQty = (name) => {
        setItemList(prevList => prevList.map(item => {
            if (item.name === name) {
                return {
                    ...item, 
                    qty: item.qty - 1
                };
            } else {
                return item;
            }
        }));
    }

    const incrementQty = (name) => {
        setItemList(prevList => prevList.map(item => {
            if (item.name === name) {
              return {
                ...item, 
                qty: item.qty + 1
              };
            } else {
              return item;
            }
        }));   
      }

    //TODO: check input value and display error when need to
    const changeQty = (e, name) => {
        const value = e.target.value;
        setItemList(prevList => prevList.map(item => {
            if (item.name === name) {
                return {
                    ...item, 
                    qty: value ? parseInt(value, 10) : ""
                };
            } else {
                return item;
            }
        }));       
    }

    /*
    ======
    Menu
    ======
    */

    /*
    ======
    OrdersPage
    ======
    */
    const removeOrder = () => {

    }

    return (
        <POSContext.Provider value={
            {
                orderNum,
                categories,
                menuItems,
                itemList,
                onEdit,
                orders,
                selectedCtg,
                setOrderNum,
                placeOrder,
                removeOrder,
                removeOrderItem,
                setItemList,
                addOrderItem,
                toggleCrossOut,
                decrementQty,
                incrementQty,
                changeQty,
                setSelectedCtg
            }
        }>
            {children}
        </POSContext.Provider>
    )
}

export const usePOSContext = () => {
    return useContext(POSContext);
}

export default POSProvider;