import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../../actions/productActions';

import './modalCategories.css'


const TableProduct = () => {
    //REDUX

    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const { loading, error, products } = productList
   
    
    useEffect(() => {
      dispatch(listProducts())
    }, [])
     
   
    const [modalOpen, setModalOpen] = useState(false)
    

    const handleModalOpen  = (event) =>{
        setModalOpen(true);
        
    }
    const handleModalClose  = (event) =>{
        setModalOpen(false);
        
    }

    return (
    
    <div class="container mx-auto px-4 sm:px-8 w-full">
      {/* ---------------CABECERA  ------------------------ ------------------------------------------- */}
      <div class="py-8">
        <div class="flex flex-row mb-1 sm:mb-0 justify-between w-full">
          <h2 class="text-2xl leading-tight">CURRENT PRODUCTS </h2>
          <div class="text-end"></div>
        </div>

        {/* ------------------------- TABLA ----------------------------------------------------- */}
        <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table class="min-w-full leading-normal">
              <thead>
                <tr>
                  <th
                    scope="col"
                    class="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                  >
                    PRODUCT
                  </th>
                  <th
                    scope="col"
                    class="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                  >
                    DESCRIPTION
                  </th>
                  <th
                    scope="col"
                    class="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                  >
                    PRICE
                  </th>
                  <th
                    scope="col"
                    class="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                  >
                    STOCK
                  </th>
                  <th
                    scope="col"
                    class="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                  >
                    DELETE
                  </th>
                  <th
                    scope="col"
                    class="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                  >
                    EDIT
                  </th>
                  <th
                    scope="col"
                    class="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                  >
                    ASIGN CATEGORY
                  </th>
                </tr>
              </thead>

                        
                <tbody>
                {products && products ? (
                    products.map((p) => ( 
                      <tr key={p.id}>
                        <td class="px-8 py-5 border-b border-gray-200 bg-white text-sm">
                          <div class="flex items-center">
                            <div class="flex-shrink-0">
                              <a href="#" class="block relative">
                                <img
                                   src={p.thumbnail}
                                  alt="profil"
                                  class="mx-auto object-cover rounded-full h-10 w-15 "
                                />
                              </a>
                            </div>
                            <div class="ml-3">
                              <p class="text-gray-900 whitespace-no-wrap">
                              {p.name}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p class="text-gray-900 whitespace-no-wrap">
                          {p.description}
                          </p>
                        </td>
                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p class="text-gray-900 whitespace-no-wrap">
                          {p.price}
                          </p>
                        </td>
                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <p class="text-gray-900 whitespace-no-wrap">
                          {p.stock}
                          </p>
                        </td>
                        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <Link to={`/products/delete/${p.id}`}>
                          <button class="relative inline-block px-3 py-1 font-semibold  bg-yellow-300 text-yellow-900 leading-tight hover:bg-purple-100 hover:text-purple-900  border-gray-200 rounded-full">
                            <span
                              aria-hidden="true"
                              class="absolute inset-0 bg-purple-200 opacity-50 rounded-full"
                            ></span>
                            <span class="relative"><i class="fas fa-trash"></i></span>
                          </button>
                          </Link>
                        </td>
                        
                          <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <Link to={`/products/edit/${p.id}`} >
                            <button   class="relative inline-block px-3 py-1 font-semibold  bg-green-300 text-green-900 leading-tight hover:bg-purple-100 hover:text-purple-900  border-gray-200 rounded-full">
                              <span
                                aria-hidden="true"
                                class="absolute inset-0  opacity-50 rounded-full"
                              ></span>
                              <span class="relative text-center ">
                              <i class="fas fa-edit"></i>
                              </span>
                            </button>
                            </Link>
                          </td>
                          <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <Link to={`/products/addCategoriesProduc/${p.id}`} >
                            <button 
                               onClick={handleModalOpen} 
                              class="relative inline-block px-3 py-1 font-semibold  bg-red-300 text-red-900 leading-tight hover:bg-yellow-100 hover:text-yellow-900  border-gray-200 rounded-full">
                              <span
                                aria-hidden="true"
                                class="absolute inset-0  opacity-50 rounded-full"
                              ></span>
                              <span class="relative text-center ">
                                <i class="far fa-plus-square"></i>
                              </span>
                            </button>
                            </Link>
                          </td>
                      </tr>
                          
                    ))): (
                    <tr>
                         <td colSpan={5}>No products</td>
                     </tr>
                 )
                 
                }
                    </tbody>
            </table>
          </div>
        </div>
      </div>
      
    </div>

    )
    
}
export default TableProduct;
