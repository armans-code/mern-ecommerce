import React from 'react';
import AccountSidebar from '../../components/AccountSidebar/AccountSidebar';
import Header from '../../components/Header/Header';
import './ChangePassword.css';

function ChangePassword() {
	return (
		<div>
			<Header />
			<div className='change-password__content'>
				<AccountSidebar />
				<div className='change-password__content__right'>
					<p>test</p>
				</div>
			</div>
		</div>
	);
}

export default ChangePassword;
