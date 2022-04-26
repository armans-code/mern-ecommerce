import React from 'react';
import Review from '../../Review/Review';

function ReviewList(props) {
	const reviews = props.reviews;
	return (
		<div className='review-list'>
			{reviews && reviews.map((review) => <Review review={review} />)}
		</div>
	);
}

export default ReviewList;
