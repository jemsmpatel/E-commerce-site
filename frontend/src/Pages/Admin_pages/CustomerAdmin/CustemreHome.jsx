import React from 'react';
import { Link } from 'react-router-dom';

const CustemreHome = () => {
    return (
        <div className='container mx-auto px-4 py-6'>
            <div className="flex flex-col bg-gray-200 rounded-lg overflow-hidden shadow-sm">
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
        </div>
    );
}

export default CustemreHome;