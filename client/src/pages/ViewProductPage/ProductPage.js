import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, InputNumber } from 'antd';
import { Divider, Rating, styled } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import ReviewList from '../../components/ReviewScreen/ReviewList/ReviewList';
import ReviewForm from '../../components/ReviewScreen/ReviewForm/ReviewForm';
import useAuth from '../../hooks/useAuth';
import { toast } from 'react-toastify';
import './ProductPage.css';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';

function ProductPage() {
	let { slug } = useParams();
	const [product, setProduct] = useState();
	const [averageRating, setAverageRating] = useState();
	const [reviews, setReviews] = useState();
	const [isLoading, setIsLoading] = useState(true);
	const [quantity, setQuantity] = useState(1);

	const { auth } = useAuth();
	const navigate = useNavigate();
	const axiosPrivate = useAxiosPrivate();

	useEffect(() => {
		const getData = async () => {
			try {
				const productRes = await axiosPrivate.get(
					`http://localhost:5000/products/${slug}`
				);
				setProduct(productRes.data);

				const ratingRes = await axiosPrivate.post(
					'http://localhost:5000/reviews/average/',
					{
						product: productRes.data._id,
					}
				);
				setAverageRating(ratingRes?.data[0]?.avgRating?.toFixed(1));

				const reviewsRes = await axiosPrivate.get(
					`http://localhost:5000/reviews/${slug}`
				);
				setReviews(reviewsRes.data);

				setIsLoading(false);
			} catch (error) {
				console.error(error);
			}
		};

		getData();
	}, []);

	const StyledRating = styled(Rating)({
		'& .MuiRating-iconFilled': {
			color: '#ff8100',
		},
	});

	const handleAddToCart = async () => {
		try {
			const response = await axiosPrivate.put('/cart/add-item', {
				user: auth?.id,
				product: product._id,
				quantity: quantity,
			});
			toast.success('Added product to cart!');
			navigate('/cart');
			// console.log(response);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<>
			{product && !isLoading && (
				<div className='product_page'>
					<Header />
					<div className='product_page__content'>
						<div className='product_page__top'>
							<div className='product_page__content__left'>
								<img width='560' src={product.imageURL} alt='product' />
							</div>
							<div className='product_page__content__right'>
								<h4>{product.name}</h4>
								<div className='product_page__strip'>
									{averageRating ? (
										<div className='product_page__strip__rating'>
											<StyledRating
												readOnly
												defaultValue={averageRating}
												precision={0.5}
											/>
											<p>{averageRating}</p>
										</div>
									) : (
										<p>No reviews</p>
									)}
									<Divider orientation='vertical' variant='middle' flexItem />
									<div className='product__page__strip__stock'>
										<p>In Stock ({product.quantity})</p>
									</div>
									<Divider orientation='vertical' variant='middle' flexItem />
									<p>
										Sold by <a>@{product.user.username}</a>
									</p>
								</div>
								<div className='product_page__price'>
									<h5>${product.price}</h5>
									<p>/per order</p>
								</div>
								<div className='product_page__description'>
									<p>{product.description}</p>
								</div>
								<div className='product_page__actions'>
									<div className='product_page__actions__quantity'>
										<p>Quantity</p>
										<InputNumber
											min={1}
											max={15}
											defaultValue={1}
											size='large'
											onChange={(e) => setQuantity(e)}
										/>
									</div>
									<div className='product_page__actions__buttons'>
										<Button
											type='primary'
											size='large'
											onClick={handleAddToCart}
										>
											Add to cart
										</Button>
										<Button size='large' type='primary' ghost>
											Add to Wishlist
										</Button>
									</div>
								</div>
							</div>
						</div>
						{reviews && (
							<div className='product_page__reviews'>
								<div className='product_page__reviews__left'>
									<ReviewList reviews={reviews} />
								</div>
								<div className='product_page__reviews__right'>
									<ReviewForm product={product} />
								</div>
							</div>
						)}
					</div>
				</div>
			)}
		</>
	);
}

export default ProductPage;
