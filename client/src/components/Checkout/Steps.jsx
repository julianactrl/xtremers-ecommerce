import React from 'react'
import { Link } from 'react-router-dom'


function Steps({ step1, step2, step3, step4 }) {
    return (
        <div class="max-w-xl mx-auto my-4 border-b-1 pb-4">
            <div class="flex pb-3">
                <div class="flex-1">
                </div>

                <div class="flex-1">
                    <div class="w-10 h-10 bg-green mx-auto rounded-full text-lg text-gray flex items-center">
                        <span class="text-gray text-center w-full"><i class="fa fa-check w-full fill-current white"></i></span>
                    </div>
                </div>


                <div class="w-1/6 align-center items-center align-middle content-center flex">
                    <div class="w-full bg-grey-light rounded items-center align-middle align-center flex-1">
                        <div class="bg-green-light text-xs leading-none py-1 text-center text-grey-darkest rounded " ></div>
                    </div>
                </div>


                <div class="flex-1">
                    <div class="w-10 h-10 bg-green mx-auto rounded-full text-lg text-gray flex items-center">
                        <span class="text-gray text-center w-full"><i class="fa fa-check w-full fill-current white"></i></span>
                    </div>
                </div>

                <div class="w-1/6 align-center items-center align-middle content-center flex">
                    <div class="w-full bg-grey-light rounded items-center align-middle align-center flex-1">
                        <div class="bg-green-light text-xs leading-none py-1 text-center text-grey-darkest rounded " ></div>
                    </div>
                </div>

                <div class="flex-1">
                    <div class="w-10 h-10 bg-white border-2 border-grey-light mx-auto rounded-full text-lg text-gray flex items-center">
                        <span class="text-grey-darker text-center w-full">3</span>
                    </div>
                </div>


                <div class="w-1/6 align-center items-center align-middle content-center flex">
                    <div class="w-full bg-grey-light rounded items-center align-middle align-center flex-1">
                        <div class="bg-green-light text-xs leading-none py-1 text-center text-grey-darkest rounded " ></div>
                    </div>
                </div>


                <div class="flex-1">
                    <div class="w-10 h-10 bg-white border-2 border-grey-light mx-auto rounded-full text-lg text-gray flex items-center">
                        <span class="text-grey-darker text-center w-full">4</span>
                    </div>
                </div>


                <div class="flex-1">
                </div>
            </div>



            <nav class="flex text-xs content-center text-center">
                <nav class="w-1/4">
                    {step1 ? (
                        <Link to='/login'>
                            <nav>Login</nav>
                        </Link>
                    ) : (
                            <nav disabled>Login</nav>
                        )}
                </nav>
                <nav class="w-1/4">
                    {step2 ? (
                        <Link to='/shipping'>
                            <nav>Shipping</nav>
                        </Link>
                    ) : (
                            <nav disabled>Shipping</nav>
                        )}
                </nav>

                <div class="w-1/4">
                    {step3 ? (
                        <Link to='/payment'>
                            <nav>Payment</nav>
                        </Link>
                    ) : (
                            <nav disabled>Payment</nav>
                        )}
                </div>

                <div class="w-1/4">
                    {step4 ? (
                        <Link to='/placeorder'>
                            <nav>Place Order</nav>
                        </Link>
                    ) : (
                            <nav disabled>Place Order</nav>
                        )}
                </div>


            </nav>
        </div>
    )
}

export default Steps
