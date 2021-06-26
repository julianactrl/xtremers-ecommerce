import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import StarRatings from "react-star-ratings";
import swal from 'sweetalert';
import jwt from 'jsonwebtoken';
const url = 'http://localhost:3001/';

const ReviewForm = () => {


	const  idProducto  =1
	

	const [review, setReview] = useState({
		rate: 0,
		content: ''
	});

	const setNewRating = (rank) => setReview({
		...review,
		rate: rank
	});

	const handleInput = (e) => {
		setReview({
			...review,
			content: e.target.value
		})
	}

    const user = jwt.decode(JSON.parse(localStorage.getItem('userInfo')));
    console.log(user)

	const handleSubmit =  (e) => {
		e.preventDefault();
        const newReview = {
            rate: review.rate,
            content: review.content,
            date: new Date(),
            userId: user.id,
            status: true,

        };
        console.log("Review--------", newReview)
		axios.post(`${url}reviews/product/${idProducto}/add`, newReview)
        .then(() => {
            console.log("Review--------", newReview)
            swal({
                icon: "success",
                });
				window.location.reload();
			})
			.catch(() => {
                swal({
                    icon: "error",
                });
			})
	}

    

    return(
        // <!-- Rating Form -->
        <form 
        onSubmit={handleSubmit}
        class="min-h-screen  py-6 flex flex-col justify-center sm:py-12"
        >
        <div class="py-3 sm:max-w-xl sm:mx-auto border-2">
            <div class="bg-white min-w-1xl flex flex-col rounded-xl shadow-lg">
            <div class="px-12 py-5">
                <h2 class="text-gray-800 text-3xl font-semibold">Leave us your opinion </h2>

            </div>
            <div class="bg-gray-200 w-full flex flex-col items-center">
                <div class="flex flex-col items-center py-6 space-y-3">
                <span class="text-lg text-gray-800">How was quality of the product?</span>
                <div class="flex space-x-3">
                    
                    <StarRatings
						rating={review.rate}
						name="ratingStars"
						isSelectable={true}
						changeRating={setNewRating}
						starRatedColor="blue"
						starDimension="1.8em"
						starSpacing="0"
						starHoverColor='violet'
					/>
                </div>
                </div>
                <div class="w-3/4 flex flex-col">
                <textarea 
                rows="3" 
                class="p-4 text-gray-500 rounded-xl resize-none"
                onChange={handleInput} value={review.content}
                >Leave a message, if you want</textarea>
                <button class="py-3 my-8 text-lg bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl text-white">Rate now</button>
                </div>
            </div>
             <div class="h-20 flex items-center justify-center">
                
            </div> 
            </div>

            
        </div>
        </form>
    )
}

export default ReviewForm;