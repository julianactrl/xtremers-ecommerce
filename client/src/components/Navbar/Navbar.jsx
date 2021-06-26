import React, { useState, useEffect } from 'react';
import { Route, Link } from 'react-router-dom';
import { Searchbar } from '../Searchbar/Searchbar';
import { UserPanel } from '../UserPanel/UserPanel';
import { useSelector } from 'react-redux';
import DropdownMenu from '../DropdownMenu/DropdownMenu';
import styles from './Navbar.module.css';
import login from '../../actions/userActions';
import xtremers from '../../assets/img/xtremers_big.png'

function Navbar() {

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
    }, [userLogin])
    

    return (
        <>
        <nav className="bg-white shadow dark:bg-gray-800">
            <div className="container px-6 py-3 mx-auto md:flex md:justify-between md:items-center">
                <div className="flex items-center justify-between">
                    <div >
                        <div>
                        <Link to='/' classNameName="no-underline text-grey-darkest hover:text-black">
                           <img className="w-52" src={xtremers}/>
                        </Link>
                        </div>                       
                    </div>
                    
                    {/* <!-- Mobile menu button --> */}
                    <div className="flex md:hidden">
                        <button type="button" className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400" aria-label="toggle menu">
                            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                                <path fill-rule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"></path>
                            </svg>
                        </button>
                    </div>
                </div>
                {/* <!-- Search field --> */}
                    <div className="list-reset md:flex md:items-center  justify-items-center flex">
                        <span className="md:ml-4">
                        <Route render={({ history }) => <Searchbar history={history} />} />
                        </span>
                    </div>
                {/* <!-- END Search field --> */}

                {/* <!-- Mobile Menu open: "block", Menu closed: "hidden" --> */}
                <div class="items-center md:flex">
                <div class="flex justify-center md:block">
                        <Link to='/cart'>
                        <a className={"relative text-gray-700 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-300  py-5" + " " + styles.cart} href="#">
                            <svg class={"w-5 h-5" + " " 
                        + styles.svg}viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.70711 15.2929C4.07714 15.9229 4.52331 17 5.41421 17H17M17 17C15.8954 17 15 17.8954 15 19C15 20.1046 15.8954 21 17 21C18.1046 21 19 20.1046 19 19C19 17.8954 18.1046 17 17 17ZM9 19C9 20.1046 8.10457 21 7 21C5.89543 21 5 20.1046 5 19C5 17.8954 5.89543 17 7 17C8.10457 17 9 17.8954 9 19Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                             {/* <span class="absolute top-0 left-0 p-1 text-xs text-white bg-indigo-500 rounded-full"></span>  */}
                        </a>
                        </Link>
                        
                        
                    </div>
                    <div className="flex flex-col md:flex-row md:mx-6">                   
                        <div class={"my-1 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-indigo-500 dark:hover:text-indigo-400 md:mx-4 md:my-0"+ " " + styles.shop}><Link to='/products'>Shop</Link></div>
                        
                        <div className="my-1 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-indigo-500 dark:hover:text-indigo-400 md:mx-4 md:my-0" ><DropdownMenu /></div>
                        
                        {userInfo === null ?
                       
                        <div className={"my-1 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-indigo-500 dark:hover:text-indigo-400 md:mx-4 md:my-0" + "" + styles.register} > <Link to='/register'> Register </Link></div>
                            : null     
                        }
                        <div className="my-1 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-indigo-500 dark:hover:text-indigo-400 md:mx-4 md:my-0"><UserPanel  /></div>
                    </div>

                    
                </div>
            </div>
        </nav>
        </>
    );
}

export default Navbar;

