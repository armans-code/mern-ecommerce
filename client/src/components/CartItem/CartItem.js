import { InputNumber } from 'antd';
import React, { useState } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import './CartItem.css';

function CartItem(props) {
	const item = props.item;
	const product = props.item.product;
	const axiosPrivate = useAxiosPrivate();

	const handleRemoveItem = async () => {
		try {
			const response = await axiosPrivate.delete(
				`/cart/remove-item/${item._id}`
			);
			window.location.reload();
		} catch (error) {
			console.error(error);
		}
	};

	const handleQuantityChange = async (e) => {
		try {
			const response = await axiosPrivate.put('/cart/change-quantity', {
				id: item._id,
				quantity: e,
			});
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className='cart-item'>
			<div className='cart-item__image'>
				<img src={product.imageURL} />
			</div>
			<div className='cart-item__right'>
				<div className='cart-item__text'>
					<h4>{product.name}</h4>
					<p>${product.price}</p>
				</div>
				<div className='cart-item__actions'>
					<div className='cart-item__quantity'>
						<p>Quantity:</p>
						<InputNumber
							min={1}
							max={100}
							defaultValue={item.quantity}
							onChange={handleQuantityChange}
							size='large'
						/>
					</div>
					<button onClick={handleRemoveItem}>
						<p className='cart-item__remove'>Remove from cart</p>
					</button>
				</div>
			</div>
		</div>
	);
}

export default CartItem;
