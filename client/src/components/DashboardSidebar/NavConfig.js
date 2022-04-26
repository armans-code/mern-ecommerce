// formatting help from template https://github.com/minimal-ui-kit/material-kit-react

// component
import Iconify from '../Iconify';

// ----------------------------------------------------------------------
const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
	{
		title: 'dashboard',
		path: '/dashboard/home',
		icon: getIcon('eva:pie-chart-2-fill'),
	},
	{
		title: 'my products',
		path: '/dashboard/products/',
		icon: getIcon('dashicons:products'),
	},
	{
		title: 'New Product',
		path: '/dashboard/create',
		icon: getIcon('eva:shopping-bag-fill'),
	},
];

export default navConfig;
