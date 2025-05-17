import React from 'react';
import { Link } from 'react-router-dom';

const ADMINIndex = () => {
    return (
        <div className='container mx-auto px-4 py-6'>
            <div className="flex flex-col bg-gray-200 rounded-lg overflow-hidden">
                <Link to={`/admin/home`} className='bg-gray-500 py-4 text-xl text-white px-10 hover:underline'>User Tables</Link>
                <div className='hover:bg-gray-200 py-3 flex justify-between text-lg px-10'>
                    <Link to={`/admin/home/users`} className=' hover:underline'>users</Link>
                    <div className='flex gap-5'>
                        <Link to={`/admin/home/users/add`} className='flex flex-row items-end hover:underline'>✚ add</Link>
                        <Link to={`/admin/home/users`} className='flex flex-row items-end hover:underline'>🖊 change</Link>
                    </div>
                </div>
                <div className='hover:bg-gray-200 py-3 flex justify-between text-lg px-10'>
                    <Link to={`/admin/home/contact`} className=' hover:underline'>contact</Link>
                    <div className='flex gap-5'>
                        <Link to={`/admin/home/contact/add`} className='flex flex-row items-end hover:underline'>✚ add</Link>
                        <Link to={`/admin/home/contact`} className='flex flex-row items-end hover:underline'>🖊 change</Link>
                    </div>
                </div>
            </div>
            <div className="flex flex-col bg-gray-200 rounded-lg overflow-hidden mt-6">
                <Link to={`/admin/seller`} className='bg-gray-500 py-4 text-xl text-white px-10 hover:underline'>Seller Tables</Link>
                <div className='hover:bg-gray-200 py-3 flex justify-between text-lg px-10'>
                    <Link to={`/admin/seller/users`} className=' hover:underline'>users</Link>
                    <div className='flex gap-5'>
                        <Link to={`/admin/seller/users/add`} className='flex flex-row items-end hover:underline'>✚ add</Link>
                        <Link to={`/admin/seller/users`} className='flex flex-row items-end hover:underline'>🖊 change</Link>
                    </div>
                </div>
                <div className='hover:bg-gray-200 py-3 flex justify-between text-lg px-10'>
                    <Link to={`/admin/seller/contact`} className=' hover:underline'>contact</Link>
                    <div className='flex gap-5'>
                        <Link to={`/admin/seller/contact/add`} className='flex flex-row items-end hover:underline'>✚ add</Link>
                        <Link to={`/admin/seller/contact`} className='flex flex-row items-end hover:underline'>🖊 change</Link>
                    </div>
                </div>
                <div className='hover:bg-gray-200 py-3 flex justify-between text-lg px-10'>
                    <Link to={`/admin/seller/products`} className=' hover:underline'>products</Link>
                    <div className='flex gap-5'>
                        <Link to={`/admin/seller/products/add`} className='flex flex-row items-end hover:underline'>✚ add</Link>
                        <Link to={`/admin/seller/products`} className='flex flex-row items-end hover:underline'>🖊 change</Link>
                    </div>
                </div>
                <div className='hover:bg-gray-200 py-3 flex justify-between text-lg px-10'>
                    <Link to={`/admin/seller/orders`} className=' hover:underline'>Orders</Link>
                    <div className='flex gap-5'>
                        <Link to={`/admin/seller/orders`} className='flex flex-row items-end hover:underline'>🖊 change</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ADMINIndex;