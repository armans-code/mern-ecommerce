import React from 'react';
import UnauthorizedImage from '../../images/unauthorized.svg';

function Unauthorized() {
	return (
		<div className='unauthorized'>
			<h1>Whoops, you're unauthorized to see this page!</h1>
			<img src={UnauthorizedImage} />
		</div>
	);
}

export default Unauthorized;
