import axios from 'axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
	const { setAuth } = useAuth();

	const refresh = async () => {
		const res = await axios.get('/users/refresh', {
			withCredentials: true,
		});
		setAuth((prev) => {
			if (prev) {
				return {
					...prev,
					role: res.data.role,
					accessToken: res.data.access_token,
					id: res.data.id,
					profile: res.data.profile,
				};
			}
		});
		return res.data.access_token;
	};
	return refresh;
};

export default useRefreshToken;
