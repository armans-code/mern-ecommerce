import { Divider } from '@mui/material';
import { Button, Input, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import CartItem from '../../components/CartItem/CartItem';
import Header from '../../components/Header/Header';
import useAuth from '../../hooks/useAuth';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import './Cart.css';

function Cart() {
	const { auth } = useAuth();
	const { Option } = Select;
	const axiosPrivate = useAxiosPrivate();

	const [items, setItems] = useState();

	useEffect(() => {
		const getCart = async () => {
			try {
				const items = await axiosPrivate.get(`/cart/get-items/${auth?.id}`);
				setItems(items.data);
				console.log(items.data);
			} catch (error) {
				console.error(error);
			}
		};

		getCart();
	}, []);

	const calcSubTotal = (data) => {
		let price = 0;
		for (const item of data) {
			price += item.product.price * item.quantity;
		}
		return price;
	};

	return (
		<div className='c'>
			<Header />
			{items && (
				<div className='cart'>
					<div className='cart__center'>
						<div className='cart__list'>
							{items.map((item) => (
								<>
									<CartItem item={item} key={item._id} />
								</>
							))}
						</div>
						<div className='cart__actions'>
							<h4>Order Summary</h4>
							<Divider />
							<div className='cart__actions__totals'>
								<div className='cart__actions__totals__items'>
									<p>ITEMS: {items.length}</p>
									<p>SUBTOTAL: ${calcSubTotal(items)}</p>
									<div>
										<p>SHIPPING</p>
										<Select style={{ width: 200 }} value='stand'>
											<Option value='stand'>Standard Delivery - $7</Option>
										</Select>
									</div>
									<div className='promo-code'>
										<p>PROMO CODE</p>
										<Input placeholder='Enter your code' />
										<Button
											style={{ backgroundColor: '#FA7374', color: 'white' }}
										>
											APPLY
										</Button>
									</div>
									<Divider />
									<div className='cart__actions__totals__items__bottom'>
										<p>TOTAL COST: ${calcSubTotal(items) + 10}</p>
										<Button
											style={{ backgroundColor: '#5D4FDD', color: 'white' }}
										>
											CHECKOUT
										</Button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default Cart;
