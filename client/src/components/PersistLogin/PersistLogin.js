import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useRefreshToken from '../../hooks/useRefreshToken';
import useAuth from '../../hooks/useAuth';

const PersistLogin = () => {
	const [isLoading, setIsLoading] = useState(true);
	const refresh = useRefreshToken();
	const { auth } = useAuth();

	useEffect(() => {
		const verifyRefreshToken = async () => {
			try {
				await refresh();
			} catch (error) {
				console.error(error);
			} finally {
				setIsLoading(false);
			}
		};
		
		// we lose auth state on reload - only run this if auth is empty	
		!auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);
	}, []);

	return <>{isLoading ? <p>Loading...</p> : <Outlet />}</>;
};

export default PersistLogin;
