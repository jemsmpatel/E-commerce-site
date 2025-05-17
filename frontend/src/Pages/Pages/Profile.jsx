import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, data, useLocation, useNavigate } from 'react-router-dom';
import { useLogoutMutation, useProfileQuery, useUpdateProfileMutation } from '../../redux/api/users';
import { toast } from 'react-toastify';

const Profile = () => {
    const { data, refetch } = useProfileQuery();
    const [full_name, setFull_name] = useState();
    const [contact, setContact] = useState();
    const [email, setEmail] = useState();
    const [showModal, setShowModal] = useState(false);
    const [logout, { isLogingoutLoading, LogoutError }] = useLogoutMutation();
    const [updateProfile, { isUpdatingLoading, updateError }] = useUpdateProfileMutation();

    useEffect(() => {
        if (data) {
            setFull_name(data?.full_name);
            setContact(data?.contact);
            setEmail(data?.email);
        }
    }, [data]);

    const handlelogout = () => {
        try {
            logout();
            localStorage.removeItem('userInfo');
            localStorage.removeItem('userExpirationTime');
            localStorage.removeItem('token');
            toast.success("Logout Successfully");
        } catch (error) {
            console.log(error);
            toast.error("Logout Failed");
        }
    }

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await updateProfile({
                full_name,
                contact,
                email
            }).unwrap();
            console.log(response);
            localStorage.setItem('userInfo', JSON.stringify(response));
            refetch();
            toast.success("Profile Updated successfully");
        } catch (error) {
            console.error(error);
            toast.error("Profile Updatting Failed");
        }
        closeModal();
    };
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex flex-row sm:flex-row sm:min-h-[calc(100vh-116px)] min-h-[calc(100vh-170px)] bg-gray-50 overflow-hidden">
            {/* Sidebar */}
            {isSidebarOpen ?
                <div className="sm:min-h-[calc(100vh-116px)] min-h-[calc(100vh-170px)] bg-gray-100 flex-shrink-0 w-[75vw] sm:w-80 border-r border-gray-300">
                    <div className="bg-gray-500 py-4 text-xl text-white text-center">Profile</div>
                    <div className="px-6 hover:bg-gray-200 flex justify-center text-black text-lg">
                        <Link to="/profile/orders" className="hover:underline py-3 px-7 whitespace-nowrap">Orders</Link>
                    </div>
                    <div className="px-6 hover:bg-gray-200 flex justify-center text-black text-lg">
                        <Link to="/reviews" className="hover:underline py-3 px-7 whitespace-nowrap">Show All Reviews</Link>
                    </div>
                    <div className="px-6 hover:bg-gray-200 flex justify-center text-black text-lg">
                        <Link to="/seller" className="hover:underline py-3 px-7 whitespace-nowrap">Sell On Shoop Mart</Link>
                    </div>
                    <div className="px-6 hover:bg-gray-200 flex justify-center text-black text-lg">
                        <Link to="#" className="hover:underline py-3 px-7 whitespace-nowrap">Questions & Answers</Link>
                    </div>
                    <div className="px-6 hover:bg-gray-200 flex justify-center text-black text-lg">
                        <Link to="/termspolicies" className="hover:underline py-3 px-7 whitespace-nowrap">Terms, Policies And Licenses</Link>
                    </div>
                    <div className="px-6 hover:bg-gray-200 flex justify-center text-black text-lg">
                        <Link to="/login" onClick={() => handlelogout()} className="hover:underline py-3 px-7 whitespace-nowrap">{isLogingoutLoading ? "Logout..." : "Logout"}</Link>
                    </div>
                </div> :
                ""
            }
            <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className='sm:min-h-[calc(100vh-116px)] min-h-[calc(100vh-170px)] bg-gray-300 text-sm p-2'
            >
                {isSidebarOpen ? "<<" : ">>"}
            </button>

            {/* Main content */}
            <div className="flex-1 flex justify-center items-center p-6">
                <div className="bg-white rounded-2xl shadow-lg max-w-md w-full">
                    {/* Header */}
                    <div className="text-center bg-gradient-to-r from-gray-500 to-gray-700 text-white rounded-t-2xl py-6">
                        <img
                            src="data:image/jpeg;base64,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"
                            alt="Profile"
                            className="w-24 h-24 mx-auto rounded-full bg-white p-1"
                        />
                        <h4 className="mt-4 text-xl font-semibold">
                            {full_name || "User Name"}
                        </h4>
                    </div>

                    {/* Info */}
                    <div className="p-6 space-y-4 text-gray-700 text-lg">
                        <div className="flex items-center gap-3">
                            <i className="bi bi-person" />
                            {full_name || "User Name"}
                        </div>
                        <hr />
                        <div className="flex items-center gap-3">
                            <i className="bi bi-phone" />
                            {contact || "81812 34567"}
                        </div>
                        <hr />
                        <div className="flex items-center gap-3">
                            <i className="bi bi-envelope" />
                            {email || "info@aplusdesign.co"}
                        </div>
                    </div>

                    {/* Button */}
                    <div className="px-6 pb-6">
                        <button onClick={() => openModal()} className="w-full bg-gradient-to-r from-gray-500 to-gray-700 text-white rounded-full py-2 text-lg hover:opacity-90 transition">
                            Edit Profile
                        </button>
                    </div>
                </div>
            </div>
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                    <div className="bg-white rounded-xl shadow-lg p-6 w-[90%] max-w-md overflow-y-auto max-h-[90vh] scrollbar-hide relative">
                        <button
                            onClick={closeModal}
                            className="absolute top-2 w-10 h-10 right-2 text-gray-500 hover:text-red-600 cursor-pointer"
                        >
                            ✕
                        </button>
                        <div className='flex justify-center'><h2 className="text-2xl font-semibold mb-4">Update Order</h2></div>
                        <form
                            onSubmit={handleFormSubmit}
                        >
                            <div className="relative mb-4">
                                <input type="text" name="fname" value={full_name} onChange={(e) => setFull_name(e.target.value)} required minLength="3" maxLength="40" placeholder="" className="peer block w-full rounded-md border border-gray-300 bg-white px-3 pt-5 pb-2 text-black-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                                <label className="absolute left-3 top-1 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-sm">Full Name</label>
                            </div>
                            <div className="relative mb-4">
                                <input type="text" name="contact" value={contact} onChange={(e) => setContact(e.target.value)} required minLength="3" maxLength="40" placeholder="" className="peer block w-full rounded-md border border-gray-300 bg-white px-3 pt-5 pb-2 text-black-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                                <label className="absolute left-3 top-1 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-sm">Contact</label>
                            </div>
                            <div className="relative mb-4">
                                <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required minLength="7" maxLength="340" placeholder="" className="peer block w-full rounded-md border border-gray-300 bg-white px-3 pt-5 pb-2 text-black-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                                <label className="absolute left-3 top-1 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-sm">Email</label>
                            </div>
                            <div className="flex justify-center">
                                <button
                                    type="submit"
                                    className="cursor-pointer bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                                >
                                    {isUpdatingLoading ? "Updatting" : "Update"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Profile;