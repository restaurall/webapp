import React, {useState, useEffect, useRef} from 'react';
import {send, getUserName} from '../HelperFunctions';
import ContactList from './ContactList';
import Conversation from './Conversation';
import '../style/messaging.css';
import '../style/index.css';
const io = require('socket.io-client');

const Messaging = () => {

	const [contact_id, setContact_id] = useState('');
	const [contacts, setContacts] = useState([]);
	const [messages, setMessages] = useState([]);

	const socket = useRef(null);

	//TODO: only get usernames fomr get request
	// Retrive contacts from data base and Establish socket connection
	useEffect(() => {
		send("GET", "/api/users/", {}, function(err, res) {
			if(err) console.log(err);
			else{
				setContacts(res);
			}
		});
		socket.current = io();
		return () => socket.current.close();
	}, []);

	useEffect(() => {
		if (!socket.current) return;
		socket.current.on("messagesUpdate", updateMessagesList);
	}, [contact_id, socket]);
	
	const updateMessagesList = (newMessage) => {
		if((newMessage.sender === contact_id && newMessage.recipient === getUserName()) ||
			(newMessage.sender === getUserName() && newMessage.recipient === contact_id)) {
			setMessages(prevMessages => [...prevMessages, newMessage]);
		}
	}

	const updateContactId = (newContactId) => {
		send("GET", "/api/messages/?recipient=" + newContactId, {}, function(err, res) {
			if(err) console.log(err);
			else{
				setContact_id(newContactId);
				setMessages(res);
			}
		});
	}

	return (
		<div className="messagingContainer">
			<ContactList contacts={contacts} updateContactId={updateContactId} />
			<Conversation 
				socket={socket.current} 
				userId={contact_id} 
				messages={messages} 
				updateMessages={updateMessagesList} />
		</div>
	);
}

export default Messaging;