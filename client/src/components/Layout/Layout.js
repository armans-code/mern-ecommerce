import { Outlet } from 'react-router-dom';
import './Layout.css';

const Layout = () => {
	return (
		<main className='App'>
			<Outlet />
		</main>
	);
};

export default Layout;
