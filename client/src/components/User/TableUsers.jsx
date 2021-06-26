import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
//actions from redux
import { listUsers , updateUser, deleteUser, promoteUser} from '../../actions/userActions.js'


function TableUsers() {

    const dispatch = useDispatch();

    

    const findAllUsers = useSelector((state) => state.users);
    const { loading, error, users } = findAllUsers

    const [ isAdmin, setIsAdmin ] = useState(false);
 
    useEffect(() => {
        dispatch(listUsers())
    }, []);


    const changeRole = (id, element)=> {
        var stateAdmin = {
            status:  element.isAdmin
        }
        if(element.isAdmin){
        stateAdmin.status = false
        }else{
           stateAdmin.status = true
        }
        console.log("soy Id promote", stateAdmin)
        dispatch(promoteUser(id , stateAdmin))
    }
    
    const handledeletedUser = (id)=> {
       dispatch(deleteUser(id))
      }

    console.log('USERS---->', users);



    return (
        
        <div class="container mx-auto px-4 sm:px-8 max-w-3xl">
            <div class="py-8">
                <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                    <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
                        <table class="min-w-full leading-normal">
                            <thead>
                                <tr>
                                    <th scope="col" class="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                                        User
                                    </th>
                                    <th scope="col" class="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                                        E-mail
                                    </th>
                                    <th scope="col" class="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                                        Adress
                                    </th>
                                    <th scope="col" class="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                                        Admin
                                    </th>
                                    <th scope="col" class="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                                        Delete
                                    </th>
                                    <th scope="col" class="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal">
                                        Edit
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                    users && users.map((element, index) => (
                                <tr key={element.id}>
                                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <div class="flex items-center">
                                            <div class="flex-shrink-0">
                                                <a href="#" class="block relative">
                                                    <img alt="profil" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=4&amp;w=256&amp;h=256&amp;q=60" class="mx-auto object-cover rounded-full h-10 w-10 "/>
                                                </a>
                                            </div>
                                            <div class="ml-3">
                                                <p class="text-gray-900 whitespace-no-wrap">
                                                {element.name} {element.last_name}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <p class="text-gray-900 whitespace-no-wrap">
                                        {element.email}
                                        </p>
                                    </td>
                                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <p class="text-gray-900 whitespace-no-wrap">
                                            {element.adress}
                                        </p>
                                    </td>
                                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <span class="text-gray-900 whitespace-no-wrap">
                                        {element.isAdmin ?
                                             <button 
                                             onClick={()=>changeRole(element.id, element)}
                                             class="relative inline-block px-3 py-1 font-semibold text-pink-900 leading-tight">
                                                <span aria-hidden="true" class="absolute inset-0 bg-pink-200 opacity-50 rounded-full">
                                                </span>
                                                <span class="relative">
                                                    <i class="fas fa-toggle-on text-sm"></i>
                                                </span>
                                             </button> : 
                                             <button 
                                             class="relative inline-block px-3 py-1 font-semibold text-pink-900 leading-tight"
                                             onClick={()=>changeRole(element.id, element)}>
                                                <span aria-hidden="true" class="absolute inset-0 bg-pink-200 opacity-50 rounded-full">
                                                </span>
                                                <span class="relative">
                                                    <i class="fas fa-toggle-off"></i>
                                                </span>
                                             </button>
                                            }
                                        </span>
                                    </td>
                                    
                                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <button 
                                        onClick={()=>handledeletedUser(element.id)}
                                        class="relative inline-block px-3 py-1 font-semibold text-purple-900 leading-tight">
                                            <span aria-hidden="true" class="absolute inset-0 bg-purple-200 opacity-50 rounded-full">
                                            </span>
                                            <span class="relative">
                                                <i class="fas fa-trash"></i>
                                            </span>
                                        </button>
                                    </td>
                                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <Link to={`/users/edit/${element.id}`}>
                                        <span class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                            <span aria-hidden="true" class="absolute inset-0 bg-green-200 opacity-50 rounded-full">
                                            </span>
                                            <span class="relative">
                                            <i class="fas fa-edit"></i>
                                            </span>
                                        </span>
                                        </Link>
                                    </td>
                                </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                        <div className="mt-4 flex items-center justify-between">
                        <span className="border-b dark:border-gray-600 w-1/5 md:w-1/4"></span>
                        <Link to={`/products/paneladmin`}>
                            <span className="text-xs text-gray-500 dark:text-gray-400 uppercase hover:underline">Go Back</span>
                        </Link>

                        <span className="border-b dark:border-gray-600 w-1/5 md:w-1/4"></span>
                    </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default TableUsers
