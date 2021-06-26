import React ,{useEffect, useState}from "react";
import { useSelector } from "react-redux";
import jwt from 'jsonwebtoken';
import axios from 'axios'

const Profile = () => {

	const user = jwt.decode(JSON.parse(localStorage.getItem('userInfo')));
	const [userLocal , setUserLocal] = useState({})
	const getInfoUser = async (user) =>{
		const infoUser = await axios.get(`http://localhost:3001/users/${user.id}`);
		setUserLocal(infoUser.data)
	}
	useEffect(() => {
		getInfoUser(user)
	}, [])

	console.log(userLocal)

function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [day, month, year].join('-');
    }


 console.log(user)
  return (
	  <div>
	  { !userLocal && (<div>Cargando</div>)  }
	  { userLocal  && <>
    <div class="w-full relative mt-4 shadow-2xl rounded my-24 overflow-hidden">
      <div class="top h-64 w-full bg-blue-600 overflow-hidden relative">
        <img
          src="https://www.singlequiver.com/enelpico/wp-content/uploads/2017/10/Taman%CC%83o-Wordpress-22.png"
          alt=""
          class="bg w-full h-full object-cover object-center absolute z-0"
        />
        <div class="flex flex-col justify-center items-center relative h-full bg-black bg-opacity-50 text-white">
          <img
            src={ userLocal.photoURL ? userLocal.photoURL : "https://xsurf.es/wp-content/uploads/2020/11/alternativas-tablas-surf-decathlon.jpg"}
            class="h-24 w-24 object-cover rounded-full"
          />
          <h1 class="text-2xl font-semibold">{userLocal.name}</h1>
         
        </div>
      </div>
      <div class="grid grid-cols-12 bg-white ">
        <div class="col-span-12 w-full px-3 py-6 justify-center flex space-x-4 border-b border-solid md:space-x-0 md:space-y-4 md:flex-col md:col-span-2 md:justify-start ">
          <a
            href="#"
            class="text-sm p-2 bg-green-400 text-white text-center rounded font-bold"
          >
            Basic Information
          </a>

          <a
            href="editprofile"
            class="text-sm p-2 text-white bg-green-400 text-center rounded font-semibold hover:bg-blue-500 hover:text-white"
          >
            Edit Profile
          </a>

          <a
            href="Orderdetails"
            class="text-sm p-2 text-white bg-green-400 text-center rounded font-semibold hover:bg-blue-500 hover:text-white"
          >
            Orders
          </a>
        </div>

        <div class="col-span-12 md:border-solid md:border-l md:border-black md:border-opacity-25 h-full pb-12 md:col-span-10">
          <div class="px-4 pt-4">
            <div>
              <h3 class="text-2xl font-semibold">Basic Information</h3>
              <hr />
            </div>

            <div class="form-item">
              <label class="text-xl ">Full Name</label>
              <p
                type="text"
                value="Antonia P. Howell"
                class="w-full appearance-none text-black text-opacity-50 rounded shadow py-1 px-2  mr-2 focus:outline-none focus:shadow-outline focus:border-blue-200"
              >
                {userLocal.name}  {userLocal.last_name}
              </p>
            </div>
			  
			  <div class="form-item">
              <label class="text-xl ">Adress</label>
              <p
                type="text"
                value="Antonia P. Howell"
                class="w-full appearance-none text-black text-opacity-50 rounded shadow py-1 px-2  mr-2 focus:outline-none focus:shadow-outline focus:border-blue-200"
              >
               {userLocal.adress}
              </p>
            </div>
	  
			<div class="form-item">
              <label class="text-xl ">Email</label>
              <p
                type="text"
                value="Antonia P. Howell"
                class="w-full appearance-none text-black text-opacity-50 rounded shadow py-1 px-2  mr-2 focus:outline-none focus:shadow-outline focus:border-blue-200"
              >
                {userLocal.email}
              </p>
            </div>
	  
			<div class="form-item">
              <label class="text-xl ">Phone</label>
              <p
                type="text"
                value="Antonia P. Howell"
                class="w-full appearance-none text-black text-opacity-50 rounded shadow py-1 px-2  mr-2 focus:outline-none focus:shadow-outline focus:border-blue-200"
              >
                {userLocal.phone}
              </p>
            </div>
	  
			<div class="form-item">
              <label class="text-xl ">Birth -date</label>
              <p
                type="text"
                value="Antonia P. Howell"
                class="w-full appearance-none text-black text-opacity-50 rounded shadow py-1 px-2  mr-2 focus:outline-none focus:shadow-outline focus:border-blue-200"
              >   {formatDate(userLocal.birdh_date)}
              </p>
            </div>

            
           

          </div>
        </div>
      </div>
	 
    </div>
	</>}
	</div>
	
  );
};

Profile.defaultProps = {
  user: {
    first_name: "Juancho",
    last_name: "Perez",
    email: "Juanchito@gmail.com",
    img:
      "https://i.pinimg.com/564x/80/8d/d4/808dd40b74bba0ed00a2d7edf8631e58.jpg",
  },
};

export default Profile;
