import React, { useEffect, useState } from 'react';
import DashboardSidebar from '../../components/DashboardSidebar/DashboardSidebar';
import ShopProductCard from '../../components/ProductCard/ProductCard';
import useAuth from '../../hooks/useAuth';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import './UserProducts.css';

function UserProducts() {
	const [products, setProducts] = useState();

	const { auth } = useAuth();
	const axiosPrivate = useAxiosPrivate();
	const profile = auth?.profile;

	useEffect(() => {
		const getUserProducts = async () => {
			try {
				const response = await axiosPrivate.get(`/products/user/${auth?.id}`);
				setProducts(response.data);
				console.log(response.data);
			} catch (error) {
				console.error(error);
			}
		};
		getUserProducts();
	}, []);

	return (
		<>
			{profile && (
				<div className='user-products'>
					<DashboardSidebar />
					{products && (
						<div className='user-products__content'>
							<div className='user-products__content__top'>
								<h1>Your Products</h1>
							</div>
							<div className='user-products__content__list'>
								{products.map((product) => (
									<ShopProductCard product={product} key={product.slug} />
								))}
							</div>
						</div>
					)}
				</div>
			)}
		</>
	);
}

export default UserProducts;
