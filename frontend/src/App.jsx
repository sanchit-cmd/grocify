import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import Register from '../pages/Register';
import Login from '../pages/Login';
import Home from '../pages/Home';

function App() {
	const navigate = useNavigate();

	useEffect(() => {
		const token = localStorage.getItem('token');
		if (!token) navigate('/login');
		else navigate('/home');
	}, []);
	return (
		<>
			<Routes>
				<Route path='/register' element={<Register />} />
				<Route path='/login' element={<Login />} />
				<Route path='/home' element={<Home />} />
			</Routes>
		</>
	);
}

export default App;
