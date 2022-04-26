import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import './Header.css';
import { Input } from 'antd';
import logo from '../../images/shopfity.png';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { SEARCH_SUGGESTIONS } from '../../constants/SEARCH_SUGGESTIONS';
import useAuth from '../../hooks/useAuth';
import UserDropdown from '../UserDropdown/UserDropdown';
import { Stack } from '@mui/material';

function Header() {
	const [searchParams, setSearchParams] = useSearchParams();
	const [suggestion, setSuggestion] = useState();
	const { Search } = Input;

	const { auth } = useAuth();
	const navigate = useNavigate();

	var randomSuggestion;

	useEffect(() => {
		// trimmed random suggestion
		randomSuggestion =
			SEARCH_SUGGESTIONS[
				Math.floor(Math.random() * SEARCH_SUGGESTIONS.length)
			].trim();

		// set suggestion state to random suggestion with uppercase first letter
		setSuggestion(
			randomSuggestion.charAt(0).toUpperCase() + randomSuggestion.slice(1)
		);
	}, []);

	const handleSubmit = (param) => {
		navigate(`/products/s?${new URLSearchParams({ name: param })}`);
		if (window.location.pathname === '/products/s') {
			window.location.reload();
		}
	};

	return (
		<>
			{true && (
				<div className='header'>
					<div className='header__logo'>
						<Link to='/products'>
							<img src={logo} alt='' className='header__logo__img' />
						</Link>
					</div>
					<div className='header__search'>
						<Search
							placeholder={suggestion}
							onSearch={(param) => handleSubmit(param)}
							enterButton
						/>
					</div>
					<div className='header__right'>
						<div className='header__right__navigation'>
							<Link to='/products'>
								<p>All</p>
							</Link>
							<Link to='/products/c/fashion'>
								<p>Fashion</p>
							</Link>
							<Link to='/products/c/electronics'>
								<p>Electronics</p>
							</Link>
							<Link to='/products/c/toys'>
								<p>Toys</p>
							</Link>
							<Link to='/products/c/fitness'>
								<p>Fitness</p>
							</Link>
						</div>
						<div className='header__right__account'>
							<Stack direction='row' alignItems='center' gap={2}>
								<Link to='/cart' className='testlink'>
									<ShoppingCartIcon sx={{ margin: 0 }} />
								</Link>
								<UserDropdown profile={auth?.profile} />
							</Stack>
						</div>
					</div>
				</div>
			)}
		</>
	);
}

export default Header;
