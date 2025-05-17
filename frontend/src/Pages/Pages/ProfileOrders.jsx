import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useGetUserAllOrdersQuery } from '../../redux/api/products';
import Loader from '../../Structure/Loader';

const ProfileOrders = () => {
    const { userInfo } = useSelector((state) => state.userAuth);
    const { data: order_list, isLoading, isError } = useGetUserAllOrdersQuery(userInfo?.id);
    const [orders, setOrders] = useState();
    useEffect(() => {
        if (order_list) {
            setOrders(order_list);
            console.log("Orders Loaded:", order_list);
        }
    }, [order_list]);

    return (
        <div className="min-h-screen p-4 bg-gray-50">
            <h1 className="text-2xl font-semibold mb-6 text-center">My Orders</h1>

            <div className="grid gap-4 max-w-4xl mx-auto">
                {!orders ? (
                    <div className='flex justify-center items-center'>
                        <Loader />
                    </div>
                ) : orders.length === 0 ? (
                    <p className="text-center text-gray-500">No orders found.</p>
                ) : (
                    orders.map((order) => (
                        <Link
                            key={order._id}
                            to={`/profile/orders/${order._id}`}
                            className={`cursor-pointer p-4 shadow-md rounded-xl border hover:shadow-lg transition
                             ${order.status === "active" ? "bg-green-300" : ""}
                             ${order.status === "delivered" ? "bg-blue-300" : ""}
                             ${order.status === "failed" ? "bg-red-300" : ""}`}
                        >
                            <div className="flex justify-between items-center">
                                <div>
                                    <h2 className="text-lg font-bold">Order Name: {order?.full_name}</h2>
                                    <div>Products{order.products.map((i) => `${i.name} : ${i.qty}, `)}</div>
                                    <p className="text-sm text-gray-500">
                                        Date: {new Date(order.created_date.$date).toLocaleDateString()}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="font-semibold text-indigo-600">₹{order.total_amount}</p>
                                    <span
                                        className={`text-sm px-2 py-1 rounded-full ${order.payment_status === "Paid"
                                            ? "bg-green-100 text-green-700"
                                            : "bg-yellow-100 text-yellow-700"
                                            }`}
                                    >
                                        {order.payment_status}
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))
                )}
            </div>
        </div>
    )
}

export default ProfileOrders;