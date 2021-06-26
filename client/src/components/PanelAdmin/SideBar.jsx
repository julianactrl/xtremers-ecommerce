import React from 'react'
import { Link } from "react-router-dom";


function SideBar() {
    return (
        <div class="h-screen hidden lg:block shadow-lg relative w-80">
                    <div class="bg-purple h-full dark:bg-gray-700">
                        <div class="flex items-center justify-start pt-6 ml-8">
                            <p class="font-bold dark:text-white text-xl">
                                Admin Panel
                    </p>
                        </div>
                        <nav class="mt-6">
                            <div>
                            <Link to="/users/paneladmin">
                                <a class="w-full text-gray-400 flex items-center pl-6 p-2 my-2 transition-colors duration-200 justify-start hover:text-gray-800 border-l-4 border-transparent" href="#">
                                    <span class="text-left">
                                    <i width="20" height="20" fill="currentColor" class="fas fa-user"></i>
                                    </span>
                                    <span class="mx-2 text-sm font-normal">
                                        Users
                                    </span>
                                </a>
                                </Link>
                                <a class="w-full text-gray-400 flex items-center pl-6 p-2 my-2 transition-colors duration-200 justify-start hover:text-gray-800 border-l-4 border-transparent" href="#">
                                    <span class="text-left">
                                        <svg width="20" height="20" fill="currentColor" viewBox="0 0 2048 1792" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1070 1178l306-564h-654l-306 564h654zm722-282q0 182-71 348t-191 286-286 191-348 71-348-71-286-191-191-286-71-348 71-348 191-286 286-191 348-71 348 71 286 191 191 286 71 348z">
                                            </path>
                                        </svg>
                                    </span>
                                    <Link to="/products/add" >
                                    <span class="mx-2 text-sm font-normal">
                                       Add  Product
                                    </span>
                                    </Link>
                                </a>
                                <a class="w-full text-gray-400 flex items-center pl-6 p-2 my-2 transition-colors duration-200 justify-start hover:text-gray-800 border-l-4 border-transparent" href="#">
                                    <span class="text-left">
                                        <svg width="20" height="20" fill="currentColor" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1728 608v704q0 92-66 158t-158 66h-1216q-92 0-158-66t-66-158v-960q0-92 66-158t158-66h320q92 0 158 66t66 158v32h672q92 0 158 66t66 158z">
                                            </path>
                                        </svg>
                                    </span>
                                    <Link to={`/categories/admin`}>
                                    <span class="mx-4 text-sm font-normal">
                                        Add Category
                                    </span>
                                    </ Link >
                                </a> 
                            </div>
                        </nav>
                    </div>
                </div>
    )
}

export default SideBar
