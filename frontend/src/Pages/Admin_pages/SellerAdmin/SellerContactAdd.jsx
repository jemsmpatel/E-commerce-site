import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useSellerCreateContactMutation } from "../../../redux/api/seller";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import SellerSideBar from '../../Componants/SellerSideBar';

const SellerContactAdd = () => {
    const [email, setEmail] = useState('');
    const [full_name, setFullName] = useState('');
    const [contact, setContact] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [contactmu, { isLoading }] = useSellerCreateContactMutation();
    const navigate = useNavigate();
    const { userInfo } = useSelector((state) => state.userAuth);

    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/admin/seller/contact';

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
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className='flex mb-[100px]'>
            {isSidebarOpen ?
                <SellerSideBar />
                :
                ""
            }
            <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className='w-[10vw] md:w-[3vw] sm:min-h-[calc(100vh-116px)] min-h-[calc(100vh-170px)] bg-gray-300 text-sm p-2'
            >
                {isSidebarOpen ? "<<" : ">>"}
            </button>
            <div className={`w-[90vw] p-5 ${isSidebarOpen ? "hidden md:block" : ""}`}>
                <h2 className='text-4xl mb-5 ml-10'>Add Contact</h2>
                <div className='mx-6'>
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
                        <button type="submit" className="w-[70%] ml-[15%] bg-blue-600 text-white py-2 mt-3 rounded-md text-lg">{isLoading ? "Creatting..." : "Create"}</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SellerContactAdd;