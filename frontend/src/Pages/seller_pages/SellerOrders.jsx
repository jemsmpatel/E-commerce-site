import React from 'react';
import { useSelector } from 'react-redux';
import { useGetSellerActiveOrdersQuery } from '../../redux/api/products';
import Loader from '../../Structure/Loader';

const SellerOrders = () => {
    const { sellerInfo } = useSelector((state) => state.sellerAuth);
    const { data, isLoading } = useGetSellerActiveOrdersQuery(sellerInfo?.id);

    return (
        <div className="bg-gray-100 p-6">
            <h1 className="text-3xl font-bold mb-8 text-center">Our All Products</h1>
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1">
                {data ? (
                    data.map((order) => (
                        <div className="min-h-screen bg-gray-100 py-8 px-4">
                            <div className="max-w-5xl mx-auto">
                                <div className="bg-white shadow-md rounded-2xl p-6 w-full">
                                    <h2 className="text-2xl font-bold mb-4">Order Details</h2>

                                    {/* Customer & Delivery Info */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                        <div>
                                            <p><span className="font-semibold">Customer:</span> {order.full_name}</p>
                                            <p><span className="font-semibold">Contact:</span> {order.contact}</p>
                                            <p><span className="font-semibold">Address:</span> {order.delivery_address}, {order.delivery_city}, {order.delivery_state}, {order.delivery_country} - {order.pincode}</p>
                                        </div>
                                        <div>
                                            <p><span className="font-semibold">Order Status:</span> {order.order_status}</p>
                                            <p><span className="font-semibold">Payment Status:</span> {order.payment_status}</p>
                                            <p><span className="font-semibold">Estimated Delivery:</span> {order.estimated_delivery_date}</p>
                                        </div>
                                    </div>

                                    {/* Products */}
                                    <div className="mb-4">
                                        <h3 className="text-xl font-semibold mb-2">Products</h3>
                                        <div className="space-y-3">
                                            {order.products.map((product, index) => (
                                                <div key={index} className="border p-4 rounded-xl bg-gray-50 shadow-sm">
                                                    <p><span className="font-semibold">Product Name:</span> {product.name}</p>
                                                    <p><span className="font-semibold">Qty:</span> {product.qty}</p>
                                                    <p><span className="font-semibold">Price:</span> ₹{product.price}</p>
                                                    <p><span className="font-semibold">Tax:</span> ₹{product.tax}</p>
                                                    <p><span className="font-semibold">Subtotal:</span> ₹{product.subtotal}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Summary */}
                                    <div className="pt-4 border-t mt-6 text-right">
                                        <p className="text-lg font-bold"><span>Total Amount:</span> ₹{order.products.reduce((total, product) => total + parseFloat(product.subtotal), 0)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : isLoading ? (
                    <div className='flex justify-center mt-20 items-center'>
                        <Loader />
                    </div>
                ) : (
                    <div>Empty</div>
                )}

            </div>
        </div >
    );
}

export default SellerOrders;