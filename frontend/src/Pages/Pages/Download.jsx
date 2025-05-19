import React from 'react';

const Download = () => {
    return (
        <div className="container mx-auto p-4 my-5">
            <div className="flex flex-col md:flex-row">
                {/* Left Part */}
                <div className="md:w-1/2 h-1/2 p-4 flex flex-col justify-center items-center">
                    <h2 className="text-2xl font-bold">Desktop</h2>
                    <h4 className="text-xl mt-6 font-semibold">Customer</h4>
                    <p className="text-center mt-2">
                        This is the left part of the page. Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium voluptas perferendis suscipit ipsam tenetur deleniti, corporis porro id ducimus, numquam iusto natus. Quam sequi facilis magnam illum ducimus quod asperiores!
                    </p>
                    <a href="#" className="mt-4">
                        <button className="w-40 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-700 transition">Download</button>
                    </a>
                    <h4 className="text-xl mt-6 font-semibold">Seller</h4>
                    <p className="text-center mt-2">
                        This is the left part of the page. Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium voluptas perferendis suscipit ipsam tenetur deleniti, corporis porro id ducimus, numquam iusto natus. Quam sequi facilis magnam illum ducimus quod asperiores!
                    </p>
                    <a href="#" className="mt-4">
                        <button className="w-40 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-700 transition">Download</button>
                    </a>
                </div>
                {/* Right Part */}
                <div className="md:w-1/2 h-1/2 p-4 flex flex-col justify-center items-center">
                    <h2 className="text-2xl font-bold">Mobile</h2>
                    <h4 className="text-xl mt-6 font-semibold">Customer</h4>
                    <p className="text-center mt-2">
                        This is the right part of the page. Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium voluptas perferendis suscipit ipsam tenetur deleniti, corporis porro id ducimus, numquam iusto natus. Quam sequi facilis magnam illum ducimus quod asperiores!
                    </p>
                    <a href="/assets/SHOOP_MART.apk" download className="mt-4">
                        <button className="w-40 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-700 transition">Download</button>
                    </a>
                    <h4 className="text-xl mt-6 font-semibold">Seller</h4>
                    <p className="text-center mt-2">
                        This is the right part of the page. Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium voluptas perferendis suscipit ipsam tenetur deleniti, corporis porro id ducimus, numquam iusto natus. Quam sequi facilis magnam illum ducimus quod asperiores!
                    </p>
                    <a href="/assets/SELLER_SHOOP_MART.apk" download className="mt-4">
                        <button className="w-40 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-700 transition">Download</button>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Download;