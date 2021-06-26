import React, { useRef } from 'react'
import { useDetectOutsideClick } from '../DropdownMenu/useDetectOutsideClick';
import { useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom';
import { logout } from '../../actions/userActions'
import './UserPanel.css'
import swals from '../../utils/swals';

export const UserPanel = () => {


    const dropdownRef = useRef(null);
    const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
    const onClick = () => setIsActive(!isActive);

    const history = useHistory();
    const dispatch = useDispatch();

    //logout

    const handleLogout = () => {
        swals.FIRE('warning',
            'You are about to log out',
            'Are you sure?',
            'Yes',
            true,
            'Cancel')
            .then((result) => {
                if (result.isConfirmed) {
                    swals.CONFIRMOK(
                        'You have successfully logged out.',
                        '',
                        'success',
                        dispatch(logout())
                    )
                    history.push('/');
                }

            })
    }

    return (
        <>
            <div className="ml-5 relative inline-block text-left">
                <div>
                    {/* className="border-t block no-underline hover:underline py-2 text-grey-darkest hover:text-black md:border-none md:p-0" */}
                    <button type="button" onClick={onClick}
                        className="inline-flex justify-center w-full rounded-md  px-4 py-2 bg-white text-grey-darkest hover:text-black font-medium text-gray-700  focus:outline-none focus:ring-2  focus:ring-offset-gray-100 focus:ring-white no-underline hover:underline"
                        id="options-menu"
                        aria-haspopup="true"
                        aria-expanded="true">
                        <button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" id="user-menu" aria-haspopup="true">

                            <img className="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="UserImage" />
                        </button>
                        <svg className="mt-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                        </svg>
                    </button>
                </div>

                {/* Dropdown panel, show/hide based on dropdown state. */}

                <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ">
                    <nav
                        ref={dropdownRef}
                        className={`menu ${isActive ? 'active' : 'inactive'}`}
                    >

                        <Link to="/login" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Login
                        </Link>
                        <Link to="/userpage" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Profile</Link>
                        <Link to="/products/paneladmin" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Panel</Link>
                        <button onClick={handleLogout} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-xl" role="menuitem">{logout}Logout</button>

                    </nav>
                </div>
            </div>
        </>
    )
}
