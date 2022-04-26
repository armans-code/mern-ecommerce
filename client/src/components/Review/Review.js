import './Review.css';
import React from 'react';
import {Rating} from '@mui/material';

function Review(props) {
	const review = props.review;

	function relativeDays(timestamp) {
		const rtf = new Intl.RelativeTimeFormat('en', {
			numeric: 'auto',
		});
		const oneDayInMs = 1000 * 60 * 60 * 24;
		const daysDifference = Math.round(
			(timestamp - new Date().getTime()) / oneDayInMs
		);

		return rtf.format(daysDifference, 'day');
	}

	const createdAgo = relativeDays(new Date(review.created));

	const recommended = review.isRecommended
		? 'Recommends'
		: 'Does not recommend';

	return (
		<div className='card'>
			<div className='card__user'>
				<Rating name='read-only' value={review.rating} readOnly />
				<span>&#8729;</span>
				<a>
					<p>{review?.user?.username}</p>
				</a>
				<span>&#8729;</span>
				<p className='card__user__created'>{createdAgo}</p>
				<span>&#8729;</span>
				<p>{recommended}</p>
			</div>
			<div className='card__title'>
				<h4>{review.title}</h4>
			</div>
			<div className='card__description'>
				<p>{review.description}</p>
			</div>
		</div>
	);
}

export default Review;
