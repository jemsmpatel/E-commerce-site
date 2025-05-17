import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CustemerSideBar from '../../Componants/CustemerSideBar';
import { useGetAllUsersQuery } from '../../../redux/api/users';
import Loader from '../../../Structure/Loader';

const CustomerUsers = () => {
    const { data, isLoading } = useGetAllUsersQuery();

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
            <div className={`w-[90vw] p-5 ${isSidebarOpen ? "hidden md:block" : ""}`}>
                <div className='mb-5 flex justify-between items-center w-full'>
                    <span className='md:text-5xl text-2xl whitespace-nowrap'>All Users</span>
                    <Link to={`/admin/home/users/add`} className='border p-2 rounded-xl md:text-lg text-md'>add new user</Link>
                </div>
                <hr />
                <div className="w-full overflow-x-auto">
                    <ul className="min-w-[700px] w-full">
                        {/* Table Header */}
                        <li className="flex bg-gray-300 py-2 px-3 font-semibold text-sm md:text-base">
                            <div className="flex-[5]">Email</div>
                            <div className="flex-[2]">Full Name</div>
                            <div className="flex-[1.5]">Contact</div>
                            <div className="flex-[1] text-center">isActive</div>
                            <div className="flex-[1] text-center">isStaff</div>
                            <div className="flex-[1] text-center">isAdmin</div>
                        </li>
                        <hr />

                        {/* Table Body */}
                        {data && data.length > 0 ? (
                            data.map((user) => (
                                <React.Fragment key={user._id}>
                                    <li className="flex bg-gray-50 py-2 px-3 text-sm md:text-base">
                                        <Link
                                            to={`/admin/home/users/${user._id}`}
                                            className="flex-[5] hover:underline text-blue-600"
                                        >
                                            {user.email}
                                        </Link>
                                        <div className="flex-[2]">{user.full_name}</div>
                                        <div className="flex-[1.5]">{user.contact}</div>
                                        <div className="flex-[1] text-center">{user.isActive ? "✅" : "❌"}</div>
                                        <div className="flex-[1] text-center">{user.isStaff ? "✅" : "❌"}</div>
                                        <div className="flex-[1] text-center">{user.isAdmin ? "✅" : "❌"}</div>
                                    </li>
                                    <hr className="text-gray-300" />
                                </React.Fragment>
                            ))
                        ) : isLoading ? (
                            <div className='flex justify-center mt-20 items-center'>
                                <Loader />
                            </div>
                        ) : (
                            <li className="py-4 text-center text-gray-500 w-full">No Users Found</li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default CustomerUsers;