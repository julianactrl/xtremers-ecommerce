import React from 'react'
import { Link } from 'react-router-dom'

import surfer from '../../assets/img/surfer.jpg'


const Content = () => {
    return (
        
        <div class="bg-indigo-900 relative overflow-hidden h-screen">
            <img src={surfer} class="absolute h-full w-full object-cover"/>
            <div class="inset-0 bg-black opacity-25 absolute">
            </div>
            
            <div class="container mx-auto px-6 md:px-12 relative z-10 flex items-center py-32 xl:py-40">
                <div class="w-full flex flex-col items-center relative z-10">
                    <h1 class="font-extrabold text-7xl text-center sm:text-8xl text-white leading-tight mt-4">
                        Beyond your limits
                    </h1>
                    <Link to="/products" >
                    <a href="#" class="block bg-purple-800 hover:bg-gray-900 py-3 px-4 text-lg text-white font-bold uppercase mt-10">
                        Shop Now
                    </a>
                    </Link>
                </div>
            </div>
        </div>

    );
  };

export default Content
