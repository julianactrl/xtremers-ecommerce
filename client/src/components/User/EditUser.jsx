import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../actions/userActions';
import  axios  from 'axios';
import swal from 'sweetalert';

function EditUser(props) {

    const id = props.id;

    const dispatch = useDispatch();

    const initUser = { 
        email: '', 
        name: '' , 
        last_name: '', 
        phone: '', 
        birdh_date: '',
        adress: '',
      };

    const [user, setUser] = useState(initUser)
    const [view, setView ] = useState({})

    const getUserById = () => {     
        axios.get(`http://localhost:3001/users/${id}`)
    
        .then(res => {
            setView(res.data)

        })   
        
        .catch(function (error) {
             console.log(error);
        })  
    }

        useEffect(() => {  
            getUserById()
    }, [])

    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target
        setUser({ ...user, [name]: value })        
    }

    const onClick = (user) => {
        

        const updates = {
            email: user.email === '' ? view.email : user.email, 
            name: user.name === '' ? view.name : user.name, 
            last_name: user.last_name === '' ? view.last_name : user.last_name, 
            phone: user.phone === '' ? view.phone : user.phone, 
            birdh_date: user.birdh_date === '' ? view.birdh_date : user.birdh_date,
            adress: user.adress === '' ? view.adress : user.adress,
        }

        console.log('OBJETO A ACTUALIZAR', updates)

        dispatch(updateUser(view.id, updates))
            .then(res => swal('Updated User'))
            .catch( err => swal(err, "error"))
      }
    


    return (

        <section className="h-screen bg-gray-100 bg-opacity-50 mt-4">
            <form onSubmit={ (e) => e.preventDefault() } onChange={ (e) => e.preventDefault() } className="container max-w-2xl mx-auto shadow-md md:w-3/4">
                <div className="p-4 bg-gray-100 border-t-2 border-gray-700 rounded-lg bg-opacity-5">
                    <div className="max-w-sm mx-auto md:w-full md:mx-0">
                        <div className="inline-flex items-center space-x-4">
                            
                            <h1 className="text-gray-600">
                                {view.name} {view.last_name}
                    </h1>
            </div>
                    </div>
                </div>
                <div className="space-y-6 bg-white">
                    <div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
                        <h2 className="max-w-sm mx-auto md:w-1/3">
                            Account
                </h2>
                        <div className="max-w-sm mx-auto md:w-2/3">
                            <div className=" relative ">
                                <input type="text" 
                                    id="user-email"
                                    name="email" 
                                    className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded py-2 px-4 block w-full focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" 
                                    placeholder={view.email}
                                    value={user.email}
                                    onChange={handleInputChange} 

                                />
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
                        <h2 class="max-w-sm mx-auto md:w-1/3">
                            Personal info
                    </h2>
                        <div className="max-w-sm mx-auto space-y-5 md:w-2/3">
            <div>
                                <div className=" relative ">
                                    <input type="text" 
                                        id="user-name"
                                        name="name" 
                                        className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded py-2 px-4 block w-full focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" 
                                        placeholder={view.name}
                                        value={user.name}
                                        onChange={handleInputChange} 

                                    />
                                </div>
            </div>
                            <div>
                                <div className=" relative ">
                                    <input type="text" 
                                        id="user-last-name"
                                        name="last_name" 
                                        className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded py-2 px-4 block w-full focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" 
                                        placeholder={view.last_name}
                                        value={user.last_name}
                                        onChange={handleInputChange}

                                    />
                                </div>
                            </div>
            <div>
                                <div className=" relative ">
                                    <input type="text" 
                                        id="user-phone"
                                        name="phone" 
                                        className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded py-2 px-4 block w-full focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" 
                                        placeholder={view.phone} 
                                        value={user.phone}
                                        onChange={handleInputChange} 

                                    />
                                </div>
            </div>
                            <div>
                                <div className=" relative ">
                                    <input type="date" 
                                        id="user-birdh_date"
                                        name="birdh_date" 
                                        className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded py-2 px-4 block w-full focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" 
                                        placeholder={formatDate(view.birdh_date)}
                                        value={ user.birdh_date === '' ? formatDate(view.birdh_date) : formatDate(user.birdh_date) }
                                        onChange={handleInputChange}

                                    />
                                </div>
                            </div>
            <div>
                                <div className=" relative ">
                                    <input type="text" 
                                        id="user-adress"
                                        name="adress" 
                                        className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded py-2 px-4 block w-full focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" 
                                        placeholder={view.adress} 
                                        value={user.adress}
                                        onChange={handleInputChange} 
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="w-full flex  px-4 pb-4 ml-auto text-gray-500 md:w-1/3">
                        
                           <Link to={`/users/paneladmin`} className="inline-flex">
                                <button type="submit"  className="bg-gray-700 mr-2 text-white py-2 px-4 w-full h-10 tracking-wide rounded hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
                                    Back to
                                </button>
                           </Link>

                            <button type="submit" onClick={ () => onClick(user) } className="bg-gray-700 text-white py-2 px-4 w-full tracking-wide rounded hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
                                Save
                            </button>
            

                        
                    </div>
                    
                    
        </div>
    </form>
        </section>

    )
}

export default EditUser
