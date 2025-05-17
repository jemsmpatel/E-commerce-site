import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SellerSideBar from '../../Componants/SellerSideBar';
import { useGetAllProductsQuery } from '../../../redux/api/products';
import Loader from '../../../Structure/Loader';

const SellerProduct = () => {
    const { data, isLoading } = useGetAllProductsQuery();
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
                    <span className='md:text-5xl text-2xl whitespace-nowrap'>All Products</span>
                    <Link to={`/admin/seller/products/add`} className='border p-2 rounded-xl md:text-lg text-md'>add new Product</Link>
                </div>
                <hr />
                <div className="w-full overflow-x-auto">
                    <ul className="min-w-[850px] w-full">
                        {/* Header Row */}
                        <li className="flex bg-gray-300 py-2 px-3 font-semibold text-sm md:text-base">
                            <div className="flex-[3]">Name</div>
                            <div className="flex-[4]">Category</div>
                            <div className="flex-[1.5] text-center">Price</div>
                            <div className="flex-[2] text-center">Discount Price</div>
                            <div className="flex-[1.5] text-center">Stock</div>
                            <div className="flex-[0.8] text-center">Active</div>
                            <div className="flex-[2.5] text-center">Created Date</div>
                        </li>
                        <hr />

                        {/* Data Rows */}
                        {data && data.length > 0 ? (
                            data.map((user) => (
                                <React.Fragment key={user._id}>
                                    <li className="flex bg-gray-50 py-2 px-3 text-sm md:text-base">
                                        <Link
                                            to={`/admin/seller/products/${user._id}`}
                                            className="flex-[3] hover:underline text-blue-600"
                                        >
                                            {user.name}
                                        </Link>
                                        <div className="flex-[4] break-words overflow-hidden">{user.category}</div>
                                        <div className="flex-[1.5] text-center">{user.price}</div>
                                        <div className="flex-[2] text-center">{user.discount_price}</div>
                                        <div className="flex-[1.5] text-center">{user.stock}</div>
                                        <div className="flex-[0.8] text-center">{user.isActive ? "✅" : "❌"}</div>
                                        <div className="flex-[2.5] text-center">
                                            {new Date(user.created_date?.$date).toLocaleDateString()}{" "}
                                            {new Date(user.created_date?.$date).toLocaleTimeString()}
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
                            <li className="py-4 text-center text-gray-500 w-full">No User Added</li>
                        )}
                    </ul>
                </div>

            </div>
        </div>
    );
}

export default SellerProduct;