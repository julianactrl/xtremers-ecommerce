import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import background from "./image/login.jpg";
import { login } from '../../actions/userActions';
import swals from '../../utils/swals';
import { createOrder } from '../../actions/productActions'
import jwt from 'jsonwebtoken';

function Login({ location, history }) {
  const dispatch = useDispatch()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const order = useSelector((state) => state.cart.order);
  const orderCart = useSelector((state) => state.cart2.cartItems);


  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin
  const redirect = location.search ? location.search.split('=')[1] : '/products'

  const user = jwt.decode(userInfo);
  console.log(user)
  console.log(userInfo)

  useEffect(() => {
    if (userInfo) {
      isUser();

      history.push(redirect)
    }
  }, [history, userInfo, redirect])


  const isUser = () => {
    if (user) {
      orderCart.map((orderUser) => {
        console.log('entre')
        const orderCheck = {
          quantity: parseInt(orderUser.quantity),
          productId: orderUser.product.idProduct,
          subtotal: orderUser.subtotal
        }

        dispatch(createOrder(user.id, orderCheck));
      })
    }
  }



  const signGoogle = () => {
    window.location.replace("http://localhost:3001/auths/google");

  }


  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  const handleLogin = () => {
    swals.CONFIRMOK("You have successfully logged in.", "", "success");
  };
  const onClick = () => {
    window.location.replace("http://localhost:3001/auths/facebook");
  };

  return (
    <div className="flex max-w-sm mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden lg:max-w-4xl mt-5">
      <div
        className="hidden lg:block lg:w-1/2 bg-cover"
        style={{ backgroundImage: `url(${background})` }}
      ></div>

      <div className="w-full py-8 px-6 md:px-8 lg:w-1/2">
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-white text-center">
          Xtremers
        </h2>

        <p className="text-xl text-gray-600 dark:text-gray-200 text-center">
          Welcome back!
        </p>

        <a
          href="#"
          className="flex items-center justify-center mt-4 text-gray-600 dark:bg-gray-700 dark:text-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:hover:bg-gray-600"
        >
          <div className="px-4 py-3">
            <svg className="h-6 w-6" viewBox="0 0 40 40">
              <path
                d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                fill="#FFC107"
              />
              <path
                d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                fill="#FF3D00"
              />
              <path
                d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                fill="#4CAF50"
              />
              <path
                d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                fill="#1976D2"
              />
            </svg>
          </div>

          <button onClick={signGoogle} className="px-4 py-3 w-5/6 text-center font-bold focus:outline-none">
            Sign in with Google
          </button>
        </a>
        <a
          onClick={onClick}
          className="flex items-center justify-center mt-4 text-white bg-white-700 text-gray-600 rounded-lg shadow-md hover:bg-gray-100 hover:text-blue-700 dark:hover:bg-gray-600"
        >
          <div className="px-4 py-3 text-blue-600 text-2xl">
            <i class="fab fa-facebook"></i>
          </div>

          <button className="px-4 py-3 w-5/6 text-center font-bold focus:outline-none">
            Sign in with Facebook
          </button>
        </a>
        <div className="mt-4 flex items-center justify-between">
          <span className="border-b dark:border-gray-600 w-1/5 lg:w-1/4"></span>

          <a
            href="#"
            className="text-xs text-center text-gray-500 dark:text-gray-400 uppercase hover:underline"
          >
            or login with email
          </a>

          <span className="border-b dark:border-gray-400 w-1/5 lg:w-1/4"></span>
        </div>
        {/**FORMULARIO */}
        <form onSubmit={submitHandler}>
          <div className="mt-4">
            <label
              className="block text-gray-600 dark:text-gray-200 text-sm font-medium mb-2"
              for="LoggingEmailAddress"
            >
              Email Address
            </label>
            <input
              id="LoggingEmailAddress"
              className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded py-2 px-4 block w-full focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mt-4">
            <div className="flex justify-between">
              <label
                className="block text-gray-600 dark:text-gray-200 text-sm font-medium mb-2"
                for="loggingPassword"
              >
                Password
              </label>
              <Link
                to="/resetpassword"
                className="text-xs text-gray-500 dark:text-gray-300 hover:underline"
              >
                Forget Password?
              </Link>
            </div>

            <input
              id="loggingPassword"
              className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded py-2 px-4 block w-full focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mt-8">
            <button
              onClick={handleLogin}
              className="bg-gray-700 text-white py-2 px-4 w-full tracking-wide rounded hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
            >
              Login
            </button>
          </div>
        </form>

        <div className="mt-4 flex items-center justify-between">
          <span className="border-b dark:border-gray-600 w-1/5 md:w-1/4"></span>
          <Link to={`/register`}>
            <a
              href="#"
              className="text-xs text-gray-500 dark:text-gray-400 uppercase hover:underline"
            >
              or sign up
            </a>
          </Link>

          <span className="border-b dark:border-gray-600 w-1/5 md:w-1/4"></span>
        </div>
      </div>
    </div>
  );
}

export default Login;



