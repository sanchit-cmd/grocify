import React, { useState } from 'react';
import axios from 'axios';

export default function Register() {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	async function handleSubmit(event) {
		event.preventDefault();

		const response = await axios.post(
			'http://localhost:3000/api/register',
			{
				name: name,
				email: email,
				password: password,
			}
		);

		if (response.status === 200) {
			window.location.href = '/login';
		} else {
			alert('Username already exsist');
		}
	}

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<input
					type='text'
					placeholder='Name'
					value={name}
					onChange={e => setName(e.target.value)}
				/>
				<br />
				<input
					type='email'
					placeholder='Email'
					value={email}
					onChange={e => setEmail(e.target.value)}
				/>
				<br />
				<input
					type='password'
					placeholder='Password'
					value={password}
					onChange={e => setPassword(e.target.value)}
				/>
				<br />
				<button type='submit'>Submit</button>
			</form>
		</div>
	);
}
