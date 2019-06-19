import React, {Component} from 'react';
import {send} from '../HelperFunctions';
import AddNewCategory from './AddNewCategory';
import '../style/addMenuItem.css'

class AddMenuItemForm extends Component {
	constructor(){
		super();
		this.state = {
			name: "",
			category: "",
			price: "",
			categories: [],
			error: "",
			showCategoryForm: false
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.showNewCategoryForm = this.showNewCategoryForm.bind(this);
		this.newCategoryHandler = this.newCategoryHandler.bind(this); 

	}

	componentDidMount(){
		send("GET", "/api/categories/", null, function(err, res) {
	      if(err) console.log(err);
	      else if(res.length > 0) {
	        this.setState({
	          categories: res,
	          category: res[0]
	        });
	      }
	    }.bind(this));
	}

	newCategoryHandler(newCategory){
		let categories = this.state.categories;
		categories.push(newCategory);
		this.setState({categories: categories});
	}

	handleChange(event){
		let {name, value} = event.target;
		this.setState({[name]: value});
	}

	handleSubmit(event){
		event.preventDefault();
		let {name, category, price} = this.state;
		if(category === ""){
			this.setState({error: "Please provide a category"});
		}
		else {
			let data = {name: name, category: category, price: price};
			send("POST", "/api/menuItems", data, function(err, res) {
				if(err) console.log(err);
				else{
					this.setState({name: "", category: "", price: "", error: ""});
				}
			}.bind(this));
		}
	}

	showNewCategoryForm(event){
		event.preventDefault();
		let showCategoryForm = this.state.showCategoryForm;
		this.setState({showCategoryForm: !showCategoryForm});
	}

	render(){
		let categories = this.state.categories;
		let options = [];
		let addCategory = [];
		if(categories.length !== 0){
			options = categories.map(function(c){
				return <option key={c.category_name} value={c.category_name}>{c.category_name}</option>
			});
			let defaultOption = <option key='select category' value=''>Select a category</option>
			options.unshift(defaultOption);
		}
		else {
			let emptyOption = <option key="none available" value="">No categories available</option>
			options.push(emptyOption);
		}

		if(this.state.showCategoryForm){
			addCategory = <AddNewCategory newCategoryHandler={this.newCategoryHandler} />;
		}

		return (
			<div className="AddFormBody">
			<h1>Add Menu Item</h1>
			<form className="addForm" onSubmit={this.handleSubmit}>
			<input className="textInputs inputs" type="text" placeholder="Name" value={this.state.name} onChange={this.handleChange} name="name" />
			<select className="categoryInput inputs" name="category" value={this.state.category} onChange={this.handleChange} >
				{options}
			</select>
			<button className="addCategoryButton" onClick={this.showNewCategoryForm}>+</button>
			{addCategory}
			<input className="textInputs inputs" type="number" min="1" step="any" placeholder="Price" value={this.state.price} onChange={this.handleChange} name="price" />
			<input className="btn" type="submit" />
			</form>
			</div>
			);
	}
}

export default AddMenuItemForm