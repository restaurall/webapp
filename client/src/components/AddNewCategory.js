import React, {Component} from 'react';
import {send} from '../HelperFunctions';

class AddNewCategory extends Component {
	constructor(){
		super();
		this.state = {name: "", colour: ""};
		this.handleUpdate = this.handleUpdate.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleUpdate(event) {
		let {name, value} = event.target;
		this.setState({[name]: value});
	}

	handleSubmit(event) {
		event.preventDefault();
		let data = {name: this.state.name, colour: this.state.colour};
		send("POST", "/api/categories/", data, function(err, res) {
			if(err) console.log(err);
			else{
				this.setState({name: "", colour: ""});
			}
		}.bind(this));
	}

	render() {
		return (
				<div className="AddFormBody">
				<h1>Add New Category</h1>
				<form className="addForm" onSubmit={this.handleSubmit}>
				<input className="textInputs inputs" type="text" placeholder="Category Name" value={this.state.name} onChange={this.handleChange} name="name" />
				<input className="textInputs inputs" type="color" placeholder="Color" value={this.state.colour} onChange={this.handleChange} name="colour" />
				<button className="addCategoryButton" type="submit">Add</button>
				</form>
				</div>

			);
	}


}

export default AddNewCategory;