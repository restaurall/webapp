import React, {useState} from 'react';
import {send} from '../HelperFunctions';

const AddNewCategory = ({newCategoryHandler}) => {

	const [name, setName] = useState('');
	const [colour, setColour] = useState('#000000');

	const handleSubmit = (event) => {
		event.preventDefault();
		let data = {name, colour};
		send("POST", "/api/categories/", data, function(err, res) {
			if(err) console.log(err);
			else{
				newCategoryHandler({category_name: name, color: colour});
				setName('')
				setColour('#000000')
			}
		});
	}

	return (
		<div>
			<input 
				className="categoryFields categoryName inputs" 
				type="text" 
				placeholder="Category Name" 
				value={name} 
				onChange={(e) => setName(e.target.value)} 
				name="name" 
			/>
			<input 
				className="categoryFields categoryColour inputs" 
				type="color" 
				placeholder="Color" 
				value={colour} 
				onChange={(e) => setColour(e.target.value)} 
				name="colour" 
			/>
			<button className="submitCategory" onClick={handleSubmit}>Add</button>
		</div>
	);	
}

export default AddNewCategory;