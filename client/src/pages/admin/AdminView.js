import axios from 'axios';
import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import Review from '../../components/Review/Review';
import './AdminView.css';

function AdminView() {
	const [reviews, setReviews] = useState();

	useState(() => {
		try {
			axios.get(`http://localhost:5000/reviews/`).then((res) => {
				setReviews(res.data);
				console.log(res.data);
			});
		} catch (error) {
			console.error(error);
		}
	}, []);
	return (
		<div>
			<Header />
			{reviews &&
				reviews.map((review) => (
					<div className='av-row'>
						<Review
							title={review.title}
							description={review.description}
							rating={review.rating}
							_id={review._id}
							location='admin'
						/>
						<p>product: {review.product?.name}</p>
						<p>product id: {review.product?._id}</p>
					</div>
				))}
		</div>
	);
}

export default AdminView;
