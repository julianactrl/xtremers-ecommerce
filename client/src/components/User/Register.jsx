import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';


//actions from redux
import { createUsers  } from '../../actions/userActions.js'
import swal from 'sweetalert';



function Register({ location, history }) {


    const {register, errors, handleSubmit} = useForm();
    const dispatch = useDispatch();
    const createdUser = useSelector((state) => state.user);
    const { loading, error, user } = createdUser

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if (user) {
          history.push(redirect)
        }
      }, [history, user, redirect, error])

    const initUser = { 
        email: '', 
        password: '' ,
        confirm_password: '', 
        name: '', 
        last_name: '',
        phone: '',
        birdh_date: '',
        adress: ''
      };
    const [userCreate, setUserCreate] = useState(initUser);

    const handleInputChange = (event) => {
        const { name, value } = event.target
        setUserCreate({ ...userCreate, [name]: value })
        //console.log(userCreate)
      }

      console.log(createdUser)
      console.log(error)

      const onSubmit = async(data, e) => {
        //e.prevent.default();
         
        console.log(data)
        const userObject = {...userCreate, isAdmin: false}
        if (data.password !== data.confirm_password) {
            swal('Password does not match')
        } else {
            console.log(userCreate)
            await dispatch(createUsers(userObject))
        }
    }


    return (
        <div >
            <div className="flex max-w-sm mx-auto bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden lg:max-w-2xl mt-5 border-t-2" >

                <div className="w-full py-8 px-6 md:px-8 ">
                    <h2 className="text-2xl font-semibold text-gray-700 dark:text-white text-center">Xtremers</h2>

                    <p className="text-xl text-gray-600 dark:text-gray-200 text-center">Register!</p>

                    <div className="mt-4 flex items-center justify-between">
                        <span className="border-b dark:border-gray-600 w-1/5 lg:w-1/4"></span>

                        <a href="#" className="text-xs text-center text-gray-500 dark:text-gray-400 uppercase hover:underline">Register as a new user</a>

                        <span className="border-b dark:border-gray-400 w-1/5 lg:w-1/4"></span>
                    </div>
                    {/**FORMULARIO */}
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mt-4">
                            <label
                                className="block text-gray-600 dark:text-gray-200 text-sm font-medium mb-2"
                                for="user_email">
                                Email Address
                            </label>
                            <input
                                id="user_email"
                                name="email"
                                className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded py-2 px-4 block w-full focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                type="email"
                                ref={register({
                                    required: "Enter an email",
                                    pattern: {
                                            value: /^\S+@\S+$/i,
                                            message: "Entered value does not match email format"
                                    }
                                })}
                                onChange={handleInputChange}
                                
                                
                            />
                            <span class="block text-red-700 sm:inline">{errors?.email?.message}</span>
                        </div>
                        <div className="mt-4">
                            <label
                                className="block text-gray-600 dark:text-gray-200 text-sm font-medium mb-2"
                                for="user_name">
                                Name
                            </label>
                            <input
                                id="user_name"
                                name="name"
                                ref={ register({
                                        required: "Enter a user name"
                                        })
                                    }
                                onChange={handleInputChange} 
                                className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded py-2 px-4 block w-full focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                type="text"
                                
                            />
                            <span class="block text-red-700 sm:inline">{errors?.name?.message}</span>
                        </div>
                        <div className="mt-4">
                            <label
                                className="block text-gray-600 dark:text-gray-200 text-sm font-medium mb-2"
                                for="user_last_name">
                                Last Name
                            </label>
                            <input
                                id="user_last_name"
                                name="last_name"
                                ref={ register({
                                        required: "Enter a last name"
                                    })
                                }
                                onChange={handleInputChange}
                                className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded py-2 px-4 block w-full focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                type="text"
                                
                            />
                            <span class="block text-red-700 sm:inline">{errors?.last_name?.message}</span>
                        </div>
                        <div className="mt-4">
                            <label
                                className="block text-gray-600 dark:text-gray-200 text-sm font-medium mb-2"
                                for="user_phone">
                                Phone
                            </label>
                            <input
                                id="user_phone"
                                name="phone"
                                className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded py-2 px-4 block w-full focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                type="text"
                                onChange={handleInputChange} 
                                
                            />
                            
                        </div>
                        <div className="mt-4">
                            <label
                                className="block text-gray-600 dark:text-gray-200 text-sm font-medium mb-2"
                                for="user_birdhtDate">
                                Birthday
                            </label>
                            <input
                                id="user_birdhtDate"
                                name="birdh_date"
                                className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded py-2 px-4 block w-full focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                type="date"
                                ref={ register({
                                    required: "Enter a user Birdht Date"
                                    })
                                }  
                                onChange={handleInputChange}
                                
                            />
                            <span class="block text-red-700 sm:inline">{errors?.birdh_date?.message}</span>
                        </div>
                        <div className="mt-4">
                            <label
                                className="block text-gray-600 dark:text-gray-200 text-sm font-medium mb-2"
                                for="user_adress">
                                Adress
                            </label>
                            <input
                                id="user_adress"
                                name="adress"
                                className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded py-2 px-4 block w-full focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                type="text"
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="mt-4">
                            <div className="flex justify-between">
                                <label
                                    className="block text-gray-600 dark:text-gray-200 text-sm font-medium mb-2"
                                    for="user_password">
                                    Password
                                </label>
                                
                            </div>

                            <input
                                id="user_password"
                                className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded py-2 px-4 block w-full focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                type="password"
                                name="password"
                                ref={ register({
                                    required: "Enter a user password",
                                    pattern: {
                                        value: /(?=.*[0-9])/,
                                        message: "Password needs al least one number"
                                    }})
                                }
                                onChange={handleInputChange} 

                            />
                            <span class="block text-red-700 sm:inline">{errors?.password?.message}</span>
                        </div>
                        <div className="mt-4">
                            <div className="flex justify-between">
                                <label
                                    className="block text-gray-600 dark:text-gray-200 text-sm font-medium mb-2"
                                    for="confirm_password">
                                    Confirm Password
                                </label>
                                
                            </div>

                            <input
                                id="confirm_password"
                                className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded py-2 px-4 block w-full focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                                type="password"
                                name="confirm_password"
                                ref={ register({
                                    required: "Enter a user password"
                                    })
                                }
                                onChange={handleInputChange} 
                                

                            />
                            <span class="block text-red-700 sm:inline">{errors?.confirm_password?.message}</span>
                        </div>

                        <div className="mt-8">
                            <button className="bg-green-400 text-white py-2 px-4 w-full tracking-wide rounded hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
                                Register
                            </button>
                        </div>
                    </form>

                    <div className="mt-4 flex items-center justify-between">
                        <span className="border-b dark:border-gray-600 w-1/5 md:w-1/4"></span>
                        <Link to={`/login`}>
                            <a href="#" className="text-xs text-gray-500 dark:text-gray-400 uppercase hover:underline">or sign in</a>
                        </Link>

                        <span className="border-b dark:border-gray-600 w-1/5 md:w-1/4"></span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register
