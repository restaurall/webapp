import React, {useState, useEffect} from 'react';
import moment from 'moment';
import WeekCalendar from 'react-week-calendar';
import {send} from '../HelperFunctions';
const io = require('socket.io-client');

//TODO: bug - calendar updated only on refresh
const CalendarComponent = ({calendar}) => {

	const socket = io();

	const [lastUid, setLastUid] = useState(calendar.uid);
	const [selectedIntervals, setSelectedIntervals] = useState(() => {
		let sI = calendar.selected_intervals == null ? [] : JSON.parse(calendar.selected_intervals);
		if (sI.length > 0) {
			for(let i = 0; i < sI.length; i++){
				sI[i].start = moment(sI[i].start);
				sI[i].end = moment(sI[i].end);
			}
		}
		return sI;			
	});
	const [start_date, setStart_date] = useState(calendar.start_date);
	const [c_id, setC_id] = useState(calendar.c_id);
	const [name, setName] = useState(calendar.name);
	
	const updateCal = (cal) => {
		let sI = JSON.parse(cal.selected_intervals);
		if (sI.length > 0) {
			for(let i = 0; i < sI.length; i++){
				sI[i].start = moment(sI[i].start);
				sI[i].end = moment(sI[i].end);
			}
		}
		setLastUid(cal.uid);
		setSelectedIntervals(sI);
		setStart_date(cal.start_date);
		setName(cal.name);
		setC_id(cal.c_id);
	}
	
	useEffect(() => {
		socket.on("calendarUpdated", updateCal);
		return () => socket.close();
	},[]);

	const updateDb = (selectedI) => {
		let new_start_date = moment(start_date).format("YYYY-MM-D")
		let data = {name, start_date: new_start_date.toString(), c_id, uid: lastUid, selected_intervals: JSON.stringify(selectedI)};
		//console.log(JSON.stringify(this.state.selectedIntervals));
		send("PATCH", "/api/calendars/" + c_id.toString() + "/", data, function(err, res) {
			if(err) console.log(err);
			else{
				socket.emit("calendarUpdated", data);
			}
		});
	}

	const handleEventRemove = (event) => {
		let newIntervals = selectedIntervals;
		const index = newIntervals.findIndex((interval) => interval.uid === event.uid);
		if (index > -1) {
			newIntervals.splice(index, 1);

			updateDb(newIntervals);

			setSelectedIntervals(newIntervals);
		}
	}

	const handleEventUpdate = (event) => {
		let newIntervals = selectedIntervals;
		const index = newIntervals.findIndex((interval) => interval.uid === event.uid);
		if (index > -1) {
			newIntervals[index] = event;
			updateDb(newIntervals);
			setSelectedIntervals(newIntervals);
		}
	}

	const handleSelect = (newIntervals) => {
		const intervals = newIntervals.map((interval, index) => {
			return {
				...interval,
				uid: lastUid + index
			}
		});

		setSelectedIntervals(prevSelectedIntervals => prevSelectedIntervals.concat(intervals));
		setLastUid(prevLastUid => prevLastUid + newIntervals.length);
		updateDb(selectedIntervals.concat(intervals));
	}

	if(c_id > -1) {
		return(
			<WeekCalendar
				firstDay = {moment(start_date)}
				startTime = {moment({h: 9, m: 0})}
				endTime = {moment({h: 15, m: 30})}
				numberOfDays= {7}
				selectedIntervals = {selectedIntervals}
				onIntervalSelect = {handleSelect}
				onIntervalUpdate = {handleEventUpdate}
				onIntervalRemove = {handleEventRemove}
			/>
		);
	} else {
		//TODO: else return something for no selected calendar
		return (
			<>
			</>
		);
	}
}

export default CalendarComponent;