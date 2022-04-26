// formatting help from template https://github.com/minimal-ui-kit/material-kit-react
import { Link as RouterLink, useLocation } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Box, Link, Drawer, Typography, Avatar } from '@mui/material';
// components
import NavSection from './NavSection';
//
import navConfig from './NavConfig';

import photo from '../../images/shopfity.png';
import useAuth from '../../hooks/useAuth';

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;

const RootStyle = styled('div')(({ theme }) => ({
	[theme.breakpoints.up('lg')]: {
		flexShrink: 0,
		width: DRAWER_WIDTH,
	},
}));

const AccountStyle = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	padding: theme.spacing(2, 2.5),
	borderRadius: Number(theme.shape.borderRadius) * 1.5,
	backgroundColor: theme.palette.grey[500_12],
}));

// ----------------------------------------------------------------------

export default function DashboardSidebar() {
	const { auth } = useAuth();
	const profile = auth?.profile;

	const renderContent = (
		<div>
			<Box
				sx={{
					px: 2.5,
					py: 3,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<Link to='/products' component={RouterLink}>
					<img src={photo} alt='' className='logo' />
				</Link>
			</Box>

			<Box sx={{ mb: 5, mx: 2.5 }}>
				<Link underline='none' component={RouterLink} to='/account'>
					<AccountStyle>
						<Avatar
							src={`https://ui-avatars.com/api/?name=${profile?.firstName}+${profile?.lastName}&background=random`}
							alt='photoURL'
						/>
						<Box sx={{ ml: 2 }}>
							<Typography variant='subtitle2' sx={{ color: 'text.primary' }}>
								{profile?.firstName} {profile?.lastName}
							</Typography>
							<Typography variant='body2' sx={{ color: 'text.secondary' }}>
								@{profile?.username}
							</Typography>
						</Box>
					</AccountStyle>
				</Link>
			</Box>

			<NavSection navConfig={navConfig} />

			<Box sx={{ flexGrow: 1 }} />
		</div>
	);

	return (
		<RootStyle>
			<Drawer
				open
				variant='persistent'
				PaperProps={{
					sx: {
						width: DRAWER_WIDTH,
						bgcolor: 'background.default',
						borderRightStyle: 'dashed',
					},
				}}
			>
				{renderContent}
			</Drawer>
		</RootStyle>
	);
}
