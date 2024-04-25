import React, { useState } from 'react';
import axios from 'axios';

export default function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	async function handleSubmit(event) {
		event.preventDefault();

		const response = await axios.post('http://localhost:3000/api/login', {
			email: email,
			password: password,
		});

		console.log(response);

		if (!response.data.user) {
			alert('Incorrect Username or Password');
			return;
		}

		localStorage.setItem('token', response.data.user);
		alert('Login successful');
		window.location.href = '/dashboard';
	}

	return (
		<div>
			<form onSubmit={handleSubmit}>
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
