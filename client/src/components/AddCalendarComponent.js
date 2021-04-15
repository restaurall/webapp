import React, {useState} from 'react';
import {send} from '../HelperFunctions';

const AddCalendarComponent = () => {
	
	const [name, setName] = useState('');
	const [startDate, setStartDate] = useState('');

	const handleSubmit = (event) => {
		event.preventDefault();
		let data = {name, startDate};
		send("POST", "/api/calendars", data, function(err, res) {
			if(err) console.log(err);
			else{
				setName('');
				setStartDate('');
			}
		});
	}
	
	return (
		<div className="AddFormBody">
			<h1>Add Calendar</h1>
			<form className="addForm" onSubmit={handleSubmit}>
				<input 
					className="textInputs inputs" 
					type="text" 
					placeholder="Name" 
					value={name} 
					onChange={(e) => setName(e.target.value)} 
					name="name" 
				/>
				<input 
					className="textInputs inputs" 
					type="date" 
					value={startDate} 
					onChange={(e) => setStartDate(e.target.value)} 
					name="startDate" 
				/>
				<input className="btn" type="submit" />
			</form>
		</div>
	);
}

export default AddCalendarComponent