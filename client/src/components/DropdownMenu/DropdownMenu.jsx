import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useDetectOutsideClick } from './useDetectOutsideClick';
import './DropDownMenu.css'
import Message from '../Message/Message';
import Loaders from '../Loader/Loader';
import { getAllCategories } from '../../actions/crudCategoriesActions';
import { setSearchbarCategoryName } from '../../actions/productActions';



export default function DropdownMenu() {

    const dispatch = useDispatch()
    const dropdownRef = useRef(null);
    const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
    const onClick = () => setIsActive(!isActive);
    const categoryList = useSelector(state => state.categories)
    const { loading, error } = categoryList


    useEffect(() => {
        dispatch(getAllCategories())
    }, [dispatch])

    const handleDispatchFilter = (categoryName) => {

        console.log(categoryName)
        dispatch(setSearchbarCategoryName(categoryName))
    }

    return (
        <>
            <div className="relative inline-flex justify-center text-left">
                <div>
                    {/* className="border-t block no-underline hover:underline py-2 text-grey-darkest hover:text-black md:border-none md:p-0" */}
                    <button type="button" onClick={onClick}
                        className="inline-flex justify-center w-full rounded-md  px-4 py-2 bg-white text-grey-darkest hover:text-black font-medium text-gray-700  focus:outline-none focus:ring-2  focus:ring-offset-gray-100 focus:ring-white no-underline hover:underline"
                        id="options-menu"
                        aria-haspopup="true"
                        aria-expanded="true">
                        Categories
             {/* Heroicon name: chevron-down  */}
                        <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
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
                        {loading
                            ? <Loaders />
                            : error
                                ? <Message>{error}</Message>
                                : categoryList.allCategories && categoryList.allCategories.map((category) =>
                                    <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 
                                    rounded-xl" onClick={() => handleDispatchFilter(category.name)}>{category.name}
                                    </button>)}

                    </nav>
                </div>
            </div>
        </>
    )
}

