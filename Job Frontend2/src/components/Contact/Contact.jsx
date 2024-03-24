import React, { useContext, useEffect } from 'react';
import { Context } from '../../main';

const Contact = () => {
    const { SetNav } = useContext(Context);

    useEffect(() => {
        SetNav("contact");
    }, []);

    return (
        <div name="contact" className="w-full mt-10 h-screen py-2 flex flex-col justify-center bg-gradient-to-r from-blue-200 to-blue-400">
            <div className='flex flex-col justify-center items-center text-gray-800 px-12 max-w-screen-lg mx-auto h-full'>
                <div className='p-8 bg-white rounded-lg shadow-md'>
                    <p className='text-4xl font-bold text-center text-blue-600 mb-4'>Contact Us</p>
                    <p className='text-lg text-gray-700 mb-6'>Submit your query or complaint and our team will reach out to you shortly.</p>
                </div>
                <div className='flex flex-row d-fit justify-center border-3 rounded-lg py-2 md:p-10 border-gray-200 border p-8 bg-white shadow-md'>
                    <form className="flex flex-col w-fit justify-center items-start gap-6 px-4" action="https://getform.io/f/ba630b39-fbbc-4640-bcc5-96654e792c2b" method='post'>
                        <input name="text" placeholder='Enter Name' className='p-3 bg-gray-100 text-gray-800 border-2 rounded-md focus:outline-none focus:border-blue-500'></input>
                        <input name="Email" placeholder='Enter Email' className='p-3 bg-gray-100 text-gray-800 border-2 rounded-md focus:outline-none focus:border-blue-500'></input>
                        <textarea name="Content" placeholder='Enter Message' className="p-3 w-[50vw] h-[20vh] bg-gray-100 text-gray-800 rounded-lg border-2 focus:outline-none focus:border-blue-500 resize-none"></textarea>
                        <button type='submit' className='px-10 py-4 rounded bg-blue-600 text-white hover:bg-blue-700 duration-300'>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Contact;
