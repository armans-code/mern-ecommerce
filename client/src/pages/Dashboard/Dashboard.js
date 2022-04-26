import React from 'react';
import DashboardSidebar from '../../components/DashboardSidebar/DashboardSidebar';
import UserDropdown from '../../components/UserDropdown/UserDropdown';
import useAuth from '../../hooks/useAuth';
import './Dashboard.css';

function Dashboard() {
	const { auth } = useAuth();
	const profile = auth?.profile;

	return (
		<>
			{profile && (
				<div className='dashboard'>
					<DashboardSidebar />
					<div className='dashboard__right'>
						<div className='dashboard__right__top'>
							<h1>Welcome, {profile.firstName}</h1>
							<UserDropdown profile={profile} />
						</div>
					</div>
				</div>
			)}
		</>
	);
}

export default Dashboard;
