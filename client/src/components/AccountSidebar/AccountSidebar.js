import { Avatar, Divider } from '@mui/material';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AccountSidebar.css';
import useAuth from '../../hooks/useAuth';
import useLogout from '../../hooks/useLogout';

function AccountSidebar() {
	const { auth } = useAuth();
	const profile = auth?.profile;
	const logout = useLogout();
	const navigate = useNavigate();

	const handleLogout = async () => {
		await logout();
		navigate('/login');
	};

	return (
		<div className='account-sidebar'>
			<div className='account-sidebar__top'>
				<Avatar
					src={`https://ui-avatars.com/api/?name=${profile?.firstName}+${profile?.lastName}&background=random`}
					sx={{
						width: 100,
						height: 100,
						marginTop: '1rem',
					}}
				/>
				<div className='account-sidebar__top__name'>
					<p>
						{profile?.firstName} {profile?.lastName}
					</p>
				</div>
				<div className='account-sidebar__top__username'>
					<p>@{profile?.username}</p>
				</div>
			</div>
			<Divider />
			<div className='account-sidebar__navigation'>
				<div className='navigation__top'>
					<Link to='/account'>
						<p>Update Account</p>
					</Link>
					<Link to='/changepassword'>
						<p>Change Password</p>
					</Link>
				</div>
				<div className='navigation__bottom'>
					<button onClick={handleLogout} className='nav_logout_btn'>
						<p>Logout</p>
					</button>
				</div>
			</div>
		</div>
	);
}

export default AccountSidebar;
