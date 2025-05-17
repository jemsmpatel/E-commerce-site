import React from 'react';
import contactimage from "../../assets/contact us1.webp";
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useCreateContactMutation } from '../../redux/api/users';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const ContactUs = () => {

    const [email, setEmail] = useState('');
    const [full_name, setFullName] = useState('');
    const [contact, setContact] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [contactmu, { isLoading }] = useCreateContactMutation();
    const navigate = useNavigate();
    const { userInfo } = useSelector((state) => state.userAuth);

    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/';

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await contactmu({ "user_id": userInfo?._id, full_name, email, contact, subject, message }).unwrap()
            navigate(redirect);
            toast.success("Contact Created successfully.");
        } catch (err) {
            console.error('Contact failed:', err);
            toast.error("Contact Creation Failed.");
        }
    };


    return (
        <div className="w-full bg-gray-100">
            <img
                className="w-full h-auto object-cover"
                src="https://salamaradiator.com/wp-content/uploads/2023/12/contactussalama.jpg"
                alt="Contact Us"
            />
            <div className="container mx-auto max-w-screen-xl px-4 py-5">
                <div className="flex flex-col lg:flex-row items-center gap-10 py-5">
                    {/* Image Section */}
                    <div className="lg:w-1/2 text-center lg:text-left lg:ml-[50px] lg:pl-5">
                        <img src={contactimage} alt="Contact Us" className=" lg:h-[315px] lg:w-[398px] h-[30vh] w-[60vw]" />
                    </div>

                    {/* Form Section */}
                    <div className="lg:w-1/3 w-full bg-gray-100 shadow-[0_1rem_3rem_rgba(0,0,0,0.175)] rounded-3xl p-[48px]">
                        <h2 className="text-4xl my-[25px] font-semibold">Contact Us</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="relative mb-4">
                                <input type="text" id="fname" value={full_name} onChange={(e) => setFullName(e.target.value)} placeholder="" required className="peer block w-full rounded-md border border-gray-300 bg-white px-3 pt-5 pb-2 text-black-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                                <label htmlFor="fname" className="absolute left-3 top-1 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-sm" > Full Name </label>
                            </div>
                            <div className="relative mb-4">
                                <input type="email" id="Email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" placeholder="" required className="peer block w-full rounded-md border border-gray-300 bg-white px-3 pt-5 pb-2 text-black-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                                <label htmlFor="Email" className="absolute left-3 top-1 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-sm" > Email address </label>
                            </div>
                            <div className="relative mb-4">
                                <input type="text" id="phone" value={contact} onChange={(e) => setContact(e.target.value)} maxLength={10} placeholder="" required className="peer block w-full rounded-md border border-gray-300 bg-white px-3 pt-5 pb-2 text-black-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                                <label htmlFor="phone" className="absolute left-3 top-1 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-sm" > phone </label>
                            </div>
                            <div className="relative mb-4">
                                <input type="text" id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="" required className="peer block w-full rounded-md border border-gray-300 bg-white px-3 pt-5 pb-2 text-black-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                                <label htmlFor="subject" className="absolute left-3 top-1 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-sm" > subject </label>
                            </div>
                            <div className="relative mb-4">
                                <textarea type="text" id="Message" value={message} onChange={(e) => setMessage(e.target.value)} rows="6" placeholder="" required className="peer block w-full rounded-md border border-gray-300 bg-white px-3 pt-5 pb-2 text-black-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none" ></textarea>
                                <label htmlFor="Message" className="absolute left-3 top-1 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-sm" > Message </label>
                            </div>
                            <button type="submit" className="w-full bg-blue-600 text-white py-2 mt-3 rounded-md text-lg">{isLoading ? "Submitting..." : "Submit"}</button>
                        </form>
                        <hr className="my-4 border-gray-400" />
                        <h6 className="text-gray-600 text-center pb-4 font-semibold">
                            Contact us using this application form. You will receive a call from the help center within 24 hours.
                        </h6>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContactUs;