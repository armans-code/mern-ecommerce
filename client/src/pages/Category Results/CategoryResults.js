import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header/Header';
import ProductCard from '../../components/ProductCard/ProductCard';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import './CategoryResults.css';

function CategoryResults() {
	let { category } = useParams();

	const axiosPrivate = useAxiosPrivate();
	const [products, setProducts] = useState();

	useEffect(() => {
		const getData = async () => {
			try {
				const response = await axiosPrivate.get(`/products/c/${category}`);
				console.log(response.data);
				setProducts(response.data);
			} catch (error) {
				console.error(error);
			}
		};
		getData();
	}, [category]);
	return (
		<div className='cr'>
			<Header />
			<div className='cr__list'>
				{products &&
					products.map((product) => (
						<div className='cr__list__card'>
							<ProductCard product={product} key={product._id} />
						</div>
					))}
			</div>
		</div>
	);
}

export default CategoryResults;
