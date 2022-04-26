import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import ProductCard from '../../components/ProductCard/ProductCard';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useNavigate, useLocation } from 'react-router-dom';
import { Grid } from '@mui/material';

function HomePage() {
	const [products, setProducts] = useState();
	const axiosPrivate = useAxiosPrivate();

	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		const getProducts = async () => {
			try {
				const response = await axiosPrivate.get('/products');
				setProducts(response.data);
			} catch (error) {
				console.log(error);
				navigate('/login', { state: { from: location }, replace: true });
			}
		};
		getProducts();
	}, []);

	return (
		<div className='home'>
			<Header />
			<div className='home__grid'>
				<Grid
					container
					spacing={{ xs: 2, md: 3 }}
					columns={{ xs: 4, sm: 8, md: 12 }}
				>
					{products &&
						products.map((product) => (
							<Grid item xs={2} sm={4} md={4}>
								<ProductCard
									title={product.name}
									description={product.description}
									imageURL={product.imageURL}
									slug={product.slug}
									_id={product._id}
									product={product}
									key={product._id}
								/>
							</Grid>
						))}
				</Grid>
			</div>
		</div>
	);
}

export default HomePage;
