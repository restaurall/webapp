import React from 'react';

const ContactList = React.memo(({updateContactId, contacts}) => {

	return (
		<div className="contacts">
			<h3>Contact List</h3>
			<ul>
				{contacts.map(c => 
					<li key={c.username} onClick={(e) => updateContactId(e.target.name)}>
						<a name={c.username} href="#Contact">{c.username}</a>
					</li>
				)}
			</ul>
		</div>
	);
});

export default ContactList;