import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useGetContactQuery, useUpdateContactMutation, useDeleteContactMutation } from '../../../redux/api/users';
import { Link, useLocation, useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import CustemerSideBar from '../../Componants/CustemerSideBar';
import Loader from '../../../Structure/Loader';

const CustemerContactsUpdate = () => {
    const { id } = useParams();
    const { data, isLoading } = useGetContactQuery(id);
    const [email, setEmail] = useState('');
    const [contact, setContact] = useState('');
    const [full_name, setFullName] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');


    const [updateuser, { isUpdatingLoading, updateError }] = useUpdateContactMutation();
    const [deleteuser, { isDeletingLoading, deleteError }] = useDeleteContactMutation();
    const navigate = useNavigate();
    var updatedData = {};

    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/admin/home/contact/';

    useEffect(() => {
        if (data) {
            setEmail(data?.email);
            setFullName(data?.full_name);
            setContact(data?.contact);
            setSubject(data?.subject);
            setMessage(data?.message);
        }
    }, [data]);

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        try {

            if (data?.full_name != full_name) {
                updatedData.full_name = full_name;
            }
            if (data?.email != email) {
                updatedData.email = email;
            }
            if (data?.contact != contact) {
                updatedData.contact = contact;
            }
            if (data?.subject != subject) {
                updatedData.subject = subject;
            }
            if (data?.message != message) {
                updatedData.message = message;
            }
            try {
                const response = await updateuser({
                    id: id,
                    data: updatedData,
                }).unwrap();
                navigate(redirect);
                toast.success("Contact successfully Updated.");
            } catch (error) {
                console.error("Updation error:", error);
                const message =
                    err?.data?.error || err?.data?.message || "Updation failed. Please try again.";
                toast.error(message);
            }

        } catch (err) {
            console.error("Updation error:", err);
            const message =
                err?.data?.error || err?.data?.message || "Updation failed. Please try again.";
            toast.error(message);
        }
    };

    const handleDeleteSubmit = async (e) => {
        try {
            const response = await deleteuser(id).unwrap();
            navigate(redirect);
            toast.success("Contact successfully Deleted.");
        } catch (error) {
            console.error("Delition error:", err);
            const message =
                err?.data?.error || err?.data?.message || "Delition failed. Please try again.";
            toast.error(message);
        }
    };

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className='flex mb-[100px]'>
            {isSidebarOpen ?
                <CustemerSideBar />
                :
                ""
            }
            <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className='w-[10vw] md:w-[3vw] sm:min-h-[calc(100vh-116px)] min-h-[calc(100vh-170px)] bg-gray-300 text-sm p-2'
            >
                {isSidebarOpen ? "<<" : ">>"}
            </button>
            {data ?
                <div className={`w-[90vw] p-5 ${isSidebarOpen ? "hidden md:block" : ""}`}>
                    <h2 className='text-4xl mb-5 ml-7'>Change Contact</h2>
                    <h2 className='text-2xl mb-5 ml-9 normal-case break-words'>{data?.email}</h2>
                    <div className='mx-6'>
                        <form className="space-y-4">
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
                            <div className="mb-4">
                                <button type="button" onClick={handleUpdateSubmit} className="w-[40%] bg-blue-600 text-white py-2 mt-3 mr-[20%] rounded-md text-lg">{isUpdatingLoading ? "Updatting..." : "Update"}</button>
                                <button type="button" onClick={handleDeleteSubmit} className="w-[40%] bg-blue-600 text-white py-2 mt-3 rounded-md text-lg">{isDeletingLoading ? "Deletting..." : "Delete"}</button>
                            </div>
                        </form>
                    </div>
                </div> :
                isLoading ?
                    <div className='flex justify-center mt-20 items-center'>
                        <Loader />
                    </div>
                    :
                    <div className='ml-98'>No User Info Founded</div>
            }
        </div>
    );
}

export default CustemerContactsUpdate;