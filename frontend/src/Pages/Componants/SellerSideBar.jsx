import React from 'react';
import { Link } from 'react-router-dom';

const SellerSideBar = () => {
    return (
        <div className='w-[90vw] md:w-[30vw]'>
            <div className="flex mx-4 my-6 flex-col bg-gray-200 rounded-lg overflow-hidden shadow-sm">
                <Link to={`/admin/seller`} className='bg-gray-500 py-4 text-xl text-white px-10 hover:underline'>Seller Tables</Link>
                <div className='hover:bg-gray-200 py-3 flex justify-between text-black text-lg px-10'>
                    <Link to={`/admin/seller/users`} className=' hover:underline'>users</Link>
                    <div className='flex gap-5'>
                        <Link to={`/admin/seller/users/add`} className='flex flex-row items-end hover:underline text-sm'>✚ add</Link>
                    </div>
                </div>
                <div className='hover:bg-gray-200 py-3 flex justify-between text-black text-lg px-10'>
                    <Link to={`/admin/seller/contact`} className=' hover:underline'>contact</Link>
                    <div className='flex gap-5'>
                        <Link to={`/admin/seller/contact/add`} className='flex flex-row items-end hover:underline text-sm'>✚ add</Link>
                    </div>
                </div>
                <div className='hover:bg-gray-200 py-3 flex justify-between text-black text-lg px-10'>
                    <Link to={`/admin/seller/products`} className=' hover:underline'>product</Link>
                    <div className='flex gap-5'>
                        <Link to={`/admin/seller/products/add`} className='flex flex-row items-end hover:underline text-sm'>✚ add</Link>
                    </div>
                </div>
                <div className='hover:bg-gray-200 py-3 flex justify-between text-black text-lg px-10'>
                    <Link to={`/admin/seller/orders`} className=' hover:underline'>Orders</Link>
                </div>
            </div>
        </div >
    );
}

export default SellerSideBar;