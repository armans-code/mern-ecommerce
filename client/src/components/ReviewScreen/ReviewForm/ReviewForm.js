import React, { useState } from 'react';
import './ReviewForm.css';
import { Input, Button } from 'antd';
import { Checkbox, Rating } from '@mui/material';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import useAuth from '../../../hooks/useAuth';

const { TextArea } = Input;

function ReviewForm(props) {
	const product = props.product;

	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [rating, setRating] = useState();
	const [isRecommended, setIsRecommended] = useState(false);

	const axiosPrivate = useAxiosPrivate();
	const { auth } = useAuth();

	const handleSubmit = async (e) => {
		try {
			const response = await axiosPrivate.post('/reviews/new', {
				product: product._id,
				user: auth?.id,
				title: title,
				description: description,
				rating: rating,
				isRecommended: isRecommended,
			});
			window.location.reload();
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className='review_form'>
			<h4>Leave a review</h4>
			<Input placeholder='Title' onChange={(e) => setTitle(e.target.value)} />
			<TextArea
				placeholder='Description'
				rows={4}
				onChange={(e) => setDescription(e.target.value)}
			/>
			<div className='review_form__bottom'>
				<div className='review_form__bottom__rating'>
					<p>Rating: </p>
					<Rating
						name='simple-controlled'
						value={rating}
						onChange={(event, newValue) => {
							setRating(newValue);
						}}
					/>
				</div>
				<div className='review_form__bottom__rec'>
					<p>Recommend?</p>
					<Checkbox
						checked={isRecommended}
						onChange={(e) => {
							setIsRecommended(e.target.checked);
						}}
					/>
				</div>
			</div>
			<Button type='primary' size='large' onClick={handleSubmit}>
				Post review
			</Button>
		</div>
	);
}

export default ReviewForm;
