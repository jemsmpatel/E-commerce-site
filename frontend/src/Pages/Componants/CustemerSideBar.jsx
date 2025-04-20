import React from 'react';
import { Link } from 'react-router-dom';

const CustemerSideBar = () => {
    return (
        <div className='w-[90vw] md:w-[30vw]'>
            <div className="flex mx-4 my-6 flex-col bg-gray-200 rounded-lg overflow-hidden shadow-sm">
                <Link to={`/admin/home`} className='bg-gray-500 py-4 text-xl text-white px-10 hover:underline'>User Tables</Link>
                <div className='hover:bg-gray-200 py-3 flex justify-between text-lg px-10'>
                    <Link to={`/admin/home/users`} className=' hover:underline'>users</Link>
                    <div className='flex gap-5'>
                        <Link to={`/admin/home/users/add`} className='flex flex-row items-end hover:underline'>✚ add</Link>
                    </div>
                </div>
                <div className='hover:bg-gray-200 py-3 flex justify-between text-lg px-10'>
                    <Link to={`/admin/home/contact`} className=' hover:underline'>contact</Link>
                    <div className='flex gap-5'>
                        <Link to={`/admin/home/contact/add`} className='flex flex-row items-end hover:underline'>✚ add</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CustemerSideBar;