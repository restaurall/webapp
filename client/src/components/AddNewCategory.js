import React, {Component} from 'react';
import {send} from '../HelperFunctions';

class AddNewCategory extends Component {
	constructor(props){
		super(props);
		this.state = {name: "", colour: "#000000"};
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
				this.props.newCategoryHandler({category_name: this.state.name, color: this.state.colour});
				this.setState({name: "", colour: "#000000"});
			}
		}.bind(this));
	}

	render() {
		return (
				<div>
				<input className="categoryFields categoryName inputs" type="text" placeholder="Category Name" value={this.state.name} onChange={this.handleUpdate} name="name" />
				<input className="categoryFields categoryColour inputs" type="color" placeholder="Color" value={this.state.colour} onChange={this.handleUpdate} name="colour" />
				<button className="submitCategory" onClick={this.handleSubmit}>Add</button>
				</div>

			);
	}


}

export default AddNewCategory;