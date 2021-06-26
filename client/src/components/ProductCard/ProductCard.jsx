import React from 'react'
import { Link } from "react-router-dom";
import './ProductCard.css'


function ProductCard({ name, price, id, idCategory, image }) {

    return (
        <Link to={`/products/${id}`} className="titleCard">
        <button className="">
                
            <div className="-shrink-0 m-6 relative overflow-hidden bg-purple-500 rounded-lg max-w-xs shadow-lg productCard w-250 h-250">
                    <svg className="absolute bottom-0 left-0 mb-8" viewBox="0 0 375 283" fill="none" style={{ transform: 'scale(1.5)', opacity: '0.1' }}>
                        <rect x="159.52" y="175" width="152" height="152" rx="8" transform="rotate(-45 159.52 175)" fill="white" />
                        <rect y="107.48" width="152" height="152" rx="8" transform="rotate(-45 0 107.48)" fill="white" />
                    </svg>
                    <div className="relative pt-10 px-10 flex items-center justify-center">
                        <div className="block absolute w-48 h-48 bottom-0 left-0 -mb-24 ml-3" style={{ background: 'radial-gradient(black, transparent 60%)', transform: 'rotate3d(0, 0, 1, 20deg) scale3d(1, 0.6, 1)', opacity: '0.2' }}></div>
                        <img className="relative w-40 h-40" src={image} alt="" />
                    </div>
                    <div className="relative text-white px-6 pb-6 mt-6">
                        <Link to={`/products/${id}`} className="titleCard">
                            <span className="block font-semibold text-xl">{name}</span>
                        </Link>
                        <div className=" flex justify-between">
                            <div className="titleCard"><span className=" block font-semibold text-xl"></span></div>
                            <div>
                                <span className="block bg-white rounded-lg text-gray-600 text-s font-bold px-3 py-2 leading-none flex items-center">$ {price}</span>
                            </div>
                        </div>

                    </div>


                </div>
            </button>
        </Link>



    )
}

export default ProductCard