import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Login.css';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';

function Login() {
	const { setAuth } = useAuth();

	const navigate = useNavigate();
	const location = useLocation();
	const from = location.state?.from?.pathname || '/products';

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		var accessToken, role, id, profile;
		axios
			.post(
				'/users/login',
				{
					email: email,
					password: password,
				},
				{
					headers: { 'Content-Type': 'application/json' },
					withCredentials: true,
				}
			)
			.then((res) => {
				console.log(res.data);
				role = res.data.role;
				id = res.data.id;
				accessToken = res.data.access_token;
				profile = res.data.user;
				setAuth({
					role,
					id,
					accessToken,
					profile,
				});
				setEmail('');
				setPassword('');
				navigate(from, { replace: true });
			})
			.catch((err) => {
				console.error(err);
			});
	};

	const handleGoogleLogin = (e) => {};

	return (
		<div className='login'>
			<div className='login__card'>
				<div className='login__card__title'>
					<h2>Welcome!</h2>
				</div>
				{/* <div className='login__card__providers'>
					<button onClick={handleGoogleLogin} title='Sign in via Google'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 24 24'
							width='24'
							height='24'
						>
							<g transform='matrix(1, 0, 0, 1, 27.009001, -39.238998)'>
								<path
									fill='#4285F4'
									d='M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z'
								/>
								<path
									fill='#34A853'
									d='M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z'
								/>
								<path
									fill='#FBBC05'
									d='M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z'
								/>
								<path
									fill='#EA4335'
									d='M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z'
								/>
							</g>
						</svg>
					</button>
					<button title='Sign up via Github'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							width='24'
							height='24'
							viewBox='0 0 1024 1024'
							fill='none'
						>
							<path
								fillRule='evenodd'
								clipRule='evenodd'
								d='M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z'
								transform='scale(64)'
								fill='#1B1F23'
							/>
						</svg>
					</button>
				</div>
				*/}
				<div className='login__card__separator'>
					<span>Log in here with your credentials</span>
				</div>
				<form className='login__card__form' onSubmit={handleSubmit}>
					<input
						type='text'
						placeholder='E-mail'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<input
						type='password'
						placeholder='Password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<button type='submit'>Sign in</button>
				</form>
				<div className='login__card__register'>
					<p>Not a member?</p>
					<span>
						<Link to='/register' className='login__card__register__link'>
							<p>Register now</p>
						</Link>
					</span>
				</div>
			</div>
		</div>
	);
}

export default Login;
