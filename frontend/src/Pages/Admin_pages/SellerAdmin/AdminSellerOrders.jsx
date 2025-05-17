import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SellerSideBar from '../../Componants/SellerSideBar';
import { useGetAllOrdersQuery } from '../../../redux/api/products';
import Loader from '../../../Structure/Loader';

const AdminSellerOrders = () => {
    const { data, isLoading } = useGetAllOrdersQuery();
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
                <div className='mb-5 flex justify-between items-center w-full'>
                    <span className='md:text-5xl text-2xl whitespace-nowrap'>All Orders</span>
                </div>
                <hr />
                <div className="w-full overflow-x-auto">
                    <ul className="min-w-[800px] w-full">
                        {/* Table Header */}
                        <li className="flex bg-gray-300 py-2 px-3 font-semibold text-sm md:text-base">
                            <div className="flex-[3]">Name</div>
                            <div className="flex-[6]">Address</div>
                            <div className="flex-[1] text-center">Total</div>
                            <div className="flex-[2] text-center">Contact</div>
                            <div className="flex-[1.5] text-center">Payment Status</div>
                            <div className="flex-[0.8] text-center">Status</div>
                            <div className="flex-[2.5] text-center">Created Date</div>
                        </li>
                        <hr />
                        {/* Table Body */}
                        {data && data.length > 0 ? (
                            data.map((order) => (
                                <React.Fragment key={order._id}>
                                    <li className="flex bg-gray-50 py-2 px-3 text-sm md:text-base">
                                        <Link
                                            to={`/admin/orders/${order._id}`}
                                            className="flex-[3] hover:underline text-blue-600"
                                        >
                                            {order.full_name}
                                        </Link>
                                        <div className="flex-[6] break-words">
                                            {order.delivery_address}, {order.delivery_city}, {order.delivery_state}, {order.delivery_country} - {order.pincode}
                                        </div>
                                        <div className="flex-[1] text-center">{order.total_amount}</div>
                                        <div className="flex-[2] text-center">{order.contact}</div>
                                        <div className="flex-[1.5] text-center">{order.payment_status}</div>
                                        <div className="flex-[0.8] text-center">
                                            {order.status === "active" && "🚚"}
                                            {order.status === "delivered" && "✅"}
                                            {order.status === "failed" && "❌"}
                                        </div>
                                        <div className="flex-[2.5] text-center">
                                            {new Date(order.created_date?.$date).toLocaleDateString()}{" "}
                                            {new Date(order.created_date?.$date).toLocaleTimeString()}
                                        </div>
                                    </li>
                                    <hr className="text-gray-300" />
                                </React.Fragment>
                            ))
                        ) : isLoading ? (
                            <div className='flex justify-center mt-20 items-center'>
                                <Loader />
                            </div>
                        ) : (
                            <li className="py-4 text-center text-gray-500 w-full">No Orders Added</li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default AdminSellerOrders;