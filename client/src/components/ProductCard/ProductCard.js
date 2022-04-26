import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Button, Chip, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

function ProductCard(props) {
	const product = props.product;

	return (
		<div>
			<Card sx={{ width: 250, height: 330 }}>
				<CardMedia
					component='img'
					height='200'
					image={product.imageURL}
					alt='product image'
				/>
				<CardContent>
					<Typography gutterBottom noWrap variant='h6' component='div'>
						{product.name}
					</Typography>
				</CardContent>
				<CardActions>
					<Link to={`/products/${product.slug}`}>
						<Button size='small'>Open</Button>
					</Link>
					<Chip label={`$${product.price}`} color='success' />
				</CardActions>
			</Card>
		</div>
	);
}

export default ProductCard;
