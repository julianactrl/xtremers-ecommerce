import React from 'react'
import { Link } from 'react-router-dom'
 const Header = () => {
    return (
        <header className="absolute top-0 left-0 right-0 z-20">
                <nav className="container mx-auto px-6 md:px-12 py-4">
                    <div className="md:flex justify-center items-center">
                        <div className="flex justify-between items-center">
                            <div className="md:hidden">
                                <button className="text-white focus:outline-none">
                                    <svg className="h-12 w-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        </path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className="hidden md:flex items-center">
                            <Link to='/products'>
                            <a className="text-lg uppercase mx-3 text-white cursor-pointer hover:text-gray-300">
                                SHOP
                            </a>
                            </Link>

                            <Link to="/aboutus">
                            <a className="text-lg uppercase mx-3 text-white cursor-pointer hover:text-gray-300">
                                About Us
                            </a>
                            </Link>

                            <Link to="/contactus" >
                            <a className="text-lg uppercase mx-3 text-white cursor-pointer hover:text-gray-300">
                                Contact
                            </a>
                            </Link>
                        </div>
                    </div>
                </nav>
            </header>
     )
}

export default Header
