import React, { useRef , useEffect } from 'react';
import { usePOSContext } from '../POSContext';

const Category = ({name, setPosition}) => {

    const { setSelectedCtg, selectedCtg} = usePOSContext();
    const categoryRef = useRef(null);

    useEffect(() => {
        selectedCtg === name ?
            categoryRef.current.style.borderColor = 'black' :
            categoryRef.current.style.borderColor = 'rgb(221, 221, 221)';
    }, [selectedCtg]);

    return (
        <button 
            type="button" 
            className="category" 
            ref={categoryRef}
            onClick={() => setSelectedCtg(name)}
            onMouseOver={() => setPosition({
                x: categoryRef.current.getBoundingClientRect().left,
                y: categoryRef.current.getBoundingClientRect().bottom - 3})}>
            {name}
        </button>
    )
}

export default Category;