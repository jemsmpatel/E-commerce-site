import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useGetSellerAllProductsQuery, useGetSellerActiveOrdersQuery, useGetSellerSoldOrdersQuery } from '../../redux/api/products';
import { useSellerLogoutMutation } from '../../redux/api/seller';
import Loader from '../../Structure/Loader';

const SIndex = () => {
    const { sellerInfo } = useSelector((state) => state.sellerAuth);
    const { data: allProducts, isLoadingallProducts } = useGetSellerAllProductsQuery(sellerInfo?.id);
    const { data: activeOrders, isLoadingactiveOrders } = useGetSellerActiveOrdersQuery(sellerInfo?.id);
    const { data: soldOrders, isLoadingsoldOrders } = useGetSellerSoldOrdersQuery(sellerInfo?.id);
    const [datalength, setdatalength] = useState();
    const [saleslength, setsaleslength] = useState();
    const [soldlength, setsoldlength] = useState();
    const [logout, { isLogingoutLoading, LogoutError }] = useSellerLogoutMutation();

    const handleLogout = () => {
        try {
            logout();
            localStorage.removeItem('sellerInfo');
            localStorage.removeItem('sellerExpirationTime');
            localStorage.removeItem('token');
            toast.success("Logout Successfully");
        } catch (error) {
            console.log(error);
            toast.error("Logout Failed");
        }
    }

    useEffect(() => {
        if (allProducts && activeOrders && soldOrders) {
            setdatalength(allProducts.length);
            setsaleslength(activeOrders.length);
            setsoldlength(soldOrders.length);
        }
    }, [allProducts, activeOrders, soldOrders]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="bg-gray-200 flex flex-row overflow-hidden">
            {isSidebarOpen ?
                <div className='-translate-y-10 flex sm:min-h-[calc(100vh-116px)] min-h-[calc(100vh-170px)] bg-gray-200 mt-10 border-r-2 border-[#242424]'>
                    <aside className="text-white w-64 flex-shrink-0">
                        <ul className="py-5">
                            <li className="text-lg bg-gray-500 to-lime-400 rounded-full -translate-x-6">
                                <Link to='/seller' className='block p-2 ml-20 mb-5'>Dashboard</Link>
                            </li>
                            <li className="text-lg bg-gray-500 to-lime-400 rounded-full -translate-x-6">
                                <Link to='/seller/create' className='block p-2 ml-20 mb-5'>Create Product</Link>
                            </li>
                            <li className="text-lg bg-gray-500 to-lime-400 rounded-full -translate-x-6">
                                <Link to='/seller/products' className='block p-2 ml-20 mb-5'>Show All Products</Link>
                            </li>
                            <li className="text-lg bg-gray-500 to-lime-400 rounded-full -translate-x-6">
                                <Link to='/seller/orders' className='block p-2 ml-20 mb-5'>Orded Products</Link>
                            </li>
                            <li className="text-lg bg-gray-500 to-lime-400 rounded-full -translate-x-6">
                                <Link to='/seller/sold' className='block p-2 ml-20 mb-5'>Sold Products</Link>
                            </li>
                            <li className="text-lg bg-gray-500 to-lime-400 rounded-full -translate-x-6">
                                <Link to='/seller/login' onClick={() => handleLogout()} className='block p-2 ml-20 mb-5'>Logout</Link>
                            </li>
                        </ul>
                    </aside>
                </div>
                : ""
            }
            <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className='sm:min-h-[calc(100vh-116px)] min-h-[calc(100vh-170px)] bg-gray-300 text-sm p-2'
            >
                {isSidebarOpen ? "<<" : ">>"}
            </button>
            {isLoadingactiveOrders && isLoadingallProducts && isLoadingsoldOrders ?
                <div className='flex justify-center mt-20 items-center'>
                    <Loader />
                </div>
                :
                <div className='w-full'>
                    <div className="w-[100%]">
                        <div className="flex w-[100%] mb-2 mt-[20px] justify-evenly">
                            <div className="h-[100px] w-[100px] sm:h-[200px] sm:w-[200px] text-center bg-white rounded-4xl">
                                <span className="bg-gray-300 py-3 text-sm sm:text-lg px-4 rounded-3xl text-black">Products</span>
                                <div className="sm:mt-[20%] mt-[28%] flex items-center justify-center">
                                    <p className='text-4xl sm:text-6xl'>{datalength}</p>
                                </div>
                            </div>
                            <div className="h-[100px] w-[100px] sm:h-[200px] sm:w-[200px] text-center bg-white rounded-4xl">
                                <span className="bg-gray-300 py-3 text-sm sm:text-lg px-4 rounded-3xl text-black">sales</span>
                                <div className="sm:mt-[20%] mt-[28%] flex items-center justify-center">
                                    <p className='text-4xl sm:text-6xl'>{saleslength}</p>
                                </div>
                            </div>
                            <div className="h-[100px] w-[100px] sm:h-[200px] sm:w-[200px] text-center bg-white rounded-4xl">
                                <span className="bg-gray-300 py-3 text-sm sm:text-lg px-4 rounded-3xl text-black">Sold</span>
                                <div className="sm:mt-[20%] mt-[28%] flex items-center justify-center">
                                    <p className='text-4xl sm:text-6xl'>{soldlength}</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex w-[100%] gap-4 h-[200px] justify-evenly">
                            <div className="ml-5 sm:ml-1">20.2k more then usual</div>
                            <div className="">742.8 more then usual</div>
                            <div className="">20.2k more then usual</div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-5 w-full px-6 mb-36">
                        {allProducts?.length > 0 ? (
                            allProducts.map((product) => (
                                <Link
                                    key={product?._id}
                                    to={`/seller/product/${product._id}`}
                                    className="flex flex-row bg-white items-center rounded-3xl hover:shadow-md transition-shadow duration-200"
                                >
                                    <div className="w-[200px] aspect-square p-2">
                                        <img
                                            src={product.images[0]}
                                            alt={product.name}
                                            className="w-full h-full object-cover rounded-3xl"
                                        />
                                    </div>
                                    <div className="w-4/2 p-2">
                                        <p className="text-base font-medium text-gray-800">{product?.name}</p>
                                    </div>
                                    <div className="w-1/5 text-center p-2">
                                        <p className="text-sm text-gray-600">{product?.numReviews}</p>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div className='flex justify-center mt-20 items-center'>
                                <h3>Products Not Found</h3>
                            </div>
                        )}
                    </div>
                </div>
            }
        </div>
    );
}

export default SIndex;