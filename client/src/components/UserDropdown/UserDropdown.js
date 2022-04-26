import React from 'react';
import { Dropdown, Menu } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { DownOutlined } from '@ant-design/icons';
import useLogout from '../../hooks/useLogout';

function UserDropdown(props) {
	const profile = props.profile;

	const logout = useLogout();
	const navigate = useNavigate();

	const handleLogout = async () => {
		await logout();
		navigate('/login');
	};

	const menu = (
		<div className='header__right__menu'>
			<Menu>
				{profile?.role === 'ROLE_MERCHANT' && (
					<Menu.Item key='0'>
						<Link to='/dashboard/home' className='menu__item__link'>
							<p>Dashboard</p>
						</Link>
					</Menu.Item>
				)}
				<Menu.Item key='1'>
					<Link to='/account' className='menu__item__link'>
						<p>Account</p>
					</Link>
				</Menu.Item>
				<Menu.Item key='2' className='menu__item__link'>
					<button className='menuitem__logout' onClick={handleLogout}>
						<p>Logout</p>
					</button>
				</Menu.Item>
			</Menu>
		</div>
	);

	return (
		<div>
			<Dropdown
				overlay={menu}
				trigger={['click']}
				className={'header__right__acount__dropdown'}
			>
				<a>
					{profile?.firstName} <DownOutlined />
				</a>
			</Dropdown>
		</div>
	);
}

export default UserDropdown;
