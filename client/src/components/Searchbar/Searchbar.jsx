import React, { useState } from "react";
import { useDispatch } from 'react-redux';

import './Searchbar.css';
import { setSearchbarKeyword } from '../../actions/productActions';

export const Searchbar = () => {


    const [keyword, setKeyword] = useState("");
    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(setSearchbarKeyword(keyword.trim()))
    }

    return (
        <form className="pt-2  relative  text-black-600 ml-auto  " onSubmit={submitHandler}>
            <input className=" mb-2.5 rounded-full border-2 border-gray-400 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none" type='text' name='q' onChange={(e) => setKeyword(e.target.value)}
                placeholder="Search..."></input>
            <button type="submit" class="absolute right-0 top-0 mt-5 mr-4">
                <svg className="text-gray-600 h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg"
                    xmlns="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px"
                    viewBox="0 0 56.966 56.966" styles="enable-background:new 0 0 56.966 56.966;" space="preserve"
                    width="512px" height="512px">
                    <path
                        d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
            </svg>
            </button>
        </form>
    );

}




        // Old Searchbar

        // <form className="mb-4 w-full md:mb-0 md:w-1/4 ml-auto relative" onSubmit={submitHandler} >
        //     <div className='border-2 focus:border-orange p-2 rounded-lg shadow-inner'>
        //         <svg className="w-6 h-6 absolute left-1 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        //             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        //         </svg>
        //         <input className="outline-none  bg-transparent  w-full ml-5" type='text' name='q' onChange={(e) => setKeyword(e.target.value)} placeholder="Search..."></input>
        //     </div>
        //     <label className="hidden" for="search-form">Search</label>
        //     <button type='submit' className="hidden p-2">Submit</button>
        // </form>