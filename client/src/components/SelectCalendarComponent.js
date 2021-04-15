import React, { useState, useEffect } from 'react';
import WeekCalendar from 'react-week-calendar';
import {send} from '../HelperFunctions';
import CalendarComponent from './CalendarComponent';

const SelectCalendarComponent = () => {

	const [options, setOptions] = useState([]);
	const [calendar, setCalendar] = useState({});
	const [calendars, setCalendars] = useState([]);
	const [c_id, setC_id] = useState(-1);

	useEffect(() => {
		send("GET", "/api/calendars/?limit=" + "5", {}, function(err, res) {
			if(err) console.log(err);
			else {
				setCalendars(res);
				if (res.length > 0){
				 	setCalendar(res[0]);
					setC_id(res[0].c_id);
				}
			}
		});
	}, []);

	useEffect(() => {
		for(let i = 0; i < calendars.length; i++){
			let c = calendars[i];
			setOptions((prevOptions) => [...prevOptions, <option key={c.c_id} value={c.c_id}>{c.name}</option>]);
		}
	}, [calendars]);

	const handleChange = (event) => {
		let {name, value} = event.target;
		if(name === "c_id" && value > -1){
			//We have to update c_id and calendar
			let newCal;
			for(let i = 0; i < calendars.length; i++){
				if (calendars[i].c_id == value){
					newCal = calendars[i];
				}
			}
			setC_id(value);
			setCalendar(newCal);
		}
	}	

	return (
		<div className="calendarContainer">
			{/* <h3>{name}</h3> */}
			<select value={c_id} onChange={handleChange} className="selectInputs inputs" name="c_id"> 
				<option value="-1">--Please Select A Calendar--</option>
				{options}
			</select>
			{/*TODO: load based on calendar not c_id?*/}
			{(c_id > -1) && <CalendarComponent key={c_id} calendar={calendar}/>}
		</div>
	);
}

export default SelectCalendarComponent;