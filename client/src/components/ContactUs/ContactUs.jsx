import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Component } from 'react';

// function ContactUs({ name, email, comment }) {
    
  
//     useEffect(() => {
//       emailReceived() 
//     }, [])
  
//     const emailReceived = () => {
//         axios.post('http://localhost:3001/contacts/send-email')
//         .then((res) => res.json())
//         .catch((err) => console.log('error'))
//     }

//     const handleSubmit = (event) => {
//         event.preventDefault()
//         emailReceived() 
//       }

 
class ContactUs extends Component {
    name = React.createRef();
    email = React.createRef();
    comment = React.createRef();

    state = {
        name: '',
        email: '',
        comment: ''
            }

    comprobarCambios = () => {
        var name = this.name.current.value;
        var email = this.email.current.value;
        var comment = this.comment.current.value;
            this.setState({
                name:name,
                email: email,
                comment: comment
            })
    }

    constructor() {
        super();
        this.enviarEmail = this.enviarEmail.bind(this);
        }
    
        async enviarEmail(e) {
            e.preventDefault();
            const { name, email, comment } = this.state;
            const form = await axios.post('/contacts/send-email', {
            name,
            email,
            comment
            
        });
        }
        



render() {
return(
    
    //const ContactUs = () => (
        <div className="flex justify-center">
        
        <form onSubmit={this.enviarEmail}
        //action="/contacts/send-email" method="POST" 
        class="flex w-full max-w-sm space-x-3 justify-center">
            <div class="w-full max-w-2xl px-5 py-10 m-auto mt-10 bg-white rounded-lg shadow dark:bg-gray-800">
                <div class="mb-6 text-3xl font-light text-center text-gray-800 dark:text-white">
                    Contact us !
                </div>
                <div class="grid max-w-xl grid-cols-2 gap-4 m-auto">
                    <div class="col-span-2 lg:col-span-1">
                        <div class=" relative ">
                            <input type="text" id="contact-form-name" name="name" onChange={this.comprobarCambios} ref={this.name} class=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Name"/>
                            </div>
                        </div>
                        <div class="col-span-2 lg:col-span-1">
                            <div class=" relative ">
                                <input type="text" id="contact-form-email" name="email" onChange={this.comprobarCambios} ref={this.email} class=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="email"/>
                                </div>
                            </div>
                            <div class="col-span-2">
                                <label class="text-gray-700" for="name">
                                    <textarea name="comment" onChange={this.comprobarCambios} ref={this.comment} class="flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" id="comment" placeholder="Enter your comment" name="comment" rows="5" cols="40">
                                    </textarea>
                                </label>
                            </div>
                            <div class="col-span-2 text-right">
                                <button type="submit" class="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                                    Send
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
)
    
}
}
    //}

    export default ContactUs;

//export default ContactUs;
