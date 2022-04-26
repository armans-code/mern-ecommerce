import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '../../components/Header/Header';
import ProductCard from '../../components/ProductCard/ProductCard';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import './SearchResults.css';

function SearchResults() {
	const [params] = useSearchParams();
	const [products, setProducts] = useState();
	const [isLoading, setIsLoading] = useState(true);
	const searchTerm = params.get('name');

	const axiosPrivate = useAxiosPrivate();

	const url = window.location.pathname;

	useEffect(() => {
		const getResults = async (req, res) => {
			try {
				const result = await axiosPrivate.post('/products/s/search', {
					searchParam: searchTerm,
				});
				setIsLoading(false);
				setProducts(result.data);
			} catch (error) {
				console.error(error);
			}
		};
		getResults();
	}, [searchTerm]);

	return (
		<div className='s'>
			<Header />
			<div className='search'>
				<h4>Search results for "{searchTerm}"</h4>
				{isLoading && <p>Loading...</p>}
				{/* <div className='search__list'> */}
				<Grid
					container
					spacing={{ xs: 2, md: 3 }}
					columns={{ xs: 4, sm: 8, md: 12 }}
				>
					{!isLoading &&
						products &&
						products.map((product) => (
							<Grid item xs={2} sm={4} md={4}>
								<ProductCard
									product={product}
									key={product._id}
									className='search__list__product'
								/>
							</Grid>
						))}
				</Grid>
				{/* </div> */}
			</div>
		</div>
	);
}

export default SearchResults;
