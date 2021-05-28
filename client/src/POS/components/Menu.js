import React, { useState, useEffect, useRef } from 'react';
import { usePOSContext } from '../POSContext';
import Category from './Category';
import MenuItem from './MenuItem';

const Menu = () => {

    const {categories, selectedCtg, menuItems} = usePOSContext();
    const ctgHoverRef = useRef(null);
    // {x,y} Postion of the selected category element
    const [position, setPosition] = useState(null);

    useEffect(() => {
        if(position) {
            ctgHoverRef.current.style.left = `${position.x}px`;
            ctgHoverRef.current.style.top = `${position.y}px`;
            ctgHoverRef.current.style.opacity = 1;
        } else {
            ctgHoverRef.current.style.opacity = 0
        }
    }, [position])

    return (
        <section className="menu">
            <div className='categoriesContainer'>
                <div id='categoryHoverBar' ref={ctgHoverRef}></div>
                <div className="categories" onMouseLeave={() => setPosition(null)}>
                    {categories.map(category => 
                        <Category 
                            key={category.category_name} 
                            name={category.category_name} 
                            setPosition={setPosition}/>
                    )}
                </div>
            </div>
            <div className="items">
                {menuItems.filter(item => item.category === selectedCtg).map(item => 
                    <MenuItem 
                        key={item.name}
                        name={item.name}
                        price={item.price}
                        color={selectedCtg.color}
                    />
                )}
            </div>
        </section>
    )
}

export default Menu;