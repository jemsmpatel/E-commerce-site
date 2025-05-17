import { useState, useEffect } from 'react';
import CustemerSideBar from '../../Componants/CustemerSideBar';
import {
    useGetSpecificuserQuery,
    useUpdateSpecificUserMutation,
    useDeleteSpecificUserMutation,
} from '../../../redux/api/users';
import { Link, useLocation, useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../../../Structure/Loader';

const CustomerUsersUpdate = () => {
    const { id } = useParams();
    const { data, isLoading } = useGetSpecificuserQuery(id);
    const [email, setEmail] = useState('');
    const [contact, setContact] = useState('');
    const [full_name, setFullName] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [isStaff, setIsStaff] = useState(false);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        if (data) {
            setEmail(data?.email);
            setFullName(data?.full_name);
            setContact(data?.contact);
            setIsAdmin(data?.isAdmin);
            setIsStaff(data?.isStaff);
            setIsActive(data?.isActive);
        }
    }, [data]);



    const [updateuser, { isUpdatingLoading, updateError }] = useUpdateSpecificUserMutation();
    const [deleteuser, { isDeletingLoading, deleteError }] = useDeleteSpecificUserMutation();
    const navigate = useNavigate();
    var updatedData = {};

    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/admin/home/users/';

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
            if (data?.isAdmin != isAdmin) {
                updatedData.isAdmin = isAdmin;
            }
            if (data?.isStaff != isStaff) {
                updatedData.isStaff = isStaff;
            }
            if (data?.isActive != isActive) {
                updatedData.isActive = isActive;
            }
            try {
                const response = await updateuser({
                    id: id,
                    data: updatedData,
                }).unwrap();

                navigate(redirect);
                toast.success("User successfully Updated.");
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
            toast.success("User successfully Deleted.");
        } catch (error) {
            console.error("Delition error:", err);
            const message =
                err?.data?.error || err?.data?.message || "Delition failed. Please try again.";
            toast.error(message);
        }
    };

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    return (
        <div className='flex'>
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
                    <h2 className='text-4xl mb-5'>Change User</h2>
                    <h2 className='text-2xl mb-5 normal-case break-words'>{data?.email}</h2>
                    <div className='ml-4'>
                        <form>
                            <div className="relative mb-4">
                                <input type="text" name="fname" value={full_name} onChange={(e) => setFullName(e.target.value)} required minLength="3" maxLength="40" placeholder="" className="peer block w-full rounded-md border border-gray-300 bg-white px-3 pt-5 pb-2 text-black-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                                <label className="absolute left-3 top-1 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-sm">Full Name</label>
                            </div>
                            <div className="relative mb-4">
                                <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required minLength="7" maxLength="320" placeholder="" className="peer block w-full rounded-md border border-gray-300 bg-white px-3 pt-5 pb-2 text-black-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                                <label className="absolute left-3 top-1 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-sm">Email</label>
                            </div>
                            <div className="relative mb-4">
                                <input type="text" name="contact" value={contact} onChange={(e) => setContact(e.target.value)} required minLength="10" maxLength="10" placeholder="" className="peer block w-full rounded-md border border-gray-300 bg-white px-3 pt-5 pb-2 text-black-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                                <label className="absolute left-3 top-1 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-sm">Contact</label>
                            </div>
                            <div className='mb-4'>
                                <input type="checkbox" id="isActive" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} />
                                <label htmlFor="isActive" className='ml-3'>isActive</label>
                            </div>
                            <div className='mb-4'>
                                <input type="checkbox" id="isStaff" checked={isStaff} onChange={(e) => setIsStaff(e.target.checked)} />
                                <label htmlFor="isStaff" className='ml-3'>isStaff</label>
                            </div>
                            <div className='mb-4'>
                                <input type="checkbox" id="isAdmin" checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)} />
                                <label htmlFor="isAdmin" className='ml-3'>isAdmin</label>
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

export default CustomerUsersUpdate;