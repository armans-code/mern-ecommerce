import './App.css';
import HomePage from './pages/List Products/HomePage';
import { Routes, Route, Navigate } from 'react-router-dom';
import CreateProduct from './pages/New Product/CreateProduct';
import ProductPage from './pages/ViewProductPage/ProductPage';
import AdminView from './pages/admin/AdminView';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RequireAuth from './components/Auth/RequireAuth';
import Layout from './components/Layout/Layout';
import Unauthorized from './pages/Unauthorized/Unauthorized';
import AccountSettings from './pages/Account Settings/AccountSettings';
import PersistLogin from './components/PersistLogin/PersistLogin';
import ChangePassword from './pages/ChangePassword/ChangePassword';
import useAuth from './hooks/useAuth';
import UserProducts from './pages/UserProducts/UserProducts';
import Dashboard from './pages/Dashboard/Dashboard';
import Cart from './pages/Cart/Cart';
import SearchResults from './pages/Search Results/SearchResults';
import CategoryResults from './pages/Category Results/CategoryResults';

function App() {
	const allRoles = ['ROLE_MEMBER', 'ROLE_MERCHANT', 'ROLE_ADMIN'];

	const { auth } = useAuth();

	return (
		<div className='app'>
			{/* <Header /> */}
			<Routes>
				<Route path='/' element={<Layout />}>
					{/* unprotected */}
					<Route path='/login' element={<Login />} />
					<Route path='/register' element={<Register />} />
					<Route path='/unauthorized' element={<Unauthorized />} />
					{/* protected */}
					{/* products list page */}
					<Route element={<PersistLogin />}>
						<Route element={<RequireAuth allowedRoles={allRoles} />}>
							<Route path='/products' element={<HomePage />} />
							<Route path='/products/s' element={<SearchResults />} />
							<Route
								path='/products/c/'
								element={<Navigate replace to='/products' />}
							/>
							<Route
								path='/products/c/:category'
								element={<CategoryResults />}
							/>
							<Route path='/account' element={<AccountSettings />} />
							<Route path='/changepassword' element={<ChangePassword />} />
							<Route path='/cart' element={<Cart />} />
						</Route>
						<Route element={<RequireAuth allowedRoles={['ROLE_MERCHANT']} />}>
							<Route
								path='/dashboard'
								element={<Navigate replace to='/dashboard/home' />}
							/>
							<Route path='/dashboard/home' element={<Dashboard />} />
							<Route path='/dashboard/products' element={<UserProducts />} />
							<Route path='/dashboard/create' element={<CreateProduct />} />
						</Route>
						{/* admin view */}
						<Route element={<RequireAuth allowedRoles={['ROLE_ADMIN']} />}>
							<Route path='admin' element={<AdminView />} />
						</Route>
						{/* single product view */}
						<Route element={<RequireAuth allowedRoles={allRoles} />}>
							<Route path='/products/:slug' element={<ProductPage />} />
						</Route>
					</Route>
				</Route>
			</Routes>
			<ToastContainer />
		</div>
	);
}

export default App;
