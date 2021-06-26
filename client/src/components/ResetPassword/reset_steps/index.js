import React from 'react';
import { useState } from 'react';
import background from '../../Login/image/login.jpg';
import { Link } from 'react-router-dom';
import passCheck from '../../../utils/passCheck';
import strings from './strings';

const Reset_steps = ({ handleSubmit, step, loading, buttonRef }) => {
  const [input, setInput] = useState('');
  const [error, setError] = useState([]);

  const s = strings;

  console.log('soy console.log', s);

  const handleInputChange = (ev) => {
    let inp = ev.target.value;
    setInput(inp);
    if (step === 3) {
      setError(passCheck(inp));
    }
  };

  const formSubmit = (ev) => {
    ev.preventDefault();
    error.length === 0 && handleSubmit(input, step);
    setInput('');
  };

  const handleInputType = () => {
    switch (step) {
      case 1:
        return 'email';
      case 2:
        return 'number';
      case 3:
        return 'password';
      default:
        return '';
    }
  };

  return (
    <body class="font-mono bg-white-400">
      {/* Container */}
      <div class="container mx-auto">
        <div class="flex justify-center px-6 my-12">
          {/* Row  */}
          <div class="w-full xl:w-3/4 lg:w-11/12 flex">
            {/* Col */}
            <div
              class="w-full h-auto bg-white-400 hidden lg:block lg:w-1/2 bg-cover rounded-l-lg"
              style={{ backgroundImage: `url(${background})` }}
            ></div>
            {/* Col */}
            <div class="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
              <div class="px-8 mb-4 text-center">
                <h3 class="pt-4 mb-2 text-2xl">Forgot Your Password?</h3>
                <p class="mb-4 text-sm text-gray-700">{s.description[step]}</p>
              </div>
              <form
                onSubmit={formSubmit}
                class="px-8 pt-6 pb-8 mb-4 bg-white rounded"
              >
                <div class="mb-4">
                  <label
                    class="block mb-2 text-sm font-bold text-gray-700"
                    for="email"
                  >
                    {s.label[step]}
                  </label>
                  <input
                    class="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="email"
                    type={handleInputType()}
                    value={input}
                    onChange={(ev) => handleInputChange(ev)}
                  />
                </div>
                <div class="mb-6 text-center">
                  <button
                    ref={buttonRef}
                    className="bg-gray-700 text-white py-2 px-4 w-full tracking-wide rounded hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                  >
                    {loading ? (
                      <i className="fas fa-circle-notch fa-spin"></i>
                    ) : (
                      s.button[step]
                    )}
                  </button>
                </div>
                <hr class="mb-6 border-t" />
                <div class="text-center">
                  <Link
                    to="/register"
                    class="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                    href="./register.html"
                  >
                    Create an Account!
                  </Link>
                </div>
                <div class="text-center">
                  <Link
                    to="/login"
                    class="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                    href="./index.html"
                  >
                    Already have an account? Login!
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </body>
  );
};

export default Reset_steps;
