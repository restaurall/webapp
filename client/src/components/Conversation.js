import React, {useState, useEffect, useRef} from 'react';
import {send, getUserName} from '../HelperFunctions';

const Conversation = ({userId, socket, messages}) => {

	const [newMessage, setNewMessage] = useState('');

	const messagesDivRef = useRef({});

	useEffect(() => {
		//show bottom of message div
		messagesDivRef.current.scrollTop = messagesDivRef.current.scrollHeight;
	}, [messagesDivRef.current, messages]);

	const insertMessage = (event) => {
		event.preventDefault();
		let data = {recipient: userId, message: newMessage, sender: getUserName()};
		send("POST", "/api/messages", data, function(err, res) {
			if(err) console.log(err);
			else{
				socket.emit("messagesUpdate", data);
				setNewMessage('');
			}
		});
	}

	if(userId) {
		return (
			<div className="conversations">
				<div className="conversationContainer">
					<div className="conversation" ref={messagesDivRef}>
						{messages.map(function(m, index){
							let direction = m.recipient === userId ? "right" : "left";
							return <div key={index} className={"message " + direction}>{m.message}</div>
						})}
					</div>
					<textarea 
						className="textInputs inputs" 
						placeholder="Write a message" 
						name="newMessage" 
						rows="1" 
						onChange={(e) => setNewMessage(e.target.value)} 
						value={newMessage}></textarea>
					<input 
						type="submit" 
						className="btn" 
						value="Send" 
						onClick={insertMessage} />
				</div>
			</div>	
		)	
	} else {
		return (
			<div className="conversations">
				<h3>Select Contact</h3>
			</div>
		)		
	}
}

export default Conversation;