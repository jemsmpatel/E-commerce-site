import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import {
    useGetSpecificOrderQuery,
    useUpdateOrderMutation,
    useDeleteOrderMutation,
    useCreateReviewMutation,
} from "../../redux/api/products";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Loader from '../../Structure/Loader';

const ProductOrderDetails = () => {
    const { id } = useParams();
    const { userInfo } = useSelector((state) => state.userAuth);
    const { data: order, isLoading, refetch } = useGetSpecificOrderQuery(id);
    const [showModal, setShowModal] = useState(false);
    const [full_name, setFullName] = useState();
    const [contact, setContact] = useState();
    const [delivery_address, setDelivery_address] = useState();
    const [delivery_country, setDelivery_country] = useState();
    const [delivery_state, setDelivery_state] = useState();
    const [delivery_city, setDelivery_city] = useState();
    const [pincode, setPincode] = useState();
    const [rating, setRating] = useState("");
    const [comment, setComment] = useState("");
    const [activeReviewProductId, setActiveReviewProductId] = useState(null);
    const [updateOrder, { isUpdatingLoading, updateError }] = useUpdateOrderMutation();
    const [CancleOrder, { isCancleLoading, cancleOrderError }] = useDeleteOrderMutation();
    const [CreateReview, { isCreatingLoading, creatingreviewError }] = useCreateReviewMutation();

    useEffect(() => {
        if (order) {
            setFullName(order?.full_name);
            setContact(order?.contact);
            setDelivery_address(order?.delivery_address);
            setDelivery_country(order?.delivery_country);
            setDelivery_state(order?.delivery_state);
            setDelivery_city(order?.delivery_city);
            setPincode(order?.pincode);
        }
    }, [order]);

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await updateOrder({
                id,
                data: {
                    full_name,
                    contact,
                    delivery_address,
                    delivery_country,
                    delivery_state,
                    delivery_city,
                    pincode
                }
            }).unwrap();
            refetch();
            toast.success("Order Updated successfully");
        } catch (error) {
            console.error(error);
            toast.error("Order Updatting Failed");
        }
        closeModal();
    };

    const handleCancelOrderSubmit = async () => {
        try {
            CancleOrder(id);
            refetch();
            toast.success("Order Canceled");
        } catch (error) {
            console.error(error);
            toast.error("Order Cancelation Failed");
        }
    };

    const handleCreateReview = async (e, id) => {
        e.preventDefault();
        try {
            const response = await CreateReview({
                "product_id": id,
                "user": userInfo?.id,
                "name": userInfo?.full_name,
                "rating": rating,
                "comment": comment
            }).unwrap();
            refetch();
            toast.success("Review Added successfully");
        } catch (error) {
            console.error(error);
            toast.error(error.data.error || "Review Adding Failed");
        }
    };

    // if (!order) return <p className="text-center mt-10 text-red-600">Order not found</p>;

    return (
        isLoading ?
            <div className='flex justify-center mt-20 items-center'>
                <Loader />
            </div>
            :
            <div className="max-w-4xl mx-auto p-6 bg-white shadow-[0_1rem_3rem_rgba(0,0,0,0.175)] rounded-xl my-8">
                <h2 className="text-2xl font-bold mb-4">Order : {id}</h2>
                <div className="mb-4 text-gray-700 space-y-2">
                    <p><strong>Name:</strong> {order.full_name}</p>
                    <p><strong>Contact:</strong> {order.contact}</p>
                    <p><strong>Address:</strong> {order.delivery_address}, {order.delivery_city}, {order.delivery_state}, {order.delivery_country}, {order.pincode}</p>
                    <p><strong>Estimated Delivery:</strong> {order.estimated_delivery_date}</p>
                    <p><strong>Status:</strong> {order.status}</p>
                </div>
                <div className="border-t pt-4 mt-4">
                    <h3 className="text-xl font-semibold mb-2">Products</h3>
                    <ul className="space-y-2">
                        {order.products.map((product, idx) => (
                            <li key={idx} className="border p-3 rounded-md">
                                <Link to={`/product/${product.product_id}`}>
                                    <p><strong>{product.name}</strong></p>
                                    <p>Qty: {product.qty}</p>
                                    <p>Price: ₹{product.price}</p>
                                    <p>Tax: ₹{product.tax}</p>
                                    <p className="font-semibold">Subtotal: ₹{product.subtotal}</p>
                                </Link>
                                {order.status === "delivered" && (
                                    <>
                                        {activeReviewProductId !== product.product_id ? (
                                            <button
                                                onClick={() => setActiveReviewProductId(product.product_id)}
                                                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                            >
                                                Review
                                            </button>
                                        ) : (
                                            <form
                                                onSubmit={(e) => {
                                                    handleCreateReview(e, product.product_id);
                                                    setActiveReviewProductId(null); // Optional: close after submit
                                                }}
                                                className="flex flex-col md:flex-row md:items-end gap-4 w-full flex-wrap mt-4"
                                            >
                                                <div className="relative w-full md:w-1/4">
                                                    <input
                                                        type="number"
                                                        step="0.1"
                                                        name="rating"
                                                        value={rating}
                                                        onChange={(e) => setRating(e.target.value)}
                                                        required
                                                        max={5}
                                                        min={1}
                                                        placeholder=""
                                                        className="peer block w-full rounded-md border border-gray-300 bg-white px-3 pt-5 pb-2 text-black-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                                    />
                                                    <label className="absolute left-3 top-1 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-sm">
                                                        Rating (1-5)
                                                    </label>
                                                </div>
                                                <div className="relative w-full md:w-1/2">
                                                    <input
                                                        type="text"
                                                        name="comment"
                                                        value={comment}
                                                        onChange={(e) => setComment(e.target.value)}
                                                        required
                                                        minLength="3"
                                                        maxLength="100"
                                                        placeholder=""
                                                        className="peer block w-full rounded-md border border-gray-300 bg-white px-3 pt-5 pb-2 text-black-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                                    />
                                                    <label className="absolute left-3 top-1 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-sm">
                                                        Comment
                                                    </label>
                                                </div>
                                                <div className="flex items-end">
                                                    <button
                                                        type="submit"
                                                        className="bg-green-500 py-3 px-6 rounded-xl text-lg text-white hover:bg-green-600 transition"
                                                    >
                                                        Submit
                                                    </button>
                                                </div>
                                            </form>
                                        )}
                                    </>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-6 gap-4">
                    <div className="flex flex-col items-start">
                        <p className="text-lg font-bold">Shipping Charges: ₹{order.shipping_charges}</p>
                        <p className="text-xl font-bold text-indigo-600">Total: ₹{order.total_amount}</p>
                    </div>
                    <div className="flex gap-4">
                        <button
                            onClick={() => openModal()}
                            className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            {isUpdatingLoading ? "Update..." : "Update"}
                        </button>
                        <button
                            onClick={() => handleCancelOrderSubmit()}
                            className="cursor-pointer bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                        >
                            {isCancleLoading ? "Cancel..." : "Cancel"}
                        </button>
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
                                    <input type="text" name="fname" value={full_name} onChange={(e) => setFullName(e.target.value)} required minLength="3" maxLength="40" placeholder="" className="peer block w-full rounded-md border border-gray-300 bg-white px-3 pt-5 pb-2 text-black-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                                    <label className="absolute left-3 top-1 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-sm">Full Name</label>
                                </div>
                                <div className="relative mb-4">
                                    <input type="text" name="contact" value={contact} onChange={(e) => setContact(e.target.value)} required minLength="3" maxLength="40" placeholder="" className="peer block w-full rounded-md border border-gray-300 bg-white px-3 pt-5 pb-2 text-black-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                                    <label className="absolute left-3 top-1 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-sm">Contact</label>
                                </div>
                                <div className="relative mb-4">
                                    <input type="text" name="delivery_address" value={delivery_address} onChange={(e) => setDelivery_address(e.target.value)} required minLength="3" maxLength="40" placeholder="" className="peer block w-full rounded-md border border-gray-300 bg-white px-3 pt-5 pb-2 text-black-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                                    <label className="absolute left-3 top-1 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-sm">Delivery Address</label>
                                </div>
                                <div className="relative mb-4">
                                    <input type="text" name="delivery_country" value={delivery_country} onChange={(e) => setDelivery_country(e.target.value)} required minLength="3" maxLength="40" placeholder="" className="peer block w-full rounded-md border border-gray-300 bg-white px-3 pt-5 pb-2 text-black-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                                    <label className="absolute left-3 top-1 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-sm">Delivery Country</label>
                                </div>
                                <div className="relative mb-4">
                                    <input type="text" name="delivery_state" value={delivery_state} onChange={(e) => setDelivery_state(e.target.value)} required minLength="3" maxLength="40" placeholder="" className="peer block w-full rounded-md border border-gray-300 bg-white px-3 pt-5 pb-2 text-black-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                                    <label className="absolute left-3 top-1 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-sm">Delivery State</label>
                                </div>
                                <div className="relative mb-4">
                                    <input type="text" name="delivery_city" value={delivery_city} onChange={(e) => setDelivery_city(e.target.value)} required minLength="3" maxLength="40" placeholder="" className="peer block w-full rounded-md border border-gray-300 bg-white px-3 pt-5 pb-2 text-black-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                                    <label className="absolute left-3 top-1 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-sm">Delivery City</label>
                                </div>
                                <div className="relative mb-4">
                                    <input type="text" name="pincode" value={pincode} onChange={(e) => setPincode(e.target.value)} required minLength="3" maxLength="40" placeholder="" className="peer block w-full rounded-md border border-gray-300 bg-white px-3 pt-5 pb-2 text-black-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                                    <label className="absolute left-3 top-1 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-sm">Pincode</label>
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

export default ProductOrderDetails;