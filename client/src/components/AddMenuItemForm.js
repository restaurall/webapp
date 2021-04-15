import React, {useState, useEffect} from 'react';
import {send} from '../HelperFunctions';
import AddNewCategory from './AddNewCategory';
import '../style/addMenuItem.css';

//TODO: want to display success/error on fail or success to add menu item/category
const AddMenuItemForm = () => {

	const [name, setName] = useState('');
	const [category, setCategory] = useState('');
	const [price, setPrice] = useState('');
	const [categories, setCategories] = useState([]);
	const [showCategoryForm, setShowCategoryForm] = useState(false);
	const [error, setError] = useState('');

	useEffect(() => {
		send("GET", "/api/categories/", null, function(err, res) {
			if(err) console.log(err);
			else if(res.length > 0) {
				setCategories(res);
				setCategory(res[0]);
			}
		});
	}, []);

	const newCategoryHandler = (newCategory) => {
		setCategories((prevCategories) => [...prevCategories, newCategory]);
	}

	const handleSubmit = (event) => {
		event.preventDefault();
		if(category === ''){
			setError('Please provide a category');
		}
		else {
			let data = {name, category, price};
			send('POST', '/api/menuItems', data, function(err, res) {
				if(err) console.log(err);
				else{
					setName('');
					setCategory('');
					setPrice('');
					setError('');
				}
			});
		}
	}

	const getOptions = () => {
		if(categories.length !== 0){
			let options = categories.map(function(c){
				return <option key={c.category_name} value={c.category_name}>{c.category_name}</option>
			});
			let defaultOption = <option key='select category' value=''>Select a category</option>
			options.unshift(defaultOption);
			return options;
		}	
	}

	return (
		<div className="AddFormBody">
			<h1>Add Menu Item</h1>
			<form className="addForm" onSubmit={handleSubmit}>
				<input 
					className="textInputs inputs" 
					type="text" 
					placeholder="Name" 
					value={name} 
					onChange={(e) => setName(e.target.value)} 
					name="name" 
				/>
				<select className="categoryInput inputs" name="category" value={category} onChange={(e) => setCategory(e.target.value)} >
					{categories.length ? getOptions() : <option key="none available" value="">No categories available</option>}
				</select>
				<button className="addCategoryButton" onClick={(e) => {
					e.preventDefault();
					setShowCategoryForm((prevShow) => !prevShow);
				}}>+</button>
				{showCategoryForm && <AddNewCategory newCategoryHandler={newCategoryHandler} />}
				<input 
					className="textInputs inputs" 
					type="number" 
					min="1" 
					step="any" 
					placeholder="Price" 
					value={price} 
					onChange={(e) => setPrice(e.target.value)} 
					name="price" 
				/>
				<input className="btn" type="submit" />
			</form>
		</div>
	);
}

export default AddMenuItemForm