import React  from 'react'
import StarRatings from 'react-star-ratings';
import ShowMoreText from 'react-show-more-text';


const Reviews = (props) => {
    
    return (
      
      
        <div class=" border-b-2 border-gray-200 bg-white dark:bg-gray-800 w-full mx-auto p-8">
            <div class="flex items-center justify-center mt-8">
                                <StarRatings
                                    rating={props.rate}
                                    starRatedColor="violet"
                                    starDimension="1.5em"
                                    starSpacing="0"
                                /> 
                </div>
                <ShowMoreText
                    lines={8}
                    className='text-black-600 dark:text-white w-full md:w-2/3 m-auto text-center text-lg md:text-1xl'
                    expanded={false}
                >                
            <p class="text-gray-600 dark:text-white w-full md:w-2/3 m-auto text-center text-lg md:text-1xl">
                <span class="font-bold text-indigo-500">
                    “
                </span>
                {props.content}
                <span class="font-bold text-indigo-500">
                    ”
                </span>
            </p>
            </ShowMoreText>
            <div class="flex ml-2 items-center justify-center">
                <span class="font-semibold text-indigo-500 mr-2 text-lg">
                {props.nameUser} {props.lastName}
                </span>  
                
            </div>
        
        </div>

    )
}

export default Reviews;



